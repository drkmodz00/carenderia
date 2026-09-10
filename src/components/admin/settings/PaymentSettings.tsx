import type {
  Dispatch,
  SetStateAction,
} from "react";

import {
  Pressable,
  Text,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import {
  settingStyles as styles,
} from "@/styles/admin/settings.styles";

type Props = {
  cashEnabled: boolean;
  setCashEnabled: Dispatch<
    SetStateAction<boolean>
  >;

  gcashEnabled: boolean;
  setGcashEnabled: Dispatch<
    SetStateAction<boolean>
  >;

  onManageGCash: () => void;
};

export default function PaymentSettings({
  cashEnabled,
  setCashEnabled,
  gcashEnabled,
  setGcashEnabled,
  onManageGCash,
}: Props) {
  return (
    <View style={styles.card}>
      {/* =========================================================
          HEADER
          ========================================================= */}
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <MaterialIcons
            name="payments"
            size={23}
            color="#f28a00"
          />
        </View>

        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>
            Payment Settings
          </Text>

          <Text style={styles.cardDescription}>
            Configure the payment methods available at checkout.
          </Text>
        </View>
      </View>

      {/* =========================================================
          CASH
          ========================================================= */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>
            Cash Payment
          </Text>

          <Text style={styles.settingDescription}>
            Allow customers to pay using cash.
          </Text>
        </View>

        <Pressable
          style={[
            styles.switch,
            cashEnabled &&
              styles.switchActive,
          ]}
          onPress={() =>
            setCashEnabled(
              (current) => !current
            )
          }
        >
          <View
            style={[
              styles.switchThumb,
              cashEnabled &&
                styles.switchThumbActive,
            ]}
          />
        </Pressable>
      </View>

      {/* =========================================================
          GCASH
          ========================================================= */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>
            GCash Payment
          </Text>

          <Text style={styles.settingDescription}>
            Allow customers to pay using GCash.
          </Text>
        </View>

        <Pressable
          style={[
            styles.switch,
            gcashEnabled &&
              styles.switchActive,
          ]}
          onPress={() =>
            setGcashEnabled(
              (current) => !current
            )
          }
        >
          <View
            style={[
              styles.switchThumb,
              gcashEnabled &&
                styles.switchThumbActive,
            ]}
          />
        </Pressable>
      </View>

      {/* =========================================================
          GCASH MANAGEMENT
          ========================================================= */}
      <View style={styles.printerActions}>
        <Pressable
          style={styles.secondaryButton}
          onPress={onManageGCash}
        >
          <MaterialIcons
            name="account-balance-wallet"
            size={19}
            color="#f28a00"
          />

          <Text style={styles.secondaryButtonText}>
            Manage GCash
          </Text>
        </Pressable>
      </View>
    </View>
  );
}