import type { Dispatch, SetStateAction } from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  settingStyles as styles,
} from "@/styles/admin/settings.styles";

type Props = {
  printerEnabled: boolean;
  setPrinterEnabled: Dispatch<SetStateAction<boolean>>;

  autoPrintReceipt: boolean;
  setAutoPrintReceipt: Dispatch<SetStateAction<boolean>>;

  printerName: string;
  printerAddress: string;

  paperSize: "58mm" | "80mm";
  setPaperSize: Dispatch<
    SetStateAction<"58mm" | "80mm">
  >;

  printerTesting: boolean;

  handleSelectPrinter: () => void;
  handleTestPrint: () => Promise<void> | void;
};

export default function PrinterSettings({
  printerEnabled,
  setPrinterEnabled,
  autoPrintReceipt,
  setAutoPrintReceipt,
  printerName,
  printerAddress,
  paperSize,
  setPaperSize,
  printerTesting,
  handleSelectPrinter,
  handleTestPrint,
}: Props) {
  return (
    <View style={styles.card}>
      {/* =========================================================
          HEADER
          ========================================================= */}
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <MaterialIcons
            name="print"
            size={23}
            color="#f28a00"
          />
        </View>

        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>
            Printer Settings
          </Text>

          <Text style={styles.cardDescription}>
            Configure your Bluetooth thermal receipt printer.
          </Text>
        </View>
      </View>

      {/* =========================================================
          BLUETOOTH PRINTER
          ========================================================= */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>
            Bluetooth Printer
          </Text>

          <Text style={styles.settingDescription}>
            Enable Bluetooth printing for receipts.
          </Text>
        </View>

        <Pressable
          style={[
            styles.switch,
            printerEnabled && styles.switchActive,
          ]}
          onPress={() =>
            setPrinterEnabled(
              (current) => !current
            )
          }
        >
          <View
            style={[
              styles.switchThumb,
              printerEnabled &&
                styles.switchThumbActive,
            ]}
          />
        </Pressable>
      </View>

      {/* =========================================================
          AUTO PRINT
          ========================================================= */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>
            Auto Print Receipt
          </Text>

          <Text style={styles.settingDescription}>
            Automatically print the receipt after successful payment.
          </Text>
        </View>

        <Pressable
          style={[
            styles.switch,
            autoPrintReceipt &&
              styles.switchActive,
          ]}
          onPress={() =>
            setAutoPrintReceipt(
              (current) => !current
            )
          }
        >
          <View
            style={[
              styles.switchThumb,
              autoPrintReceipt &&
                styles.switchThumbActive,
            ]}
          />
        </Pressable>
      </View>

      {/* =========================================================
          SELECTED PRINTER
          ========================================================= */}
      <View style={styles.printerInfoBox}>
        <View style={styles.printerDeviceHeader}>
          <View style={styles.printerDeviceIcon}>
            <MaterialIcons
              name="bluetooth"
              size={22}
              color="#f28a00"
            />
          </View>

          <View style={styles.printerDeviceInfo}>
            <Text style={styles.printerDeviceName}>
              {printerName || "No printer selected"}
            </Text>

            <Text style={styles.printerDeviceAddress}>
              {printerAddress ||
                "Select a paired Bluetooth thermal printer."}
            </Text>

            {printerAddress ? (
              <Text style={styles.printerDeviceSelected}>
                Bluetooth printer selected
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* =========================================================
          SELECT PRINTER
          ========================================================= */}
      <View style={styles.printerActions}>
        <Pressable
          style={styles.secondaryButton}
          onPress={handleSelectPrinter}
        >
          <MaterialIcons
            name="bluetooth-searching"
            size={19}
            color="#f28a00"
          />

          <Text style={styles.secondaryButtonText}>
            Select Printer
          </Text>
        </Pressable>
      </View>

      {/* =========================================================
          PAPER WIDTH
          ========================================================= */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Paper Width
        </Text>

        <View style={styles.paperWidthRow}>
          <Pressable
            style={[
              styles.paperWidthButton,
              paperSize === "58mm" &&
                styles.paperWidthButtonActive,
            ]}
            onPress={() =>
              setPaperSize("58mm")
            }
          >
            <Text
              style={[
                styles.paperWidthButtonText,
                paperSize === "58mm" &&
                  styles.paperWidthButtonTextActive,
              ]}
            >
              58mm
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.paperWidthButton,
              paperSize === "80mm" &&
                styles.paperWidthButtonActive,
            ]}
            onPress={() =>
              setPaperSize("80mm")
            }
          >
            <Text
              style={[
                styles.paperWidthButtonText,
                paperSize === "80mm" &&
                  styles.paperWidthButtonTextActive,
              ]}
            >
              80mm
            </Text>
          </Pressable>
        </View>
      </View>

      {/* =========================================================
          TEST PRINT
          ========================================================= */}
      <View style={styles.printerActions}>
        <Pressable
          style={[
            styles.primaryButton,
            (!printerEnabled ||
              printerTesting) &&
              styles.disabledButton,
          ]}
          onPress={handleTestPrint}
          disabled={
            !printerEnabled ||
            printerTesting
          }
        >
          {printerTesting ? (
            <>
              <MaterialIcons
                name="hourglass-empty"
                size={19}
                color="#fff"
              />

              <Text style={styles.primaryButtonText}>
                Testing Printer...
              </Text>
            </>
          ) : (
            <>
              <MaterialIcons
                name="print"
                size={19}
                color="#fff"
              />

              <Text style={styles.primaryButtonText}>
                Test Print
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}