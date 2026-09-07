import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { addMenuModalStyles as styles } from "@/styles/admin/modals/menu_crud/addMenuModal.styles";
import { COLORS } from "@/styles/admin/theme";

export type AddMenuData = {
  name: string;
  category: string;
  price: number;
  available: boolean;
  image: string;
};

type AddMenuModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: AddMenuData) => void;
  categories: string[];
  saving?: boolean;
};

export default function AddMenuModal({
  visible,
  onClose,
  onSave,
  categories,
  saving = false,
}: AddMenuModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  const resetForm = () => {
    setName("");
    setCategory(categories[0] ?? "");
    setPrice("");
    setImage("");
    setShowCategory(false);
  };

  const handleClose = () => {
    if (saving) return;

    resetForm();
    onClose();
  };

  // IMAGE UPLOAD ONLY
  const handlePickImage = async () => {
    if (saving) return;

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const cleanName = name.trim();
    const cleanCategory = category.trim();
    const numericPrice = Number(price);

    if (!cleanName) return;
    if (!cleanCategory) return;

    if (
      !price ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      return;
    }

    onSave({
      name: cleanName,
      category: cleanCategory,
      price: numericPrice,
      available: true,
      image: image.trim(),
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* HEADER */}
            <View style={styles.modalHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>
                  Add Menu Item
                </Text>

                <Text style={styles.modalSubtitle}>
                  Add a new item to your menu
                </Text>
              </View>

              <Pressable
                onPress={handleClose}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressed,
                ]}
                disabled={saving}
                hitSlop={8}
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            {/* IMAGE */}
            <Text style={styles.fieldLabel}>
              FOOD IMAGE
            </Text>

            <Pressable
              onPress={handlePickImage}
              style={({ pressed }) => [
                styles.imageUpload,
                pressed && styles.pressed,
              ]}
              disabled={saving}
            >
              {image.trim() ? (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{
                      uri: image.trim(),
                    }}
                    style={styles.imagePreview}
                    resizeMode="cover"
                  />

                  <View style={styles.changeImageBadge}>
                    <Text style={styles.changeImageText}>
                      Change
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.cameraCircle}>
                  <Text style={styles.cameraIcon}>
                    📷
                  </Text>
                </View>
              )}

              <Text style={styles.uploadTitle}>
                {image.trim()
                  ? "Change food image"
                  : "Upload food image"}
              </Text>

              <Text style={styles.uploadSubtitle}>
                PNG, JPG or JPEG
              </Text>
            </Pressable>

            {/* NAME */}
            <Text style={styles.fieldLabel}>
              FOOD NAME
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Chicken Adobo"
              placeholderTextColor={COLORS.mutedLight}
              style={styles.input}
              editable={!saving}
              autoCapitalize="words"
            />

            {/* CATEGORY */}
            <Text style={styles.fieldLabel}>
              CATEGORY
            </Text>

            <View style={styles.dropdownWrapper}>
              <Pressable
                onPress={() =>
                  setShowCategory((value) => !value)
                }
                style={({ pressed }) => [
                  styles.dropdown,
                  showCategory &&
                    styles.dropdownActive,
                  pressed && styles.pressed,
                ]}
                disabled={saving}
              >
                <View style={styles.dropdownLeft}>
                  <View style={styles.categoryDot} />

                  <Text
                    style={[
                      styles.dropdownText,
                      !category &&
                        styles.dropdownPlaceholder,
                    ]}
                    numberOfLines={1}
                  >
                    {category || "Select category"}
                  </Text>
                </View>

                <Text style={styles.dropdownArrow}>
                  {showCategory ? "⌃" : "⌄"}
                </Text>
              </Pressable>

              {showCategory && (
                <View style={styles.dropdownMenu}>
                  {categories.map((item) => {
                    const active = category === item;

                    return (
                      <Pressable
                        key={item}
                        onPress={() => {
                          setCategory(item);
                          setShowCategory(false);
                        }}
                        style={[
                          styles.dropdownOption,
                          active &&
                            styles.dropdownOptionActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            active &&
                              styles.dropdownOptionTextActive,
                          ]}
                        >
                          {item}
                        </Text>

                        {active && (
                          <Text
                            style={styles.checkIcon}
                          >
                            ✓
                          </Text>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>

            {/* PRICE */}
            <Text style={styles.fieldLabel}>
              PRICE
            </Text>

            <View style={styles.priceInputContainer}>
              <View style={styles.currencyBox}>
                <Text style={styles.currencySymbol}>
                  ₱
                </Text>
              </View>

              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                placeholderTextColor={COLORS.mutedLight}
                keyboardType="decimal-pad"
                style={styles.priceInput}
                editable={!saving}
              />
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Pressable
                onPress={handleClose}
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.pressed,
                ]}
                disabled={saving}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.saveButtonPressed,
                  saving &&
                    styles.saveButtonDisabled,
                ]}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving
                    ? "Saving..."
                    : "Save Menu Item"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}