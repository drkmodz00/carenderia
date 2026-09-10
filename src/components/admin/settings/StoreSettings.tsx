import type { Dispatch, SetStateAction } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { settingStyles as styles } from "@/styles/admin/settings.styles";

type Props = {
  storeName: string;
  setStoreName: Dispatch<SetStateAction<string>>;

  storeAddress: string;
  setStoreAddress: Dispatch<SetStateAction<string>>;

  storePhone: string;
  setStorePhone: Dispatch<SetStateAction<string>>;

  receiptFooterEnabled: boolean;
  setReceiptFooterEnabled: Dispatch<SetStateAction<boolean>>;

  receiptFooter: string;
  setReceiptFooter: Dispatch<SetStateAction<string>>;
};

export default function StoreSettings({
  storeName,
  setStoreName,
  storeAddress,
  setStoreAddress,
  storePhone,
  setStorePhone,
  receiptFooterEnabled,
  setReceiptFooterEnabled,
  receiptFooter,
  setReceiptFooter,
}: Props) {
  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <MaterialIcons
            name="store"
            size={23}
            color="#f28a00"
          />
        </View>

        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>
            Store Settings
          </Text>

          <Text style={styles.cardDescription}>
            Manage your store information and receipt details.
          </Text>
        </View>
      </View>

      {/* STORE NAME */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
          Store Name
        </Text>

        <TextInput
          style={styles.textInput}
          value={storeName}
          onChangeText={setStoreName}
          placeholder="Enter store name"
          placeholderTextColor="#999"
        />
      </View>

      {/* ADDRESS */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
          Store Address
        </Text>

        <TextInput
          style={styles.textInput}
          value={storeAddress}
          onChangeText={setStoreAddress}
          placeholder="Enter store address"
          placeholderTextColor="#999"
        />
      </View>

      {/* PHONE */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
          Phone Number
        </Text>

        <TextInput
          style={styles.textInput}
          value={storePhone}
          onChangeText={setStorePhone}
          placeholder="Enter phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      {/* RECEIPT FOOTER */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>
            Receipt Footer
          </Text>

          <Text style={styles.settingDescription}>
            Show a custom message at the bottom of receipts.
          </Text>
        </View>

        <Pressable
          style={[
            styles.switch,
            receiptFooterEnabled && styles.switchActive,
          ]}
          onPress={() =>
            setReceiptFooterEnabled(
              (current) => !current
            )
          }
        >
          <View
            style={[
              styles.switchThumb,
              receiptFooterEnabled &&
                styles.switchThumbActive,
            ]}
          />
        </Pressable>
      </View>

      {/* FOOTER MESSAGE */}
      {receiptFooterEnabled && (
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Footer Message
          </Text>

          <TextInput
            style={[
              styles.textInput,
              styles.textArea,
            ]}
            value={receiptFooter}
            onChangeText={setReceiptFooter}
            placeholder="Thank you for your purchase!"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      )}
    </View>
  );
}