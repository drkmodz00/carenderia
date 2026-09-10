import React from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { settingStyles as styles } from "@/styles/admin/settings.styles";

export default function SystemStatus(props: any) {
  const {
  isOnline,
  pendingSync,
  lastSync,
  syncing,
  handleSync
  } = props;

  return (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="sync"
                size={23}
                color="#f28a00"
              />
            </View>

            <View
              style={styles.cardHeaderText}
            >
              <Text style={styles.cardTitle}>
                System Status
              </Text>

              <Text
                style={styles.cardDescription}
              >
                Monitor connectivity and synchronization.
              </Text>
            </View>
          </View>

          {/* INTERNET */}

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>
              Internet
            </Text>

            <Text
              style={
                isOnline
                  ? styles.onlineStatus
                  : styles.offlineStatus
              }
            >
              ● {isOnline
                ? "Online"
                : "Offline"}
            </Text>
          </View>

          {/* LOCAL DB */}

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>
              Local Database
            </Text>

            <Text style={styles.onlineStatus}>
              ● Ready
            </Text>
          </View>

          {/* SUPABASE */}

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>
              Supabase
            </Text>

            <Text
              style={
                isOnline
                  ? styles.onlineStatus
                  : styles.offlineStatus
              }
            >
              ● {isOnline
                ? "Connected"
                : "Unavailable"}
            </Text>
          </View>

          {/* PENDING */}

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>
              Pending Sync
            </Text>

            <Text style={styles.statusValue}>
              {pendingSync} records
            </Text>
          </View>

          {/* LAST SYNC */}

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>
              Last Sync
            </Text>

            <Text style={styles.statusValue}>
              {lastSync || "Never"}
            </Text>
          </View>

          <Pressable
            style={[
              styles.secondaryButton,
              syncing &&
                styles.disabledButton,
            ]}
            onPress={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <ActivityIndicator
                size="small"
                color="#423b35"
              />
            ) : (
              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                Sync Now
              </Text>
            )}
          </Pressable>
        </View>

  );
}
