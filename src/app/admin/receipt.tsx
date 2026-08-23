import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { receiptStyles as styles } from "@/styles/admin/receipt.styles";

export default function ReceiptPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const transactionId = String(
    params.transactionId ?? "TXN-0043"
  );

  const itemName = String(
    params.itemName ?? "Buko Juice"
  );

  const quantity = Number(
    params.quantity ?? 1
  );

  const itemPrice = Number(
    params.itemPrice ?? 30
  );

  const subtotal = Number(
    params.total ?? itemPrice * quantity
  );

  const cash = Number(
    params.cash ?? 50
  );

  const change = Math.max(
    cash - subtotal,
    0
  );

  const transactionDate = new Date();

  const formattedDate =
    transactionDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );

  const formattedTime =
    transactionDate.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );

  const handlePrint = () => {
    Alert.alert(
      "Print Receipt",
      "Ready to print receipt."
    );
  };

  const handleNewOrder = () => {
    router.replace("/admin/orders");
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Receipt
        </Text>
      </View>

      {/* RECEIPT CONTENT */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.receiptCard}>

          {/* ORANGE STORE HEADER */}
          <View style={styles.storeHeader}>

            <Text style={styles.logo}>
              🍽️
            </Text>

            <Text style={styles.storeName}>
              Carenderia ni Aling Rosa
            </Text>

            <Text style={styles.storeInfo}>
              123 Rizal St., Marikina City
            </Text>

            <Text style={styles.storeInfo}>
              Tel: 0917-XXX-XXXX
            </Text>

          </View>

          {/* RECEIPT BODY */}
          <View style={styles.receiptBody}>

            {/* TRANSACTION */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Transaksyon
              </Text>

              <Text style={styles.infoValue}>
                {transactionId}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Petsa/Oras
              </Text>

              <Text style={styles.infoValue}>
                {formattedDate} {formattedTime}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* ITEMS */}
            <Text style={styles.orderTitle}>
              MGA INORDER:
            </Text>

            <View style={styles.itemRow}>

              <View style={styles.itemLeft}>
                <Text style={styles.itemName}>
                  {itemName}
                </Text>

                <Text style={styles.itemDetails}>
                  ₱{itemPrice.toFixed(0)} × {quantity}
                </Text>
              </View>

              <Text style={styles.itemPrice}>
                ₱{(itemPrice * quantity).toFixed(0)}
              </Text>

            </View>

            <View style={styles.divider} />

            {/* SUBTOTAL */}
            <View style={styles.totalRow}>
              <Text style={styles.subtotalLabel}>
                Subtotal
              </Text>

              <Text style={styles.subtotalValue}>
                ₱{subtotal.toFixed(2)}
              </Text>
            </View>

            {/* CASH */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Cash
              </Text>

              <Text style={styles.totalValue}>
                ₱{cash.toFixed(2)}
              </Text>
            </View>

            {/* CHANGE */}
            <View style={styles.changeRow}>

              <Text style={styles.changeLabel}>
                SUKLI
              </Text>

              <Text style={styles.changeValue}>
                ₱{change.toFixed(2)}
              </Text>

            </View>

            <View style={styles.divider} />

            {/* THANK YOU */}
            <Text style={styles.thankYou}>
              Salamat sa inyong pagbili! 🙏
            </Text>

            <Text style={styles.thankYouSub}>
              Balik-balikan po kayo.
            </Text>

          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>

        <Pressable
          style={styles.printButton}
          onPress={handlePrint}
        >
          <Text style={styles.printIcon}>▣</Text>
          <Text style={styles.printText}>
            Print
          </Text>
        </Pressable>

        <Pressable
          style={styles.newOrderButton}
          onPress={handleNewOrder}
        >
          <Text style={styles.newOrderText}>
            Bagong Order →
          </Text>
        </Pressable>

      </View>

    </View>
  );
}