import React, {
  useMemo,
} from "react";

import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import {
  createMobileOrderModalStyles,
} from "@/styles/admin/modals/mobile/mobile-order-modal.styles";

// =====================================================
// TYPES
// =====================================================

export type MobileOrderItem = {
  id: string;

  name: string;

  price: number;

  quantity: number;
};

export type MobileOrderType =
  | "Dine In"
  | "Take Out";

type MobileOrderModalProps = {
  visible: boolean;

  customerName: string;

  orderType: MobileOrderType;

  orderItems: MobileOrderItem[];

  orderTotal: number;

  isCreatingOrder: boolean;

  isEditMode: boolean;

  onClose: () => void;

  onCustomerNameChange: (
    text: string
  ) => void;

  onSelectOrderType: (
    type: MobileOrderType
  ) => void;

  onIncreaseQuantity: (
    id: string
  ) => void;

  onDecreaseQuantity: (
    id: string
  ) => void;

  onClearOrder: () => void;

  onCheckout: () =>
    | void
    | Promise<void>;
};

// =====================================================
// COMPONENT
// =====================================================

export default function MobileOrderModal({
  visible,

  customerName,

  orderType,

  orderItems,

  orderTotal,

  isCreatingOrder,

  isEditMode,

  onClose,

  onCustomerNameChange,

  onSelectOrderType,

  onIncreaseQuantity,

  onDecreaseQuantity,

  onClearOrder,

  onCheckout,
}: MobileOrderModalProps) {
  // ===================================================
  // RESPONSIVE WIDTH
  // ===================================================

  const { width } =
    useWindowDimensions();

  // ===================================================
  // RESPONSIVE STYLES
  // ===================================================

  const styles = useMemo(
    () =>
      createMobileOrderModalStyles(
        width
      ),
    [width]
  );

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={
        onClose
      }
      statusBarTranslucent={false}
    >
      <View
        style={
          styles.screen
        }
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={
            styles.header
          }
        >
          <View
            style={
              styles.headerTextContainer
            }
          >
            <Text
              style={
                styles.title
              }
            >
              Current Order
            </Text>
          </View>

          {/* CLOSE */}
          <Pressable
            onPress={
              onClose
            }
            disabled={
              isCreatingOrder
            }
            style={
              styles.closeButton
            }
            hitSlop={8}
          >
            <Text
              style={
                styles.closeButtonText
              }
            >
              ×
            </Text>
          </Pressable>
        </View>

        {/* =================================================
            CONTENT
        ================================================= */}

        <ScrollView
          style={
            styles.contentScroll
          }
          contentContainerStyle={
            styles.content
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={
            false
        }
        >
          {/* ===============================================
              CUSTOMER NAME
          =============================================== */}

          <View
            style={
              styles.section
            }
          >
            <Text
              style={
                styles.label
              }
            >
              Customer Name
            </Text>

            <TextInput
              value={
                customerName
              }
              onChangeText={
                onCustomerNameChange
              }
              placeholder="e.g. Juan Dela Cruz"
              placeholderTextColor="#B5ADA3"
              style={
                styles.input
              }
              editable={
                !isCreatingOrder
              }
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>

          {/* ===============================================
              ORDER TYPE
          =============================================== */}

          <View
            style={
              styles.section
            }
          >
            <Text
              style={
                styles.label
              }
            >
              Order Type
            </Text>

            <View
              style={
                styles.orderTypeButtons
              }
            >
              {/* DINE IN */}
              <Pressable
                onPress={() =>
                  onSelectOrderType(
                    "Dine In"
                  )
                }
                disabled={
                  isCreatingOrder
                }
                style={[
                  styles.orderTypeButton,

                  orderType ===
                    "Dine In" &&
                    styles.orderTypeButtonActive,
                ]}
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

              {/* TAKE OUT */}
              <Pressable
                onPress={() =>
                  onSelectOrderType(
                    "Take Out"
                  )
                }
                disabled={
                  isCreatingOrder
                }
                style={[
                  styles.orderTypeButton,

                  orderType ===
                    "Take Out" &&
                    styles.orderTypeButtonActive,
                ]}
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

          {/* ===============================================
              ORDER ITEMS
          =============================================== */}

          {orderItems.length ===
          0 ? (
            <View
              style={
                styles.emptyOrder
              }
            >
              {/* CART ICON */}
              <Text
                style={
                  styles.emptyIcon
                }
              >
                🛒
              </Text>

              <Text
                style={
                  styles.emptyTitle
                }
              >
                Walang laman ang order
              </Text>

              <Text
                style={
                  styles.emptySubtitle
                }
              >
                Pumili ng pagkain mula sa menu
              </Text>
            </View>
          ) : (
            <View
              style={
                styles.itemsSection
              }
            >
              <Text
                style={
                  styles.itemsTitle
                }
              >
                Order Items
              </Text>

              {orderItems.map(
                (item) => (
                  <View
                    key={
                      item.id
                    }
                    style={
                      styles.orderItem
                    }
                  >
                    {/* ITEM INFO */}
                    <View
                      style={
                        styles.itemInfo
                      }
                    >
                      <Text
                        style={
                          styles.itemName
                        }
                        numberOfLines={
                          2
                        }
                      >
                        {
                          item.name
                        }
                      </Text>

                      <Text
                        style={
                          styles.itemPrice
                        }
                      >
                        ₱
                        {item.price.toFixed(
                          2
                        )}{" "}
                        each
                      </Text>
                    </View>

                    {/* QUANTITY */}
                    <View
                      style={
                        styles.itemControls
                      }
                    >
                      <Pressable
                        onPress={() =>
                          onDecreaseQuantity(
                            item.id
                          )
                        }
                        disabled={
                          isCreatingOrder
                        }
                        style={
                          styles.stepperButton
                        }
                      >
                        <Text
                          style={
                            styles.stepperText
                          }
                        >
                          −
                        </Text>
                      </Pressable>

                      <Text
                        style={
                          styles.quantity
                        }
                      >
                        {
                          item.quantity
                        }
                      </Text>

                      <Pressable
                        onPress={() =>
                          onIncreaseQuantity(
                            item.id
                          )
                        }
                        disabled={
                          isCreatingOrder
                        }
                        style={[
                          styles.stepperButton,

                          styles.plusButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stepperText,

                            styles.plusText,
                          ]}
                        >
                          +
                        </Text>
                      </Pressable>
                    </View>

                    {/* TOTAL */}
                    <Text
                      style={
                        styles.itemTotal
                      }
                    >
                      ₱
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(
                        2
                      )}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
        </ScrollView>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View
          style={
            styles.footer
          }
        >
          {/* SUBTOTAL */}
          <View
            style={
              styles.subtotalRow
            }
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
              ₱
              {orderTotal.toFixed(
                2
              )}
            </Text>
          </View>

          {/* TOTAL */}
          <View
            style={
              styles.totalRow
            }
          >
            <Text
              style={
                styles.totalLabel
              }
            >
              Total
            </Text>

            <Text
              style={
                styles.totalValue
              }
            >
              ₱
              {orderTotal.toFixed(
                2
              )}
            </Text>
          </View>

          {/* SAVE ORDER */}
          <Pressable
            onPress={
              onCheckout
            }
            disabled={
              orderItems.length ===
                0 ||
              isCreatingOrder
            }
            style={[
              styles.saveButton,

              (orderItems.length ===
                0 ||
                isCreatingOrder) &&
                styles.saveButtonDisabled,
            ]}
          >
            <Text
              style={
                styles.saveButtonText
              }
            >
              {isCreatingOrder
                ? "SAVING..."
                : "SAVE ORDER"}
            </Text>
          </Pressable>

          {/* BOTTOM */}
          <View
            style={
              styles.footerBottom
            }
          >
            {/* CLEAR */}
            <Pressable
              onPress={
                onClearOrder
              }
              disabled={
                orderItems.length ===
                  0 ||
                isCreatingOrder
              }
            >
              <Text
                style={[
                  styles.clearText,

                  (orderItems.length ===
                    0 ||
                    isCreatingOrder) &&
                    styles.clearTextDisabled,
                ]}
              >
                Clear Order
              </Text>
            </Pressable>

            {/* HELP */}
            <Pressable
              style={
                styles.helpButton
              }
              onPress={() =>
                Alert.alert(
                  "Order Help",
                  "Select items from the menu to add them to the current order."
                )
              }
            >
              <Text
                style={
                  styles.helpButtonText
                }
              >
                ?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}