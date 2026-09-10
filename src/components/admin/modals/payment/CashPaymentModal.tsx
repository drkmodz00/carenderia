import React, { useMemo, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Banknote } from "lucide-react-native";

import {
  cashPaymentModalStyles as styles,
} from "@/styles/admin/modals/payment/cashPaymentModal.styles";

type CashPaymentModalProps = {
  visible: boolean;
  total: number;
  isProcessing?: boolean;
  onClose: () => void;
  onConfirm: (
    cashReceived: number,
    change: number
  ) => void;
};

export default function CashPaymentModal({
  visible,
  total,
  isProcessing = false,
  onClose,
  onConfirm,
}: CashPaymentModalProps) {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= 768;

  // Smaller modal spacing for short screens / keyboard
  const isShortScreen = height < 700;
  const isVeryShortScreen = height < 600;

  const [cashReceived, setCashReceived] = useState("");

  const receivedAmount = Number(cashReceived);

  const validAmount =
    cashReceived.trim() !== "" &&
    Number.isFinite(receivedAmount);

  const sufficientCash =
    validAmount &&
    receivedAmount >= total &&
    total > 0;

  const change = useMemo(() => {
    if (!validAmount || total <= 0) {
      return 0;
    }

    return Math.max(receivedAmount - total, 0);
  }, [receivedAmount, total, validAmount]);

  const handleKeypadPress = (key: string) => {
    if (isProcessing) return;

    if (key === "backspace") {
      setCashReceived((current) =>
        current.slice(0, -1)
      );
      return;
    }

    if (
      cashReceived === "0" &&
      key !== "00"
    ) {
      setCashReceived(key);
      return;
    }

    if (
      cashReceived === "" &&
      key === "00"
    ) {
      setCashReceived("0");
      return;
    }

    setCashReceived((current) =>
      current + key
    );
  };

  const handleQuickAmount = (amount: number) => {
    if (isProcessing) return;

    setCashReceived(String(amount));
  };

  const handleConfirm = () => {
    Keyboard.dismiss();

    if (!cashReceived.trim()) {
      Alert.alert(
        "Cash Required",
        "Please enter the amount received from the customer."
      );
      return;
    }

    if (!Number.isFinite(receivedAmount)) {
      Alert.alert(
        "Invalid Cash",
        "Please enter a valid cash amount."
      );
      return;
    }

    if (receivedAmount < total) {
      Alert.alert(
        "Insufficient Cash",
        `Total: ₱${total.toFixed(2)}\nCash: ₱${receivedAmount.toFixed(2)}`
      );
      return;
    }

    onConfirm(
      Number(receivedAmount.toFixed(2)),
      Number(change.toFixed(2))
    );
  };

  const handleClose = () => {
    if (isProcessing) return;

    Keyboard.dismiss();
    setCashReceived("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <View
          style={[
            styles.overlay,
            isShortScreen &&
              styles.overlayShort,
          ]}
        >
          <View
            style={[
              styles.modal,
              isTablet && styles.modalTablet,
              isShortScreen &&
                styles.modalShort,
              isVeryShortScreen &&
                styles.modalVeryShort,
            ]}
          >
            {/* HEADER */}
            <View
              style={[
                styles.header,
                isShortScreen &&
                  styles.headerShort,
              ]}
            >
              <View style={styles.headerTextWrap}>
                <View style={styles.titleRow}>
                  <Banknote
                    size={isShortScreen ? 20 : 22}
                    color="#F59E0B"
                    strokeWidth={2.5}
                  />

                  <Text
                    style={[
                      styles.title,
                      isShortScreen &&
                        styles.titleShort,
                    ]}
                  >
                    Cash Payment
                  </Text>
                </View>

                <Text
                  style={[
                    styles.subtitle,
                    isShortScreen &&
                      styles.subtitleShort,
                  ]}
                >
                  Enter the cash received
                </Text>
              </View>

              <Pressable
                style={[
                  styles.closeButton,
                  isShortScreen &&
                    styles.closeButtonShort,
                ]}
                onPress={handleClose}
                disabled={isProcessing}
              >
                <Text style={styles.closeText}>
                  ×
                </Text>
              </Pressable>
            </View>

            {/* AMOUNT CARDS */}
            <View
              style={[
                styles.amountGrid,
                isTablet &&
                  styles.amountGridTablet,
                isShortScreen &&
                  styles.amountGridShort,
              ]}
            >
              <View
                style={[
                  styles.totalBox,
                  isShortScreen &&
                    styles.amountBoxShort,
                ]}
              >
                <Text style={styles.totalLabel}>
                  Total Amount
                </Text>

                <Text
                  style={[
                    styles.totalValue,
                    isShortScreen &&
                      styles.amountValueShort,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  ₱{total.toFixed(2)}
                </Text>
              </View>

              <View
                style={[
                  styles.cashBox,
                  sufficientCash &&
                    styles.cashBoxValid,
                  isShortScreen &&
                    styles.amountBoxShort,
                ]}
              >
                <Text style={styles.cashLabel}>
                  Cash Received
                </Text>

                <Text
                  style={[
                    styles.cashValue,
                    isShortScreen &&
                      styles.amountValueShort,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  ₱{cashReceived || "0"}
                </Text>
              </View>

              <View
                style={[
                  styles.changeBox,
                  isShortScreen &&
                    styles.amountBoxShort,
                ]}
              >
                <View style={styles.changeRow}>
                  <Text style={styles.changeLabel}>
                    Change
                  </Text>

                  <Text
                    style={[
                      styles.changeValue,
                      !sufficientCash &&
                        styles.changeValueEmpty,
                      isShortScreen &&
                        styles.changeValueShort,
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {sufficientCash
                      ? `₱${change.toFixed(2)}`
                      : "—"}
                  </Text>
                </View>
              </View>
            </View>

            {/* QUICK VALUE */}
            <Text
              style={[
                styles.quickLabel,
                isShortScreen &&
                  styles.quickLabelShort,
              ]}
            >
              Quick Value
            </Text>

            <View
              style={[
                styles.quickRow,
                isShortScreen &&
                  styles.quickRowShort,
              ]}
            >
              {[total, 50, 100, 500]
                .filter(
                  (amount, index, array) =>
                    array.indexOf(amount) ===
                    index
                )
                .map((amount) => (
                  <Pressable
                    key={amount}
                    style={[
                      styles.quickButton,
                      isShortScreen &&
                        styles.quickButtonShort,
                    ]}
                    onPress={() =>
                      handleQuickAmount(
                        amount
                      )
                    }
                    disabled={isProcessing}
                  >
                    <Text
                      style={[
                        styles.quickButtonText,
                        isShortScreen &&
                          styles.quickButtonTextShort,
                      ]}
                    >
                      ₱{amount.toFixed(0)}
                    </Text>
                  </Pressable>
                ))}
            </View>

            {/* KEYPAD */}
            <View
              style={[
                styles.keypad,
                isShortScreen &&
                  styles.keypadShort,
              ]}
            >
              {[
                ["7", "8", "9"],
                ["4", "5", "6"],
                ["1", "2", "3"],
                ["00", "0", "backspace"],
              ].map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={[
                    styles.keypadRow,
                    isShortScreen &&
                      styles.keypadRowShort,
                  ]}
                >
                  {row.map((key) => (
                    <Pressable
                      key={key}
                      style={[
                        styles.keypadButton,
                        isShortScreen &&
                          styles.keypadButtonShort,
                        key === "backspace" &&
                          styles.keypadBackspace,
                      ]}
                      onPress={() =>
                        handleKeypadPress(
                          key
                        )
                      }
                      disabled={isProcessing}
                    >
                      <Text
                        style={[
                          styles.keypadText,
                          isShortScreen &&
                            styles.keypadTextShort,
                          key ===
                            "backspace" &&
                            styles.backspaceText,
                        ]}
                      >
                        {key === "backspace"
                          ? "⌫"
                          : key}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>

            {/* CONFIRM */}
            <Pressable
              style={[
                styles.confirmButton,
                isShortScreen &&
                  styles.confirmButtonShort,
                !sufficientCash &&
                  styles.confirmButtonDisabled,
              ]}
              disabled={
                !sufficientCash ||
                isProcessing
              }
              onPress={handleConfirm}
            >
              <Text
                style={[
                  styles.confirmText,
                  isShortScreen &&
                    styles.confirmTextShort,
                  !sufficientCash &&
                    styles.confirmTextDisabled,
                ]}
              >
                {isProcessing
                  ? "Processing..."
                  : "✓ Confirm Cash Payment"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
