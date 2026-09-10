import { useEffect, useState } from "react";
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
import { syncData } from "@/lib/database/sync";
import { backupData } from "@/lib/backup/backupService";
import { restoreData } from "@/lib/backup/restoreService";

import AdminBottomNav from "@/components/admin/AdminBottomNav";
import StoreSettings from "@/components/admin/settings/StoreSettings";
import PrinterSettings from "@/components/admin/settings/PrinterSettings";
import PaymentSettings from "@/components/admin/settings/PaymentSettings";
import AccountSettings from "@/components/admin/settings/AccountSettings";
import TwoStepVerification from "@/components/admin/settings/TwoStepVerification";
import SystemStatus from "@/components/admin/settings/SystemStatus";
import BackupSettings from "@/components/admin/settings/BackupSettings";
import ResetSystemCard from "@/components/admin/settings/ResetSystemCard";
import SaveSuccessModal from "@/components/admin/toast/SaveSuccessToast";

import { settingStyles as styles } from "@/styles/admin/settings.styles";

export default function SettingsScreen() {
  const router = useRouter();

  // =========================================================
  // STORE
  // =========================================================

  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhone, setStorePhone] = useState("");

  const [receiptFooterEnabled, setReceiptFooterEnabled] =
    useState(true);

  const [receiptFooter, setReceiptFooter] = useState(
    "Thank you for your purchase!"
  );

  // =========================================================
  // PRINTER
  // =========================================================

  const [printerEnabled, setPrinterEnabled] = useState(false);
  const [autoPrintReceipt, setAutoPrintReceipt] = useState(true);
  const [printerName, setPrinterName] = useState("");
  const [printerAddress, setPrinterAddress] = useState("");

  const [paperSize, setPaperSize] =
    useState<"58mm" | "80mm">("58mm");

  const [printerTesting, setPrinterTesting] = useState(false);

  // =========================================================
  // PAYMENT
  // =========================================================

  const [cashEnabled, setCashEnabled] = useState(true);
  const [gcashEnabled, setGcashEnabled] = useState(true);

  // =========================================================
  // ACCOUNT
  // =========================================================

  const [ownerName, setOwnerName] = useState("");
  const [role, setRole] = useState("admin");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================================================
  // TWO STEP
  // =========================================================

  const [verificationCode, setVerificationCode] = useState("");
  const [generatingCode, setGeneratingCode] = useState(false);

  // =========================================================
  // SYSTEM
  // =========================================================

  const [syncing, setSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(0);
  const [lastSync, setLastSync] = useState("");

  // =========================================================
  // BACKUP
  // =========================================================

  const [backingUp, setBackingUp] = useState(false);
  const [restoring, setRestoring] = useState(false);

  // =========================================================
  // RESET
  // =========================================================

  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetting, setResetting] = useState(false);

  // =========================================================
  // SAVE MODAL
  // =========================================================

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveMessage, setSaveMessage] =
    useState("Settings saved successfully.");

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] = useState(true);

  // =========================================================
  // LOAD SETTINGS
  // =========================================================

  const loadSettings = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const metadata = user.user_metadata ?? {};

        setOwnerName(
          metadata.owner_name ||
            metadata.full_name ||
            ""
        );

        setRole(metadata.role || "admin");
      }

      const { data, error } = await supabase
        .from("restaurant_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Load settings error:", error);
        return;
      }

      if (!data) return;

      setStoreName(data.name || "");
      setStoreAddress(data.address || "");
      setStorePhone(data.phone || "");

      setReceiptFooterEnabled(
        data.receipt_footer_enabled ?? true
      );

      setReceiptFooter(
        data.receipt_footer ||
          "Thank you for your purchase!"
      );

      setPrinterEnabled(
        data.printer_enabled ?? false
      );

      setAutoPrintReceipt(
        data.auto_print_receipt ?? true
      );

      setPrinterName(data.printer_name || "");
      setPrinterAddress(data.printer_address || "");

      setPaperSize(
        data.printer_paper_width === 80
          ? "80mm"
          : "58mm"
      );

      setCashEnabled(data.cash_enabled ?? true);
      setGcashEnabled(data.gcash_enabled ?? true);
    } catch (error) {
      console.error("Load settings failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // VERIFICATION CODE
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
  // SAVE SETTINGS
  // =========================================================

  const handleSaveSettings = async () => {
    try {
      if (
        newPassword &&
        newPassword !== confirmPassword
      ) {
        Alert.alert(
          "Password Error",
          "New password and confirm password do not match."
        );
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert(
          "Error",
          "No authenticated user found."
        );
        return;
      }

      // Update account metadata
      const metadataUpdate = {
        ...user.user_metadata,
        owner_name: ownerName,
        role: "admin",
      };

      const authUpdate: {
        data: typeof metadataUpdate;
        password?: string;
      } = {
        data: metadataUpdate,
      };

      if (newPassword) {
        authUpdate.password = newPassword;
      }

      const { error: authError } =
        await supabase.auth.updateUser(authUpdate);

      if (authError) {
        Alert.alert(
          "Account Update Failed",
          authError.message
        );
        return;
      }

      // Find restaurant settings row
      const {
        data: existingSettings,
        error: findError,
      } = await supabase
        .from("restaurant_settings")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (findError) {
        console.error(
          "Find settings error:",
          findError
        );
      }

      const settingsPayload = {
        name: storeName,
        address: storeAddress || null,
        phone: storePhone || null,

        receipt_footer_enabled:
          receiptFooterEnabled,

        receipt_footer:
          receiptFooter || null,

        printer_enabled:
          printerEnabled,

        auto_print_receipt:
          autoPrintReceipt,

        printer_name:
          printerName || null,

        printer_address:
          printerAddress || null,

        printer_type: "bluetooth",

        printer_paper_width:
          paperSize === "80mm" ? 80 : 58,

        cash_enabled:
          cashEnabled,

        gcash_enabled:
          gcashEnabled,

        updated_at:
          new Date().toISOString(),
      };

      let settingsError;

      if (existingSettings?.id) {
        const result = await supabase
          .from("restaurant_settings")
          .update(settingsPayload)
          .eq("id", existingSettings.id);

        settingsError = result.error;
      } else {
        const result = await supabase
          .from("restaurant_settings")
          .insert(settingsPayload);

        settingsError = result.error;
      }

      if (settingsError) {
        console.error(
          "Settings update error:",
          settingsError
        );

        Alert.alert(
          "Save Failed",
          settingsError.message
        );

        return;
      }

      setNewPassword("");
      setConfirmPassword("");

      setSaveMessage(
        "Settings saved successfully."
      );

      setShowSaveModal(true);
    } catch (error) {
      console.error(
        "Save settings failed:",
        error
      );

      Alert.alert(
        "Error",
        "Failed to save settings."
      );
    }
  };

  // =========================================================
  // PRINTER
  // =========================================================

  const handleSelectPrinter = () => {
    Alert.alert(
      "Bluetooth Printer",
      "Printer selection will connect to the Bluetooth ESC/POS printer service."
    );
  };

  const handleTestPrint = async () => {
    try {
      setPrinterTesting(true);

      if (!printerEnabled) {
        Alert.alert(
          "Printer Disabled",
          "Enable Bluetooth Printer first."
        );
        return;
      }

      if (!printerAddress) {
        Alert.alert(
          "No Printer",
          "Please select a Bluetooth printer first."
        );
        return;
      }

      Alert.alert(
        "Test Print",
        "Printer service is not connected yet."
      );
    } finally {
      setPrinterTesting(false);
    }
  };

  // =========================================================
  // SYNC
  // =========================================================

  const refreshSyncStatus = async () => {
    try {
      const state = await NetInfo.fetch();

      const online = Boolean(
        state.isConnected &&
          state.isInternetReachable !== false
      );

      setIsOnline(online);
    } catch (error) {
      console.error(
        "Network status error:",
        error
      );
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);

      const state = await NetInfo.fetch();

      const online = Boolean(
        state.isConnected &&
          state.isInternetReachable !== false
      );

      setIsOnline(online);

      if (!online) {
        Alert.alert(
          "Offline",
          "Internet connection is required to synchronize with Supabase."
        );
        return;
      }

      await syncData();

      setLastSync(new Date().toLocaleString());
      setPendingSync(0);

      Alert.alert(
        "Sync Complete",
        "Local data has been synchronized."
      );
    } catch (error) {
      console.error("Sync failed:", error);

      Alert.alert(
        "Sync Failed",
        "Unable to synchronize data."
      );
    } finally {
      setSyncing(false);
    }
  };

  // =========================================================
  // BACKUP
  // =========================================================

  const handleBackupData = async () => {
    try {
      setBackingUp(true);

      await backupData();

      Alert.alert(
        "Backup Complete",
        "Your system data has been exported successfully."
      );
    } catch (error) {
      console.error(
        "Backup failed:",
        error
      );

      Alert.alert(
        "Backup Failed",
        "Unable to create the Excel backup."
      );
    } finally {
      setBackingUp(false);
    }
  };

  // =========================================================
  // RESTORE
  // =========================================================

  const handleRestoreData = async () => {
    try {
      setRestoring(true);

      await restoreData();

      Alert.alert(
        "Restore Complete",
        "Your backup data has been restored successfully."
      );
    } catch (error) {
      console.error(
        "Restore failed:",
        error
      );

      Alert.alert(
        "Restore Failed",
        "Unable to restore the selected backup."
      );
    } finally {
      setRestoring(false);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const openResetModal = () => {
    setResetPassword("");
    setResetCode("");
    setResetError("");
    setResetModalVisible(true);
  };

  const handleResetSystem = async () => {
    try {
      setResetError("");

      if (!resetPassword) {
        setResetError(
          "Enter your password."
        );
        return;
      }

      if (resetCode !== verificationCode) {
        setResetError(
          "Invalid verification code."
        );
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setResetError(
          "No authenticated account found."
        );
        return;
      }

      setResetting(true);

      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: user.email,
          password: resetPassword,
        });

      if (signInError) {
        setResetError(
          "Incorrect password."
        );
        return;
      }

      // Delete child records first
      const { error: orderItemsError } =
        await supabase
          .from("order_items")
          .delete()
          .neq(
            "id",
            "00000000-0000-0000-0000-000000000000"
          );

      if (orderItemsError) {
        throw orderItemsError;
      }

      const { error: ordersError } =
        await supabase
          .from("orders")
          .delete()
          .neq(
            "id",
            "00000000-0000-0000-0000-000000000000"
          );

      if (ordersError) {
        throw ordersError;
      }

      const { error: salesError } =
        await supabase
          .from("sales")
          .delete()
          .neq(
            "id",
            "00000000-0000-0000-0000-000000000000"
          );

      if (salesError) {
        throw salesError;
      }

      setResetModalVisible(false);

      Alert.alert(
        "System Reset",
        "Order and sales data have been reset successfully."
      );
    } catch (error) {
      console.error(
        "System reset failed:",
        error
      );

      setResetError(
        "Failed to reset system data."
      );
    } finally {
      setResetting(false);
    }
  };

  // =========================================================
  // INITIALIZATION
  // =========================================================

  useEffect(() => {
    loadSettings();
    generateVerificationCode();
    refreshSyncStatus();

    const unsubscribe =
      NetInfo.addEventListener((state) => {
        const online = Boolean(
          state.isConnected &&
            state.isInternetReachable !== false
        );

        setIsOnline(online);
      });

    return () => {
      unsubscribe();
    };
  }, []);

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
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.pageTitle}>
            Settings
          </Text>

          <Text style={styles.pageSubtitle}>
            Manage your store, printer,
            payments, account, and system
            data.
          </Text>
        </View>

        {/* STORE */}

        <StoreSettings
          storeName={storeName}
          setStoreName={setStoreName}
          storeAddress={storeAddress}
          setStoreAddress={setStoreAddress}
          storePhone={storePhone}
          setStorePhone={setStorePhone}
          receiptFooterEnabled={
            receiptFooterEnabled
          }
          setReceiptFooterEnabled={
            setReceiptFooterEnabled
          }
          receiptFooter={receiptFooter}
          setReceiptFooter={setReceiptFooter}
        />

        {/* PRINTER */}

        <PrinterSettings
          printerEnabled={printerEnabled}
          setPrinterEnabled={setPrinterEnabled}
          autoPrintReceipt={autoPrintReceipt}
          setAutoPrintReceipt={
            setAutoPrintReceipt
          }
          printerName={printerName}
          printerAddress={printerAddress}
          paperSize={paperSize}
          setPaperSize={setPaperSize}
          printerTesting={printerTesting}
          handleSelectPrinter={
            handleSelectPrinter
          }
          handleTestPrint={handleTestPrint}
        />

        {/* PAYMENT */}

        <PaymentSettings
          cashEnabled={cashEnabled}
          setCashEnabled={setCashEnabled}
          gcashEnabled={gcashEnabled}
          setGcashEnabled={setGcashEnabled}
          onManageGCash={() =>
            router.push("/admin/menu")
          }
        />

        {/* ACCOUNT */}

        <AccountSettings
          ownerName={ownerName}
          setOwnerName={setOwnerName}
          role={role}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={
            setConfirmPassword
          }
        />

        {/* TWO STEP VERIFICATION */}

        <TwoStepVerification
          verificationCode={verificationCode}
          generatingCode={generatingCode}
          generateVerificationCode={
            generateVerificationCode
          }
        />

        {/* SYSTEM */}

        <SystemStatus
          isOnline={isOnline}
          pendingSync={pendingSync}
          lastSync={lastSync}
          syncing={syncing}
          handleSync={handleSync}
        />

        {/* BACKUP */}

        <BackupSettings
          backingUp={backingUp}
          restoring={restoring}
          handleBackupData={handleBackupData}
          handleRestoreData={handleRestoreData}
        />

        {/* RESET */}

        <ResetSystemCard
          resetModalVisible={resetModalVisible}
          resetPassword={resetPassword}
          setResetPassword={setResetPassword}
          resetCode={resetCode}
          setResetCode={setResetCode}
          resetError={resetError}
          resetting={resetting}
          openResetModal={openResetModal}
          setResetModalVisible={
            setResetModalVisible
          }
          handleResetSystem={
            handleResetSystem
          }
        />

        {/* SAVE */}

        <View
          style={{
            marginTop: 16,
            marginBottom: 30,
          }}
        >
          <Pressable
            style={styles.primaryButton}
            onPress={handleSaveSettings}
          >
            <Text
              style={styles.primaryButtonText}
            >
              Save Changes
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <AdminBottomNav />

      <SaveSuccessModal
        visible={showSaveModal}
        message={saveMessage}
        onClose={() =>
          setShowSaveModal(false)
        }
      />
    </View>
  );
}