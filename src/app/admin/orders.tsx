import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import AdminSidebar from "../../components/admin/AdminSidebar";
import SuccessToast from "@/components/admin/SuccessToast";

import { ordersStyles as styles } from "@/styles/admin/order.styles";
type Category =
  | "All"
  | "Rice Meals"
  | "Chicken"
  | "Pork"
  | "Drinks";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
};

type OrderItem = MenuItem & {
  quantity: number;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Chicken Adobo",
    price: 70,
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  },
  {
    id: 2,
    name: "Fried Chicken",
    price: 80,
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  },
  {
    id: 3,
    name: "Chicken Inasal",
    price: 90,
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b",
  },
  {
    id: 4,
    name: "Pork Sinigang",
    price: 75,
    category: "Pork",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",
  },
  {
    id: 5,
    name: "Pork Adobo",
    price: 70,
    category: "Pork",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
  },
  {
    id: 6,
    name: "Pork Steak",
    price: 85,
    category: "Pork",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
  {
    id: 7,
    name: "Garlic Rice",
    price: 20,
    category: "Rice Meals",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
  },
  {
    id: 8,
    name: "Plain Rice",
    price: 15,
    category: "Rice Meals",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
  },
  {
    id: 9,
    name: "Soft Drink",
    price: 25,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e",
  },
  {
    id: 10,
    name: "Bottled Water",
    price: 20,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d",
  },
];

const categories: Category[] = [
  "All",
  "Rice Meals",
  "Chicken",
  "Pork",
  "Drinks",
];

