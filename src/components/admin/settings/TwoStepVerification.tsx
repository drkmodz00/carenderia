import React from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { settingStyles as styles } from "@/styles/admin/settings.styles";

export default function TwoStepVerification(props: any) {
  const {
  generatingCode,
  verificationCode,
  generateVerificationCode
  } = props;

  return (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="security"
                size={23}
                color="#f28a00"
              />
            </View>

            <View
              style={styles.cardHeaderText}
            >
              <Text style={styles.cardTitle}>
                Two-Step Verification
              </Text>

              <Text
                style={styles.cardDescription}
              >
                Use a verification code for sensitive system
                actions.
              </Text>
            </View>
          </View>

          <View style={styles.twoFactorStatus}>
            <Text style={styles.enabledDot}>
              ●
            </Text>

            <Text style={styles.enabledText}>
              Ready
            </Text>

            <Text
              style={styles.statusDescription}
            >
              Verification is available on this
              device.
            </Text>
          </View>

          <View style={styles.setupBox}>
            <Text style={styles.setupTitle}>
              Verification Code
            </Text>

            <Text
              style={styles.setupDescription}
            >
              This code is generated locally and is
              required for sensitive system actions such
              as resetting system data.
            </Text>

            <View style={styles.codeRow}>
              <View style={styles.codeBox}>
                {generatingCode ? (
                  <ActivityIndicator
                    size="small"
                    color="#f28a00"
                  />
                ) : (
                  <Text
                    style={styles.codeText}
                  >
                    {verificationCode ||
                      "------"}
                  </Text>
                )}
              </View>

              <Pressable
                style={
                  styles.secondaryButton
                }
                onPress={
                  generateVerificationCode
                }
                disabled={
                  generatingCode
                }
              >
                <Text
                  style={
                    styles.secondaryButtonText
                  }
                >
                  Generate New Code
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

  );
}
