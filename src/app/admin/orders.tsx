import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdminBottomNav from "@/components/admin/AdminBottomNav";
import ErrorToast from "@/components/admin/toast/ErrorToast";
import { createOrderStyles } from "@/styles/admin/order.styles";
import { createOrder } from "@/lib/order";
import { supabase } from "@/lib/supabase";
import { getCurrentProfile, getRestaurantSettings } from "@/lib/setting";

// =====================================================
// TYPES
// =====================================================

type Category = { id: string; name: string };

type MenuItem = {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
  price: number;
  available: boolean;
  image: string | null;
};

type OrderItem = MenuItem & { quantity: number };

type HeaderData = { storeName: string; cashierName: string };

type OrderType = "Dine In" | "Take Out";

// =====================================================
// COMPONENT
// =====================================================

export default function OrderScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // RESPONSIVE
  const isTablet = width >= 768;
  const numColumns = isTablet ? (width >= 1024 ? 4 : 3) : 2;
  const styles = useMemo(() => createOrderStyles(isTablet, numColumns), [isTablet, numColumns]);

  // ROUTE PARAMS
  const params = useLocalSearchParams<{
    mode?: string;
    orderId?: string;
    customerName?: string;
    orderType?: string;
  }>();
  const isEditMode = params.mode === "edit";

  // STATE
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("Dine In");
  const [headerData, setHeaderData] = useState<HeaderData>({
    storeName: "Restaurant",
    cashierName: "Cashier",
  });

  // ERROR TOAST
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastTitle, setErrorToastTitle] = useState("Incomplete Order");
  const [errorToastMessage, setErrorToastMessage] = useState("");

  const showError = (title: string, message: string) => {
    setErrorToastTitle(title);
    setErrorToastMessage(message);
    setShowErrorToast(true);
  };

  useEffect(() => {
    if (!showErrorToast) return;
    const timer = setTimeout(() => setShowErrorToast(false), 4000);
    return () => clearTimeout(timer);
  }, [showErrorToast]);

  // =====================================================
  // LOAD HEADER
  // =====================================================

  const loadHeader = async () => {
    try {
      try {
        const settings = await getRestaurantSettings();
        setHeaderData((current) => ({
          ...current,
          storeName: settings.name?.trim() || "Restaurant",
        }));
      } catch (error) {
        console.warn("Unable to load restaurant settings:", error);
      }

      try {
        const profile = await getCurrentProfile();
        if (profile) {
          const data = profile as { name?: string | null; username?: string | null };
          const displayName = data.name?.trim() || data.username?.trim();
          if (displayName) {
            setHeaderData((current) => ({ ...current, cashierName: displayName }));
            return;
          }
        }
      } catch (error) {
        console.warn("Unable to load profile:", error);
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.warn("Session error:", error);
        return;
      }
      if (session?.user) {
        setHeaderData((current) => ({
          ...current,
          cashierName: session.user.email ?? "Cashier",
        }));
      }
    } catch (error) {
      console.error("Failed to load header:", error);
    }
  };

  // =====================================================
  // LOAD MENU
  // =====================================================

  const loadMenu = async () => {
    try {
      setIsLoadingMenu(true);

      const [categoriesResult, menuResult] = await Promise.all([
        supabase.from("categories").select("id, name").order("name", { ascending: true }),
        supabase
          .from("menu_items")
          .select(`
            id,
            category_id,
            name,
            price,
            image_url,
            available,
            categories ( id, name )
          `)
          .order("name", { ascending: true }),
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (menuResult.error) throw menuResult.error;

      setCategories(
        (categoriesResult.data ?? []).map((category) => ({
          id: String(category.id),
          name: category.name,
        }))
      );

      setMenuItems(
        (menuResult.data ?? []).map((item: any) => ({
          id: String(item.id),
          name: item.name,
          category_id: String(item.category_id),
          category_name: item.categories?.name ?? "Uncategorized",
          price: Number(item.price),
          available: Boolean(item.available),
          image: item.image_url ?? null,
        }))
      );
    } catch (error) {
      console.error("Failed to load menu:", error);
      Alert.alert("Menu Error", error instanceof Error ? error.message : "Unable to load menu.");
    } finally {
      setIsLoadingMenu(false);
    }
  };

  // =====================================================
  // LOAD EXISTING ORDER
  // =====================================================

  const loadExistingOrder = async () => {
    if (!isEditMode || !params.orderId) return;

    try {
      console.log("Loading existing order:", params.orderId);

      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          customer_name,
          order_type,
          status,
          total,
          order_items ( id, menu_item_id, quantity, unit_price, subtotal, image )
        `)
        .eq("id", params.orderId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Order not found.");

      setCustomerName(data.customer_name ?? "");

      if (data.order_type === "dine_in") setOrderType("Dine In");
      else if (data.order_type === "take_out") setOrderType("Take Out");

      const loadedItems: OrderItem[] = (data.order_items ?? []).map((item: any) => {
        const menuItem = menuItems.find((menu) => menu.id === String(item.menu_item_id));
        return {
          id: String(item.menu_item_id),
          name: menuItem?.name ?? "Unknown Item",
          category_id: menuItem?.category_id ?? "",
          category_name: menuItem?.category_name ?? "Uncategorized",
          price: Number(item.unit_price),
          available: menuItem?.available ?? true,
          image: menuItem?.image ?? item.image ?? null,
          quantity: Number(item.quantity),
        };
      });

      setOrderItems(loadedItems);

      console.log("Existing order loaded:", data.id);
      console.log("Customer:", data.customer_name);
      console.log("Items:", loadedItems);
    } catch (error) {
      console.error("Failed to load existing order:", error);
      showError(
        "Unable to Load Order",
        error instanceof Error ? error.message : "Unable to load the existing order."
      );
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    loadHeader();
    loadMenu();
  }, []);

  // LOAD EXISTING ORDER AFTER MENU LOAD
  useEffect(() => {
    if (!isEditMode || !params.orderId || !menuItems.length) return;
    loadExistingOrder();
  }, [isEditMode, params.orderId, menuItems.length]);

  // FALLBACK CUSTOMER NAME FROM PARAM
  useEffect(() => {
    if (!isEditMode) return;
    if (typeof params.customerName === "string" && params.customerName.trim()) {
      setCustomerName(params.customerName);
    }
  }, [isEditMode, params.customerName]);

  // FALLBACK ORDER TYPE FROM PARAM
  useEffect(() => {
    if (!isEditMode) return;
    if (params.orderType === "Dine In") setOrderType("Dine In");
    if (params.orderType === "Take Out") setOrderType("Take Out");
  }, [isEditMode, params.orderType]);

  // FILTER MENU
  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category_id === selectedCategory),
    [menuItems, selectedCategory]
  );

  // TOTAL
  const orderTotal = useMemo(
    () => orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [orderItems]
  );

  // ADD ITEM
  const handleAddToOrder = (item: MenuItem) => {
    if (!item.available || isCreatingOrder) return;
    setShowErrorToast(false);

    setOrderItems((current) => {
      const existing = current.find((orderItem) => orderItem.id === item.id);
      if (existing) {
        return current.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  // INCREASE / DECREASE QUANTITY
  const increaseQuantity = (id: string) => {
    if (isCreatingOrder) return;
    setOrderItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (id: string) => {
    if (isCreatingOrder) return;
    setOrderItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // ORDER TYPE
  const handleSelectOrderType = (type: OrderType) => {
    if (isCreatingOrder) return;
    setOrderType(type);
  };

  // CLEAR ORDER
  const clearOrder = () => {
    if (isCreatingOrder) return;
    setOrderItems([]);
    setCustomerName("");
    setOrderType("Dine In");
    setShowErrorToast(false);
  };

  // =====================================================
  // UPDATE EXISTING ORDER
  // =====================================================

  const updateExistingOrder = async (orderId: string, cleanCustomerName: string) => {
    const { error: orderError } = await supabase
      .from("orders")
      .update({
        customer_name: cleanCustomerName,
        order_type: orderType === "Dine In" ? "dine_in" : "take_out",
        total: Number(orderTotal.toFixed(2)),
        // IMPORTANT: Editing does not complete the order.
        status: "ongoing",
      })
      .eq("id", orderId);

    if (orderError) throw orderError;

    const { error: deleteItemsError } = await supabase
      .from("order_items")
      .delete()
      .eq("order_id", orderId);

    if (deleteItemsError) throw deleteItemsError;

    const updatedOrderItems = orderItems.map((item) => ({
      order_id: orderId,
      menu_item_id: item.id,
      quantity: item.quantity,
      unit_price: Number(item.price.toFixed(2)),
      subtotal: Number((item.price * item.quantity).toFixed(2)),
      image: item.image,
    }));

    const { error: insertItemsError } = await supabase.from("order_items").insert(updatedOrderItems);
    if (insertItemsError) throw insertItemsError;
  };

  // =====================================================
  // CHECKOUT
  // =====================================================

  const handleCheckout = async () => {
    if (isCreatingOrder) return;

    const cleanCustomerName = customerName.trim();

    if (!cleanCustomerName) {
      showError("Customer Name Required", "Please enter the customer's name before saving the order.");
      return;
    }

    if (!orderItems.length) {
      showError("Order is Empty", "Please add at least one menu item before saving.");
      return;
    }

    try {
      setShowErrorToast(false);
      setIsCreatingOrder(true);

      let orderId: string;

      if (isEditMode && params.orderId) {
        console.log("UPDATING EXISTING ORDER:", params.orderId);
        await updateExistingOrder(params.orderId, cleanCustomerName);
        orderId = params.orderId;
        console.log("EXISTING ORDER UPDATED:", orderId);
      } else {
        const createdOrder = await createOrder(
          cleanCustomerName,
          orderItems.map((item) => ({
            menu_item_id: item.id,
            name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            image: item.image,
          })),
          orderType,
          Number(orderTotal.toFixed(2))
        );
        orderId = createdOrder.id;
        console.log("NEW ORDER CREATED:", orderId);
      }

      router.push({
        pathname: "/admin/payment",
        params: {
          orderId,
          total: orderTotal.toFixed(2),
          customerName: cleanCustomerName,
          orderType,
          orderItems: JSON.stringify(
            orderItems.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            }))
          ),
        },
      });
    } catch (error) {
      console.error(isEditMode ? "Update order error:" : "Create order error:", error);
      showError(
        isEditMode ? "Unable to Update Order" : "Unable to Save Order",
        error instanceof Error ? error.message : "Something went wrong while saving the order."
      );
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoadingMenu) {
    return (
      <View style={[styles.container, styles.centered, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ActivityIndicator size="large" color="#F97316" />
        <Text style={styles.loadingText}>Loading menu...</Text>
        <AdminBottomNav />
      </View>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right },
      ]}
    >
      {/* PAGE HEADER */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>{isEditMode ? "Edit Order" : "New Order"}</Text>
        <Text style={styles.pageHint}>
          {isEditMode ? "Update the existing order" : "Click items to add to order"}
        </Text>
      </View>

      <View style={styles.mainRow}>
        {/* MENU */}
        <View style={styles.leftPane}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContent}
          >
            {[{ id: "All", name: "All" }, ...categories].map((category) => {
              const active = selectedCategory === category.id;
              return (
                <Pressable
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[styles.categoryTab, active && styles.activeCategoryTab]}
                >
                  <Text style={[styles.categoryTabText, active && styles.activeCategoryTabText]}>
                    {category.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <ScrollView
            style={styles.menuScroll}
            contentContainerStyle={styles.menuGrid}
            showsVerticalScrollIndicator={false}
          >
            {!filteredItems.length ? (
              <View style={styles.emptyMenu}>
                <Text style={styles.emptyMenuText}>No menu items available.</Text>
              </View>
            ) : (
              filteredItems.map((item) => {
                const quantityInCart =
                  orderItems.find((orderItem) => orderItem.id === item.id)?.quantity ?? 0;

                return (
                  <Pressable
                    key={item.id}
                    disabled={!item.available || isCreatingOrder}
                    onPress={() => handleAddToOrder(item)}
                    style={[
                      styles.foodCard,
                      !item.available && styles.unavailableCard,
                      quantityInCart > 0 && styles.foodCardSelected,
                    ]}
                  >
                    <View style={styles.foodImageWrap}>
                      {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.foodImage} resizeMode="cover" />
                      ) : (
                        <View style={styles.foodImagePlaceholder}>
                          <Text style={styles.foodIcon}>🍽️</Text>
                        </View>
                      )}

                      {quantityInCart > 0 && (
                        <View style={styles.quantityBadge}>
                          <Text style={styles.quantityBadgeText}>×{quantityInCart}</Text>
                        </View>
                      )}

                      {!item.available && (
                        <View style={styles.soldOutBadge}>
                          <Text style={styles.soldOutBadgeText}>SOLD OUT</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.foodCardBody}>
                      <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.foodPrice}>₱{item.price.toFixed(2)}</Text>
                    </View>
                  </Pressable>
                );
              })
            )}
          </ScrollView>
        </View>

        {/* CURRENT ORDER */}
        <View style={styles.orderPanel}>
          <View style={styles.orderPanelHeader}>
            <Text style={styles.orderPanelTitle}>{isEditMode ? "Editing Order" : "Current Order"}</Text>
            <Text style={styles.tableInputLabel}>Customer Name</Text>
            <TextInput
              value={customerName}
              onChangeText={(text) => {
                setCustomerName(text);
                if (text.trim()) setShowErrorToast(false);
              }}
              placeholder="e.g. Juan Dela Cruz"
              placeholderTextColor="#B3AB9C"
              style={styles.tableInput}
              editable={!isCreatingOrder}
              autoCapitalize="words"
            />
          </View>

          {/* ORDER TYPE */}
          <View style={styles.orderTypeSection}>
            <Text style={styles.orderTypeLabel}>Order Type</Text>
            <View style={styles.orderTypeButtons}>
              <Pressable
                style={[styles.orderTypeButton, orderType === "Dine In" && styles.orderTypeButtonActive]}
                onPress={() => handleSelectOrderType("Dine In")}
                disabled={isCreatingOrder}
              >
                <Text style={[styles.orderTypeButtonText, orderType === "Dine In" && styles.orderTypeButtonTextActive]}>
                  Dine In
                </Text>
              </Pressable>

              <Pressable
                style={[styles.orderTypeButton, orderType === "Take Out" && styles.orderTypeButtonActive]}
                onPress={() => handleSelectOrderType("Take Out")}
                disabled={isCreatingOrder}
              >
                <Text style={[styles.orderTypeButtonText, orderType === "Take Out" && styles.orderTypeButtonTextActive]}>
                  Take Out
                </Text>
              </Pressable>
            </View>
          </View>

          {/* ORDER ITEMS */}
          {!orderItems.length ? (
            <View style={styles.emptyOrderContainer}>
              <Text style={styles.emptyCartIcon}>🍽️</Text>
              <Text style={styles.emptyOrderTitle}>No items added yet</Text>
              <Text style={styles.emptyOrderSubtitle}>Click menu items to add</Text>
            </View>
          ) : (
            <ScrollView style={styles.orderItemsList} showsVerticalScrollIndicator={false}>
              {orderItems.map((item) => (
                <View key={item.id} style={styles.orderLineItem}>
                  <View style={styles.orderLineInfo}>
                    <Text style={styles.orderLineName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.orderLineSub}>₱{item.price.toFixed(2)} each</Text>
                  </View>

                  <View style={styles.orderLineControls}>
                    <Pressable disabled={isCreatingOrder} style={styles.stepperButton} onPress={() => decreaseQuantity(item.id)}>
                      <Text style={styles.stepperButtonText}>−</Text>
                    </Pressable>

                    <Text style={styles.stepperValue}>{item.quantity}</Text>

                    <Pressable
                      disabled={isCreatingOrder}
                      style={[styles.stepperButton, styles.stepperButtonPlus]}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text style={[styles.stepperButtonText, styles.stepperButtonTextPlus]}>+</Text>
                    </Pressable>
                  </View>

                  <Text style={styles.orderLineTotal}>₱{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </ScrollView>
          )}

          {/* ORDER FOOTER */}
          <View style={styles.orderFooter}>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal</Text>
              <Text style={styles.subtotalValue}>₱{orderTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabelBold}>Total</Text>
              <Text style={styles.totalValueBold}>₱{orderTotal.toFixed(2)}</Text>
            </View>

            <Pressable
              style={[styles.saveOrderButton, (!orderItems.length || isCreatingOrder) && styles.saveOrderButtonDisabled]}
              disabled={!orderItems.length || isCreatingOrder}
              onPress={handleCheckout}
            >
              <Text style={styles.saveOrderButtonText}>
                {isCreatingOrder ? "SAVING..." : isEditMode ? "UPDATE ORDER" : "SAVE ORDER"}
              </Text>
            </Pressable>

            <View style={styles.footerBottomRow}>
              <Pressable disabled={!orderItems.length || isCreatingOrder} onPress={clearOrder}>
                <Text style={styles.clearOrderLink}>Clear Order</Text>
              </Pressable>

              <View style={styles.helpCircle}>
                <Text style={styles.helpCircleText}>?</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* ERROR TOAST */}
      <ErrorToast visible={showErrorToast} title={errorToastTitle} message={errorToastMessage} />

      <AdminBottomNav />
    </View>
  );
}