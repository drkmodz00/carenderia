import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import * as XLSX from "xlsx";

import { supabase } from "@/lib/supabase";
import AdminBottomNav from "@/components/admin/AdminBottomNav";

import { settingStyles as styles } from "@/styles/admin/settings.styles";
import SaveSuccessModal from "@/components/admin/toast/SaveSuccessToast";

export default function SettingsScreen() {
  const router = useRouter();

  // =========================================================
  // ACCOUNT
  // =========================================================

  const [ownerName, setOwnerName] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================================================
  // TWO-STEP VERIFICATION
  // =========================================================

  const [verificationCode, setVerificationCode] = useState("");
  const [generatingCode, setGeneratingCode] = useState(false);

  // =========================================================
  // BACKUP
  // =========================================================

  const [backingUp, setBackingUp] = useState(false);

  // =========================================================
  // RESET
  // =========================================================

  const [showResetModal, setShowResetModal] = useState(false);

  const [resetPassword, setResetPassword] = useState("");
  const [resetCode, setResetCode] = useState("");

  const [resetError, setResetError] = useState("");
  const [resetting, setResetting] = useState(false);

  // =========================================================
  // SAVE SUCCESS MODAL
  // =========================================================

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // =========================================================
  // LOAD SETTINGS
  // =========================================================

  useEffect(() => {
    loadProfile();
    generateVerificationCode();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      }

      setOwnerName(data?.name ?? "");
    } catch (error) {
      console.error("Failed to load profile:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Unable to load account settings."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SAVE ACCOUNT SETTINGS
  // =========================================================

  const handleSaveAccount = async () => {
    const cleanOwnerName = ownerName.trim();

    if (!cleanOwnerName) {
      Alert.alert("Required", "Please enter the owner name.");
      return;
    }

    // Password validation only if user entered one
    if (newPassword || confirmPassword) {
      if (newPassword.length < 6) {
        Alert.alert(
          "Invalid Password",
          "Password must be at least 6 characters."
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert(
          "Password Mismatch",
          "New password and confirm password do not match."
        );
        return;
      }
    }

    try {
      setSaving(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        router.replace("/login");
        return;
      }


      // =====================================================
      // UPDATE PASSWORD
      // =====================================================

      if (newPassword) {
        const { error: passwordError } =
          await supabase.auth.updateUser({
            password: newPassword,
          });

        if (passwordError) {
          throw passwordError;
        }
      }

      // Clear password fields after success
      setNewPassword("");
      setConfirmPassword("");

      // =====================================================
      // SUCCESS MODAL
      // =====================================================

      setSaveMessage(
        "Your account settings have been updated successfully."
      );

      setShowSaveModal(true);
    } catch (error) {
      console.error(
        "Failed to save account settings:",
        error
      );

      Alert.alert(
        "Save Failed",
        error instanceof Error
          ? error.message
          : "Unable to save account settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // GENERATE VERIFICATION CODE
  // =========================================================

  const generateVerificationCode = () => {
    setGeneratingCode(true);

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setVerificationCode(code);

    setTimeout(() => {
      setGeneratingCode(false);
    }, 300);
  };

  // =========================================================
  // BACKUP DATA
  // =========================================================

const handleBackupData = async () => {
  try {
    setBackingUp(true);

    // =====================================================
    // FETCH DATA FROM SUPABASE
    // =====================================================

    const [
      ordersResult,
      orderItemsResult,
      salesResult,
      menuItemsResult,
    ] = await Promise.all([
      supabase.from("orders").select("*"),
      supabase.from("order_items").select("*"),
      supabase.from("sales").select("*"),
      supabase.from("menu_items").select("*"),
    ]);

    if (ordersResult.error) {
      throw ordersResult.error;
    }

    if (orderItemsResult.error) {
      throw orderItemsResult.error;
    }

    if (salesResult.error) {
      throw salesResult.error;
    }

    if (menuItemsResult.error) {
      throw menuItemsResult.error;
    }

    const orders = ordersResult.data ?? [];
    const orderItems = orderItemsResult.data ?? [];
    const sales = salesResult.data ?? [];
    const menuItems = menuItemsResult.data ?? [];

    // =====================================================
    // CREATE EXCEL WORKBOOK
    // =====================================================

    const workbook = XLSX.utils.book_new();

    // =====================================================
    // ORDERS SHEET
    // =====================================================

    const ordersSheet = XLSX.utils.json_to_sheet(orders);

    XLSX.utils.book_append_sheet(
      workbook,
      ordersSheet,
      "Orders"
    );

    // =====================================================
    // ORDER ITEMS SHEET
    // =====================================================

    const orderItemsSheet =
      XLSX.utils.json_to_sheet(orderItems);

    XLSX.utils.book_append_sheet(
      workbook,
      orderItemsSheet,
      "Order Items"
    );

    // =====================================================
    // SALES SHEET
    // =====================================================

    const salesSheet = XLSX.utils.json_to_sheet(sales);

    XLSX.utils.book_append_sheet(
      workbook,
      salesSheet,
      "Sales"
    );

    // =====================================================
    // MENU ITEMS SHEET
    // =====================================================

    const menuItemsSheet =
      XLSX.utils.json_to_sheet(menuItems);

    XLSX.utils.book_append_sheet(
      workbook,
      menuItemsSheet,
      "Menu Items"
    );

    // =====================================================
    // FILE NAME
    // =====================================================

    const now = new Date();

    const dateString = now
      .toISOString()
      .slice(0, 10);

    const fileName =
      `Carenderia_Backup_${dateString}.xlsx`;

    // =====================================================
    // WEB
    // =====================================================

    if (Platform.OS === "web") {
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      Alert.alert(
        "Backup Successful",
        `${fileName} has been downloaded successfully.`
      );

      return;
    }

    // =====================================================
    // ANDROID / IOS
    // =====================================================

    const base64 = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    // Import native-only modules dynamically.
    // This prevents expo-file-system from being used on web.
    const FileSystem =
      await import("expo-file-system/legacy");

    const Sharing =
      await import("expo-sharing");

    const fileUri =
      `${FileSystem.cacheDirectory}${fileName}`;

    // Write XLSX to temporary native storage
    await FileSystem.writeAsStringAsync(
      fileUri,
      base64,
      {
        encoding:
          FileSystem.EncodingType.Base64,
      }
    );

    // =====================================================
    // SHARE FILE
    // =====================================================

    const canShare =
      await Sharing.isAvailableAsync();

    if (canShare) {
      await Sharing.shareAsync(
        fileUri,
        {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          dialogTitle:
            "Export Carenderia Backup",
          UTI:
            "org.openxmlformats.spreadsheetml.sheet",
        }
      );
    } else {
      Alert.alert(
        "Backup Created",
        `${fileName} was created successfully.`
      );
    }
  } catch (error) {
    console.error(
      "Excel backup failed:",
      error
    );

    Alert.alert(
      "Backup Failed",
      error instanceof Error
        ? error.message
        : "Unable to create Excel backup."
    );
  } finally {
    setBackingUp(false);
  }
};
  // =========================================================
  // OPEN RESET MODAL
  // =========================================================

  const openResetModal = () => {
    setResetPassword("");
    setResetCode("");
    setResetError("");
    setShowResetModal(true);
  };

  // =========================================================
  // CLOSE RESET MODAL
  // =========================================================

  const closeResetModal = () => {
    if (resetting) return;

    setShowResetModal(false);
    setResetPassword("");
    setResetCode("");
    setResetError("");
  };

  // =========================================================
  // RESET SYSTEM DATA
  // =========================================================

  const handleResetSystem = async () => {
    setResetError("");

    if (!resetPassword.trim()) {
      setResetError("Please enter your account password.");
      return;
    }

    if (resetCode.trim().length !== 6) {
      setResetError("Please enter the 6-digit verification code.");
      return;
    }

    if (resetCode.trim() !== verificationCode) {
      setResetError("The verification code is incorrect.");
      return;
    }

    try {
      setResetting(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user?.email) {
        throw new Error(
          "Unable to verify the current account."
        );
      }

      // =====================================================
      // VERIFY PASSWORD
      // =====================================================

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: user.email,
          password: resetPassword,
        });

      if (loginError) {
        setResetError("Incorrect account password.");
        return;
      }

      // =====================================================
      // DELETE ORDER ITEMS
      // =====================================================

      const { error: resetError } =
        await supabase.rpc("reset_system_data");

      if (resetError) {
        throw resetError;
      }

      // =====================================================
      // RESET UI
      // =====================================================

      setResetPassword("");
      setResetCode("");
      setResetError("");
      setShowResetModal(false);

      // Generate a new verification code after reset
      generateVerificationCode();

      Alert.alert(
        "System Reset",
        "All order, order item, and sales records have been deleted successfully."
      );
    } catch (error) {
      console.error(
        "System reset failed:",
        error
      );

      setResetError(
        error instanceof Error
          ? error.message
          : "Unable to reset system data."
      );
    } finally {
      setResetting(false);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      Alert.alert(
        "Logout Failed",
        error instanceof Error
          ? error.message
          : "Unable to log out."
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#f28a00"
        />

        <Text style={styles.loadingText}>
          Loading settings...
        </Text>
      </View>
    );
  }

  // =========================================================
  // SCREEN
  // =========================================================

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <View style={styles.header}>
          <Text style={styles.pageTitle}>
            Settings
          </Text>

          <Text style={styles.pageSubtitle}>
            Manage your account, owner information, and
            system data.
          </Text>
        </View>

        {/* ===================================================
            ACCOUNT & SECURITY
        =================================================== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="person"
                size={23}
                color="#f28a00"
              />
            </View>

            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>
                Account & Security
              </Text>

              <Text style={styles.cardDescription}>
                Update your account information and password.
              </Text>
            </View>
          </View>

          <View style={styles.formGrid}>
            {/* USERNAME */}

            {/* OWNER NAME */}

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

            {/* NEW PASSWORD */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                New Password
              </Text>

              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Leave blank to keep current"
                placeholderTextColor="#aaa"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* CONFIRM PASSWORD */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Confirm Password
              </Text>

              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#aaa"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <Pressable
            style={[
              styles.primaryButton,
              saving && styles.disabledButton,
            ]}
            onPress={handleSaveAccount}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator
                size="small"
                color="#ffffff"
              />
            ) : (
              <Text style={styles.primaryButtonText}>
                Save Account Settings
              </Text>
            )}
          </Pressable>
        </View>

        {/* ===================================================
            TWO-STEP VERIFICATION
        =================================================== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="security"
                size={23}
                color="#f28a00"
              />
            </View>

            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>
                Two-Step Verification
              </Text>

              <Text style={styles.cardDescription}>
                Use a verification code for sensitive system
                actions.
              </Text>
            </View>
          </View>

          {/* STATUS */}

          <View style={styles.twoFactorStatus}>
            <Text style={styles.enabledDot}>
              ●
            </Text>

            <Text style={styles.enabledText}>
              Ready
            </Text>

            <Text style={styles.statusDescription}>
              Verification is available on this device.
            </Text>
          </View>

          {/* CODE */}

          <View style={styles.setupBox}>
            <Text style={styles.setupTitle}>
              Verification Code
            </Text>

            <Text style={styles.setupDescription}>
              This code is generated locally and is required
              for sensitive system actions such as resetting
              system data.
            </Text>

            <View style={styles.codeRow}>
              <View style={styles.codeBox}>
                {generatingCode ? (
                  <ActivityIndicator
                    size="small"
                    color="#f28a00"
                  />
                ) : (
                  <Text style={styles.codeText}>
                    {verificationCode || "------"}
                  </Text>
                )}
              </View>

              <Pressable
                style={styles.secondaryButton}
                onPress={generateVerificationCode}
                disabled={generatingCode}
              >
                <Text style={styles.secondaryButtonText}>
                  Generate New Code
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ===================================================
            BACKUP DATA
        =================================================== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="backup"
                size={23}
                color="#f28a00"
              />
            </View>

            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>
                Backup Data
              </Text>

              <Text style={styles.cardDescription}>
                Create a backup of your current system data.
              </Text>
            </View>
          </View>

          <Pressable
            style={[
              styles.secondaryButton,
              backingUp && styles.disabledButton,
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
              <Text style={styles.secondaryButtonText}>
                Backup Data
              </Text>
            )}
          </Pressable>
        </View>

        {/* ===================================================
            RESET SYSTEM DATA
        =================================================== */}

        <View style={[styles.card, styles.dangerCard]}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconBox,
                styles.dangerIconBox,
              ]}
            >
              <MaterialIcons
                name="warning"
                size={23}
                color="#c9362b"
              />
            </View>

            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>
                Reset System Data
              </Text>

              <Text style={styles.cardDescription}>
                Permanently remove order and sales records
                from the system.
              </Text>
            </View>
          </View>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              Warning:
            </Text>

            <Text style={styles.warningDescription}>
              This action cannot be undone. Make sure you
              have a backup before continuing.
            </Text>
          </View>

          <Pressable
            style={styles.dangerButton}
            onPress={openResetModal}
          >
            <Text style={styles.dangerButtonText}>
              Reset System Data
            </Text>
          </Pressable>
        </View>

        {/* ===================================================
            LOGOUT
        =================================================== */}

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>

        <Text style={styles.version}>
          Carenderia POS • Admin Settings
        </Text>
      </ScrollView>

      {/* =====================================================
          SAVE SUCCESS MODAL
      ===================================================== */}

      <SaveSuccessModal
        visible={showSaveModal}
        message={saveMessage}
        onClose={() => setShowSaveModal(false)}
      />

      {/* =====================================================
          RESET MODAL
      ===================================================== */}

      <Modal
        visible={showResetModal}
        transparent
        animationType="fade"
        onRequestClose={closeResetModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* TITLE */}

            <Text style={styles.modalTitle}>
              Reset System Data
            </Text>

            <Text style={styles.modalDescription}>
              This action will permanently delete all order,
              order item, and sales records. This cannot be
              undone.
            </Text>

            {/* AUTH NOTE */}

            <View style={styles.authNote}>
              <Text style={styles.authNoteTitle}>
                Verification Required
              </Text>

              <Text style={styles.authNoteText}>
                Enter your account password and the current
                6-digit verification code to continue.
              </Text>
            </View>

            {/* PASSWORD */}

            <View style={styles.modalInputGroup}>
              <Text style={styles.label}>
                Account Password
              </Text>

              <TextInput
                style={styles.input}
                value={resetPassword}
                onChangeText={setResetPassword}
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!resetting}
              />
            </View>

            {/* VERIFICATION CODE */}

            <View style={styles.modalInputGroup}>
              <Text style={styles.label}>
                Verification Code
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.verificationInput,
                ]}
                value={resetCode}
                onChangeText={(text) => {
                  setResetCode(
                    text
                      .replace(/[^0-9]/g, "")
                      .slice(0, 6)
                  );

                  setResetError("");
                }}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
                maxLength={6}
                editable={!resetting}
              />
            </View>

            {/* ERROR */}

            {resetError ? (
              <Text style={styles.errorText}>
                {resetError}
              </Text>
            ) : null}

            {/* BUTTONS */}

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={closeResetModal}
                disabled={resetting}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.dangerButton,
                  styles.verifyButton,
                  resetting && styles.disabledButton,
                ]}
                onPress={handleResetSystem}
                disabled={resetting}
              >
                {resetting ? (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                  />
                ) : (
                  <Text style={styles.dangerButtonText}>
                    Confirm Reset
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <AdminBottomNav />
    </View>
  );
}