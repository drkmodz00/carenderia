import React, { useMemo, useState } from "react";
import {  Alert, Modal, Pressable, Text, useWindowDimensions, View, } from "react-native";
import { cashPaymentModalStyles as styles } from "@/styles/admin/modals/payment/cashPaymentModal.styles";
import { Banknote } from "lucide-react-native";

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
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

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

    setCashReceived(
      String(amount)
    );
  };

  const handleConfirm = () => {
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

    setCashReceived("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modal,
            isTablet && styles.modalTablet,
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              <View style={styles.titleRow}>
                <Banknote
                  size={22}
                  color="#F59E0B"
                  strokeWidth={2.5}
                />
                <Text style={styles.title}>
                  Cash Payment
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Enter the cash received
              </Text>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isProcessing}
            >
              <Text style={styles.closeText}>
                ×
              </Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.amountGrid,
              isTablet && styles.amountGridTablet,
            ]}
          >
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>
                Total Amount
              </Text>

              <Text style={styles.totalValue}>
                ₱{total.toFixed(2)}
              </Text>
            </View>

            <View
              style={[
                styles.cashBox,
                sufficientCash &&
                  styles.cashBoxValid,
              ]}
            >
              <Text style={styles.cashLabel}>
                Cash Received
              </Text>

              <Text
                style={styles.cashValue}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                ₱{cashReceived || "0"}
              </Text>
            </View>

            <View style={styles.changeBox}>
              <View style={styles.changeRow}>
                <Text style={styles.changeLabel}>
                  Change
                </Text>

                <Text
                  style={[
                    styles.changeValue,
                    !sufficientCash &&
                      styles.changeValueEmpty,
                  ]}
                >
                  {sufficientCash
                    ? `₱${change.toFixed(2)}`
                    : "—"}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.quickLabel}>
            Quick Value
          </Text>

          <View style={styles.quickRow}>
            {[total, 50, 100, 500]
              .filter(
                (amount, index, array) =>
                  array.indexOf(amount) === index
              )
              .map((amount) => (
                <Pressable
                  key={amount}
                  style={styles.quickButton}
                  onPress={() =>
                    handleQuickAmount(amount)
                  }
                  disabled={isProcessing}
                >
                  <Text
                    style={
                      styles.quickButtonText
                    }
                  >
                    ₱{amount.toFixed(0)}
                  </Text>
                </Pressable>
              ))}
          </View>

          <View style={styles.keypad}>
            {[
              ["7", "8", "9"],
              ["4", "5", "6"],
              ["1", "2", "3"],
              ["00", "0", "backspace"],
            ].map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={styles.keypadRow}
              >
                {row.map((key) => (
                  <Pressable
                    key={key}
                    style={[
                      styles.keypadButton,
                      key === "backspace" &&
                        styles.keypadBackspace,
                    ]}
                    onPress={() =>
                      handleKeypadPress(key)
                    }
                    disabled={isProcessing}
                  >
                    <Text
                      style={[
                        styles.keypadText,
                        key === "backspace" &&
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

          <Pressable
            style={[
              styles.confirmButton,
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
    </Modal>
  );
}
