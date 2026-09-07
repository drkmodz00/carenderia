import React from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { saveSuccessModalStyles as styles } from "@/styles/admin/modals/toast/saveSuccessToast.styles";

type SaveSuccessModalProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export default function SaveSuccessModal({
  visible,
  message,
  onClose,
}: SaveSuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>✓</Text>
          </View>

          <Text style={styles.title}>
            Settings Saved
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <Pressable
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}