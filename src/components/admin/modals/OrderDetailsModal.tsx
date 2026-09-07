import React, { useMemo } from "react";
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { createOrderDetailsModalStyles } from "@/styles/admin/modals/orderDetailsModal.styles";

export type OrderDetailItem = { id: string; name: string; quantity: number; price: number };

export type OrderDetailsData = {
  id: string;
  customerName: string;
  orderNumber?: string;
  date: string;
  time: string;
  orderType: string;
  status: string;
  items: OrderDetailItem[];
  total: number;
};

type OrderDetailsModalProps = {
  visible: boolean;
  data: OrderDetailsData | null;
  onClose: () => void;
  onEdit?: () => void;
  onMarkCompleted?: () => void;
  onCancelOrder?: () => void;
  onPrintReceipt?: () => void;
};

export default function OrderDetailsModal({
  visible,
  data,
  onClose,
  onEdit,
  onMarkCompleted,
  onCancelOrder,
  onPrintReceipt,
}: OrderDetailsModalProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const styles = useMemo(() => createOrderDetailsModalStyles(isTablet), [isTablet]);

  if (!data) return null;

  // STATUS
  const normalizedStatus = data.status?.toLowerCase().trim();
  const isOngoing = normalizedStatus === "ongoing";
  const isCompleted = normalizedStatus === "completed";
  const isCancelled = normalizedStatus === "cancelled";

  // ORDER TYPE
  const normalizedOrderType = data.orderType?.toLowerCase().trim();
  const orderTypeLabel =
    normalizedOrderType === "dine_in" ? "Dine In" : normalizedOrderType === "take_out" ? "Take Out" : data.orderType || "";

  // BUTTON PERMISSIONS
  const canEdit = isOngoing;
  const canComplete = isOngoing;
  const canCancel = isOngoing;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Order Details</Text>
              <Text style={styles.orderNumber}>{data.orderNumber ?? `Order #${data.id.slice(0, 8)}`}</Text>
            </View>

            <Pressable onPress={onClose} style={({ pressed }) => [styles.closeButton, pressed && { opacity: 0.7 }]}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          {/* CONTENT */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* ORDER INFORMATION */}
            <View style={styles.infoCard}>
              <View style={styles.infoColumn}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>DATE</Text>
                  <Text style={styles.infoValue}>{data.date}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>ORDER TYPE</Text>
                  <Text style={styles.infoValue}>{orderTypeLabel}</Text>
                </View>
              </View>

              <View style={styles.infoColumn}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>TIME</Text>
                  <Text style={styles.infoValue}>{data.time}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>STATUS</Text>
                  <Text
                    style={[
                      styles.infoValue,
                      isOngoing && styles.ongoingStatus,
                      isCompleted && styles.completedStatus,
                      isCancelled && styles.cancelledStatus,
                    ]}
                  >
                    {data.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* ITEMS */}
            <View style={styles.itemsSection}>
              <Text style={styles.sectionTitle}>Items</Text>

              {data.items.map((item, index) => (
                <View key={item.id || `${item.name}-${index}`} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name} ×{item.quantity}</Text>
                  <Text style={styles.itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </View>

            {/* TOTAL */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₱{data.total.toFixed(2)}</Text>
            </View>

            {/* ACTIONS */}
            <View style={styles.actionsGrid}>
              {/* EDIT */}
              <Pressable
                disabled={!canEdit}
                onPress={() => {
                  console.log("EDIT ORDER CLICKED");
                  onEdit?.();
                }}
                style={({ pressed }) => [styles.editButton, !canEdit && styles.disabledButton, pressed && { opacity: 0.7 }]}
              >
                <Text style={styles.editButtonText}>Edit Order</Text>
              </Pressable>

              {/* MARK COMPLETED */}
              <Pressable
                disabled={!canComplete}
                onPress={() => {
                  console.log("MARK COMPLETED CLICKED");
                  onMarkCompleted?.();
                }}
                style={({ pressed }) => [
                  styles.completeButton,
                  !canComplete && styles.disabledButton,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={styles.completeButtonText}>{isCompleted ? "Completed" : "Mark Completed"}</Text>
              </Pressable>

              {/* CANCEL */}
              <Pressable
                disabled={!canCancel}
                onPress={() => {
                  console.log("CANCEL ORDER CLICKED");
                  onCancelOrder?.();
                }}
                style={({ pressed }) => [
                  styles.cancelButton,
                  !canCancel && styles.disabledButton,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={styles.cancelButtonText}>{isCancelled ? "Cancelled" : "Cancel Order"}</Text>
              </Pressable>

              {/* PRINT */}
              <Pressable
                onPress={() => {
                  console.log("PRINT RECEIPT CLICKED");
                  onPrintReceipt?.();
                }}
                style={({ pressed }) => [styles.printButton, pressed && { opacity: 0.7 }]}
              >
                <Text style={styles.printButtonText}>Print Receipt</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}