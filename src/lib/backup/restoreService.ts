import * as DocumentPicker from "expo-document-picker";
import * as XLSX from "xlsx";

import { supabase } from "@/lib/supabase";

export const restoreData = async () => {
  // =========================================================
  // PICK EXCEL BACKUP
  // =========================================================

  const result = await DocumentPicker.getDocumentAsync({
    type: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ],
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled) {
    return null;
  }

  const file = result.assets?.[0];

  if (!file?.uri) {
    throw new Error(
      "No Excel backup file was selected."
    );
  }

  // =========================================================
  // READ FILE
  // =========================================================

  const response = await fetch(file.uri);

  if (!response.ok) {
    throw new Error(
      "Unable to read the selected backup file."
    );
  }

  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, {
    type: "array",
  });

  // =========================================================
  // REQUIRED SHEETS
  // =========================================================

  const requiredSheets = [
    "Orders",
    "Order Items",
    "Sales",
    "Menu Items",
    "Store Settings",
  ];

  const missingSheets = requiredSheets.filter(
    (sheet) =>
      !workbook.SheetNames.includes(sheet)
  );

  if (missingSheets.length > 0) {
    throw new Error(
      `The selected backup is missing these sheets: ${missingSheets.join(
        ", "
      )}`
    );
  }

  // =========================================================
  // READ SHEETS
  // =========================================================

  const readSheet = (sheetName: string) => {
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error(
        `The ${sheetName} sheet could not be read.`
      );
    }

    return XLSX.utils.sheet_to_json<any>(
      sheet,
      {
        defval: null,
      }
    );
  };

  const ordersRows = readSheet("Orders");
  const orderItemsRows = readSheet("Order Items");
  const salesRows = readSheet("Sales");
  const menuItemsRows = readSheet("Menu Items");
  const storeSettingsRows =
    readSheet("Store Settings");

  // =========================================================
  // RESTORE ORDERS
  // =========================================================
  // Explicit mapping is important here because we want to
  // preserve payment information.

  const ordersToRestore = ordersRows
    .filter((row) => row.id)
    .map((row) => ({
      id: String(row.id),

      status: row.status
        ? String(row.status)
        : "ongoing",

      total:
        row.total !== null &&
        row.total !== undefined &&
        row.total !== ""
          ? Number(row.total)
          : 0,

      created_at:
        row.created_at !== null &&
        row.created_at !== undefined &&
        row.created_at !== ""
          ? row.created_at
          : new Date().toISOString(),

      completed_at:
        row.completed_at !== null &&
        row.completed_at !== undefined &&
        row.completed_at !== ""
          ? row.completed_at
          : null,

      payment_method:
        row.payment_method !== null &&
        row.payment_method !== undefined &&
        row.payment_method !== ""
          ? String(row.payment_method)
          : null,

      cash_received:
        row.cash_received !== null &&
        row.cash_received !== undefined &&
        row.cash_received !== ""
          ? Number(row.cash_received)
          : null,

      change_amount:
        row.change_amount !== null &&
        row.change_amount !== undefined &&
        row.change_amount !== ""
          ? Number(row.change_amount)
          : null,

      customer_name:
        row.customer_name !== null &&
        row.customer_name !== undefined &&
        row.customer_name !== ""
          ? String(row.customer_name)
          : null,

      order_type:
        row.order_type !== null &&
        row.order_type !== undefined &&
        row.order_type !== ""
          ? String(row.order_type)
          : null,
    }));

  // =========================================================
  // RESTORE OTHER TABLES
  // =========================================================

  const orderItemsToRestore = orderItemsRows
    .filter((row) => row.id)
    .map((row) => ({
      ...row,
      id: String(row.id),
    }));

  const salesToRestore = salesRows
    .filter((row) => row.id)
    .map((row) => ({
      ...row,
      id: String(row.id),
    }));

  const menuItemsToRestore = menuItemsRows
    .filter((row) => row.id)
    .map((row) => ({
      ...row,
      id: String(row.id),
    }));

  const storeSettingsToRestore =
    storeSettingsRows
      .filter((row) => row.id)
      .map((row) => ({
        ...row,
        id: String(row.id),
      }));

  // =========================================================
  // RESTORE DATABASE
  // =========================================================
  //
  // Order:
  // 1. Menu Items
  // 2. Orders
  // 3. Order Items
  // 4. Sales
  // 5. Restaurant Settings
  //
  // Menu Items are restored first in case order_items has
  // a foreign-key relationship to menu_items.

  if (menuItemsToRestore.length > 0) {
    const { error } = await supabase
      .from("menu_items")
      .upsert(menuItemsToRestore, {
        onConflict: "id",
      });

    if (error) {
      throw new Error(
        `Menu Items restore failed: ${error.message}`
      );
    }
  }

  // =========================================================
  // ORDERS
  // =========================================================

  if (ordersToRestore.length > 0) {
    const { error } = await supabase
      .from("orders")
      .upsert(ordersToRestore, {
        onConflict: "id",
      });

    if (error) {
      throw new Error(
        `Orders restore failed: ${error.message}`
      );
    }
  }

  // =========================================================
  // ORDER ITEMS
  // =========================================================

  if (orderItemsToRestore.length > 0) {
    const { error } = await supabase
      .from("order_items")
      .upsert(orderItemsToRestore, {
        onConflict: "id",
      });

    if (error) {
      throw new Error(
        `Order Items restore failed: ${error.message}`
      );
    }
  }

  // =========================================================
  // SALES
  // =========================================================

  if (salesToRestore.length > 0) {
    const { error } = await supabase
      .from("sales")
      .upsert(salesToRestore, {
        onConflict: "id",
      });

    if (error) {
      throw new Error(
        `Sales restore failed: ${error.message}`
      );
    }
  }

  // =========================================================
  // RESTAURANT SETTINGS
  // =========================================================

  if (storeSettingsToRestore.length > 0) {
    const { error } = await supabase
      .from("restaurant_settings")
      .upsert(
        storeSettingsToRestore,
        {
          onConflict: "id",
        }
      );

    if (error) {
      throw new Error(
        `Restaurant Settings restore failed: ${error.message}`
      );
    }
  }

  // =========================================================
  // RETURN RESTORE SUMMARY
  // =========================================================

  return {
    fileName: file.name ?? "Backup file",

    counts: {
      orders: ordersToRestore.length,
      orderItems: orderItemsToRestore.length,
      sales: salesToRestore.length,
      menuItems: menuItemsToRestore.length,
      storeSettings:
        storeSettingsToRestore.length,
    },
  };
};