import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  editMenuModalStyles as styles,
} from "@/styles/admin/modals/editMenuModals.style";

/* =====================================================
   TYPES
===================================================== */

export type EditMenuCategory =
  | "Chicken"
  | "Pork"
  | "Fish"
  | "Rice Meals"
  | "Drinks";

export type EditMenuData = {
  id: number;
  name: string;
  category: EditMenuCategory;
  price: number;
  available: boolean;
  image?: string;
};

type EditMenuModalProps = {
  visible: boolean;
  item: EditMenuData | null;
  onClose: () => void;
  onSave: (data: EditMenuData) => void;
};

/* =====================================================
   CATEGORIES
===================================================== */

const CATEGORIES: EditMenuCategory[] = [
  "Chicken",
  "Pork",
  "Fish",
  "Rice Meals",
  "Drinks",
];

/* =====================================================
   COMPONENT
===================================================== */

export default function EditMenuModal({
  visible,
  item,
  onClose,
  onSave,
}: EditMenuModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] =
    useState<EditMenuCategory>("Chicken");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState("");

  const [showCategories, setShowCategories] =
    useState(false);

  /* ===================================================
     LOAD ITEM
  =================================================== */

  useEffect(() => {
    if (!item) {
      return;
    }

    setName(item.name);
    setCategory(item.category);
    setPrice(String(item.price));
    setAvailable(item.available);
    setImage(item.image ?? "");
  }, [item, visible]);

  /* ===================================================
     SAVE
  =================================================== */

  const handleSave = () => {
    if (!item) {
      return;
    }

    const parsedPrice = Number(price);

    const updatedItem: EditMenuData = {
      id: item.id,
      name: name.trim(),
      category,
      price: Number.isNaN(parsedPrice)
        ? 0
        : parsedPrice,
      available,
      image,
    };

    onSave(updatedItem);
  };

  /* ===================================================
     REMOVE IMAGE
  =================================================== */

  const handleRemoveImage = () => {
    setImage("");
  };

  /* ===================================================
     TEMP CHANGE IMAGE
  =================================================== */

  const handleChangeImage = () => {
    /*
      Temporary UI only.

      Later we can connect this to:
      expo-image-picker
      or your actual image upload system.
    */
  };

  /* ===================================================
     MODAL
  =================================================== */

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
              HEADER
          ================================================= */}

          <View style={styles.header}>

            <View>
              <Text style={styles.title}>
                Edit Menu Item
              </Text>

              <Text style={styles.subtitle}>
                Update the details below.
              </Text>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeText}>
                ×
              </Text>
            </Pressable>

          </View>

          {/* =================================================
              CONTENT
          ================================================= */}

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={
              styles.scrollContent
            }
            showsVerticalScrollIndicator={false}
          >

            {/* =================================================
                FOOD IMAGE
            ================================================= */}

            <Text style={styles.label}>
              FOOD IMAGE
            </Text>

            <View style={styles.imageContainer}>

              {image ? (
                <Image
                  source={{
                    uri: image,
                  }}
                  style={styles.foodImage}
                />
              ) : (
                <View style={styles.noImage}>
                  <Text style={styles.noImageText}>
                    No Image
                  </Text>
                </View>
              )}

              {/* IMAGE SELECTED */}

              {image ? (
                <View style={styles.selectedBadge}>
                  <Text
                    style={styles.selectedBadgeText}
                  >
                    ✓ Image Selected
                  </Text>
                </View>
              ) : null}

              {/* IMAGE BUTTONS */}

              <View style={styles.imageActions}>

                <Pressable
                  style={styles.changeImageButton}
                  onPress={handleChangeImage}
                >
                  <Text
                    style={
                      styles.changeImageButtonText
                    }
                  >
                    ⇧ Change Image
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.removeButton}
                  onPress={handleRemoveImage}
                >
                  <Text
                    style={styles.removeButtonText}
                  >
                    ♲ Remove
                  </Text>
                </Pressable>

              </View>

            </View>

            {/* =================================================
                FOOD NAME
            ================================================= */}

            <Text style={styles.label}>
              FOOD NAME
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter food name"
              placeholderTextColor="#9A9189"
              style={styles.input}
            />

            {/* =================================================
                CATEGORY
            ================================================= */}

            <Text style={styles.label}>
              CATEGORY
            </Text>

            <Pressable
              style={styles.select}
              onPress={() =>
                setShowCategories(
                  !showCategories
                )
              }
            >
              <Text style={styles.selectText}>
                {category}
              </Text>

              <Text style={styles.arrow}>
                {showCategories ? "⌃" : "⌄"}
              </Text>
            </Pressable>

            {showCategories ? (
              <View style={styles.categoryDropdown}>

                {CATEGORIES.map(
                  (categoryOption) => (
                    <Pressable
                      key={categoryOption}
                      style={[
                        styles.categoryOption,
                        categoryOption ===
                          category &&
                          styles.selectedCategoryOption,
                      ]}
                      onPress={() => {
                        setCategory(
                          categoryOption
                        );
                        setShowCategories(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.categoryOptionText,
                          categoryOption ===
                            category &&
                            styles.selectedCategoryText,
                        ]}
                      >
                        {categoryOption}
                      </Text>
                    </Pressable>
                  )
                )}

              </View>
            ) : null}

            {/* =================================================
                PRICE
            ================================================= */}

            <Text style={styles.label}>
              PRICE
            </Text>

            <View style={styles.priceInputContainer}>

              <Text style={styles.currency}>
                ₱
              </Text>

              <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#9A9189"
                style={styles.priceInput}
              />

            </View>

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <View style={styles.availabilityContainer}>

              <View>
                <Text
                  style={
                    styles.availabilityTitle
                  }
                >
                  Availability
                </Text>

                <Text
                  style={
                    styles.availabilitySubtitle
                  }
                >
                  Item is visible and orderable
                </Text>
              </View>

              <Pressable
                style={[
                  styles.switch,
                  available
                    ? styles.switchActive
                    : styles.switchInactive,
                ]}
                onPress={() =>
                  setAvailable(!available)
                }
              >
                <View
                  style={[
                    styles.switchKnob,
                    available
                      ? styles.switchKnobActive
                      : styles.switchKnobInactive,
                  ]}
                />
              </Pressable>

            </View>

          </ScrollView>

          {/* =================================================
              FOOTER
          ================================================= */}

          <View style={styles.footer}>

            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text
                style={styles.cancelButtonText}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text
                style={styles.saveButtonText}
              >
                Save Changes
              </Text>
            </Pressable>

          </View>

        </View>

      </View>
    </Modal>
  );
}