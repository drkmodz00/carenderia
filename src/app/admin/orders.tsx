import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import AdminBottomNav from "@/components/admin/AdminBottomNav";

import {
  orderStyles as styles,
} from "@/styles/admin/order.styles";

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

type OrderItem = MenuItem & {
  quantity: number;
};

/* =====================================================
   CATEGORIES
===================================================== */

const categories: Category[] = [
  "All",
  "Chicken",
  "Pork",
  "Fish",
  "Rice Meals",
  "Drinks",
];

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
    icon: "🍗",
  },
  {
    id: 2,
    name: "Fried Chicken",
    category: "Chicken",
    price: 55,
    available: true,
    icon: "🍗",
  },
  {
    id: 3,
    name: "Pork Giniling",
    category: "Pork",
    price: 45,
    available: true,
    icon: "🥩",
  },
  {
    id: 4,
    name: "Pork Adobo",
    category: "Pork",
    price: 50,
    available: true,
    icon: "🥩",
  },
  {
    id: 5,
    name: "Fried Fish",
    category: "Fish",
    price: 40,
    available: true,
    icon: "🐟",
  },
  {
    id: 6,
    name: "Sinigang na Baboy",
    category: "Pork",
    price: 80,
    available: true,
    icon: "🍲",
  },
  {
    id: 7,
    name: "Garlic Rice",
    category: "Rice Meals",
    price: 20,
    available: true,
    icon: "🍚",
  },
  {
    id: 8,
    name: "Plain Rice",
    category: "Rice Meals",
    price: 15,
    available: true,
    icon: "🍚",
  },
  {
    id: 9,
    name: "Softdrinks",
    category: "Drinks",
    price: 25,
    available: true,
    icon: "🥤",
  },
  {
    id: 10,
    name: "Buko Juice",
    category: "Drinks",
    price: 30,
    available: true,
    icon: "🥥",
  },
  {
    id: 11,
    name: "Tubig (Water)",
    category: "Drinks",
    price: 15,
    available: true,
    icon: "💧",
  },
  {
    id: 12,
    name: "Halo-Halo",
    category: "Drinks",
    price: 55,
    available: true,
    icon: "🍧",
  },
  {
    id: 13,
    name: "Leche Flan",
    category: "Drinks",
    price: 40,
    available: true,
    icon: "🍮",
  },
  {
    id: 14,
    name: "Pancit Bihon",
    category: "Rice Meals",
    price: 55,
    available: true,
    icon: "🍜",
  },
];

/* =====================================================
   MAIN SCREEN
===================================================== */

