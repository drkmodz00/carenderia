import React from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { settingStyles as styles } from "@/styles/admin/settings.styles";

export default function AccountSettings(props: any) {
  const {
  ownerName,
  setOwnerName,
  role,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword
  } = props;

  return (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="person"
                size={23}
                color="#f28a00"
              />
            </View>

            <View
              style={styles.cardHeaderText}
            >
              <Text style={styles.cardTitle}>
                Account & Security
              </Text>

              <Text
                style={styles.cardDescription}
              >
                Update your account information and password.
              </Text>
            </View>
          </View>

          <View style={styles.formGrid}>
            {/* OWNER */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Owner Name
              </Text>

              <TextInput
                style={styles.input}
                value={ownerName}
                onChangeText={setOwnerName}
                placeholder="Enter owner name"
                placeholderTextColor="#aaa"
              />
            </View>

            {/* ROLE */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Role
              </Text>

              <View
                style={[
                  styles.input,
                  {
                    justifyContent:
                      "center",
                  },
                ]}
              >
                <Text
                  style={{
                    color: "#423b35",
                    fontWeight: "600",
                  }}
                >
                  {role
                    .charAt(0)
                    .toUpperCase() +
                    role.slice(1)}
                </Text>
              </View>
            </View>

            {/* PASSWORD */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                New Password
              </Text>

              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={
                  setNewPassword
                }
                placeholder="Leave blank to keep current"
                placeholderTextColor="#aaa"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* CONFIRM */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Confirm Password
              </Text>

              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={
                  setConfirmPassword
                }
                placeholder="Confirm new password"
                placeholderTextColor="#aaa"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </View>

  );
}
