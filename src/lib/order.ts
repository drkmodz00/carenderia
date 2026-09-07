import { supabase } from "@/lib/supabase";

// =====================================================
// TYPES
// =====================================================

export type CreateOrderItem = {
  menu_item_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  image: string | null;
};

export type CreatedOrder = {
  id: string;
  customer_name: string;
  order_type: "dine_in" | "take_out";
  total: number;
  status: string;
};

// =====================================================
// CREATE ORDER
// =====================================================

export async function createOrder(
  customerName: string,
  items: CreateOrderItem[],
  orderType: string,
  total: number
): Promise<CreatedOrder> {
  const cleanCustomerName = customerName.trim();

  // ---------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------

  if (!cleanCustomerName) {
    throw new Error("Customer name is required.");
  }

  if (items.length === 0) {
    throw new Error(
      "Order must contain at least one item."
    );
  }

  if (!Number.isFinite(total) || total < 0) {
    throw new Error("Invalid order total.");
  }

  if (
    orderType !== "Dine In" &&
    orderType !== "Take Out"
  ) {
    throw new Error("Invalid order type.");
  }

  const dbOrderType =
    orderType === "Dine In"
      ? "dine_in"
      : "take_out";

  // ---------------------------------------------------
  // CREATE ORDER
  // ---------------------------------------------------

  const {
    data: order,
    error: orderError,
  } = await supabase
    .from("orders")
    .insert({
      customer_name: cleanCustomerName,
      order_type: dbOrderType,
      total: Number(total.toFixed(2)),
      status: "ongoing",
    })
    .select(`
      id,
      customer_name,
      order_type,
      total,
      status
    `)
    .single();

  if (orderError) {
    throw orderError;
  }

  if (!order) {
    throw new Error("Unable to create order.");
  }

  // ---------------------------------------------------
  // CREATE ORDER ITEMS
  // ---------------------------------------------------

  const orderItems = items.map((item) => {
    const unitPrice = Number(item.unit_price);

    const subtotal = Number(
      (unitPrice * item.quantity).toFixed(2)
    );

    return {
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price: Number(unitPrice.toFixed(2)),
      subtotal,
      image: item.image,
    };
  });

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  // ---------------------------------------------------
  // ROLLBACK ORDER IF ITEMS FAIL
  // ---------------------------------------------------

  if (itemsError) {
    await supabase
      .from("orders")
      .delete()
      .eq("id", order.id);

    throw itemsError;
  }

  // ---------------------------------------------------
  // RETURN CREATED ORDER
  // ---------------------------------------------------

  return {
    id: String(order.id),
    customer_name: order.customer_name,
    order_type: order.order_type,
    total: Number(order.total),
    status: order.status,
  };
}