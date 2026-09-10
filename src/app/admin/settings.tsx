import { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import NetInfo from "@react-native-community/netinfo";

import { supabase } from "@/lib/supabase";
import { backupData } from "@/lib/backup/backupService";
import { restoreData } from "@/lib/backup/restoreService";

import AdminBottomNav from "@/components/admin/AdminBottomNav";
import PrinterSettings from "@/components/admin/settings/PrinterSettings";
import AccountSettings from "@/components/admin/settings/AccountSettings";
import TwoStepVerification from "@/components/admin/settings/TwoStepVerification";
import BackupSettings from "@/components/admin/settings/BackupSettings";
import ResetSystemCard from "@/components/admin/settings/ResetSystemCard";
import SaveSuccessModal from "@/components/admin/toast/SaveSuccessToast";

import { settingStyles as styles } from "@/styles/admin/settings.styles";

// =====================================================
// CARD WRAPPER
// =====================================================

function SettingsCard({
  icon,
  title,
  description,
  danger,
  children,
}: {
  icon: string;
  title: string;
  description?: string;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={[styles.card, danger && styles.dangerCard]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, danger && styles.dangerIconBox]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>

        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{title}</Text>

          {description ? (
            <Text style={styles.cardDescription}>{description}</Text>
          ) : null}
        </View>
      </View>

      {children}
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();

  // =====================================================
  // PRINTER
  // =====================================================

  const [printerEnabled, setPrinterEnabled] = useState(false);
  const [autoPrintReceipt, setAutoPrintReceipt] = useState(true);
  const [printerName, setPrinterName] = useState("");
  const [printerAddress, setPrinterAddress] = useState("");
  const [paperSize, setPaperSize] = useState<"58mm" | "80mm">("58mm");
  const [printerTesting, setPrinterTesting] = useState(false);

  // =====================================================
  // ACCOUNT
  // =====================================================

  const [ownerName, setOwnerName] = useState("");
  const [role, setRole] = useState("admin");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =====================================================
  // TWO-STEP VERIFICATION
  // =====================================================

  const [verificationCode, setVerificationCode] = useState("");
  const [generatingCode, setGeneratingCode] = useState(false);

  // =====================================================
  // BACKUP
  // =====================================================

  const [backingUp, setBackingUp] = useState(false);
  const [restoring, setRestoring] = useState(false);

  // =====================================================
  // RESET
  // =====================================================

  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetting, setResetting] = useState(false);

  // =====================================================
  // SAVE
  // =====================================================

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState(
    "Settings saved successfully.",
  );

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(true);

  // Prevent multiple automatic sync calls
  const syncingRef = useRef(false);

  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  const loadSettings = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Load authenticated user error:", userError);
      }

      if (user) {
        const metadata = user.user_metadata ?? {};

        setOwnerName(metadata.owner_name || metadata.full_name || "");
        setRole(metadata.role || "admin");
      }

      const { data, error } = await supabase
        .from("restaurant_settings")
        .select(
          `
            printer_enabled,
            printer_name,
            printer_address,
            printer_type,
            printer_paper_width
          `,
        )
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Load printer settings error:", error);
        return;
      }

      if (!data) {
        return;
      }

      setPrinterEnabled(data.printer_enabled ?? false);
      setPrinterName(data.printer_name || "");
      setPrinterAddress(data.printer_address || "");
      setPaperSize(data.printer_paper_width === 80 ? "80mm" : "58mm");
      setAutoPrintReceipt(true);
    } catch (error) {
      console.error("Load settings failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VERIFICATION CODE
  // =====================================================

  const generateVerificationCode = () => {
    setGeneratingCode(true);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    setVerificationCode(code);

    setTimeout(() => {
      setGeneratingCode(false);
    }, 300);
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSaveSettings = async () => {
    try {
      if (newPassword && newPassword !== confirmPassword) {
        Alert.alert("Password Error", "Passwords do not match.");
        return;
      }

      if (newPassword && newPassword.length < 6) {
        Alert.alert(
          "Password Error",
          "Password must be at least 6 characters.",
        );
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        Alert.alert("Error", "No authenticated user found.");
        return;
      }

      const currentOwnerName =
        user.user_metadata?.owner_name || user.user_metadata?.full_name || "";

      if (ownerName.trim() !== currentOwnerName.trim()) {
        const { error } = await supabase.auth.updateUser({
          data: {
            owner_name: ownerName.trim(),
          },
        });

        if (error) {
          console.error("Account metadata update error:", error);
          Alert.alert("Account Update Failed", error.message);
          return;
        }
      }

      if (newPassword) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          console.error("Password update error:", error);
          Alert.alert("Password Update Failed", error.message);
          return;
        }
      }

      const { data: existingSettings, error: findError } = await supabase
        .from("restaurant_settings")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (findError) {
        console.error("Find settings error:", findError);
        Alert.alert("Save Failed", findError.message);
        return;
      }

      const settingsPayload = {
        printer_enabled: printerEnabled,
        printer_name: printerName.trim() || null,
        printer_address: printerAddress.trim() || null,
        printer_type: "bluetooth",
        printer_paper_width: paperSize === "80mm" ? 80 : 58,
        updated_at: new Date().toISOString(),
      };

      let settingsError = null;

      if (existingSettings?.id) {
        const { error } = await supabase
          .from("restaurant_settings")
          .update(settingsPayload)
          .eq("id", existingSettings.id);

        settingsError = error;
      } else {
        const { error } = await supabase.from("restaurant_settings").insert({
          ...settingsPayload,
          name: "Carenderia",
        });

        settingsError = error;
      }

      if (settingsError) {
        console.error("Settings update error:", settingsError);
        Alert.alert("Save Failed", settingsError.message);
        return;
      }

      setNewPassword("");
      setConfirmPassword("");

      setSaveMessage("Settings saved.");
      setShowSaveModal(true);
    } catch (error) {
      console.error("Save settings failed:", error);
      Alert.alert("Error", "Failed to save settings.");
    }
  };

  // =====================================================
  // BLUETOOTH PRINTER
  // =====================================================

  const handleSelectPrinter = () => {
    Alert.alert(
      "Bluetooth Printer",
      "Printer selection will connect to the Bluetooth ESC/POS printer service.",
    );
  };

  const handleTestPrint = async () => {
    try {
      setPrinterTesting(true);

      if (!printerEnabled) {
        Alert.alert("Printer Disabled", "Enable the printer first.");
        return;
      }

      if (!printerAddress) {
        Alert.alert("No Printer", "Select a Bluetooth printer first.");
        return;
      }

      Alert.alert("Test Print", "Printer service is not connected yet.");
    } finally {
      setPrinterTesting(false);
    }
  };

  // =====================================================
  // AUTOMATIC SYNC
  // =====================================================

  const syncAutomatically = async () => {
    if (syncingRef.current) {
      return;
    }

    syncingRef.current = true;

    try {
      console.log("Internet available. Starting automatic sync...");

      /*
       * Add your actual sync function here.
       *
       * Example:
       *
       * await syncData();
       *
       * The previous manual Sync Now button has been
       * completely removed from the UI.
       */

      console.log("Automatic sync complete.");
    } catch (error) {
      console.error("Automatic sync failed:", error);
    } finally {
      syncingRef.current = false;
    }
  };

  // =====================================================
  // BACKUP
  // =====================================================

  const handleBackupData = async () => {
    try {
      setBackingUp(true);

      await backupData();

      Alert.alert("Backup Complete", "Your data was exported successfully.");
    } catch (error) {
      console.error("Backup failed:", error);

      Alert.alert("Backup Failed", "Unable to create the backup.");
    } finally {
      setBackingUp(false);
    }
  };

  // =====================================================
  // RESTORE
  // =====================================================

  const handleRestoreData = async () => {
    try {
      setRestoring(true);

      await restoreData();

      Alert.alert("Restore Complete", "Your backup was restored successfully.");
    } catch (error) {
      console.error("Restore failed:", error);

      Alert.alert("Restore Failed", "Unable to restore the backup.");
    } finally {
      setRestoring(false);
    }
  };

  // =====================================================
  // RESET MODAL
  // =====================================================

  const openResetModal = () => {
    setResetPassword("");
    setResetCode("");
    setResetError("");
    setResetModalVisible(true);
  };

  // =====================================================
  // RESET SYSTEM
  // =====================================================

  const handleResetSystem = async () => {
    try {
      setResetError("");

      if (!resetPassword) {
        setResetError("Enter your password.");
        return;
      }

      if (resetCode !== verificationCode) {
        setResetError("Invalid verification code.");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setResetError("No authenticated account.");
        return;
      }

      setResetting(true);

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: resetPassword,
      });

      if (signInError) {
        setResetError("Incorrect password.");
        return;
      }

      const { error: orderItemsError } = await supabase
        .from("order_items")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (orderItemsError) {
        throw orderItemsError;
      }

      const { error: salesError } = await supabase
        .from("sales")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (salesError) {
        throw salesError;
      }

      const { error: ordersError } = await supabase
        .from("orders")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (ordersError) {
        throw ordersError;
      }

      setResetModalVisible(false);
      setResetPassword("");
      setResetCode("");
      setResetError("");

      Alert.alert("System Reset", "Orders and sales were reset.");
    } catch (error) {
      console.error("System reset failed:", error);
      setResetError("Failed to reset system data.");
    } finally {
      setResetting(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            const { error } = await supabase.auth.signOut();

            if (error) {
              console.error("Logout error:", error);

              Alert.alert("Logout Failed", error.message);

              return;
            }

            router.replace("/login");
          } catch (error) {
            console.error("Logout failed:", error);

            Alert.alert("Logout Failed", "Unable to logout.");
          }
        },
      },
    ]);
  };

  // =====================================================
  // INITIALIZE
  // =====================================================

  useEffect(() => {
    loadSettings();
    generateVerificationCode();

    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = Boolean(
        state.isConnected && state.isInternetReachable !== false,
      );

      if (online) {
        syncAutomatically();
      }
    });

    // Check immediately on screen load
    NetInfo.fetch().then((state) => {
      const online = Boolean(
        state.isConnected && state.isInternetReachable !== false,
      );

      if (online) {
        syncAutomatically();
      }
    });

    return unsubscribe;
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f28a00" />

        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Settings</Text>

            <Text style={styles.pageSubtitle}>
              Account, printer, and system settings
            </Text>
          </View>
        </View>

        {/* ACCOUNT */}

        <SettingsCard
          icon="👤"
          title="Account"
          description="Profile and password"
        >
          <AccountSettings
            ownerName={ownerName}
            setOwnerName={setOwnerName}
            role={role}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </SettingsCard>

        {/* TWO-STEP */}

        <SettingsCard
          icon="🔐"
          title="Verification"
          description="Required for system reset"
        >
          <TwoStepVerification
            verificationCode={verificationCode}
            generatingCode={generatingCode}
            generateVerificationCode={generateVerificationCode}
          />
        </SettingsCard>

        {/* PRINTER */}

        <SettingsCard
          icon="🖨️"
          title="Receipt Printer"
          description="Bluetooth ESC/POS"
        >
          <PrinterSettings
            printerEnabled={printerEnabled}
            setPrinterEnabled={setPrinterEnabled}
            autoPrintReceipt={autoPrintReceipt}
            setAutoPrintReceipt={setAutoPrintReceipt}
            printerName={printerName}
            printerAddress={printerAddress}
            paperSize={paperSize}
            setPaperSize={setPaperSize}
            printerTesting={printerTesting}
            handleSelectPrinter={handleSelectPrinter}
            handleTestPrint={handleTestPrint}
          />
        </SettingsCard>

        {/* BACKUP */}

        <SettingsCard
          icon="💾"
          title="Backup & Restore"
          description="Export or import data"
        >
          <BackupSettings
            backingUp={backingUp}
            restoring={restoring}
            handleBackupData={handleBackupData}
            handleRestoreData={handleRestoreData}
          />
        </SettingsCard>

        {/* DANGER */}

        <SettingsCard
          icon="⚠️"
          title="Danger Zone"
          description="Irreversible actions"
          danger
        >
          <ResetSystemCard
            resetModalVisible={resetModalVisible}
            resetPassword={resetPassword}
            setResetPassword={setResetPassword}
            resetCode={resetCode}
            setResetCode={setResetCode}
            resetError={resetError}
            resetting={resetting}
            openResetModal={openResetModal}
            setResetModalVisible={setResetModalVisible}
            handleResetSystem={handleResetSystem}
          />

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </SettingsCard>

        {/* IMPORTANT:
            Space for SAVE BAR + BOTTOM NAV */}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* SAVE BAR
          Positioned above AdminBottomNav */}

      <View style={styles.saveBar}>
        <Pressable
          style={[styles.primaryButton, styles.saveBarButton]}
          onPress={handleSaveSettings}
        >
          <Text style={styles.primaryButtonText}>Save Changes</Text>
        </Pressable>
      </View>

      {/* BOTTOM NAV */}

      <AdminBottomNav />

      {/* SAVE MESSAGE */}

      <SaveSuccessModal
        visible={showSaveModal}
        message={saveMessage}
        onClose={() => setShowSaveModal(false)}
      />
    </View>
  );
}
