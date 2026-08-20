import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  addMenuModalStyles as styles,
} from "@/styles/admin/modals/addMenuModal.styles";

export type Category =
  | "Chicken"
  | "Pork"
  | "Fish"
  | "Rice Meals"
  | "Drinks";

export type AddMenuData = {
  name: string;
  category: Category;
  price: number;
  available: boolean;
  image: string;
};

type AddMenuModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: AddMenuData) => void;
};

const categories: Category[] = [
  "Chicken",
  "Pork",
  "Fish",
  "Rice Meals",
  "Drinks",
];

export default function AddMenuModal({
  visible,
  onClose,
  onSave,
}: AddMenuModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] =
    useState<Category>("Chicken");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState("");

  const [showCategory, setShowCategory] =
    useState(false);

  const resetForm = () => {
    setName("");
    setCategory("Chicken");
    setPrice("");
    setAvailable(true);
    setImage("");
    setShowCategory(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    const numericPrice = Number(price);

    if (!name.trim()) {
      return;
    }

    if (!numericPrice || numericPrice <= 0) {
      return;
    }

    onSave({
      name: name.trim(),
      category,
      price: numericPrice,
      available,
      image: image.trim(),
    });

    resetForm();
    onClose();
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

          {/* HEADER */}
          <View style={styles.modalHeader}>

            <View>
              <Text style={styles.modalTitle}>
                Add Menu Item
              </Text>

              <Text style={styles.modalSubtitle}>
                Fill in the details
              </Text>
            </View>

            <Pressable
              onPress={handleClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>
                ×
              </Text>
            </Pressable>

          </View>

          {/* FOOD IMAGE */}
          <Text style={styles.fieldLabel}>
            FOOD IMAGE
          </Text>

          <View style={styles.imageUpload}>

            <View style={styles.cameraCircle}>
              <Text style={styles.cameraIcon}>
                📷
              </Text>
            </View>

            <Text style={styles.uploadTitle}>
              Upload food image
            </Text>

            <Text style={styles.uploadSubtitle}>
              PNG, JPG or JPEG
            </Text>

            <TextInput
              value={image}
              onChangeText={setImage}
              placeholder="Paste image URL"
              placeholderTextColor="#A89B92"
              style={styles.imageUrlInput}
              autoCapitalize="none"
            />

          </View>

          {/* FOOD NAME */}
          <Text style={styles.fieldLabel}>
            FOOD NAME
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Chicken Adobo"
            placeholderTextColor="#A89B92"
            style={styles.input}
          />

          {/* CATEGORY */}
          <Text style={styles.fieldLabel}>
            CATEGORY
          </Text>

          <View style={styles.dropdownWrapper}>

            <Pressable
              onPress={() =>
                setShowCategory(
                  (current) => !current
                )
              }
              style={styles.dropdown}
            >
              <Text style={styles.dropdownText}>
                {category}
              </Text>

              <Text style={styles.dropdownArrow}>
                {showCategory ? "⌃" : "⌄"}
              </Text>
            </Pressable>

            {showCategory && (
              <View style={styles.dropdownMenu}>

                {categories.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setCategory(item);
                      setShowCategory(false);
                    }}
                    style={[
                      styles.dropdownOption,
                      category === item &&
                        styles.dropdownOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        category === item &&
                          styles.dropdownOptionTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}

              </View>
            )}

          </View>

          {/* PRICE */}
          <Text style={styles.fieldLabel}>
            PRICE
          </Text>

          <View style={styles.priceInputContainer}>

            <Text style={styles.currencySymbol}>
              ₱
            </Text>

            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor="#A89B92"
              keyboardType="decimal-pad"
              style={styles.priceInput}
            />

          </View>

          {/* AVAILABILITY */}
          <View style={styles.availabilityRow}>

            <View style={styles.availabilityInfo}>

              <Text style={styles.availabilityTitle}>
                AVAILABILITY
              </Text>

              <Text
                style={styles.availabilitySubtitle}
              >
                Item is visible and orderable
              </Text>

            </View>

            <Pressable
              onPress={() =>
                setAvailable(
                  (current) => !current
                )
              }
              style={[
                styles.toggle,
                available &&
                  styles.toggleActive,
              ]}
            >
              <View
                style={[
                  styles.toggleKnob,
                  available &&
                    styles.toggleKnobActive,
                ]}
              />
            </Pressable>

          </View>

          {/* FOOTER */}
          <View style={styles.footer}>

            <Pressable
              onPress={handleClose}
              style={styles.cancelButton}
            >
              <Text
                style={styles.cancelButtonText}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>
                Save Menu Item
              </Text>
            </Pressable>

          </View>

        </View>

      </View>
    </Modal>
  );
}