export default function Orders() {
    
    const [showSuccess, setShowSuccess] = useState(false);

    const [orderNumber, setSavedOrderNumber] = useState(372);


  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const [tableCustomer, setTableCustomer] =
    useState("");

  // ==========================================
  // FILTER MENU
  // ==========================================

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return menuItems;
    }

    return menuItems.filter(
      (item) => item.category === selectedCategory
    );
  }, [selectedCategory]);

  // ==========================================
  // ADD ITEM
  // ==========================================

  const addItem = (item: MenuItem) => {
    setOrderItems((currentItems) => {
      const existingItem = currentItems.find(
        (orderItem) => orderItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((orderItem) =>
          orderItem.id === item.id
            ? {
                ...orderItem,
                quantity: orderItem.quantity + 1,
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

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (id: number) => {
    setOrderItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (id: number) => {
    setOrderItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ==========================================
  // TOTALS
  // ==========================================

  const subtotal = orderItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  // ==========================================
  // SAVE ORDER
  // ==========================================

  const saveOrder = () => {
    if (orderItems.length === 0) {
      console.log("No items in order.");
      return;
    }
    
    console.log("Order saved:", {
      tableCustomer,
      items: orderItems,
      subtotal,
      total,
    });

    setShowSuccess(true);

    setTimeout(() => {
        setShowSuccess(false);
    }, 3000);

  };

  return (
    <View style={styles.container}>

      {/* ========================================
          SIDEBAR
      ======================================== */}

      <AdminSidebar />
    
      <SuccessToast 
        visible={showSuccess}
        orderNumber={orderNumber}
      />

      {/* ========================================
          MAIN AREA
      ======================================== */}

      <View style={styles.main}>



        {/* ======================================
            ORDER WORKSPACE
        ====================================== */}

        <View style={styles.workspace}>

          {/* ====================================
              LEFT SIDE - MENU
          ==================================== */}

            <View style={styles.menuSection}>

            {/* TITLE */}
            <View style={styles.pageHeading}>
                <Text style={styles.pageTitle}>
                New Order
                </Text>

                <Text style={styles.pageSubtitle}>
                Click items to add to order
                </Text>
            </View>

            {/* CATEGORIES */}
            <View style={styles.categoryContainer}>
                {categories.map((category) => {
                const active = selectedCategory === category;

                return (
                    <Pressable
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[
                        styles.categoryButton,
                        active && styles.categoryButtonActive,
                    ]}
                    >
                    <Text
                        style={[
                        styles.categoryText,
                        active && styles.categoryTextActive,
                        ]}
                    >
                        {category}
                    </Text>
                    </Pressable>
                );
                })}
            </View>

            {/* MENU ITEMS */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.menuGrid}
            >
                {filteredItems.map((item) => (
                <Pressable
                    key={item.id}
                    onPress={() => addItem(item)}
                    style={styles.menuCard}
                >
                    <Image
                    source={{ uri: item.image }}
                    style={styles.menuImage}
                    resizeMode="cover"
                    />

                    <View style={styles.menuInfo}>
                    <Text
                        style={styles.menuItemName}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>

                    <Text style={styles.menuItemPrice}>
                        ₱{item.price.toFixed(2)}
                    </Text>
                    </View>
                </Pressable>
                ))}
            </ScrollView>

            </View>


          {/* ====================================
              RIGHT SIDE - CURRENT ORDER
          ==================================== */}

          <View style={styles.orderSection}>

            {/* ORDER HEADER */}

            <View style={styles.orderHeader}>

              <Text style={styles.orderTitle}>
                Current Order
              </Text>

              <Text style={styles.orderSubtitle}>
                New transaction
              </Text>

            </View>


            {/* TABLE / CUSTOMER */}

            <View style={styles.inputContainer}>

              <Text style={styles.inputLabel}>
                Table / Customer No.
              </Text>

              <TextInput
                value={tableCustomer}
                onChangeText={setTableCustomer}
                placeholder="e.g. Table 3, Juan"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
              />

            </View>


            {/* ORDER ITEMS */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.orderItemsScroll}
              contentContainerStyle={
                orderItems.length === 0
                  ? styles.emptyOrderContainer
                  : styles.orderItemsContainer
              }
            >

              {orderItems.length === 0 ? (

                /* EMPTY STATE */

                <View style={styles.emptyOrder}>

                  <View style={styles.emptyIcon}>

                    <Text style={styles.emptyIconText}>
                      🍽
                    </Text>

                  </View>

                  <Text style={styles.emptyTitle}>
                    No items added yet
                  </Text>

                  <Text style={styles.emptySubtitle}>
                    Click menu items to add
                  </Text>

                </View>

              ) : (

                /* ORDER ITEMS */

                orderItems.map((item) => (

                  <View
                    key={item.id}
                    style={styles.orderItem}
                  >

                    <View style={styles.orderItemInfo}>

                      <Text
                        style={styles.orderItemName}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>

                      <Text style={styles.orderItemPrice}>
                        ₱{item.price.toFixed(2)}
                      </Text>

                    </View>


                    {/* QUANTITY */}

                    <View style={styles.quantityContainer}>

                      <Pressable
                        onPress={() =>
                          decreaseQuantity(item.id)
                        }
                        style={styles.quantityButton}
                      >
                        <Text
                          style={styles.quantityButtonText}
                        >
                          −
                        </Text>
                      </Pressable>

                      <Text style={styles.quantityText}>
                        {item.quantity}
                      </Text>

                      <Pressable
                        onPress={() =>
                          increaseQuantity(item.id)
                        }
                        style={styles.quantityButton}
                      >
                        <Text
                          style={styles.quantityButtonText}
                        >
                          +
                        </Text>
                      </Pressable>

                    </View>


                    {/* ITEM TOTAL */}

                    <Text style={styles.orderItemTotal}>
                      ₱
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </Text>

                  </View>

                ))

              )}

            </ScrollView>


            {/* ==================================
                ORDER SUMMARY
            ================================== */}

            <View style={styles.summary}>

              <View style={styles.summaryRow}>

                <Text style={styles.summaryLabel}>
                  Subtotal
                </Text>

                <Text style={styles.summaryValue}>
                  ₱{subtotal.toFixed(2)}
                </Text>

              </View>


              <View style={styles.summaryDivider} />


              <View style={styles.totalRow}>

                <Text style={styles.totalLabel}>
                  Total
                </Text>

                <Text style={styles.totalValue}>
                  ₱{total.toFixed(2)}
                </Text>

              </View>


              {/* SAVE ORDER */}

              <Pressable
                onPress={saveOrder}
                style={[
                  styles.saveButton,
                  orderItems.length === 0 &&
                    styles.saveButtonDisabled,
                ]}
              >

                <Text style={styles.saveButtonText}>
                  Save Order
                </Text>

              </Pressable>

            </View>

          </View>

        </View>

      </View>

    </View>
  );
}