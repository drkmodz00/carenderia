import React from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Smartphone,
  X,
  CheckCircle,
} from "lucide-react-native";

import {
  createGcashPaymentModalStyles,
} from "@/styles/admin/modals/payment/gcashPaymentModal.styles";

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
  const { width, height } = useWindowDimensions();

  /**
   * Responsive breakpoints
   */
  const isSmallPhone = width < 360;
  const isPhone = width < 600;
  const isTablet = width >= 768;

  /**
   * Keep the modal comfortably inside the screen.
   */
  const horizontalPadding = isSmallPhone
    ? 10
    : isPhone
      ? 14
      : 18;

  const verticalPadding = isSmallPhone
    ? 10
    : isPhone
      ? 14
      : 18;

  /**
   * QR code size adapts to BOTH width and height.
   *
   * This is important because a short phone screen
   * can otherwise make the modal too tall.
   */
  const availableQrSize = Math.min(
    width - horizontalPadding * 2 - 50,
    height * (isSmallPhone ? 0.27 : isPhone ? 0.31 : 0.34),
    isSmallPhone ? 145 : isPhone ? 175 : 200
  );

  const qrSize = Math.max(
    isSmallPhone ? 125 : 145,
    availableQrSize
  );

  /**
   * Responsive icon sizes
   */
  const headerIconSize = isSmallPhone ? 36 : isPhone ? 40 : 44;
  const headerLucideSize = isSmallPhone ? 17 : isPhone ? 18 : 20;
  const closeSize = isSmallPhone ? 30 : 34;

  /**
   * Responsive styles.
   *
   * The base stylesheet handles the main design.
   * These overrides make the entire modal shrink
   * naturally on smaller devices.
   */
  const styles = createGcashPaymentModalStyles({
    isSmallPhone,
    isPhone,
    isTablet,
    modalWidth: width,
    modalHeight: height,
    horizontalPadding,
    verticalPadding,
    qrSize,
    headerIconSize,
    closeSize,
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <Smartphone
                  size={headerLucideSize}
                  color="#C2410C"
                  strokeWidth={2.4}
                />
              </View>

              <View style={styles.headerText}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  GCash Payment
                </Text>

                <Text
                  style={styles.subtitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  Scan the QR code to pay
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              disabled={isProcessing}
              hitSlop={6}
            >
              <X
                size={isSmallPhone ? 16 : 18}
                color="#6F6257"
                strokeWidth={2.5}
              />
            </Pressable>
          </View>

          {/* AMOUNT */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>
              Amount Due
            </Text>

            <Text
              style={styles.amountValue}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              ₱{total.toFixed(2)}
            </Text>
          </View>

          {/* QR CODE */}
          <View style={styles.qrSection}>
            <Text style={styles.scanTitle}>
              Scan to Pay
            </Text>

            <View
              style={[
                styles.qrContainer,
                {
                  width: qrSize,
                  height: qrSize,
                  borderRadius: isSmallPhone ? 11 : 16,
                  padding: isSmallPhone ? 6 : 9,
                },
              ]}
            >
              <Image
                source={{ uri: qrCodeUri }}
                style={{
                  width: qrSize - (isSmallPhone ? 12 : 18),
                  height: qrSize - (isSmallPhone ? 12 : 18),
                }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={styles.instruction}
              numberOfLines={isSmallPhone ? 2 : 3}
            >
              Ask the customer to scan this QR code using their GCash app.
            </Text>
          </View>

          {/* PAYMENT STATUS */}
          <View style={styles.statusBox}>
            <CheckCircle
              size={isSmallPhone ? 15 : 18}
              color="#C2410C"
              strokeWidth={2.2}
            />

            <Text
              style={styles.statusText}
              numberOfLines={isSmallPhone ? 2 : 3}
            >
              Verify that the payment was received before confirming.
            </Text>
          </View>

          {/* CONFIRM */}
          <Pressable
            onPress={onConfirm}
            disabled={isProcessing}
            style={[
              styles.confirmButton,
              isProcessing &&
                styles.confirmButtonDisabled,
            ]}
          >
            <CheckCircle
              size={isSmallPhone ? 16 : 18}
              color="#FFFFFF"
              strokeWidth={2.5}
            />

            <Text
              style={styles.confirmText}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
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
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
