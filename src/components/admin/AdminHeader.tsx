import React from "react";
import {
  Text,
  View,
} from "react-native";
import { headerStyle as styles } from "@/styles/components/admin/header.styles";

interface AdminHeaderProps {
  role?: string;
}

export default function AdminHeader({
  role = "Administrator",
}: AdminHeaderProps) {

  const today = new Date();

  const formattedDate = today.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const hour = today.getHours();

  let greeting = "Good morning";

  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  }

  if (hour >= 18) {
    greeting = "Good evening";
  }

  return (
    <View style={styles.header}>

      {/* LEFT */}

      <View>

        <Text style={styles.pageTitle}>
          Dashboard
        </Text>

        <Text style={styles.subtitle}>
          {formattedDate} · {greeting}, {role}
        </Text>

      </View>

    </View>
  );
}


