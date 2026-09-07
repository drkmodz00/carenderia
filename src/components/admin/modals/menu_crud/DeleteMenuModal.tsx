import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { MenuItem } from "@/lib/menu";
import { deleteMenuStyles as styles } from "@/styles/admin/modals/menu_crud/deleteMenuModal.styles";
type DeleteMenuModalProps = {
  visible: boolean;
  item: MenuItem | null;
  saving: boolean;
  blockedReason: string | null;
  onClose: () => void;
  onConfirm: () => void;
  onMarkUnavailable: () => void;
};

export default function DeleteMenuModal({
  visible,
  item,
  saving,
  blockedReason,
  onClose,
  onConfirm,
  onMarkUnavailable,
}: DeleteMenuModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (!saving) onClose();
      }}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View
            style={[
              styles.iconWrap,
              blockedReason && styles.iconWrapWarning,
            ]}
          >
            <Text style={styles.icon}>{blockedReason ? "⚠️" : "🗑"}</Text>
          </View>

          <Text style={styles.title}>
            {blockedReason ? "Can't Delete Item" : "Delete Item"}
          </Text>

          {blockedReason ? (
            <>
              <Text style={styles.message}>{blockedReason}</Text>

              <View style={styles.actions}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                  disabled={saving}
                >
                  <Text style={styles.cancelButtonText}>Close</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.button,
                    styles.primaryButton,
                    saving && styles.primaryButtonDisabled,
                  ]}
                  onPress={onMarkUnavailable}
                  disabled={saving}
                >
                  <Text style={styles.primaryButtonText}>
                    {saving ? "Updating..." : "Mark Unavailable"}
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.message}>
                Are you sure you want to delete{" "}
                <Text style={styles.itemName}>"{item?.name}"</Text>? This
                action cannot be undone.
              </Text>

              <View style={styles.actions}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                  disabled={saving}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.button,
                    styles.deleteButton,
                    saving && styles.deleteButtonDisabled,
                  ]}
                  onPress={onConfirm}
                  disabled={saving}
                >
                  <Text style={styles.deleteButtonText}>
                    {saving ? "Deleting..." : "Delete"}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}