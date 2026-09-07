import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { Smartphone, X, CheckCircle } from "lucide-react-native";
import { gcashPaymentModalStyles as styles } from "@/styles/admin/modals/payment/gcashPaymentModal.styles";

type GCashPaymentModalProps = {
  visible: boolean;
  total: number;
  isProcessing?: boolean;
  qrCodeUri: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function GCashPaymentModal({
  visible,
  total,
  isProcessing = false,
  qrCodeUri,
  onClose,
  onConfirm,
}: GCashPaymentModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <Smartphone
                  size={20}
                  color="#C2410C"
                  strokeWidth={2.4}
                />
              </View>

              <View style={styles.headerText}>
                <Text style={styles.title}>GCash Payment</Text>
                <Text style={styles.subtitle}>
                  Scan the QR code to pay
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              disabled={isProcessing}
            >
              <X
                size={18}
                color="#6F6257"
                strokeWidth={2.5}
              />
            </Pressable>
          </View>

          {/* AMOUNT */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Amount Due</Text>
            <Text style={styles.amountValue}>
              ₱{total.toFixed(2)}
            </Text>
          </View>

          {/* QR CODE */}
          <View style={styles.qrSection}>
            <Text style={styles.scanTitle}>Scan to Pay</Text>

            <View style={styles.qrContainer}>
              <Image
                source={{ uri: qrCodeUri }}
                style={styles.qrCode}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.instruction}>
              Ask the customer to scan this QR code using their GCash app.
            </Text>
          </View>

          {/* PAYMENT STATUS */}
          <View style={styles.statusBox}>
            <CheckCircle
              size={18}
              color="#C2410C"
              strokeWidth={2.2}
            />

            <Text style={styles.statusText}>
              Verify that the payment was received before confirming.
            </Text>
          </View>

          {/* CONFIRM */}
          <Pressable
            onPress={onConfirm}
            disabled={isProcessing}
            style={[
              styles.confirmButton,
              isProcessing && styles.confirmButtonDisabled,
            ]}
          >
            <CheckCircle
              size={18}
              color="#FFFFFF"
              strokeWidth={2.5}
            />

            <Text style={styles.confirmText}>
              {isProcessing
                ? "Processing..."
                : "Confirm Payment Received"}
            </Text>
          </Pressable>

          {/* CANCEL */}
          <Pressable
            onPress={onClose}
            disabled={isProcessing}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
