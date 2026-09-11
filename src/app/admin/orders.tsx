import { Ionicons } from "@expo/vector-icons";
import MobileOrderModal from "@/components/admin/modals/mobile/MobileOrderModal";
import ErrorToast from "@/components/admin/toast/ErrorToast";
import AdminBottomNav from "@/components/admin/AdminBottomNav";

import { useRouter } from "expo-router";
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

import { SafeAreaView } from "react-native-safe-area-context";

import { createOrder } from "@/lib/order";
import { supabase } from "@/lib/supabase";
import {
  getCurrentProfile,
  getRestaurantSettings,
} from "@/lib/setting";

import { createOrderStyles } from "@/styles/admin/order.styles";
import { createMobileOrderModalStyles } from "@/styles/admin/modals/mobile/mobile-order-modal.styles";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Category = {
  id: string;
  name: string;
};

type MenuItem = {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
  price: number;
  available: boolean;
  image: string | null;
};

type OrderItem = MenuItem & {
  quantity: number;
};

type HeaderData = {
  storeName: string;
  cashierName: string;
};

type OrderType = "Dine In" | "Take Out";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function OrderScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // ---------------------------------------------------------------------------
  // Responsive
  // ---------------------------------------------------------------------------

  const responsive = useMemo(
    () => ({
      width,
      height,
      isSmallPhone: width < 360,
      isPhone: width < 768,
      isTablet: width >= 768 && width < 1024,
      isLargeTablet: width >= 1024 && width < 1200,
      isDesktop: width >= 1200,
      isLargeDesktop: width >= 1440,
    }),
    [width, height]
  );

  const isTablet =
    responsive.isTablet ||
    responsive.isLargeTablet ||
    responsive.isDesktop;

  // ---------------------------------------------------------------------------
  // Number of menu columns
  // ---------------------------------------------------------------------------
  //
  // This matches the createOrderStyles(isTablet, numColumns) API.
  //
  // Phone:
  //   small phones -> 2
  //   normal phones -> 2
  //
  // Tablet/Desktop:
  //   smaller tablet -> 3
  //   larger screens -> 4
  //
  // IMPORTANT:
  // Do not compare numColumns === 1 when TypeScript has already inferred
  // numColumns as 2 | 3 | 4.
  // ---------------------------------------------------------------------------

  const numColumns = useMemo(() => {
    if (width < 768) {
      return 2;
    }

    if (width < 1024) {
      return 3;
    }

    return 4;
  }, [width]);


  const styles = useMemo(
    () => createOrderStyles({width, height}),
    [width, height]
  );

  const mobileStyles = useMemo(
    () => createMobileOrderModalStyles(width),
    [width]
  );


  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] =
    useState<OrderType>("Dine In");

  const [showMobileOrder, setShowMobileOrder] =
    useState(false);

  const [headerData, setHeaderData] = useState<HeaderData>({
    storeName: "Restaurant",
    cashierName: "Cashier",
  });

  const [showErrorToast, setShowErrorToast] =
    useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // ---------------------------------------------------------------------------
  // Error handling
  // ---------------------------------------------------------------------------

  const showError = (message: string) => {
    setErrorMessage(message);
    setShowErrorToast(true);

    setTimeout(() => {
      setShowErrorToast(false);
    }, 3000);
  };

  // ---------------------------------------------------------------------------
  // Load Header
  // ---------------------------------------------------------------------------

  const loadHeader = async () => {
    try {
      // Load restaurant settings
      try {
        const settings = await getRestaurantSettings();

        setHeaderData((current) => ({
          ...current,
          storeName:
            settings.name?.trim() || "Restaurant",
        }));
      } catch (error) {
        console.warn(
          "Unable to load restaurant settings:",
          error
        );
      }

      // Load cashier profile
      try {
        const profile = await getCurrentProfile();

        if (profile) {
          const data = profile as {
            name?: string | null;
            username?: string | null;
          };

          const displayName =
            data.name?.trim() ||
            data.username?.trim();

          if (displayName) {
            setHeaderData((current) => ({
              ...current,
              cashierName: displayName,
            }));

            return;
          }
        }
      } catch (error) {
        console.warn(
          "Unable to load profile:",
          error
        );
      }

      // Fallback to authenticated user's email
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.warn("Session error:", error);
        return;
      }

      if (session?.user) {
        setHeaderData((current) => ({
          ...current,
          cashierName:
            session.user.email ?? "Cashier",
        }));
      }
    } catch (error) {
      console.error(
        "Failed to load header:",
        error
      );
    }
  };

  // ---------------------------------------------------------------------------
  // Load Menu
  // ---------------------------------------------------------------------------

  const loadMenu = async () => {
    try {
      setIsLoadingMenu(true);

      const [categoriesResult, menuResult] =
        await Promise.all([
          supabase
            .from("categories")
            .select("id, name")
            .order("name", {
              ascending: true,
            }),

          supabase
            .from("menu_items")
            .select(
              `
                id,
                category_id,
                name,
                price,
                image_url,
                available,
                categories (
                  id,
                  name
                )
              `
            )
            .order("name", {
              ascending: true,
            }),
        ]);

      if (categoriesResult.error) {
        throw categoriesResult.error;
      }

      if (menuResult.error) {
        throw menuResult.error;
      }

      // Categories
      setCategories(
        (categoriesResult.data ?? []).map(
          (category) => ({
            id: String(category.id),
            name: category.name,
          })
        )
      );

      // Menu items
      setMenuItems(
        (menuResult.data ?? []).map(
          (item: any) => ({
            id: String(item.id),
            name: item.name,
            category_id: String(
              item.category_id
            ),
            category_name:
              item.categories?.name ??
              "Uncategorized",
            price: Number(item.price),
            available: Boolean(
              item.available
            ),
            image:
              item.image_url ?? null,
          })
        )
      );
    } catch (error) {
      console.error(
        "Failed to load menu:",
        error
      );

      Alert.alert(
        "Menu Error",
        error instanceof Error
          ? error.message
          : "Unable to load menu."
      );
    } finally {
      setIsLoadingMenu(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Initial Load
  // ---------------------------------------------------------------------------

  useEffect(() => {
    loadHeader();
    loadMenu();
  }, []);

  // ---------------------------------------------------------------------------
  // Derived Values
  // ---------------------------------------------------------------------------

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return menuItems;
    }

    return menuItems.filter(
      (item) =>
        item.category_id === selectedCategory
    );
  }, [
    menuItems,
    selectedCategory,
  ]);

  const orderTotal = useMemo(
    () =>
      orderItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      ),
    [orderItems]
  );

  const orderCount = useMemo(
    () =>
      orderItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [orderItems]
  );

  // ---------------------------------------------------------------------------
  // Order Handlers
  // ---------------------------------------------------------------------------

  const handleAddToOrder = (
    item: MenuItem
  ) => {
    if (
      !item.available ||
      isCreatingOrder
    ) {
      return;
    }

    setOrderItems((current) => {
      const existing = current.find(
        (orderItem) =>
          orderItem.id === item.id
      );

      if (existing) {
        return current.map(
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
        ...current,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (
    id: string
  ) => {
    if (isCreatingOrder) {
      return;
    }

    setOrderItems((current) =>
      current.map((item) =>
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

  const decreaseQuantity = (
    id: string
  ) => {
    if (isCreatingOrder) {
      return;
    }

    setOrderItems((current) =>
      current
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
          (item) => item.quantity > 0
        )
    );
  };

  const handleSelectOrderType = (
    type: OrderType
  ) => {
    if (isCreatingOrder) {
      return;
    }

    setOrderType(type);
  };

  const clearOrder = () => {
    if (isCreatingOrder) {
      return;
    }

    setOrderItems([]);
    setCustomerName("");
    setOrderType("Dine In");
  };

  // ---------------------------------------------------------------------------
  // Checkout
  // ---------------------------------------------------------------------------

  const handleCheckout = async () => {
    if (isCreatingOrder) {
      return;
    }

    const cleanCustomerName =
      customerName.trim();

    if (!cleanCustomerName) {
      showError(
        "Please enter the customer's name before saving the order."
      );
      return;
    }

    if (!orderItems.length) {
      showError(
        "Please add at least one menu item."
      );
      return;
    }

    try {
      setIsCreatingOrder(true);

      const createdOrder =
        await createOrder(
          cleanCustomerName,

          orderItems.map((item) => ({
            menu_item_id: item.id,
            name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            image: item.image,
          })),

          orderType,

          Number(
            orderTotal.toFixed(2)
          )
        );

      router.push({
        pathname: "/admin/payment",

        params: {
          orderId: createdOrder.id,

          total:
            orderTotal.toFixed(2),

          customerName:
            cleanCustomerName,

          orderType,

          orderItems:
            JSON.stringify(
              orderItems.map(
                (item) => ({
                  id: item.id,
                  name: item.name,
                  quantity:
                    item.quantity,
                  price: item.price,
                  image: item.image,
                })
              )
            ),
        },
      });

      setShowMobileOrder(false);
    } catch (error) {
      console.error(
        "Create order error:",
        error
      );

      showError(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the order."
      );
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Loading State
  // ---------------------------------------------------------------------------

  if (isLoadingMenu) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={[
          "top",
          "left",
          "right",
          "bottom",
        ]}
      >
        <View style={styles.centered}>
          <ActivityIndicator
            size="large"
            color="#F97316"
          />

          <Text
            style={styles.loadingText}
          >
            Loading menu...
          </Text>
        </View>

        <AdminBottomNav />
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <SafeAreaView
      style={styles.container}
      edges={[
        "top",
        "left",
        "right",
        "bottom",
      ]}
    >
      <ErrorToast
        visible={showErrorToast}
        title="Incomplete Order"
        message={errorMessage}
      />

      {/* ------------------------------------------------------------------ */}
      {/* PAGE HEADER */}
      {/* ------------------------------------------------------------------ */}

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>
          New Order
        </Text>

        <Text style={styles.pageHint}>
          Click items to add to order
        </Text>
      </View>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT */}
      {/* ------------------------------------------------------------------ */}

      <View style={styles.mainRow}>
        {/* ---------------------------------------------------------------- */}
        {/* MENU */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.leftPane}>
          {/* Categories */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            style={
              styles.categoryScroll
            }
            contentContainerStyle={
              styles.categoryContent
            }
          >
            {[
              {
                id: "All",
                name: "All",
              },
              ...categories,
            ].map((category) => {
              const active =
                selectedCategory ===
                category.id;

              return (
                <Pressable
                  key={category.id}
                  onPress={() =>
                    setSelectedCategory(
                      category.id
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
                    {category.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Menu Items */}

          <ScrollView
            style={styles.menuScroll}
            contentContainerStyle={
              styles.menuGrid
            }
            showsVerticalScrollIndicator={
              false
            }
          >
            {!filteredItems.length ? (
              <View
                style={styles.emptyMenu}
              >
                <Text
                  style={
                    styles.emptyMenuText
                  }
                >
                  No menu items available.
                </Text>
              </View>
            ) : (
              filteredItems.map((item) => {
                const quantityInCart =
                  orderItems.find(
                    (orderItem) =>
                      orderItem.id ===
                      item.id
                  )?.quantity ?? 0;

                return (
                  <Pressable
                    key={item.id}
                    disabled={
                      !item.available ||
                      isCreatingOrder
                    }
                    onPress={() =>
                      handleAddToOrder(
                        item
                      )
                    }
                    style={[
                      styles.foodCard,
                      !item.available &&
                        styles.unavailableCard,
                      quantityInCart > 0 &&
                        styles.foodCardSelected,
                    ]}
                  >
                    {/* Food Image */}

                    <View
                      style={
                        styles.foodImageWrap
                      }
                    >
                      {item.image ? (
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={
                            styles.foodImage
                          }
                          resizeMode="cover"
                        />
                      ) : (
                        <View
                          style={
                            styles.foodImagePlaceholder
                          }
                        >
                          <Text
                            style={
                              styles.foodIcon
                            }
                          >
                            🍽️
                          </Text>
                        </View>
                      )}

                      {/* Quantity Badge */}

                      {quantityInCart >
                        0 && (
                        <View
                          style={
                            styles.quantityBadge
                          }
                        >
                          <Text
                            style={
                              styles.quantityBadgeText
                            }
                          >
                            ×{" "}
                            {
                              quantityInCart
                            }
                          </Text>
                        </View>
                      )}

                      {/* Sold Out Badge */}

                      {!item.available && (
                        <View
                          style={
                            styles.soldOutBadge
                          }
                        >
                          <Text
                            style={
                              styles.soldOutBadgeText
                            }
                          >
                            SOLD OUT
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Food Details */}

                    <View
                      style={
                        styles.foodCardBody
                      }
                    >
                      <Text
                        style={
                          styles.foodName
                        }
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>

                      <Text
                        style={
                          styles.foodPrice
                        }
                      >
                        ₱{" "}
                        {item.price.toFixed(
                          2
                        )}
                      </Text>
                    </View>
                  </Pressable>
                );
              })
            )}
          </ScrollView>
        </View>

        {/* ---------------------------------------------------------------- */}
        {/* DESKTOP / TABLET ORDER PANEL */}
        {/* ---------------------------------------------------------------- */}

        {isTablet && (
          <View
            style={styles.orderPanel}
          >
            {/* Order Header */}

            <View
              style={
                styles.orderPanelHeader
              }
            >
              <Text
                style={
                  styles.orderPanelTitle
                }
              >
                Current Order
              </Text>

              <Text
                style={
                  styles.tableInputLabel
                }
              >
                Customer Name
              </Text>

              <TextInput
                value={customerName}
                onChangeText={
                  setCustomerName
                }
                placeholder="e.g. Juan Dela Cruz"
                placeholderTextColor="#B3AB9C"
                style={
                  styles.tableInput
                }
                editable={
                  !isCreatingOrder
                }
              />
            </View>

            {/* Order Type */}

            <View
              style={
                styles.orderTypeSection
              }
            >
              <Text
                style={
                  styles.orderTypeLabel
                }
              >
                Order Type
              </Text>

              <View
                style={
                  styles.orderTypeButtons
                }
              >
                <Pressable
                  style={[
                    styles.orderTypeButton,
                    orderType ===
                      "Dine In" &&
                      styles.orderTypeButtonActive,
                  ]}
                  onPress={() =>
                    handleSelectOrderType(
                      "Dine In"
                    )
                  }
                >
                  <Text
                    style={[
                      styles.orderTypeButtonText,
                      orderType ===
                        "Dine In" &&
                        styles.orderTypeButtonTextActive,
                    ]}
                  >
                    🍽️ Dine In
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.orderTypeButton,
                    orderType ===
                      "Take Out" &&
                      styles.orderTypeButtonActive,
                  ]}
                  onPress={() =>
                    handleSelectOrderType(
                      "Take Out"
                    )
                  }
                >
                  <Text
                    style={[
                      styles.orderTypeButtonText,
                      orderType ===
                        "Take Out" &&
                        styles.orderTypeButtonTextActive,
                    ]}
                  >
                    🥡 Take Out
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Empty Order */}

            {!orderItems.length ? (
              <View
                style={
                  styles.emptyOrderContainer
                }
              >
                <Text
                  style={
                    styles.emptyCartIcon
                  }
                >
                  🛒
                </Text>

                <Text
                  style={
                    styles.emptyOrderTitle
                  }
                >
                  No Item
                </Text>

                <Text
                  style={
                    styles.emptyOrderSubtitle
                  }
                >
                  Choose item from the menu
                </Text>
              </View>
            ) : (
              /* Order Items */

              <ScrollView
                style={
                  styles.orderItemsList
                }
                showsVerticalScrollIndicator={
                  false
                }
              >
                {orderItems.map(
                  (item) => (
                    <View
                      key={item.id}
                      style={
                        styles.orderLineItem
                      }
                    >
                      {/* Item Information */}

                      <View
                        style={
                          styles.orderLineInfo
                        }
                      >
                        <Text
                          style={
                            styles.orderLineName
                          }
                        >
                          {item.name}
                        </Text>

                        <Text
                          style={
                            styles.orderLineSub
                          }
                        >
                          ₱{" "}
                          {item.price.toFixed(
                            2
                          )}{" "}
                          each
                        </Text>
                      </View>

                      {/* Quantity Controls */}

                      <View
                        style={
                          styles.orderLineControls
                        }
                      >
                        <Pressable
                          style={
                            styles.stepperButton
                          }
                          onPress={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                        >
                          <Text
                            style={
                              styles.stepperButtonText
                            }
                          >
                            −
                          </Text>
                        </Pressable>

                        <Text
                          style={
                            styles.stepperValue
                          }
                        >
                          {item.quantity}
                        </Text>

                        <Pressable
                          style={[
                            styles.stepperButton,
                            styles.stepperButtonPlus,
                          ]}
                          onPress={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                        >
                          <Text
                            style={[
                              styles.stepperButtonText,
                              styles.stepperButtonTextPlus,
                            ]}
                          >
                            +
                          </Text>
                        </Pressable>
                      </View>

                      {/* Item Total */}

                      <Text
                        style={
                          styles.orderLineTotal
                        }
                      >
                        ₱{" "}
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </Text>
                    </View>
                  )
                )}
              </ScrollView>
            )}

            {/* Order Footer */}

            <View
              style={styles.orderFooter}
            >
              {/* Subtotal */}

              <View
                style={styles.subtotalRow}
              >
                <Text
                  style={
                    styles.subtotalLabel
                  }
                >
                  Subtotal
                </Text>

                <Text
                  style={
                    styles.subtotalValue
                  }
                >
                  ₱{" "}
                  {orderTotal.toFixed(2)}
                </Text>
              </View>

              {/* Total */}

              <View
                style={styles.totalRow}
              >
                <Text
                  style={
                    styles.totalLabelBold
                  }
                >
                  Total
                </Text>

                <Text
                  style={
                    styles.totalValueBold
                  }
                >
                  ₱{" "}
                  {orderTotal.toFixed(2)}
                </Text>
              </View>

              {/* Save Order */}

              <Pressable
                style={[
                  styles.saveOrderButton,
                  (!orderItems.length ||
                    isCreatingOrder) &&
                    styles.saveOrderButtonDisabled,
                ]}
                disabled={
                  !orderItems.length ||
                  isCreatingOrder
                }
                onPress={
                  handleCheckout
                }
              >
                <Text
                  style={
                    styles.saveOrderButtonText
                  }
                >
                  {isCreatingOrder
                    ? "SAVING..."
                    : "SAVE ORDER"}
                </Text>
              </Pressable>

              {/* Footer Actions */}

              <View
                style={
                  styles.footerBottomRow
                }
              >
                <Pressable
                  onPress={
                    clearOrder
                  }
                  disabled={
                    !orderItems.length ||
                    isCreatingOrder
                  }
                >
                  <Text
                    style={
                      styles.clearOrderLink
                    }
                  >
                    Clear Order
                  </Text>
                </Pressable>

                <View
                  style={
                    styles.helpCircle
                  }
                >
                  <Text
                    style={
                      styles.helpCircleText
                    }
                  >
                    ?
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE CART BUTTON */}
      {/* ------------------------------------------------------------------ */}

      {responsive.isPhone && (
        <Pressable
          onPress={() =>
            setShowMobileOrder(true)
          }
          disabled={
            isCreatingOrder
          }
          style={[
            mobileStyles.cartButton,
            isCreatingOrder &&
              mobileStyles.cartButtonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Open current order"
        >
          <Ionicons
            name="cart-outline"
            size={24}
            color="#FFFFFF"
          />

          {orderCount > 0 && (
            <View
              style={
                mobileStyles.cartBadge
              }
            >
              <Text
                style={
                  mobileStyles.cartBadgeText
                }
              >
                {orderCount}
              </Text>
            </View>
          )}
        </Pressable>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE CURRENT ORDER MODAL */}
      {/* ------------------------------------------------------------------ */}

      <MobileOrderModal
        visible={showMobileOrder}
        customerName={customerName}
        orderType={orderType}
        orderItems={orderItems}
        orderTotal={orderTotal}
        isCreatingOrder={
          isCreatingOrder
        }

        /*
         * MobileOrderModalProps requires this property.
         * This screen is creating a new order, so edit mode is false.
         */
        isEditMode={false}

        onClose={() =>
          setShowMobileOrder(false)
        }
        onCustomerNameChange={
          setCustomerName
        }
        onSelectOrderType={
          handleSelectOrderType
        }
        onIncreaseQuantity={
          increaseQuantity
        }
        onDecreaseQuantity={
          decreaseQuantity
        }
        onClearOrder={clearOrder}
        onCheckout={
          handleCheckout
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* BOTTOM NAVIGATION */}
      {/* ------------------------------------------------------------------ */}

      <AdminBottomNav />
    </SafeAreaView>
  );
}
