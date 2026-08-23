import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { paymentStyles as styles } from "@/styles/admin/payment.styles";

export default function PaymentPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  /* =====================================================
     ORDER DATA
  ===================================================== */

  const total = Number(params.total ?? 0);

  const itemName = params.itemName
    ? String(params.itemName)
    : "Order";

  const quantity = Number(
    params.quantity ?? 1
  );

  const itemPrice = Number(
    params.itemPrice ?? total
  );

  /* =====================================================
     CASH RECEIVED
  ===================================================== */

  const [cashReceived, setCashReceived] =
    useState("");

  const receivedAmount = Number(
    cashReceived
  );

  /* =====================================================
     CHANGE / SUKLI
  ===================================================== */

  const change = useMemo(() => {
    if (
      Number.isNaN(receivedAmount) ||
      receivedAmount <= 0
    ) {
      return 0;
    }

    return Math.max(
      receivedAmount - total,
      0
    );
  }, [
    receivedAmount,
    total,
  ]);

  /* =====================================================
     PAYMENT VALIDATION
  ===================================================== */

  const canConfirm =
    total > 0 &&
    receivedAmount >= total;

  /* =====================================================
     QUICK AMOUNT
  ===================================================== */

  const handleQuickAmount = (
    amount: number
  ) => {
    setCashReceived(
      String(amount)
    );
  };

  const isSelected = (
    amount: number
  ) => {
    return receivedAmount === amount;
  };

  /* =====================================================
     CONFIRM PAYMENT
  ===================================================== */

  const handleConfirmPayment = () => {
    if (!canConfirm) {
      return;
    }

    /*
      After payment is confirmed,
      go to Receipt screen.

      The following values are passed
      to the Receipt page.
    */

    router.replace({
      pathname: "/admin/receipt",
      params: {
        transactionId: "TXN-0043",
        itemName: itemName,
        quantity: String(quantity),
        itemPrice: String(itemPrice),
        total: String(total),
        cash: String(receivedAmount),
        change: String(change),
      },
    });
  };

  return (
    <View style={styles.container}>

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>
            ←
          </Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Payment
        </Text>

      </View>

      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        {/* =================================================
            ORDER SUMMARY
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            ORDER SUMMARY
          </Text>

          <View style={styles.summaryRow}>

            <Text style={styles.itemName}>
              {itemName} × {quantity}
            </Text>

            <Text style={styles.itemPrice}>
              ₱{itemPrice.toFixed(0)}
            </Text>

          </View>

          <View style={styles.dashedLine} />

          <View style={styles.totalRow}>

            <Text style={styles.totalLabel}>
              TOTAL
            </Text>

            <Text style={styles.totalAmount}>
              ₱{total.toFixed(2)}
            </Text>

          </View>

        </View>

        {/* =================================================
            CASH RECEIVED
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            CASH RECEIVED
          </Text>

          <View
            style={[
              styles.cashInputContainer,

              cashReceived.length > 0 &&
                styles.cashInputActive,
            ]}
          >

            <Text style={styles.currency}>
              ₱
            </Text>

            <TextInput
              value={cashReceived}
              onChangeText={setCashReceived}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#8E8E8E"
              style={styles.cashInput}
            />

          </View>

          {/* =================================================
              QUICK AMOUNTS
          ================================================= */}

          <View style={styles.quickAmounts}>

            {/* TOTAL */}

            <Pressable
              style={[
                styles.quickButton,

                isSelected(total) &&
                  styles.quickButtonSelected,
              ]}
              onPress={() =>
                handleQuickAmount(total)
              }
            >

              <Text
                style={[
                  styles.quickButtonText,

                  isSelected(total) &&
                    styles.quickButtonTextSelected,
                ]}
              >
                ₱{total.toFixed(0)}
              </Text>

            </Pressable>

            {/* ₱100 */}

            <Pressable
              style={[
                styles.quickButton,

                isSelected(100) &&
                  styles.quickButtonSelected,
              ]}
              onPress={() =>
                handleQuickAmount(100)
              }
            >

              <Text
                style={[
                  styles.quickButtonText,

                  isSelected(100) &&
                    styles.quickButtonTextSelected,
                ]}
              >
                ₱100
              </Text>

            </Pressable>

            {/* ₱500 */}

            <Pressable
              style={[
                styles.quickButton,

                isSelected(500) &&
                  styles.quickButtonSelected,
              ]}
              onPress={() =>
                handleQuickAmount(500)
              }
            >

              <Text
                style={[
                  styles.quickButtonText,

                  isSelected(500) &&
                    styles.quickButtonTextSelected,
                ]}
              >
                ₱500
              </Text>

            </Pressable>

          </View>

        </View>

        {/* =================================================
            SUKLI / CHANGE
        ================================================= */}

        <View
          style={[
            styles.changeCard,

            /*
              GREEN CARD ONLY
              WHEN THERE IS CHANGE
            */
            change > 0 &&
              styles.changeCardPositive,
          ]}
        >

          <Text style={styles.changeLabel}>
            SUKLI (CHANGE)
          </Text>

          <Text
            style={[
              styles.changeAmount,

              /*
                GREEN AMOUNT ONLY
                WHEN THERE IS CHANGE
              */
              change > 0 &&
                styles.changeAmountPositive,
            ]}
          >
            ₱{change.toFixed(2)}
          </Text>

        </View>

      </ScrollView>

      {/* =================================================
          FOOTER
      ================================================= */}

      <View style={styles.footer}>

        {/* =================================================
            CANCEL
        ================================================= */}

        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </Pressable>

        {/* =================================================
            CONFIRM PAYMENT
        ================================================= */}

        <Pressable
          disabled={!canConfirm}
          style={[
            styles.confirmButton,

            !canConfirm &&
              styles.confirmButtonDisabled,
          ]}
          onPress={
            handleConfirmPayment
          }
        >

          <Text
            style={[
              styles.confirmText,

              !canConfirm &&
                styles.confirmTextDisabled,
            ]}
          >
            ✓ Confirm Payment
          </Text>

        </Pressable>

      </View>

    </View>
  );
}
