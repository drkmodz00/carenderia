import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import AdminSidebar from "../../components/admin/AdminSidebar";

import AddMenuModal, {
  AddMenuData,
} from "../../components/admin/modals/AddMenuModal";

import EditMenuModal, {
  EditMenuData,
} from "../../components/admin/modals/EditMenuModal";

import DeleteMenuModal from "@/components/admin/modals/DeleteMenuModal";
import { menuStyles as styles } from "@/styles/admin/menu.styles";

/* =====================================================
   TYPES
===================================================== */

type Category =
  | "Chicken"
  | "Pork"
  | "Fish"
  | "Rice Meals"
  | "Drinks";

type MenuItem = {
  id: number;
  name: string;
  category: Category;
  price: number;
  available: boolean;
  image: string;
};

/* =====================================================
   CATEGORY HELPER
===================================================== */

const isCategory = (
  value: string
): value is Category => {
  return (
    value === "Chicken" ||
    value === "Pork" ||
    value === "Fish" ||
    value === "Rice Meals" ||
    value === "Drinks"
  );
};

/* =====================================================
   MOCK MENU DATA
===================================================== */

const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Chicken Adobo",
    category: "Chicken",
    price: 50,
    available: true,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  },
  {
    id: 2,
    name: "Fried Chicken",
    category: "Chicken",
    price: 55,
    available: true,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  },
  {
    id: 3,
    name: "Pork Giniling",
    category: "Pork",
    price: 45,
    available: true,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
  {
    id: 4,
    name: "Pork Adobo",
    category: "Pork",
    price: 50,
    available: true,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554",
  },
  {
    id: 5,
    name: "Fried Fish",
    category: "Fish",
    price: 40,
    available: true,
    image:
      "https://images.unsplash.com/photo-1516685018646-549198525c1b",
  },
  {
    id: 6,
    name: "Sinigang na Bangus",
    category: "Fish",
    price: 55,
    available: false,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554",
  },
  {
    id: 7,
    name: "Garlic Rice",
    category: "Rice Meals",
    price: 20,
    available: true,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
  },
  {
    id: 8,
    name: "Plain Rice",
    category: "Rice Meals",
    price: 15,
    available: true,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19",
  },
  {
    id: 9,
    name: "Soft Drink",
    category: "Drinks",
    price: 25,
    available: true,
    image:
      "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e",
  },
  {
    id: 10,
    name: "Bottled Water",
    category: "Drinks",
    price: 20,
    available: true,
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d",
  },
  {
    id: 11,
    name: "Chicken Inasal",
    category: "Chicken",
    price: 90,
    available: true,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b",
  },
  {
    id: 12,
    name: "Pork Steak",
    category: "Pork",
    price: 85,
    available: true,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
  {
    id: 13,
    name: "Fried Bangus",
    category: "Fish",
    price: 60,
    available: true,
    image:
      "https://images.unsplash.com/photo-1516685018646-549198525c1b",
  },
  {
    id: 14,
    name: "Java Rice",
    category: "Rice Meals",
    price: 25,
    available: true,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
  },
  {
    id: 15,
    name: "Iced Tea",
    category: "Drinks",
    price: 30,
    available: true,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
  },
  {
    id: 16,
    name: "Calamansi Juice",
    category: "Drinks",
    price: 30,
    available: true,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696",
  },
];

/* =====================================================
   MAIN SCREEN
===================================================== */

export default function MenuManagement() {
  const [menuItems, setMenuItems] =
    useState<MenuItem[]>(INITIAL_MENU_ITEMS);

  /* ===================================================
     ADD MODAL
  =================================================== */

  const [showAddModal, setShowAddModal] =
    useState(false);

  /* ===================================================
     EDIT MODAL
  =================================================== */

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedMenuItem, setSelectedMenuItem] =
    useState<MenuItem | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [itemToDelete, setItemToDelete] =
    useState<MenuItem | null>(null);
  /* ===================================================
     AVAILABLE COUNT
  =================================================== */

  const availableCount = useMemo(() => {
    return menuItems.filter(
      (item) => item.available
    ).length;
  }, [menuItems]);

  /* ===================================================
     ADD MENU ITEM
  =================================================== */

  const handleAddMenuItem = (
    data: AddMenuData
  ) => {
    /*
      AddMenuModal returns category as string.
      Convert it safely into our Category type.
    */

    if (!isCategory(data.category)) {
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),

      name: data.name,

      category: data.category,

      price: data.price,

      available: data.available,

      image:
        data.image ||
        "https://images.unsplash.com/photo-1547592180-85f173990554",
    };

    setMenuItems((currentItems) => [
      newItem,
      ...currentItems,
    ]);

    setShowAddModal(false);
  };

  /* ===================================================
     OPEN EDIT MODAL
  =================================================== */

  const handleOpenEdit = (
    item: MenuItem
  ) => {
    setSelectedMenuItem(item);
    setShowEditModal(true);
  };

  /* ===================================================
     SAVE EDITED MENU ITEM
  =================================================== */

  const handleEditMenuItem = (
    data: EditMenuData
  ) => {
    /*
      Make sure the edited category
      is still one of our valid categories.
    */

    if (!isCategory(data.category)) {
      return;
    }

    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === data.id
          ? {
              ...item,
              name: data.name,
              category: data.category,
              price: data.price,
              available: data.available,
              image: data.image,
            }
          : item
      )
    );

    /*
      Close modal after saving.
    */

    setShowEditModal(false);
    setSelectedMenuItem(null);
  };

  /* ===================================================
     CLOSE EDIT MODAL
  =================================================== */

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedMenuItem(null);
  };

  /* ===================================================
     TOGGLE AVAILABILITY
  =================================================== */

  const toggleAvailability = (
    id: number
  ) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              available: !item.available,
            }
          : item
      )
    );
  };

  /* ===================================================
     DELETE ITEM
  =================================================== */

  const handleDeleteItem = (
    item: MenuItem
  ) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDeleteItem = () => {
    if (!itemToDelete) {
      return;
    }

    setMenuItems((currentItems) =>
      currentItems.filter(
        (currentItem) =>
          currentItem.id !== itemToDelete.id
      )
    );

    setShowDeleteModal(false);
    setItemToDelete(null);
  }

  const cancelDeleteItem = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }

  /* ===================================================
     SCREEN
  =================================================== */

  return (
    <View style={styles.container}>

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <AdminSidebar />

      {/* =================================================
          MAIN
      ================================================= */}

      <View style={styles.main}>

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <View>
            <Text style={styles.title}>
              Menu Management
            </Text>

            <Text style={styles.subtitle}>
              {menuItems.length} items ·{" "}
              {availableCount} available
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() =>
              setShowAddModal(true)
            }
          >
            <Text
              style={styles.addButtonText}
            >
              + Add Menu Item
            </Text>
          </Pressable>

        </View>

        {/* =================================================
            TABLE
        ================================================= */}

        <View style={styles.tableContainer}>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            {/* =================================================
                TABLE HEADER
            ================================================= */}

            <View style={styles.tableHeader}>

              <View style={styles.itemColumn}>
                <Text style={styles.headerText}>
                  ITEM
                </Text>
              </View>

              <View
                style={styles.categoryColumn}
              >
                <Text style={styles.headerText}>
                  CATEGORY
                </Text>
              </View>

              <View style={styles.priceColumn}>
                <Text style={styles.headerText}>
                  PRICE
                </Text>
              </View>

              <View
                style={styles.statusColumn}
              >
                <Text style={styles.headerText}>
                  STATUS
                </Text>
              </View>

              <View
                style={styles.actionsColumn}
              >
                <Text style={styles.headerText}>
                  ACTIONS
                </Text>
              </View>

            </View>

            {/* =================================================
                TABLE BODY
            ================================================= */}

            {menuItems.map((item) => (

              <View
                key={item.id}
                style={styles.tableRow}
              >

                {/* =============================================
                    ITEM
                ============================================= */}

                <View style={styles.itemColumn}>

                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.foodImage}
                  />

                  <Text
                    style={styles.itemName}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                </View>

                {/* =============================================
                    CATEGORY
                ============================================= */}

                <View
                  style={
                    styles.categoryColumn
                  }
                >

                  <View
                    style={
                      styles.categoryBadge
                    }
                  >

                    <Text
                      style={
                        styles.categoryText
                      }
                    >
                      {item.category}
                    </Text>

                  </View>

                </View>

                {/* =============================================
                    PRICE
                ============================================= */}

                <View
                  style={styles.priceColumn}
                >

                  <Text
                    style={styles.priceText}
                  >
                    ₱{item.price.toFixed(2)}
                  </Text>

                </View>

                {/* =============================================
                    STATUS
                ============================================= */}

                <View
                  style={
                    styles.statusColumn
                  }
                >

                  <Pressable
                    onPress={() =>
                      toggleAvailability(
                        item.id
                      )
                    }
                    style={[
                      styles.statusBadge,
                      item.available
                        ? styles.availableBadge
                        : styles.unavailableBadge,
                    ]}
                  >

                    <Text
                      style={[
                        styles.statusText,
                        item.available
                          ? styles.availableText
                          : styles.unavailableText,
                      ]}
                    >
                      {item.available
                        ? "Available"
                        : "Unavailable"}
                    </Text>

                  </Pressable>

                </View>

                {/* =============================================
                    ACTIONS
                ============================================= */}

                <View
                  style={
                    styles.actionsColumn
                  }
                >

                  <View
                    style={
                      styles.actionButtons
                    }
                  >

                    {/* EDIT */}

                    <Pressable
                      style={
                        styles.editButton
                      }
                      onPress={() =>
                        handleOpenEdit(item)
                      }
                    >
                      <Text
                        style={
                          styles.editButtonText
                        }
                      >
                        Edit
                      </Text>
                    </Pressable>

                    {/* DELETE */}

                    <Pressable
                      style={
                        styles.deleteButton
                      }
                      onPress={() =>
                        handleDeleteItem(item)
                      }
                    >
                      <Text
                        style={
                          styles.deleteButtonText
                        }
                      >
                        Delete
                      </Text>
                    </Pressable>

                  </View>

                </View>

              </View>

            ))}

          </ScrollView>

        </View>

      </View>

      {/* =================================================
          ADD MENU MODAL
      ================================================= */}

      <AddMenuModal
        visible={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
        onSave={handleAddMenuItem}
      />

      {/* =================================================
          EDIT MENU MODAL
      ================================================= */}

      <EditMenuModal
        visible={showEditModal}
        item={selectedMenuItem}
        onClose={handleCloseEdit}
        onSave={handleEditMenuItem}
      />

      <DeleteMenuModal
        visible={showDeleteModal}
        item={
          itemToDelete
        ? {
          id: itemToDelete.id,
          name: itemToDelete.name,
          } : null
        }

        onClose={cancelDeleteItem}
        onConfirm={confirmDeleteItem}
      />
    </View>
  );
}