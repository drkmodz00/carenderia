import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";

import { supabase } from "@/lib/supabase";

export const backupData = async () => {
  // =========================================================
  // FETCH DATA
  // =========================================================

  const [
    ordersResult,
    orderItemsResult,
    salesResult,
    menuItemsResult,
    storeSettingsResult,
  ] = await Promise.all([
    supabase.from("orders").select("*"),
    supabase.from("order_items").select("*"),
    supabase.from("sales").select("*"),
    supabase.from("menu_items").select("*"),
    supabase.from("restaurant_settings").select("*"),
  ]);

  if (ordersResult.error) {
    throw ordersResult.error;
  }

  if (orderItemsResult.error) {
    throw orderItemsResult.error;
  }

  if (salesResult.error) {
    throw salesResult.error;
  }

  if (menuItemsResult.error) {
    throw menuItemsResult.error;
  }

  if (storeSettingsResult.error) {
    throw storeSettingsResult.error;
  }

  const orders = ordersResult.data ?? [];
  const orderItems = orderItemsResult.data ?? [];
  const sales = salesResult.data ?? [];
  const menuItems = menuItemsResult.data ?? [];
  const storeSettings = storeSettingsResult.data ?? [];

  // =========================================================
  // CREATE EXCEL WORKBOOK
  // =========================================================

  const workbook = XLSX.utils.book_new();

  // Orders
  const ordersSheet = XLSX.utils.json_to_sheet(orders);
  XLSX.utils.book_append_sheet(
    workbook,
    ordersSheet,
    "Orders"
  );

  // Order Items
  const orderItemsSheet = XLSX.utils.json_to_sheet(orderItems);
  XLSX.utils.book_append_sheet(
    workbook,
    orderItemsSheet,
    "Order Items"
  );

  // Sales
  const salesSheet = XLSX.utils.json_to_sheet(sales);
  XLSX.utils.book_append_sheet(
    workbook,
    salesSheet,
    "Sales"
  );

  // Menu Items
  const menuItemsSheet = XLSX.utils.json_to_sheet(menuItems);
  XLSX.utils.book_append_sheet(
    workbook,
    menuItemsSheet,
    "Menu Items"
  );

  // Restaurant Settings
  const storeSettingsSheet =
    XLSX.utils.json_to_sheet(storeSettings);

  XLSX.utils.book_append_sheet(
    workbook,
    storeSettingsSheet,
    "Store Settings"
  );

  // =========================================================
  // WRITE EXCEL FILE
  // =========================================================

  const excelBase64 = XLSX.write(workbook, {
    type: "base64",
    bookType: "xlsx",
  });

  const fileName = `Carenderia_Backup_${new Date()
    .toISOString()
    .replace(/[:.]/g, "-")}.xlsx`;

  const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

  await FileSystem.writeAsStringAsync(
    fileUri,
    excelBase64,
    {
      encoding: FileSystem.EncodingType.Base64,
    }
  );

  // =========================================================
  // SHARE FILE
  // =========================================================

  const canShare = await Sharing.isAvailableAsync();

  if (!canShare) {
    throw new Error(
      "File sharing is not available on this device."
    );
  }

  await Sharing.shareAsync(fileUri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "Save Carenderia Backup",
    UTI:
      "com.microsoft.excel.xlsx",
  });

  return {
    fileUri,
    fileName,
    counts: {
      orders: orders.length,
      orderItems: orderItems.length,
      sales: sales.length,
      menuItems: menuItems.length,
      storeSettings: storeSettings.length,
    },
  };
};