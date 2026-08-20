import React from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import {
  deleteMenuModalStyles as styles,
} from "@/styles/admin/modals/deleteMenuModal.styles";

/* =====================================================
   TYPES
===================================================== */

export type DeleteMenuData = {
  id: number;
  name: string;
};

type DeleteMenuModalProps = {
  visible: boolean;
  item: DeleteMenuData | null;
  onClose: () => void;
  onConfirm: () => void;
};

/* =====================================================
   COMPONENT
===================================================== */

export default function DeleteMenuModal({
  visible,
  item,
  onClose,
  onConfirm,
}: DeleteMenuModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              ×
            </Text>
          </Pressable>

          {/* =================================================
              DELETE ICON
          ================================================= */}

          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>
              !
            </Text>
          </View>

          {/* =================================================
              TITLE
          ================================================= */}

          <Text style={styles.title}>
            Delete Menu Item?
          </Text>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text style={styles.description}>
            Are you sure you want to delete this
            menu item?
          </Text>

          {/* =================================================
              ITEM NAME
          ================================================= */}

          {item ? (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>
                {item.name}
              </Text>
            </View>
          ) : null}

          {/* =================================================
              WARNING
          ================================================= */}

          <Text style={styles.warning}>
            This action cannot be undone.
          </Text>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <View style={styles.actions}>

            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </Pressable>

          </View>

        </View>

      </View>
    </Modal>
  );
}