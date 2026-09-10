import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Banknote,
  Check,
  ChevronRight,
  Smartphone,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  getPaymentSettings,
  PaymentSettings,
} from "@/lib/paymentSetting";
import { supabase } from "@/lib/supabase";

import CashPaymentModal from "@/components/admin/modals/payment/CashPaymentModal";
import GCashPaymentModal from "@/components/admin/modals/payment/GCashPaymentModal";
import ReceiptModal, {
  ReceiptData,
} from "@/components/admin/modals/ReceiptModal";
import ErrorToast from "@/components/admin/toast/ErrorToast";
import { createPaymentStyles } from "@/styles/admin/payment.styles";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string | null;
};

type PaymentMethod = "cash" | "gcash";

export default function PaymentScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isTablet = width >= 768;
  const styles = createPaymentStyles(isTablet);

  const params = useLocalSearchParams<{
    orderId?: string;
    total?: string;
    customerName?: string;
    orderType?: string;
    orderItems?: string;
  }>();

  const orderId = params.orderId ?? "";

  const customerName =
    params.customerName ?? "Walk-in Customer";

  const orderType =
    params.orderType ?? "Dine In";

  const total = Number(params.total ?? 0);

  const [orderNumber, setOrderNumber] =
    useState<number | null>(null);

  const [isLoadingOrderNumber, setIsLoadingOrderNumber] =
    useState(false);

  useEffect(() => {
    const loadOrderNumber = async () => {
      if (!orderId) {
        setOrderNumber(null);
        return;
      }

      try {
        setIsLoadingOrderNumber(true);

        const {
          data,
          error,
        } = await supabase
          .from("orders")
          .select("order_number")
          .eq("id", orderId)
          .single();

        if (error) {
          throw error;
        }

        if (
          data?.order_number !== null &&
          data?.order_number !== undefined
        ) {
          setOrderNumber(
            Number(data.order_number)
          );
        } else {
          setOrderNumber(null);
        }
      } catch (error) {
        console.error(
          "Failed to load order number:",
          error
        );

        setOrderNumber(null);
      } finally {
        setIsLoadingOrderNumber(false);
      }
    };

    loadOrderNumber();
  }, [orderId]);

  const formattedOrderNumber =
    orderNumber !== null
      ? `#${String(orderNumber).padStart(4, "0")}`
      : "#0000";

  const orderItems: OrderItem[] = useMemo(() => {
    if (!params.orderItems) {
      return [];
    }

    try {
      const parsed = JSON.parse(
        params.orderItems
      );

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map((item) => ({
        id: String(item.id ?? ""),
        name: String(item.name ?? ""),
        quantity: Number(item.quantity ?? 0),
        price: Number(item.price ?? 0),
        image: item.image ?? null,
      }));
    } catch (error) {
      console.error(
        "Failed to parse order items:",
        error
      );

      return [];
    }
  }, [params.orderItems]);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<PaymentMethod | null>(null);

  const [
    paymentSettings,
    setPaymentSettings,
  ] = useState<PaymentSettings | null>(null);

  const [
    showCashModal,
    setShowCashModal,
  ] = useState(false);

  const [
    showGcashModal,
    setShowGcashModal,
  ] = useState(false);

  const [
    cashReceived,
    setCashReceived,
  ] = useState(0);

  const [
    change,
    setChange,
  ] = useState(0);

  const [
    isProcessing,
    setIsProcessing,
  ] = useState(false);

  const [
    showReceipt,
    setShowReceipt,
  ] = useState(false);

  const [
    receiptData,
    setReceiptData,
  ] = useState<ReceiptData | null>(null);

  const [
    showErrorToast,
    setShowErrorToast,
  ] = useState(false);

  const [
    errorToastMessage,
    setErrorToastMessage,
  ] = useState("");

  const showPaymentError = (
    message: string
  ) => {
    setErrorToastMessage(message);
    setShowErrorToast(true);

    setTimeout(() => {
      setShowErrorToast(false);
    }, 3000);
  };

  useEffect(() => {
    getPaymentSettings()
      .then(setPaymentSettings)
      .catch((error) => {
        console.error(
          "Failed to load payment settings:",
          error
        );
      });
  }, []);

  const gcashQrUri =
    paymentSettings?.qr_image_url ?? null;

  const handleSelectCash = () => {
    if (isProcessing) {
      return;
    }

    setPaymentMethod("cash");
    setShowCashModal(true);
  };

  const handleSelectGCash = () => {
    if (isProcessing) {
      return;
    }

    if (!paymentSettings?.qr_image_url) {
      Alert.alert(
        "No QR Code",
        "Please upload a GCash QR code in Menu first."
      );

      return;
    }

    setPaymentMethod("gcash");
    setShowGcashModal(true);
  };

  const handleCashConfirm = (
    receivedAmount: number,
    calculatedChange: number
  ) => {
    setPaymentMethod("cash");
    setCashReceived(receivedAmount);
    setChange(calculatedChange);
    setShowCashModal(false);
  };

  const handleGCashConfirm = () => {
    setPaymentMethod("gcash");
    setCashReceived(total);
    setChange(0);
    setShowGcashModal(false);
  };

  const handleChangePayment = () => {
    if (isProcessing) {
      return;
    }

    setPaymentMethod(null);
    setCashReceived(0);
    setChange(0);
  };

  const handleConfirmPayment = async () => {
    if (isProcessing) {
      return;
    }

    if (!paymentMethod) {
      showPaymentError(
        "Please choose a payment method before continuing."
      );

      return;
    }

    if (!orderId) {
      showPaymentError(
        "The order ID is missing. Please go back and create the order again."
      );

      return;
    }

    if (orderNumber === null) {
      showPaymentError(
        "The order number could not be found. Please go back and try again."
      );

      return;
    }

    if (!orderItems.length) {
      showPaymentError(
        "There are no items in this order."
      );

      return;
    }

    if (
      !Number.isFinite(total) ||
      total <= 0
    ) {
      showPaymentError(
        "The order total is invalid."
      );

      return;
    }

    if (
      paymentMethod === "cash" &&
      cashReceived < total
    ) {
      showPaymentError(
        "The cash received is not enough to complete this payment."
      );

      return;
    }

    try {
      setIsProcessing(true);

      const {
        data: existingOrder,
        error: fetchOrderError,
      } = await supabase
        .from("orders")
        .select("id, order_number")
        .eq("id", orderId)
        .single();

      if (fetchOrderError) {
        throw fetchOrderError;
      }

      if (!existingOrder) {
        throw new Error(
          "Order could not be found."
        );
      }

      if (
        existingOrder.order_number === null ||
        existingOrder.order_number === undefined
      ) {
        throw new Error(
          "This order does not have an order number."
        );
      }

      // Use the database value.
      const databaseOrderNumber =
        Number(existingOrder.order_number);

      // Keep state synchronized.
      setOrderNumber(
        databaseOrderNumber
      );

      console.log(
        "Order ID:",
        existingOrder.id
      );

      console.log(
        "Order Number:",
        databaseOrderNumber
      );

      const {
        error: updateOrderError,
      } = await supabase
        .from("orders")
        .update({
          status: "ongoing",
          completed_at:
            new Date().toISOString(),
        })
        .eq("id", orderId);

      if (updateOrderError) {
        throw updateOrderError;
      }

      const {
        data: existingSale,
        error: existingSaleError,
      } = await supabase
        .from("sales")
        .select("id")
        .eq("order_id", orderId)
        .maybeSingle();

      if (existingSaleError) {
        throw existingSaleError;
      }

      if (!existingSale) {
        const {
          error: saleError,
        } = await supabase
          .from("sales")
          .insert({
            order_id: orderId,
            total: Number(
              total.toFixed(2)
            ),
            payment_method:
              paymentMethod,
          });

        if (saleError) {
          throw saleError;
        }
      }

      const newReceiptData: ReceiptData = {
        orderId,

        orderNumber:
          databaseOrderNumber,

        items: orderItems.map(
          (item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })
        ),

        total: Number(
          total.toFixed(2)
        ),

        paymentMethod,

        cashReceived:
          paymentMethod === "gcash"
            ? null
            : cashReceived,

        change:
          paymentMethod === "gcash"
            ? null
            : change,

        soldAt:
          new Date().toISOString(),
      };

      console.log(
        "Receipt Data:",
        newReceiptData
      );

      setReceiptData(
        newReceiptData
      );

      setShowReceipt(true);
    } catch (error) {
      console.error(
        "Confirm payment error:",
        error
      );

      showPaymentError(
        error instanceof Error
          ? error.message
          : "Something went wrong while processing the payment."
      );
    } finally {
      setIsProcessing(false);
    }
  };


  const handleCancel = () => {
    if (isProcessing) {
      return;
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(
        "/admin/orders"
      );
    }
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);

    router.replace(
      "/admin/orders"
    );
  };

  const handleNewOrder = () => {
    setShowReceipt(false);

    router.replace(
      "/admin/orders"
    );
  };

  const isPaymentReady =
    paymentMethod !== null &&
    (
      paymentMethod === "gcash" ||
      (
        paymentMethod === "cash" &&
        cashReceived >= total
      )
    );

  const PaymentMethodCard = ({
    method,
    title,
    description,
    icon: Icon,
    onPress,
  }: {
    method: PaymentMethod;
    title: string;
    description: string;
    icon: typeof Banknote;
    onPress: () => void;
  }) => {
    const selected =
      paymentMethod === method;

    return (
      <Pressable
        onPress={onPress}
        disabled={isProcessing}
        style={[
          styles.paymentMethodCard,
          selected &&
            styles.paymentMethodCardSelected,
          isProcessing &&
            styles.paymentMethodCardDisabled,
        ]}
      >
        <View
          style={[
            styles.paymentMethodIcon,
            selected &&
              styles.paymentMethodIconSelected,
          ]}
        >
          <Icon
            size={23}
            strokeWidth={2}
            color={
              selected
                ? "#FFFFFF"
                : "#9CA3AF"
            }
          />
        </View>

        <View
          style={
            styles.paymentMethodContent
          }
        >
          <Text
            style={[
              styles.paymentMethodTitle,
              selected &&
                styles.paymentMethodTitleSelected,
            ]}
          >
            {title}
          </Text>

          <Text
            style={
              styles.paymentMethodDescription
            }
          >
            {description}
          </Text>
        </View>

        {selected ? (
          <View
            style={
              styles.paymentMethodCheck
            }
          >
            <Check
              size={15}
              color="#FFFFFF"
              strokeWidth={3}
            />
          </View>
        ) : (
          <ChevronRight
            size={20}
            color="#9CA3AF"
          />
        )}
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingLeft:
            insets.left,
          paddingRight:
            insets.right,
        },
      ]}
    >
      {/* HEADER */}

      <View
        style={[
          styles.header,
          {
            paddingTop:
              insets.top + 18,
          },
        ]}
      >
        <View
          style={
            styles.headerTextWrap
          }
        >
          <Text
            style={
              styles.headerTitle
            }
          >
            Payment
          </Text>

          <Text
            style={
              styles.headerSubtitle
            }
          >
            Complete the customer's payment
          </Text>
        </View>
      </View>

      {/* MAIN */}

      <ScrollView
        style={
          styles.mainScroll
        }
        contentContainerStyle={[
          styles.mainContent,
          {
            paddingBottom:
              30 +
              insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* ORDER INFORMATION */}

        <View
          style={
            styles.topGrid
          }
        >
          <View
            style={
              styles.orderInfoCard
            }
          >
            <Text
              style={
                styles.cardSectionTitle
              }
            >
              Order Information
            </Text>

            <View
              style={
                styles.infoGrid
              }
            >
              <View
                style={
                  styles.infoColumn
                }
              >
                <Text
                  style={
                    styles.orderInfoLabel
                  }
                >
                  Customer
                </Text>

                <Text
                  style={
                    styles.orderInfoValue
                  }
                >
                  {customerName}
                </Text>
              </View>

              <View
                style={
                  styles.infoColumnRight
                }
              >
                <Text
                  style={
                    styles.orderInfoLabel
                  }
                >
                  Order Type
                </Text>

                <Text
                  style={
                    styles.orderInfoValueRight
                  }
                >
                  {orderType}
                </Text>
              </View>

              <View
                style={
                  styles.infoColumn
                }
              >
                <Text
                  style={
                    styles.orderInfoLabel
                  }
                >
                  Order ID
                </Text>

                <Text
                  style={
                    styles.orderInfoValue
                  }
                >
                  {isLoadingOrderNumber
                    ? "Loading..."
                    : formattedOrderNumber}
                </Text>
              </View>

              <View
                style={
                  styles.infoColumnRight
                }
              >
                <Text
                  style={
                    styles.orderInfoLabel
                  }
                >
                  Items
                </Text>

                <Text
                  style={
                    styles.orderInfoValueRight
                  }
                >
                  {
                    orderItems.length
                  }
                </Text>
              </View>
            </View>
          </View>

          {/* TOTAL */}

          <View
            style={
              styles.totalCard
            }
          >
            <Text
              style={
                styles.totalLabel
              }
            >
              TOTAL AMOUNT
            </Text>

            <Text
              style={
                styles.totalValue
              }
            >
              ₱
              {total.toFixed(
                2
              )}
            </Text>

            <Text
              style={
                styles.totalSubtext
              }
            >
              Amount to be collected from customer
            </Text>
          </View>
        </View>

        {/* PAYMENT METHOD */}

        <View
          style={
            styles.paymentMethodSection
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Choose Payment Method
          </Text>

          <Text
            style={
              styles.sectionSubtitle
            }
          >
            Select how the customer will pay
          </Text>

          <View
            style={
              styles.paymentMethodRow
            }
          >
            <PaymentMethodCard
              method="cash"
              title="Cash"
              description="Customer pays with cash"
              icon={Banknote}
              onPress={
                handleSelectCash
              }
            />

            <PaymentMethodCard
              method="gcash"
              title="GCash"
              description="Customer scans the GCash QR"
              icon={Smartphone}
              onPress={
                handleSelectGCash
              }
            />
          </View>
        </View>

        {/* BOTTOM GRID */}

        <View
          style={
            styles.bottomGrid
          }
        >
          {/* SELECTED PAYMENT */}

          {paymentMethod && (
            <View
              style={
                styles.selectedPaymentCard
              }
            >
              <View
                style={
                  styles.selectedPaymentHeader
                }
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      styles.selectedPaymentTitle
                    }
                  >
                    {paymentMethod ===
                    "cash"
                      ? "Cash Payment"
                      : "GCash Payment"}
                  </Text>

                  <Text
                    style={
                      styles.selectedPaymentSub
                    }
                  >
                    {paymentMethod ===
                    "cash"
                      ? "Cash payment details"
                      : "QR payment details"}
                  </Text>
                </View>

                <Pressable
                  onPress={
                    handleChangePayment
                  }
                  disabled={
                    isProcessing
                  }
                  style={
                    styles.changePaymentButton
                  }
                >
                  <Text
                    style={
                      styles.changePaymentText
                    }
                  >
                    Change
                  </Text>
                </Pressable>
              </View>

              {/* CASH */}

              {paymentMethod ===
                "cash" && (
                <>
                  <View
                    style={
                      styles.selectedPaymentRow
                    }
                  >
                    <Text
                      style={
                        styles.selectedPaymentLabel
                      }
                    >
                      Cash Received
                    </Text>

                    <Text
                      style={
                        styles.selectedPaymentValue
                      }
                    >
                      ₱
                      {cashReceived.toFixed(
                        2
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.selectedPaymentDivider
                    }
                  />

                  <View
                    style={
                      styles.selectedPaymentRow
                    }
                  >
                    <Text
                      style={
                        styles.selectedPaymentLabel
                      }
                    >
                      Change
                    </Text>

                    <Text
                      style={
                        styles.selectedPaymentValueOrange
                      }
                    >
                      ₱
                      {change.toFixed(
                        2
                      )}
                    </Text>
                  </View>
                </>
              )}

              {/* GCASH */}

              {paymentMethod ===
                "gcash" && (
                <View
                  style={
                    styles.selectedPaymentRow
                  }
                >
                  <Text
                    style={
                      styles.selectedPaymentLabel
                    }
                  >
                    Payment
                  </Text>

                  <Text
                    style={
                      styles.selectedPaymentValue
                    }
                  >
                    GCash QR
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* ORDER SUMMARY */}

          <View
            style={[
              styles.summaryCard,
              !paymentMethod &&
                styles.summaryCardFull,
            ]}
          >
            <Text
              style={
                styles.summaryTitle
              }
            >
              Order Summary
            </Text>

            {orderItems.length ===
            0 ? (
              <View
                style={
                  styles.emptySummary
                }
              >
                <Text
                  style={
                    styles.emptySummaryText
                  }
                >
                  No order items found.
                </Text>
              </View>
            ) : (
              <>
                {orderItems.map(
                  (item) => (
                    <View
                      key={
                        item.id
                      }
                      style={
                        styles.summaryItemRow
                      }
                    >
                      {item.image ? (
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={
                            styles.summaryItemImage
                          }
                          resizeMode="cover"
                        />
                      ) : (
                        <View
                          style={
                            styles.summaryItemImagePlaceholder
                          }
                        >
                          <Text
                            style={
                              styles.summaryItemImagePlaceholderText
                            }
                          >
                            🍽️
                          </Text>
                        </View>
                      )}

                      <View
                        style={
                          styles.summaryItemTextWrap
                        }
                      >
                        <Text
                          style={
                            styles.summaryItemName
                          }
                          numberOfLines={
                            1
                          }
                        >
                          {
                            item.name
                          }
                        </Text>

                        <Text
                          style={
                            styles.summaryItemSub
                          }
                        >
                          {
                            item.quantity
                          }{" "}
                          × ₱
                          {item.price.toFixed(
                            2
                          )}
                        </Text>
                      </View>

                      <Text
                        style={
                          styles.summaryItemTotal
                        }
                      >
                        ₱
                        {(
                          item.quantity *
                          item.price
                        ).toFixed(
                          2
                        )}
                      </Text>
                    </View>
                  )
                )}

                <View
                  style={
                    styles.summaryDivider
                  }
                />

                <View
                  style={
                    styles.summaryTotalRow
                  }
                >
                  <Text
                    style={
                      styles.summaryTotalLabel
                    }
                  >
                    TOTAL
                  </Text>

                  <Text
                    style={
                      styles.summaryTotalValue
                    }
                  >
                    ₱
                    {total.toFixed(
                      2
                    )}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* ACTIONS */}

        <View
          style={
            styles.actionSection
          }
        >
          <Pressable
            onPress={
              handleConfirmPayment
            }
            disabled={
              isProcessing
            }
            style={[
              styles.confirmButton,

              isProcessing &&
                styles.confirmButtonDisabled,
            ]}
          >
            <Text
              style={[
                styles.confirmText,

                isProcessing &&
                  styles.confirmTextDisabled,
              ]}
            >
              {isProcessing
                ? "Processing Payment..."
                : "Confirm Payment"}
            </Text>
          </Pressable>

          <Pressable
            onPress={
              handleCancel
            }
            disabled={
              isProcessing
            }
            style={
              styles.cancelButton
            }
          >
            <Text
              style={
                styles.cancelText
              }
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* CASH MODAL */}

      <CashPaymentModal
        visible={
          showCashModal
        }
        total={total}
        isProcessing={
          isProcessing
        }
        onClose={() =>
          setShowCashModal(
            false
          )
        }
        onConfirm={
          handleCashConfirm
        }
      />

      {/* GCASH MODAL */}

      {gcashQrUri && (
        <GCashPaymentModal
          visible={
            showGcashModal
          }
          total={total}
          isProcessing={
            isProcessing
          }
          qrCodeUri={
            gcashQrUri
          }
          onClose={() =>
            setShowGcashModal(
              false
            )
          }
          onConfirm={
            handleGCashConfirm
          }
        />
      )}

      {/* RECEIPT */}

      {receiptData && (
        <ReceiptModal
          visible={
            showReceipt
          }
          data={
            receiptData
          }
          onClose={
            handleReceiptClose
          }
          onNewOrder={
            handleNewOrder
          }
          isHistory={
            false
          }
        />
      )}

      {/* ERROR TOAST */}

      <ErrorToast
        visible={
          showErrorToast
        }
        message={
          errorToastMessage
        }
      />
    </View>
  );
}
