import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  receiptModalStyles as styles,
} from "@/styles/admin/modals/receiptModal.styles";

export type ReceiptItem = {
  name: string;
  quantity: number;
  price: number;
};

export type ReceiptData = {
  orderId: string;

  // Support multiple items
  items?: ReceiptItem[];

  // Compatibility with checkout receipt
  itemName?: string;
  quantity?: number;
  itemPrice?: number;

  total: number;

  // Payment information
  cashReceived?: number | null;
  change?: number | null;
  paymentMethod?: string | null;

  // IMPORTANT:
  // Historical receipt uses this instead of new Date()
  soldAt?: string;

  storeName?: string;
  address?: string | null;
  phone?: string | null;
};

type ReceiptModalProps = {
  visible: boolean;
  data: ReceiptData;
  onClose: () => void;
  onNewOrder?: () => void;

  // true when opened from Sales History
  isHistory?: boolean;
};

export default function ReceiptModal({
  visible,
  data,
  onClose,
  onNewOrder,
  isHistory = false,
}: ReceiptModalProps) {
  const txnNumber = data.orderId
    ? `TXN-${data.orderId.slice(0, 8).toUpperCase()}`
    : "TXN-0000";

  // =====================================================
  // RECEIPT DATE
  // =====================================================

  const receiptDate = data.soldAt
    ? new Date(data.soldAt)
    : new Date();

  const printedDate = receiptDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const printedTime = receiptDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // =====================================================
  // ITEMS
  // =====================================================

  const receiptItems: ReceiptItem[] =
    data.items && data.items.length > 0
      ? data.items
      : [
          {
            name: data.itemName || "Order",
            quantity: data.quantity || 1,
            price: data.itemPrice || data.total,
          },
        ];

  const calculatedSubtotal = receiptItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subtotal =
    calculatedSubtotal > 0 ? calculatedSubtotal : data.total;

  const storeName =
    data.storeName?.trim() || "Carenderia POS";

  // =====================================================
  // PAYMENT
  // =====================================================

  const paymentMethod =
    data.paymentMethod?.trim() || "Cash";

  const hasCashInfo =
    data.cashReceived !== null &&
    data.cashReceived !== undefined;

  const cashReceived = Number(data.cashReceived ?? 0);
  const change = Number(data.change ?? 0);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.receiptContainer}>
          <ScrollView
            style={styles.receiptScroll}
            contentContainerStyle={styles.receiptScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.receipt}>

              {/* TOP TORN EDGE */}
              <View style={styles.zigzagRow}>
                {Array.from({ length: 20 }).map((_, index) => (
                  <View
                    key={index}
                    style={styles.zigzagTriangle}
                  />
                ))}
              </View>

              <View style={styles.receiptInner}>

                {/* STORE */}
                <Text style={styles.logo}>🧺</Text>

                <Text style={styles.storeName}>
                  {storeName}
                </Text>

                {data.address && (
                  <Text style={styles.storeMeta}>
                    {data.address}
                  </Text>
                )}

                {data.phone && (
                  <Text style={styles.storeMeta}>
                    {data.phone}
                  </Text>
                )}

                <View style={styles.dashedDivider} />

                {/* RECEIPT TYPE */}
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: "700",
                    marginBottom: 8,
                    letterSpacing: 1,
                  }}
                >
                  {isHistory
                    ? "SALES HISTORY RECEIPT"
                    : "SALES RECEIPT"}
                </Text>

                {/* TRANSACTION INFO */}

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    TXN No.
                  </Text>

                  <Text style={styles.infoValue}>
                    {txnNumber}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Date
                  </Text>

                  <Text style={styles.infoValueBold}>
                    {printedDate}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Time
                  </Text>

                  <Text style={styles.infoValueBold}>
                    {printedTime}
                  </Text>
                </View>

                <View style={styles.dashedDivider} />

                {/* ITEMS TABLE */}

                <View style={styles.itemsHeaderRow}>
                  <Text
                    style={[
                      styles.itemsHeaderLabel,
                      styles.itemColumn,
                    ]}
                  >
                    ITEM
                  </Text>

                  <Text
                    style={[
                      styles.itemsHeaderLabel,
                      styles.qtyColumn,
                    ]}
                  >
                    QTY
                  </Text>

                  <Text
                    style={[
                      styles.itemsHeaderLabel,
                      styles.priceColumn,
                    ]}
                  >
                    PRICE
                  </Text>

                  <Text
                    style={[
                      styles.itemsHeaderLabel,
                      styles.amountColumn,
                    ]}
                  >
                    AMOUNT
                  </Text>
                </View>

                {/* ALL ITEMS */}

                {receiptItems.map((item, index) => {
                  const itemTotal =
                    item.price * item.quantity;

                  return (
                    <View
                      key={`${item.name}-${index}`}
                      style={styles.itemRow}
                    >
                      {/* ITEM */}

                      <View style={styles.itemColumn}>
                        <Text
                          style={styles.itemName}
                          numberOfLines={2}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* QTY */}

                      <Text
                        style={[
                          styles.itemQty,
                          styles.qtyColumn,
                        ]}
                      >
                        {item.quantity}
                      </Text>

                      {/* PRICE */}

                      <Text
                        style={[
                          styles.itemPrice,
                          styles.priceColumn,
                        ]}
                      >
                        ₱{item.price.toFixed(2)}
                      </Text>

                      {/* AMOUNT */}

                      <Text
                        style={[
                          styles.itemAmount,
                          styles.amountColumn,
                        ]}
                      >
                        ₱{itemTotal.toFixed(2)}
                      </Text>
                    </View>
                  );
                })}

                <View style={styles.dashedDivider} />

                {/* SUBTOTAL */}

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Subtotal
                  </Text>

                  <Text style={styles.subtotalValue}>
                    ₱{subtotal.toFixed(2)}
                  </Text>
                </View>

                {/* TOTAL */}

                <View style={styles.infoRow}>
                  <Text style={styles.totalLabel}>
                    TOTAL
                  </Text>

                  <Text style={styles.totalValue}>
                    ₱{Number(data.total).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.dashedDivider} />

                {/* PAYMENT METHOD */}

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Payment
                  </Text>

                  <Text style={styles.cashValue}>
                    {paymentMethod}
                  </Text>
                </View>

                {/* CASH + CHANGE
                    Only show if actual data exists.
                */}

                {hasCashInfo && (
                  <>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>
                        Cash
                      </Text>

                      <Text style={styles.cashValue}>
                        ₱{cashReceived.toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Text style={styles.sukliLabel}>
                        CHANGE
                      </Text>

                      <Text style={styles.sukliValue}>
                        ₱{change.toFixed(2)}
                      </Text>
                    </View>
                  </>
                )}

                <View style={styles.dashedDivider} />

                {/* HISTORY LABEL */}

                {isHistory && (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      marginBottom: 8,
                      opacity: 0.65,
                    }}
                  >
                    This is a historical transaction record.
                  </Text>
                )}

                {/* FOOTER */}

                <Text style={styles.thankYouText}>
                  Thank you!
                </Text>

                <Text style={styles.visitText}>
                  Visit again!
                </Text>

                <Text style={styles.poweredByText}>
                  Powered by Carenderia POS
                </Text>
              </View>

              {/* BOTTOM TORN EDGE */}

              <View style={styles.zigzagRowBottom}>
                {Array.from({ length: 20 }).map((_, index) => (
                  <View
                    key={index}
                    style={styles.zigzagTriangleBottom}
                  />
                ))}
              </View>

              {/* BUTTONS */}

              <View style={styles.actionFooter}>

                <Pressable
                  style={styles.printButton}
                  onPress={() => {
                    // Add expo-print here later
                  }}
                >
                  <Text style={styles.printButtonText}>
                    🖨️ Print
                  </Text>
                </Pressable>

                {isHistory ? (
                  <Pressable
                    style={styles.newOrderButton}
                    onPress={onClose}
                  >
                    <Text style={styles.newOrderButtonText}>
                      ✕ Close
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.newOrderButton}
                    onPress={onNewOrder}
                  >
                    <Text style={styles.newOrderButtonText}>
                      ✚ Bagong Order
                    </Text>
                  </Pressable>
                )}

              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
