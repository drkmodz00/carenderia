import React from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { settingStyles as styles } from "@/styles/admin/settings.styles";

export default function BackupSettings(props: any) {
  const {
  backingUp,
  handleBackupData,
  handleRestoreData
  } = props;

  return (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="backup"
                size={23}
                color="#f28a00"
              />
            </View>

            <View
              style={styles.cardHeaderText}
            >
              <Text style={styles.cardTitle}>
                Backup Data
              </Text>

              <Text
                style={styles.cardDescription}
              >
                Export your current system data to an Excel
                workbook.
              </Text>
            </View>
          </View>

          <Pressable
            style={[
              styles.secondaryButton,
              backingUp &&
                styles.disabledButton,
            ]}
            onPress={handleBackupData}
            disabled={backingUp}
          >
            {backingUp ? (
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
                Backup Data
              </Text>
            )}
          </Pressable>

          <Pressable
            style={[
              styles.secondaryButton,
              backingUp &&
                styles.disabledButton,
            ]}
            onPress={handleRestoreData}
            disabled={backingUp}
          >
            {backingUp ? (
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
                Restore Data
              </Text>
            )}
          </Pressable>
        </View>

  );
}
