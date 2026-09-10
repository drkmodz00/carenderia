import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import {
  settingStyles as styles,
} from "@/styles/admin/settings.styles";

type Props = {
  resetModalVisible: boolean;
  resetPassword: string;
  resetCode: string;
  resetError: string;
  resetting: boolean;

  openResetModal: () => void;

  setResetModalVisible: (
    visible: boolean
  ) => void;

  setResetPassword: (
    value: string
  ) => void;

  setResetCode: (
    value: string
  ) => void;

  handleResetSystem: () => void | Promise<void>;
};

export default function ResetSystemCard({
  resetModalVisible,
  resetPassword,
  resetCode,
  resetError,
  resetting,
  openResetModal,
  setResetModalVisible,
  setResetPassword,
  setResetCode,
  handleResetSystem,
}: Props) {
  return (
    <>
      {/* =========================================================
          RESET SYSTEM CARD
          ========================================================= */}
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.cardHeader}>
          <View style={styles.dangerIconBox}>
            <MaterialIcons
              name="delete-forever"
              size={23}
              color="#d32f2f"
            />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>
              Reset System
            </Text>

            <Text style={styles.cardDescription}>
              Delete order and sales records from the system.
            </Text>
          </View>
        </View>

        {/* WARNING */}
        <View style={styles.warningBox}>
          <MaterialIcons
            name="error-outline"
            size={20}
            color="#d32f2f"
          />

          <Text style={styles.warningText}>
            This action is permanent. Make sure you have
            created a backup before resetting the system.
          </Text>
        </View>

        {/* RESET BUTTON */}
        <Pressable
          style={styles.dangerButton}
          onPress={openResetModal}
          disabled={resetting}
        >
          <MaterialIcons
            name="delete-forever"
            size={20}
            color="#fff"
          />

          <Text style={styles.dangerButtonText}>
            Reset System Data
          </Text>
        </Pressable>
      </View>

      {/* =========================================================
          RESET CONFIRMATION MODAL
          ========================================================= */}
      <Modal
        visible={resetModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!resetting) {
            setResetModalVisible(false);
          }
        }}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* MODAL HEADER */}
            <View style={styles.modalHeader}>
              <MaterialIcons
                name="warning"
                size={26}
                color="#d32f2f"
              />

              <Text style={styles.modalTitle}>
                Confirm System Reset
              </Text>
            </View>

            {/* DESCRIPTION */}
            <Text style={styles.modalDescription}>
              This will permanently delete all order,
              order item, and sales records.
            </Text>

            {/* =====================================================
                PASSWORD
                ===================================================== */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Account Password
              </Text>

              <TextInput
                style={styles.textInput}
                value={resetPassword}
                onChangeText={setResetPassword}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                editable={!resetting}
                autoCapitalize="none"
              />
            </View>

            {/* =====================================================
                VERIFICATION CODE
                ===================================================== */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Verification Code
              </Text>

              <TextInput
                style={styles.textInput}
                value={resetCode}
                onChangeText={setResetCode}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
                editable={!resetting}
              />
            </View>

            {/* =====================================================
                ERROR
                ===================================================== */}
            {resetError ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>
                  {resetError}
                </Text>
              </View>
            ) : null}

            {/* =====================================================
                ACTION BUTTONS
                ===================================================== */}
            <View style={styles.modalActions}>
              {/* CANCEL */}
              <Pressable
                style={styles.cancelButton}
                onPress={() =>
                  setResetModalVisible(false)
                }
                disabled={resetting}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              {/* CONFIRM */}
              <Pressable
                style={styles.dangerButton}
                onPress={handleResetSystem}
                disabled={resetting}
              >
                <MaterialIcons
                  name={
                    resetting
                      ? "hourglass-empty"
                      : "delete-forever"
                  }
                  size={19}
                  color="#fff"
                />

                <Text style={styles.dangerButtonText}>
                  {resetting
                    ? "Resetting..."
                    : "Confirm Reset"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}