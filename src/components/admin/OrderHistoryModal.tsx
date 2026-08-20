import React from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import { orderHistoryModalStyles as styles } from "../../styles/admin/orderHistoryModal.styles";
/* =====================================================
   TYPES
===================================================== */

export type OrderHistoryItem = {
  name: string;
  quantity: number;
  price: number;
};

export type OrderHistoryData = {
  id: string;
  date: string;
  time: string;
  staff: string;
  items: OrderHistoryItem[];
  total: number;
};

type OrderHistoryModalProps = {
  visible: boolean;
  order: OrderHistoryData | null;
  onClose: () => void;
};

/* =====================================================
   CURRENCY
===================================================== */

const formatCurrency = (amount: number): string => {
  return `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/* =====================================================
   MODAL
===================================================== */

export default function OrderHistoryModal({
  visible,
  order,
  onClose,
}: OrderHistoryModalProps) {
  if (!order) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* ================================================
          DARK OVERLAY
      ================================================= */}

      <View style={styles.overlay}>

        {/* ================================================
            MODAL CONTAINER
        ================================================= */}

        <View style={styles.modalContainer}>

          {/* ==============================================
              HEADER
          ============================================== */}

          <View style={styles.modalHeader}>

            <Text style={styles.modalTitle}>
              Order #{order.id}
            </Text>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={10}
            >
              <Text style={styles.closeText}>
                ×
              </Text>
            </Pressable>

          </View>

          {/* ==============================================
              ORDER INFORMATION
          ============================================== */}

          <Text style={styles.orderInfo}>
            {order.date} at {order.time} · Staff: {order.staff}
          </Text>

          {/* ==============================================
              DIVIDER
          ============================================== */}

          <View style={styles.divider} />

          {/* ==============================================
              ORDER ITEMS
          ============================================== */}

          <View style={styles.itemsContainer}>

            {order.items.map(
              (
                item: OrderHistoryItem,
                index: number
              ) => {
                const itemTotal =
                  item.price * item.quantity;

                return (
                  <View
                    key={`${item.name}-${index}`}
                    style={styles.itemRow}
                  >

                    <Text
                      style={styles.itemName}
                      numberOfLines={1}
                    >
                      {item.name} × {item.quantity}
                    </Text>

                    <Text style={styles.itemPrice}>
                      {formatCurrency(itemTotal)}
                    </Text>

                  </View>
                );
              }
            )}

          </View>

          {/* ==============================================
              TOTAL DIVIDER
          ============================================== */}

          <View style={styles.totalDivider} />

          {/* ==============================================
              TOTAL
          ============================================== */}

          <View style={styles.totalRow}>

            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalValue}>
              {formatCurrency(order.total)}
            </Text>

          </View>

        </View>

      </View>
    </Modal>
  );
}