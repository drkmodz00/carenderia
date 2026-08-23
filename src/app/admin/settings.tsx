import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { settingStyles as styles } from "@/styles/admin/settings.styles";
import AdminBottomNav from "@/components/admin/AdminBottomNav";

export default function Settings() {
  const router = useRouter();

  /* =====================================================
     NEGOSYO
  ====================================================== */

  const [carinderiaName, setCarinderiaName] = useState(
    "Carenderia ni Aling Rosa",
  );

  const [address, setAddress] = useState(
    "123 Rizal St., Marikina City",
  );

  /* =====================================================
     RESIBO
  ====================================================== */

  const [footerEnabled, setFooterEnabled] = useState(true);

  const [footerMessage, setFooterMessage] = useState(
    "Salamat sa inyong...",
  );

  /* =====================================================
     PRINTER
  ====================================================== */

  const [printerEnabled, setPrinterEnabled] = useState(false);

  /* =====================================================
     ACCOUNT
  ====================================================== */

  const username = "admin";

  const role = "Cashier / Admin";

  /* =====================================================
     LOGOUT
  ====================================================== */

  const handleLogout = () => {
    /*
      Return to login screen.

      router.replace() removes the current
      admin page from the navigation history,
      so the user cannot simply press Back
      to return to Settings.
    */

    router.replace("/");
  };

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <View style={styles.page}>

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Settings
        </Text>
      </View>

      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* =================================================
            NEGOSYO
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            NEGOSYO
          </Text>

          {/* NAME */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Pangalan
            </Text>

            <TextInput
              value={carinderiaName}
              onChangeText={setCarinderiaName}
              style={styles.valueInput}
              textAlign="right"
              placeholder="Pangalan ng negosyo"
              placeholderTextColor="#999"
              numberOfLines={1}
            />
          </View>

          <View style={styles.divider} />

          {/* ADDRESS */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Address
            </Text>

            <TextInput
              value={address}
              onChangeText={setAddress}
              style={styles.valueInput}
              textAlign="right"
              placeholder="Address"
              placeholderTextColor="#999"
              numberOfLines={1}
            />
          </View>
        </View>

        {/* =================================================
            RESIBO
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            RESIBO
          </Text>

          {/* FOOTER SWITCH */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Ipakita ang footer message
            </Text>

            <Switch
              value={footerEnabled}
              onValueChange={setFooterEnabled}
              trackColor={{
                false: "#D4D4D4",
                true: "#F45B00",
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D4D4D4"
            />
          </View>

          <View style={styles.divider} />

          {/* FOOTER MESSAGE */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Footer message
            </Text>

            <TextInput
              value={footerMessage}
              onChangeText={setFooterMessage}
              editable={footerEnabled}
              style={[
                styles.footerInput,
                !footerEnabled &&
                  styles.disabledText,
              ]}
              textAlign="right"
              placeholder="Footer message"
              placeholderTextColor="#999"
              numberOfLines={1}
            />
          </View>
        </View>

        {/* =================================================
            PRINTER
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            PRINTER
          </Text>

          {/* BLUETOOTH PRINTER */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Bluetooth Printer
            </Text>

            <Switch
              value={printerEnabled}
              onValueChange={setPrinterEnabled}
              trackColor={{
                false: "#D4D4D4",
                true: "#F45B00",
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D4D4D4"
            />
          </View>

          <View style={styles.divider} />

          {/* STATUS */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Status
            </Text>

            <Text style={styles.statusText}>
              {printerEnabled
                ? "Connected"
                : "Disconnected"}
            </Text>
          </View>
        </View>

        {/* =================================================
            ACCOUNT
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            ACCOUNT
          </Text>

          {/* USERNAME */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Username
            </Text>

            <Text style={styles.accountValue}>
              {username}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* ROLE */}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>
              Role
            </Text>

            <Text style={styles.accountValue}>
              {role}
            </Text>
          </View>
        </View>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed &&
              styles.logoutButtonPressed,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Mag-logout
          </Text>
        </Pressable>

        {/* =================================================
            VERSION
        ================================================= */}

        <Text style={styles.versionText}>
          Carenderia POS v1.0 • © 2026
        </Text>

        {/* Extra space so content won't hide
            behind bottom navigation */}
        <View style={{ height: 80 }} />

      </ScrollView>

      {/* =================================================
          ADMIN BOTTOM NAVIGATION
      ================================================= */}

      <AdminBottomNav />

    </View>
  );
}
