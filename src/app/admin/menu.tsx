import React, { useMemo, useState } from "react";

import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import AdminBottomNav from "@/components/admin/AdminBottomNav";
import { menuStyles as styles } from "@/styles/admin/menu.styles";

/* =====================================================
   TYPES
===================================================== */

type Category =
  | "All"
  | "Chicken"
  | "Pork"
  | "Fish"
  | "Rice Meals"
  | "Drinks";

type ActualCategory = Exclude<Category, "All">;

type MenuItem = {
  id: number;
  name: string;
  category: ActualCategory;
  price: number;
  available: boolean;
  image?: string;
  icon?: string;
};

/* =====================================================
   CATEGORY HELPER
===================================================== */

const isCategory = (
  value: string,
): value is ActualCategory => {
  return (
    value === "Chicken" ||
    value === "Pork" ||
    value === "Fish" ||
    value === "Rice Meals" ||
    value === "Drinks"
  );
};

/* =====================================================
   CATEGORY ICON
===================================================== */

const getCategoryIcon = (
  category: ActualCategory,
): string => {
  switch (category) {
    case "Chicken":
      return "🍗";

    case "Pork":
      return "🍖";

    case "Fish":
      return "🐟";

    case "Rice Meals":
      return "🍚";

    case "Drinks":
      return "🥤";

    default:
      return "🍽️";
  }
};

/* =====================================================
   INITIAL MENU
===================================================== */

const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Pork Adobo",
    category: "Pork",
    price: 65,
    available: true,
    icon: "🍖",
  },

  {
    id: 2,
    name: "Fried Chicken",
    category: "Chicken",
    price: 70,
    available: true,
    icon: "🍗",
  },

  {
    id: 3,
    name: "Lechon Kawali",
    category: "Pork",
    price: 75,
    available: true,
    icon: "🥩",
  },

  {
    id: 4,
    name: "Mechado",
    category: "Pork",
    price: 70,
    available: true,
    icon: "🥘",
  },

  {
    id: 5,
    name: "Bicol Express",
    category: "Pork",
    price: 60,
    available: true,
    icon: "🌶️",
  },

  {
    id: 6,
    name: "Tinolang Manok",
    category: "Chicken",
    price: 70,
    available: true,
    icon: "🍲",
  },

  {
    id: 7,
    name: "Sinigang na Baboy",
    category: "Pork",
    price: 80,
    available: true,
    icon: "🍲",
  },

  {
    id: 8,
    name: "Nilaga",
    category: "Pork",
    price: 70,
    available: false,
    icon: "🍲",
  },

  {
    id: 9,
    name: "Kanin",
    category: "Rice Meals",
    price: 15,
    available: true,
    icon: "🍚",
  },

  {
    id: 10,
    name: "Garlic Rice",
    category: "Rice Meals",
    price: 20,
    available: true,
    icon: "🍚",
  },

  {
    id: 11,
    name: "Fried Fish",
    category: "Fish",
    price: 60,
    available: true,
    icon: "🐟",
  },

  {
    id: 12,
    name: "Sinigang na Bangus",
    category: "Fish",
    price: 80,
    available: true,
    icon: "🍲",
  },

  {
    id: 13,
    name: "Pancit Bihon",
    category: "Rice Meals",
    price: 55,
    available: true,
    icon: "🍜",
  },

  {
    id: 14,
    name: "Plain Rice",
    category: "Rice Meals",
    price: 15,
    available: true,
    icon: "🍚",
  },

  {
    id: 15,
    name: "Softdrinks",
    category: "Drinks",
    price: 25,
    available: true,
    icon: "🥤",
  },

  {
    id: 16,
    name: "Buko Juice",
    category: "Drinks",
    price: 30,
    available: true,
    icon: "🥥",
  },
];

/* =====================================================
   MAIN SCREEN
===================================================== */

