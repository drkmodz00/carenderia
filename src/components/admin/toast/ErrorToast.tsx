import React from "react";
import { Text, View } from "react-native";

import {
  errorToastStyles as styles,
} from "@/styles/admin/modals/toast/errorToast";

type ErrorToastProps = {
  title?: string;
  message: string;
  visible: boolean;
};

export default function ErrorToast({
  title = "Incomplete Order",
  message,
  visible,
}: ErrorToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}