export default function OrderScreen() {
  const router = useRouter();

  const [menuItems] = useState<MenuItem[]>(
    INITIAL_MENU_ITEMS
  );

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<Category>("All");

  const [orderItems, setOrderItems] =
    useState<OrderItem[]>([]);

  /* ===================================================
     FILTER MENU
  =================================================== */

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return menuItems;
    }

    return menuItems.filter(
      (item) =>
        item.category === selectedCategory
    );
  }, [menuItems, selectedCategory]);

  /* ===================================================
     TOTAL
  =================================================== */

  const orderTotal = useMemo(() => {
    return orderItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );
  }, [orderItems]);

  /* ===================================================
     COUNT
  =================================================== */

  const orderCount = useMemo(() => {
    return orderItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [orderItems]);

  /* ===================================================
     ADD ITEM
  =================================================== */

  const handleAddToOrder = (
    item: MenuItem
  ) => {
    if (!item.available) {
      return;
    }

    setOrderItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (orderItem) =>
            orderItem.id === item.id
        );

      if (existingItem) {
        return currentItems.map(
          (orderItem) =>
            orderItem.id === item.id
              ? {
                  ...orderItem,
                  quantity:
                    orderItem.quantity + 1,
                }
              : orderItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  /* ===================================================
     INCREASE
  =================================================== */

  const increaseQuantity = (
    id: number
  ) => {
    setOrderItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  /* ===================================================
     DECREASE
  =================================================== */

  const decreaseQuantity = (
    id: number
  ) => {
    setOrderItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  /* ===================================================
     CLEAR
  =================================================== */

  const clearOrder = () => {
    setOrderItems([]);
  };

  /* ===================================================
     CHECKOUT → PAYMENT PAGE
  =================================================== */

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      return;
    }

    router.push({
      pathname: "/admin/payment",
      params: {
        total: String(orderTotal),
        order: JSON.stringify(
          orderItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            icon: item.icon || "🍽️",
          }))
        ),
      },
    });
  };

  /* ===================================================
     SCREEN
  =================================================== */

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.orangeHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.storeTitle}>
            Carenderia ni Aling Rosa
          </Text>

          <Text style={styles.dateText}>
            Aug 23, 2026 · 08:57 AM
          </Text>
        </View>

        <View style={styles.cashierBox}>
          <Text style={styles.cashierLabel}>
            CASHIER
          </Text>

          <Text style={styles.cashierName}>
            Maria
          </Text>
        </View>
      </View>

      {/* CATEGORIES */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={
          styles.categoryContent
        }
      >
        {categories.map((category) => {
          const active =
            selectedCategory === category;

          return (
            <Pressable
              key={category}
              onPress={() =>
                setSelectedCategory(
                  category
                )
              }
              style={[
                styles.categoryTab,
                active &&
                  styles.activeCategoryTab,
              ]}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  active &&
                    styles.activeCategoryTabText,
                ]}
              >
                {category === "All"
                  ? "Lahat"
                  : category ===
                    "Rice Meals"
                  ? "Rice"
                  : category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* MENU */}

      <ScrollView
        style={styles.menuScroll}
        contentContainerStyle={
          styles.menuGrid
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.map((item) => (
          <View
            key={item.id}
            style={[
              styles.menuCard,
              !item.available &&
                styles.unavailableCard,
            ]}
          >
            <View
              style={
                styles.foodIconContainer
              }
            >
              <Text
                style={styles.foodIcon}
              >
                {item.icon || "🍽️"}
              </Text>
            </View>

            <Text
              style={styles.foodName}
              numberOfLines={2}
            >
              {item.name}
            </Text>

            <View
              style={styles.cardBottom}
            >
              <Text
                style={styles.foodPrice}
              >
                ₱{item.price}
              </Text>

              <Pressable
                disabled={!item.available}
                onPress={() =>
                  handleAddToOrder(item)
                }
                style={[
                  styles.plusButton,
                  !item.available &&
                    styles.disabledPlusButton,
                ]}
              >
                <Text
                  style={styles.plusText}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* CURRENT ORDER */}

      {orderItems.length > 0 && (
        <View style={styles.orderPanel}>

          <View
            style={styles.orderHeader}
          >
            <View>
              <Text
                style={styles.orderTitle}
              >
                Order ({orderCount} item
                {orderCount !== 1
                  ? "s"
                  : ""})
              </Text>
            </View>

            <Pressable
              onPress={clearOrder}
            >
              <Text
                style={styles.clearOrderText}
              >
                Clear
              </Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.orderItems}
            showsVerticalScrollIndicator={
              false
            }
          >
            {orderItems.map((item) => (
              <View
                key={item.id}
                style={styles.orderItem}
              >

                <View
                  style={
                    styles.orderItemInfo
                  }
                >
                  <Text
                    style={
                      styles.orderItemIcon
                    }
                  >
                    {item.icon ||
                      "🍽️"}
                  </Text>

                  <View
                    style={
                      styles.orderItemTextContainer
                    }
                  >
                    <Text
                      style={
                        styles.orderItemName
                      }
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={
                        styles.orderItemPrice
                      }
                    >
                      ₱{item.price} ×{" "}
                      {item.quantity}
                    </Text>
                  </View>
                </View>

                <View
                  style={
                    styles.quantityControls
                  }
                >
                  <Pressable
                    style={
                      styles.quantityButton
                    }
                    onPress={() =>
                      decreaseQuantity(
                        item.id
                      )
                    }
                  >
                    <Text
                      style={
                        styles.quantityButtonText
                      }
                    >
                      −
                    </Text>
                  </Pressable>

                  <Text
                    style={
                      styles.quantityText
                    }
                  >
                    {item.quantity}
                  </Text>

                  <Pressable
                    style={
                      styles.quantityButton
                    }
                    onPress={() =>
                      increaseQuantity(
                        item.id
                      )
                    }
                  >
                    <Text
                      style={
                        styles.quantityButtonText
                      }
                    >
                      +
                    </Text>
                  </Pressable>
                </View>

                <Text
                  style={
                    styles.orderItemTotal
                  }
                >
                  ₱
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </Text>

              </View>
            ))}
          </ScrollView>

          {/* TOTAL + CHECKOUT */}

          <View
            style={styles.orderFooter}
          >
            <View>
              <Text
                style={styles.totalLabel}
              >
                TOTAL
              </Text>

              <Text
                style={styles.totalAmount}
              >
                ₱{orderTotal.toFixed(2)}
              </Text>
            </View>

            <Pressable
              style={
                styles.checkoutButton
              }
              onPress={handleCheckout}
            >
              <Text
                style={
                  styles.checkoutButtonText
                }
              >
                Checkout →
              </Text>
            </Pressable>
          </View>

        </View>
      )}

      {/* BOTTOM NAV */}

      <AdminBottomNav />

    </View>
  );
}