export default function MenuManagement() {
  /* ===================================================
     MENU STATE
  =================================================== */

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>(
      INITIAL_MENU_ITEMS,
    );

  /* ===================================================
     ADD FORM
  =================================================== */

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [newName, setNewName] =
    useState("");

  const [newPrice, setNewPrice] =
    useState("");

  const [newCategory, setNewCategory] =
    useState<ActualCategory>("Pork");

  /* ===================================================
     EDIT STATE
  =================================================== */

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editPrice, setEditPrice] =
    useState("");

  /* ===================================================
     AVAILABLE COUNT
  =================================================== */

  const availableCount = useMemo(() => {
    return menuItems.filter(
      (item) => item.available,
    ).length;
  }, [menuItems]);

  /* ===================================================
     ADD ITEM
  =================================================== */

  const handleAdd = () => {
    const name = newName.trim();

    const price = Number(newPrice);

    if (!name) {
      return;
    }

    if (
      !newPrice ||
      Number.isNaN(price) ||
      price <= 0
    ) {
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      name,
      category: newCategory,
      price,
      available: true,
      icon: getCategoryIcon(newCategory),
    };

    setMenuItems((currentItems) => [
      ...currentItems,
      newItem,
    ]);

    /* Reset form */

    setNewName("");

    setNewPrice("");

    setNewCategory("Pork");

    /* Hide form after save */

    setShowAddForm(false);
  };

  /* ===================================================
     CLEAR ADD FORM
  =================================================== */

  const handleClearAddForm = () => {
    setNewName("");

    setNewPrice("");

    setNewCategory("Pork");
  };

  /* ===================================================
     START EDIT
  =================================================== */

  const handleStartEdit = (
    item: MenuItem,
  ) => {
    setEditingId(item.id);

    setEditName(item.name);

    setEditPrice(String(item.price));
  };

  /* ===================================================
     SAVE EDIT
  =================================================== */

  const handleSaveEdit = (
    id: number,
  ) => {
    const name = editName.trim();

    const price = Number(editPrice);

    if (!name) {
      return;
    }

    if (
      !editPrice ||
      Number.isNaN(price) ||
      price <= 0
    ) {
      return;
    }

    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              name,
              price,
            }
          : item,
      ),
    );

    setEditingId(null);

    setEditName("");

    setEditPrice("");
  };

  /* ===================================================
     CANCEL EDIT
  =================================================== */

  const handleCancelEdit = () => {
    setEditingId(null);

    setEditName("");

    setEditPrice("");
  };

  /* ===================================================
     DELETE ITEM
  =================================================== */

  const handleDelete = (
    id: number,
  ) => {
    setMenuItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id,
      ),
    );

    if (editingId === id) {
      handleCancelEdit();
    }
  };

  /* ===================================================
     TOGGLE AVAILABILITY
  =================================================== */

  const toggleAvailability = (
    id: number,
  ) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              available:
                !item.available,
            }
          : item,
      ),
    );
  };

  /* ===================================================
     MENU SECTIONS
  =================================================== */

  const sections = useMemo(() => {
    const ulam = menuItems.filter(
      (item) =>
        item.category === "Chicken" ||
        item.category === "Pork" ||
        item.category === "Fish",
    );

    const sabaw = menuItems.filter(
      (item) => {
        const name =
          item.name.toLowerCase();

        return (
          name.includes("sinigang") ||
          name.includes("tinola") ||
          name.includes("nilaga")
        );
      },
    );

    const kanin = menuItems.filter(
      (item) =>
        item.category ===
          "Rice Meals" &&
        !item.name
          .toLowerCase()
          .includes("pancit"),
    );

    /* Remove soup items from ULAM */

    const finalUlam = ulam.filter(
      (item) => {
        const name =
          item.name.toLowerCase();

        return (
          !name.includes("sinigang") &&
          !name.includes("tinola") &&
          !name.includes("nilaga")
        );
      },
    );

    return [
      {
        title: "ULAM",
        items: finalUlam,
      },

      {
        title: "SABAW",
        items: sabaw,
      },

      {
        title: "KANIN",
        items: kanin,
      },
    ];
  }, [menuItems]);

  /* ===================================================
     RENDER MENU ITEM
  =================================================== */

  const renderMenuItem = (
    item: MenuItem,
  ) => {
    const isEditing =
      editingId === item.id;

    return (
      <View
        key={item.id}
        style={[
          styles.menuCard,

          !item.available &&
            styles.menuCardUnavailable,
        ]}
      >
        {/* ============================================
            FOOD ICON
        ============================================= */}

        <View style={styles.foodIconBox}>
          <Text style={styles.foodIcon}>
            {item.icon || "🍽️"}
          </Text>
        </View>

        {/* ============================================
            EDITING MODE
        ============================================= */}

        {isEditing ? (
          <View style={styles.editInfo}>
            {/* NAME */}

            <TextInput
              value={editName}
              onChangeText={setEditName}
              style={styles.inlineEditName}
              placeholder="Pangalan"
              placeholderTextColor="#999"
              autoCapitalize="words"
              selectTextOnFocus
            />

            {/* PRICE */}

            <View
              style={styles.inlinePriceRow}
            >
              <Text
                style={styles.pesoSymbol}
              >
                ₱
              </Text>

              <TextInput
                value={editPrice}
                onChangeText={
                  setEditPrice
                }
                style={
                  styles.inlineEditPrice
                }
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        ) : (
          /* ==========================================
             NORMAL MODE
          =========================================== */

          <View style={styles.menuInfo}>
            <Text
              style={[
                styles.foodName,

                !item.available &&
                  styles.unavailableText,
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <Text
              style={styles.foodPrice}
            >
              ₱{item.price}
            </Text>
          </View>
        )}

        {/* ============================================
            ACTIONS
        ============================================= */}

        <View
          style={styles.menuActions}
        >
          {/* ==========================================
              AVAILABILITY
          =========================================== */}

          <Pressable
            onPress={() =>
              toggleAvailability(
                item.id,
              )
            }
            style={[
              styles.statusButton,

              item.available
                ? styles.statusOn
                : styles.statusOff,
            ]}
          >
            <Text
              style={[
                styles.statusText,

                item.available
                  ? styles.statusOnText
                  : styles.statusOffText,
              ]}
            >
              {item.available
                ? "ON"
                : "OFF"}
            </Text>
          </Pressable>

          {/* ==========================================
              EDIT / SAVE
          =========================================== */}

          {isEditing ? (
            <Pressable
              onPress={() =>
                handleSaveEdit(
                  item.id,
                )
              }
              style={
                styles.saveEditButton
              }
            >
              <Text
                style={
                  styles.saveEditIcon
                }
              >
                ✓
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                handleStartEdit(
                  item,
                )
              }
              style={styles.editButton}
            >
              <Text
                style={styles.editIcon}
              >
                ✎
              </Text>
            </Pressable>
          )}

          {/* ==========================================
              DELETE
          =========================================== */}

          <Pressable
            onPress={() =>
              handleDelete(item.id)
            }
            style={
              styles.deleteButton
            }
          >
            <Text
              style={styles.deleteIcon}
            >
              🗑
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  /* ===================================================
     SCREEN
  =================================================== */

  return (
    <View style={styles.container}>
      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.orangeHeader}>
        {/* TITLE */}

        <View>
          <Text
            style={styles.pageTitle}
          >
            Menu
          </Text>

          <Text
            style={styles.itemCount}
          >
            {menuItems.length} pagkain
          </Text>
        </View>

        {/* ADD BUTTON */}

        <Pressable
          onPress={() =>
            setShowAddForm(
              (current) => !current,
            )
          }
          style={styles.addButton}
        >
          <Text
            style={styles.addButtonText}
          >
            + Dagdag
          </Text>
        </Pressable>
      </View>

      {/* =================================================
          ADD FOOD FORM
          ONLY VISIBLE WHEN + DAGDAG IS PRESSED
      ================================================= */}

      {showAddForm && (
        <View style={styles.addForm}>
          {/* TITLE */}

          <Text
            style={styles.addFormTitle}
          >
            Bagong Pagkain
          </Text>

          {/* INPUT ROW */}

          <View
            style={styles.addInputRow}
          >
            {/* ICON */}

            <View
              style={styles.addIconBox}
            >
              <Text
                style={
                  styles.addFoodIcon
                }
              >
                {getCategoryIcon(
                  newCategory,
                )}
              </Text>
            </View>

            {/* NAME */}

            <TextInput
              value={newName}
              onChangeText={setNewName}
              style={
                styles.addNameInput
              }
              placeholder="Pangalan ng pagkain"
              placeholderTextColor="#B7A9A0"
              autoCapitalize="words"
            />

            {/* PRICE */}

            <View
              style={styles.addPriceBox}
            >
              <Text
                style={styles.pricePrefix}
              >
                ₱
              </Text>

              <TextInput
                value={newPrice}
                onChangeText={
                  setNewPrice
                }
                style={
                  styles.addPriceInput
                }
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#B7A9A0"
              />
            </View>
          </View>

          {/* CATEGORY */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.categoryList
            }
          >
            {(
              [
                "Pork",
                "Chicken",
                "Fish",
                "Rice Meals",
                "Drinks",
              ] as ActualCategory[]
            ).map((category) => (
              <Pressable
                key={category}
                onPress={() =>
                  setNewCategory(
                    category,
                  )
                }
                style={[
                  styles.categoryButton,

                  newCategory ===
                    category &&
                    styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,

                    newCategory ===
                      category &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* FORM ACTIONS */}

          <View
            style={styles.formActions}
          >
            {/* CANCEL */}

            <Pressable
              onPress={
                handleClearAddForm
              }
              style={
                styles.cancelButton
              }
            >
              <Text
                style={styles.cancelText}
              >
                Clear
              </Text>
            </Pressable>

            {/* SAVE */}

            <Pressable
              onPress={handleAdd}
              style={
                styles.saveButton
              }
            >
              <Text
                style={styles.saveText}
              >
                I-save
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* =================================================
          MENU LIST
      ================================================= */}

      <ScrollView
        style={styles.menuScroll}
        contentContainerStyle={
          styles.menuContent
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* =================================================
            SECTIONS
        ================================================= */}

        {sections.map((section) => {
          if (
            section.items.length ===
            0
          ) {
            return null;
          }

          return (
            <View
              key={section.title}
              style={styles.section}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                {section.title}
              </Text>

              {section.items.map(
                renderMenuItem,
              )}
            </View>
          );
        })}

        {/* =================================================
            OTHER ITEMS
        ================================================= */}

        {menuItems.some(
          (item) =>
            item.category ===
              "Drinks" ||
            item.name ===
              "Pancit Bihon",
        ) && (
          <View
            style={styles.section}
          >
            <Text
              style={
                styles.sectionTitle
              }
            >
              IBA PA
            </Text>

            {menuItems
              .filter(
                (item) =>
                  item.category ===
                    "Drinks" ||
                  item.name ===
                    "Pancit Bihon",
              )
              .map(
                renderMenuItem,
              )}
          </View>
        )}

        {/* BOTTOM SPACE */}

        <View
          style={styles.bottomSpacer}
        />
      </ScrollView>

      {/* =================================================
          BOTTOM NAV
      ================================================= */}

      <AdminBottomNav />
    </View>
  );
}
