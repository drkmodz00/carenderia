import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { settingStyles as styles } from "@/styles/admin/settings.styles";

type ToastType = "success" | "error";

export default function Settings() {
  /* =========================================================
     BUSINESS INFORMATION
  ========================================================= */

  const [carinderiaName, setCarinderiaName] = useState(
    "Aling Nena's Carinderia"
  );

  const [address, setAddress] = useState(
    "123 Rizal St., Sta. Rosa, Laguna"
  );

  const [contactNumber, setContactNumber] =
    useState("0917-123-4567");

  const [currency] = useState("PHP (₱)");

  /* =========================================================
     ADMIN ACCOUNT
  ========================================================= */

  const [username, setUsername] = useState("admin");

  const [newPassword, setNewPassword] = useState("");

  /* =========================================================
     TOAST
  ========================================================= */

  const [toastVisible, setToastVisible] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<ToastType>("success");

  const toastOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const toastTranslateY = useRef(
    new Animated.Value(-20)
  ).current;

  const toastTimer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  /* =========================================================
     SHOW TOAST
  ========================================================= */

  const showToast = (
    message: string,
    type: ToastType = "success"
  ) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);

    toastOpacity.setValue(0);
    toastTranslateY.setValue(-20);

    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    toastTimer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),

        Animated.timing(toastTranslateY, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setToastVisible(false);
      });
    }, 3000);
  };

  /* =========================================================
     CLEANUP TOAST TIMER
  ========================================================= */

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  /* =========================================================
     SAVE CHANGES
  ========================================================= */

  const handleSaveChanges = () => {
    // Frontend only for now.
    // Later this will save to your backend/database.

    showToast(
      "Business information saved successfully.",
      "success"
    );
  };

  /* =========================================================
     CHANGE PASSWORD
  ========================================================= */

  const handleChangePassword = () => {
    if (!newPassword.trim()) {
      showToast(
        "Please enter a new password.",
        "error"
      );

      return;
    }

    if (newPassword.length < 6) {
      showToast(
        "Password must be at least 6 characters.",
        "error"
      );

      return;
    }

    // Frontend only for now.
    // Later this will update the authenticated user.

    setNewPassword("");

    showToast(
      "Password changed successfully.",
      "success"
    );
  };

  /* =========================================================
     BACKUP DATA
  ========================================================= */

  const handleBackupData = () => {
    showToast(
      "Backup feature is not connected yet.",
      "success"
    );
  };

  /* =========================================================
     RESTORE DATA
  ========================================================= */

  const handleRestoreData = () => {
    showToast(
      "Restore feature is not connected yet.",
      "success"
    );
  };

  /* =========================================================
     CLEAR ORDERS
  ========================================================= */

  const handleClearOrders = () => {
    showToast(
      "Clear orders feature is not connected yet.",
      "error"
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <View style={styles.page}>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <AdminSidebar />

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toastVisible && (
        <Animated.View
          style={[
            styles.toast,
            toastType === "success"
              ? styles.toastSuccess
              : styles.toastError,
            {
              opacity: toastOpacity,
              transform: [
                {
                  translateY: toastTranslateY,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.toastIcon,
              toastType === "success"
                ? styles.toastIconSuccess
                : styles.toastIconError,
            ]}
          >
            <Text style={styles.toastIconText}>
              {toastType === "success"
                ? "✓"
                : "!"}
            </Text>
          </View>

          <View style={styles.toastContent}>
            <Text style={styles.toastTitle}>
              {toastType === "success"
                ? "Success"
                : "Something went wrong"}
            </Text>

            <Text style={styles.toastMessage}>
              {toastMessage}
            </Text>
          </View>
        </Animated.View>
      )}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Settings
          </Text>

          <Text style={styles.subtitle}>
            Manage your carinderia information and preferences
          </Text>
        </View>

        {/* ===================================================
            COLUMNS
        =================================================== */}

        <View style={styles.columns}>

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <View style={styles.leftColumn}>

            <View style={styles.card}>

              <Text style={styles.cardTitle}>
                Business Information
              </Text>

              {/* CARINDERIA NAME */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  CARINDERIA NAME
                </Text>

                <TextInput
                  value={carinderiaName}
                  onChangeText={setCarinderiaName}
                  style={styles.input}
                  placeholder="Enter carinderia name"
                  placeholderTextColor="#A98F79"
                />
              </View>

              {/* ADDRESS */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  ADDRESS
                </Text>

                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  style={styles.input}
                  placeholder="Enter address"
                  placeholderTextColor="#A98F79"
                />
              </View>

              {/* CONTACT NUMBER */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  CONTACT NUMBER
                </Text>

                <TextInput
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  style={styles.input}
                  placeholder="Enter contact number"
                  placeholderTextColor="#A98F79"
                  keyboardType="phone-pad"
                />
              </View>

              {/* CURRENCY */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  CURRENCY
                </Text>

                <View style={styles.disabledInput}>
                  <Text style={styles.disabledInputText}>
                    {currency}
                  </Text>
                </View>
              </View>

              {/* SAVE */}

              <Pressable
                style={styles.primaryButton}
                onPress={handleSaveChanges}
              >
                <Text style={styles.primaryButtonText}>
                  Save Changes
                </Text>
              </Pressable>

            </View>

          </View>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <View style={styles.rightColumn}>

            {/* =================================================
                ADMIN ACCOUNT
            ================================================= */}

            <View style={styles.card}>

              <Text style={styles.cardTitle}>
                Admin Account
              </Text>

              {/* USERNAME */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  USERNAME
                </Text>

                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  placeholder="Enter username"
                  placeholderTextColor="#A98F79"
                  autoCapitalize="none"
                />
              </View>

              {/* NEW PASSWORD */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  NEW PASSWORD
                </Text>

                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <Pressable
                style={styles.primaryButton}
                onPress={handleChangePassword}
              >
                <Text style={styles.primaryButtonText}>
                  Change Password
                </Text>
              </Pressable>

            </View>

            {/* =================================================
                DATA MANAGEMENT
            ================================================= */}

            <View style={styles.card}>

              <Text style={styles.cardTitle}>
                Data Management
              </Text>

              <Pressable
                style={styles.managementButton}
                onPress={handleBackupData}
              >
                <Text style={styles.managementIcon}>
                  📥
                </Text>

                <Text style={styles.managementText}>
                  Backup Data
                </Text>
              </Pressable>

              <Pressable
                style={styles.managementButton}
                onPress={handleRestoreData}
              >
                <Text style={styles.managementIcon}>
                  📤
                </Text>

                <Text style={styles.managementText}>
                  Restore Data
                </Text>
              </Pressable>

              <Pressable
                style={styles.dangerButton}
                onPress={handleClearOrders}
              >
                <Text style={styles.dangerIcon}>
                  🗑
                </Text>

                <Text style={styles.dangerText}>
                  Clear All Orders
                </Text>
              </Pressable>

            </View>

            {/* =================================================
                SYSTEM VERSION
            ================================================= */}

            <View style={styles.versionCard}>

              <Text style={styles.versionTitle}>
                System Version
              </Text>

              <Text style={styles.versionName}>
                Carinderia Management System v1.0
              </Text>

              <Text style={styles.versionDate}>
                Last updated: Aug 18, 2026
              </Text>

            </View>

          </View>

        </View>

      </ScrollView>
    </View>
  );
}