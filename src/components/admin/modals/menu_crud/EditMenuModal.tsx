import { useEffect, useState } from "react";

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

import { editMenuModalStyles as styles } from "@/styles/admin/modals/menu_crud/editMenuModals.style";
import { MenuItem } from "@/lib/menu";

export type EditMenuData = {
  name: string;
  category: string;
  price: number;
  image: string | null;
};

type EditMenuModalProps = {
  visible: boolean;
  item: MenuItem | null;
  onClose: () => void;
  onSave: (data: EditMenuData) => void;
  categories: string[];
  saving?: boolean;
};

export default function EditMenuModal({
  visible,
  item,
  onClose,
  onSave,
  categories,
  saving = false,
}: EditMenuModalProps) {
  // =====================================================
  // STATE
  // =====================================================

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");

  const [showCategory, setShowCategory] = useState(false);

  // =====================================================
  // LOAD ITEM INTO FORM
  // =====================================================

  useEffect(() => {
    if (visible && item) {
      setName(item.name ?? "");

      setCategory(item.category ?? "");

      setPrice(String(item.price ?? ""));

      setImage(item.image_url ?? "");

      setShowCategory(false);
    }
  }, [visible, item]);

  // =====================================================
  // IMAGE PICKER
  // =====================================================

  const handlePickImage = async () => {
    if (saving) {
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    if (saving) {
      return;
    }

    setShowCategory(false);

    onClose();
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = () => {
    const cleanName = name.trim();

    const cleanCategory = category.trim();

    const numericPrice = Number(price);

    if (!cleanName) {
      return;
    }

    if (!cleanCategory) {
      return;
    }

    if (!price || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      return;
    }

    onSave({
      name: cleanName,

      category: cleanCategory,

      price: numericPrice,

      image: image.trim(),
    });
  };

  // =====================================================
  // MODAL
  // =====================================================

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
            nestedScrollEnabled
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Edit Menu Item</Text>

                <Text style={styles.modalSubtitle}>
                  Update the food details
                </Text>
              </View>

              <Pressable
                onPress={handleClose}
                style={styles.closeButton}
                disabled={saving}
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            {/* =================================================
                IMAGE
            ================================================= */}

            <Text style={styles.fieldLabel}>FOOD IMAGE</Text>

            <Pressable
              onPress={handlePickImage}
              style={styles.imageUpload}
              disabled={saving}
            >
              {image.trim() ? (
                <Image
                  source={{
                    uri: image.trim(),
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 16,
                    marginBottom: 10,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.cameraCircle}>
                  <Text style={styles.cameraIcon}>📷</Text>
                </View>
              )}

              <Text style={styles.uploadTitle}>
                {image.trim() ? "Change food image" : "Upload food image"}
              </Text>

              <Text style={styles.uploadSubtitle}>PNG, JPG or JPEG</Text>
            </Pressable>

            {/* =================================================
                NAME
            ================================================= */}

            <Text style={styles.fieldLabel}>FOOD NAME</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Chicken Adobo"
              placeholderTextColor="#A89B92"
              style={styles.input}
              editable={!saving}
            />

            {/* =================================================
                CATEGORY
            ================================================= */}

            <Text style={styles.fieldLabel}>CATEGORY</Text>

            <View style={styles.dropdownWrapper}>
              <Pressable
                onPress={() => setShowCategory((value) => !value)}
                style={styles.dropdown}
                disabled={saving}
              >
                <Text style={styles.dropdownText}>
                  {category || "Select category"}
                </Text>

                <Text style={styles.dropdownArrow}>
                  {showCategory ? "⌃" : "⌄"}
                </Text>
              </Pressable>

              {showCategory && (
                <View style={styles.dropdownMenu}>
                  {categories.map((categoryItem) => {
                    const active = category === categoryItem;

                    return (
                      <Pressable
                        key={categoryItem}
                        onPress={() => {
                          setCategory(categoryItem);

                          setShowCategory(false);
                        }}
                        style={[
                          styles.dropdownOption,

                          active && styles.dropdownOptionActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,

                            active && styles.dropdownOptionTextActive,
                          ]}
                        >
                          {categoryItem}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>

            {/* =================================================
                PRICE
            ================================================= */}

            <Text style={styles.fieldLabel}>PRICE</Text>

            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>₱</Text>

              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                placeholderTextColor="#A89B92"
                keyboardType="decimal-pad"
                style={styles.priceInput}
                editable={!saving}
              />
            </View>

            {/* =================================================
                FOOTER
            ================================================= */}

            <View style={styles.footer}>
              <Pressable
                onPress={handleClose}
                style={styles.cancelButton}
                disabled={saving}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                style={styles.saveButton}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? "Saving..." : "Save Changes"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
