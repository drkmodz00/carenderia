import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdminBottomNav from "@/components/admin/AdminBottomNav";
import { createSalesStyles, COLORS } from "@/styles/admin/sales.styles";
import { supabase } from "@/lib/supabase";

type SaleItem = {
  product: string;
  quantity: number;
  price: number;
};

type Sale = {
  id: string;
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string | null;
  items: SaleItem[];
};

export default function Sales() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // IMPORTANT:
  // createSalesStyles expects { width }, not isTablet.
  // This also makes the styles responsive to orientation changes.
  const styles = useMemo(
    () => createSalesStyles({ width }),
    [width]
  );

  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("sales")
        .select(`
          id,
          order_id,
          total,
          payment_method,
          sold_at,
          orders (
            id,
            status,
            order_type,
            created_at,
            order_items (
              id,
              menu_item_id,
              quantity,
              unit_price,
              subtotal,
              menu_items (
                id,
                name
              )
            )
          )
        `)
        .order("sold_at", { ascending: false });

      if (error) {
        throw error;
      }

      const loadedSales = data ?? [];

      const formattedSales: Sale[] = loadedSales.map((sale: any) => {
        const order = Array.isArray(sale.orders)
          ? sale.orders[0]
          : sale.orders;

        const orderItems = order?.order_items ?? [];

        const items: SaleItem[] = orderItems.map((item: any) => {
          const menuItem = Array.isArray(item.menu_items)
            ? item.menu_items?.[0]
            : item.menu_items;

          return {
            product: menuItem?.name ?? "Unknown Item",
            quantity: Number(item.quantity),
            price: Number(item.unit_price),
          };
        });

        return {
          id: sale.id,
          orderId: sale.order_id,
          date:
            sale.sold_at ??
            order?.created_at ??
            new Date().toISOString(),
          total: Number(sale.total),
          paymentMethod: sale.payment_method,
          items,
        };
      });

      setSales(formattedSales);
    } catch (error) {
      console.error(
        "Failed to load sales dashboard:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to load sales dashboard.";

      Alert.alert("Sales Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // FORMATTERS
  // =====================================================

  const formatCurrency = (amount: number) =>
    `₱${amount.toFixed(2)}`;

  const formatTransactionTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // =====================================================
  // DASHBOARD DATE
  // =====================================================

  const dashboardDate = new Date();

  const headerDateLabel = useMemo(() => {
    return dashboardDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================
  // TODAY'S SALES
  // =====================================================

  const todaySales = useMemo(() => {
    return sales.filter((sale) => {
      const date = new Date(sale.date);

      return (
        date.getFullYear() ===
          dashboardDate.getFullYear() &&
        date.getMonth() === dashboardDate.getMonth() &&
        date.getDate() === dashboardDate.getDate()
      );
    });
  }, [sales]);

  const totalSales = useMemo(
    () =>
      todaySales.reduce(
        (total, sale) =>
          total + Number(sale.total),
        0
      ),
    [todaySales]
  );

  const totalTransactions = todaySales.length;

  const averageSale =
    totalTransactions > 0
      ? totalSales / totalTransactions
      : 0;

  const itemsSoldToday = useMemo(() => {
    return todaySales.reduce(
      (total, sale) =>
        total +
        sale.items.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        ),
      0
    );
  }, [todaySales]);

  // =====================================================
  // TOP SELLING ITEMS
  // =====================================================

  const topSellingItems = useMemo(() => {
    const totals = new Map<
      string,
      {
        name: string;
        quantity: number;
        revenue: number;
      }
    >();

    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const existing = totals.get(
          item.product
        );

        const revenue =
          item.price * item.quantity;

        if (existing) {
          existing.quantity += item.quantity;
          existing.revenue += revenue;
        } else {
          totals.set(item.product, {
            name: item.product,
            quantity: item.quantity,
            revenue,
          });
        }
      });
    });

    return Array.from(totals.values())
      .sort(
        (a, b) =>
          b.quantity - a.quantity
      )
      .slice(0, 5);
  }, [sales]);

  const maxTopItemQuantity = Math.max(
    ...topSellingItems.map(
      (item) => item.quantity
    ),
    1
  );

  const RANK_BADGE_COLORS = [
    "#D99A00",
    "#8D969F",
    "#B96D32",
  ];

  // =====================================================
  // RECENT TRANSACTIONS
  // =====================================================

  const recentTransactions = useMemo(() => {
    return [...sales]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 5);
  }, [sales]);

  // =====================================================
  // SALES THIS WEEK
  // =====================================================

  const weekSales = useMemo(() => {
    const result = [
      { day: "Mon", amount: 0 },
      { day: "Tue", amount: 0 },
      { day: "Wed", amount: 0 },
      { day: "Thu", amount: 0 },
      { day: "Fri", amount: 0 },
      { day: "Sat", amount: 0 },
      { day: "Sun", amount: 0 },
    ];

    const today = new Date();

    const currentDay = today.getDay();

    const monday = new Date(today);

    const daysFromMonday =
      currentDay === 0
        ? 6
        : currentDay - 1;

    monday.setDate(
      today.getDate() -
        daysFromMonday
    );

    monday.setHours(
      0,
      0,
      0,
      0
    );

    const sunday = new Date(monday);

    sunday.setDate(
      monday.getDate() + 6
    );

    sunday.setHours(
      23,
      59,
      59,
      999
    );

    sales.forEach((sale) => {
      const date = new Date(
        sale.date
      );

      if (
        date < monday ||
        date > sunday
      ) {
        return;
      }

      const jsDay = date.getDay();

      const dayIndex =
        jsDay === 0
          ? 6
          : jsDay - 1;

      result[dayIndex].amount +=
        Number(sale.total);
    });

    return result;
  }, [sales]);

  const maxWeekSales = Math.max(
    ...weekSales.map(
      (item) => item.amount
    ),
    1
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <View
        style={[
          styles.page,
          styles.centered,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />

        <Text style={styles.loadingText}>
          Loading sales...
        </Text>

        <AdminBottomNav />
      </View>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <View
      style={[
        styles.page,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={[
          styles.header,
          {
            paddingTop:
              styles.header.paddingVertical +
              insets.top,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Text style={styles.headerTitle}>
            Sales
          </Text>

          <Text style={styles.headerDate}>
            {headerDateLabel}
          </Text>
        </View>

        <Pressable
          onPress={loadSales}
          style={({ pressed }) => [
            styles.refreshButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons
            name="refresh"
            size={19}
            color={COLORS.text}
          />

          <Text style={styles.refreshText}>
            Refresh
          </Text>
        </Pressable>
      </View>

      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom:
              32 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentInner}>
          {/* =================================================
              TODAY
          ================================================= */}

          <Text style={styles.sectionLabel}>
            Ngayong Araw
          </Text>

          <View style={styles.summaryGrid}>
            {/* TOTAL SALES */}

            <View
              style={[
                styles.summaryCard,
                styles.salesCard,
              ]}
            >
              <View
                style={styles.summaryTopRow}
              >
                <View
                  style={styles.summaryIcon}
                >
                  <MaterialIcons
                    name="payments"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text
                  style={
                    styles.summaryTrend
                  }
                >
                  TODAY
                </Text>
              </View>

              <Text
                style={
                  styles.summaryCardLabel
                }
              >
                Kabuuang Benta
              </Text>

              <Text
                style={styles.salesAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {formatCurrency(
                  totalSales
                )}
              </Text>

              <Text
                style={
                  styles.summaryCaption
                }
              >
                na piso ngayong araw
              </Text>
            </View>

            {/* TRANSACTIONS */}

            <View
              style={[
                styles.summaryCard,
                styles.transactionCard,
              ]}
            >
              <View
                style={styles.summaryTopRow}
              >
                <View
                  style={styles.summaryIcon}
                >
                  <MaterialIcons
                    name="receipt-long"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text
                  style={
                    styles.summaryTrend
                  }
                >
                  ORDERS
                </Text>
              </View>

              <Text
                style={
                  styles.summaryCardLabel
                }
              >
                Transaksyon
              </Text>

              <Text
                style={
                  styles.transactionAmount
                }
              >
                {totalTransactions}
              </Text>

              <Text
                style={
                  styles.summaryCaption
                }
              >
                orders na natapos
              </Text>
            </View>

            {/* AVERAGE */}

            <View
              style={[
                styles.summaryCard,
                styles.averageCard,
              ]}
            >
              <View
                style={styles.summaryTopRow}
              >
                <View
                  style={styles.summaryIcon}
                >
                  <MaterialIcons
                    name="analytics"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text
                  style={
                    styles.summaryTrend
                  }
                >
                  AVERAGE
                </Text>
              </View>

              <Text
                style={
                  styles.summaryCardLabel
                }
              >
                Average na Order
              </Text>

              <Text
                style={
                  styles.averageAmount
                }
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {formatCurrency(
                  averageSale
                )}
              </Text>

              <Text
                style={
                  styles.summaryCaption
                }
              >
                bawat transaksyon
              </Text>
            </View>

            {/* ITEMS */}

            <View
              style={[
                styles.summaryCard,
                styles.itemsCard,
              ]}
            >
              <View
                style={styles.summaryTopRow}
              >
                <View
                  style={styles.summaryIcon}
                >
                  <MaterialIcons
                    name="restaurant"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text
                  style={
                    styles.summaryTrend
                  }
                >
                  ITEMS
                </Text>
              </View>

              <Text
                style={
                  styles.summaryCardLabel
                }
              >
                Items na Nabenta
              </Text>

              <Text
                style={styles.itemsAmount}
              >
                {itemsSoldToday}
              </Text>

              <Text
                style={
                  styles.summaryCaption
                }
              >
                piraso ng pagkain
              </Text>
            </View>
          </View>

          {/* =================================================
              MAIN DASHBOARD
          ================================================= */}

          <View
            style={styles.dashboardGrid}
          >
            {/* SALES THIS WEEK */}

            <View
              style={styles.salesWeekCard}
            >
              <View
                style={
                  styles.dashboardCardHeader
                }
              >
                <View
                  style={
                    styles.dashboardCardHeaderText
                  }
                >
                  <Text
                    style={
                      styles.dashboardCardTitle
                    }
                  >
                    Benta Ngayong Linggo
                  </Text>

                  <Text
                    style={
                      styles.dashboardCardSubtitle
                    }
                  >
                    Sales performance from
                    Monday to Sunday
                  </Text>
                </View>

                <View
                  style={
                    styles.cardHeaderIcon
                  }
                >
                  <MaterialIcons
                    name="bar-chart"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>
              </View>

              <View
                style={styles.weekContainer}
              >
                {weekSales.map(
                  (item) => {
                    const percentage =
                      (item.amount /
                        maxWeekSales) *
                      100;

                    return (
                      <View
                        key={item.day}
                        style={
                          styles.weekRow
                        }
                      >
                        <Text
                          style={
                            styles.dayText
                          }
                        >
                          {item.day}
                        </Text>

                        <View
                          style={
                            styles.progressBackground
                          }
                        >
                          <View
                            style={[
                              styles.progressBar,
                              {
                                width: `${percentage}%`,
                              },
                            ]}
                          />
                        </View>

                        <Text
                          style={
                            styles.weekAmount
                          }
                        >
                          ₱
                          {item.amount.toFixed(
                            0
                          )}
                        </Text>
                      </View>
                    );
                  }
                )}
              </View>
            </View>

            {/* TOP SELLING */}

            <View
              style={styles.topSellingCard}
            >
              <View
                style={
                  styles.dashboardCardHeader
                }
              >
                <View
                  style={
                    styles.dashboardCardHeaderText
                  }
                >
                  <Text
                    style={
                      styles.dashboardCardTitle
                    }
                  >
                    Top Selling Items
                  </Text>

                  <Text
                    style={
                      styles.dashboardCardSubtitle
                    }
                  >
                    Best performing menu items
                  </Text>
                </View>

                <View
                  style={
                    styles.cardHeaderIcon
                  }
                >
                  <MaterialIcons
                    name="emoji-events"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>
              </View>

              {topSellingItems.length ===
              0 ? (
                <View
                  style={
                    styles.emptyBlock
                  }
                >
                  <MaterialIcons
                    name="restaurant"
                    size={32}
                    color={
                      COLORS.textFaint
                    }
                  />

                  <Text
                    style={
                      styles.emptyText
                    }
                  >
                    No items sold yet.
                  </Text>
                </View>
              ) : (
                topSellingItems.map(
                  (item, index) => {
                    const percentage =
                      (item.quantity /
                        maxTopItemQuantity) *
                      100;

                    const badgeColor =
                      RANK_BADGE_COLORS[
                        index
                      ] ??
                      "#E5DFD3";

                    const isLast =
                      index ===
                      topSellingItems.length -
                        1;

                    return (
                      <View
                        key={item.name}
                        style={[
                          styles.topItemRow,
                          isLast &&
                            styles.lastRow,
                        ]}
                      >
                        <View
                          style={[
                            styles.rankBadge,
                            {
                              backgroundColor:
                                badgeColor,
                            },
                          ]}
                        >
                          <Text
                            style={
                              styles.rankBadgeText
                            }
                          >
                            {index + 1}
                          </Text>
                        </View>

                        <View
                          style={
                            styles.topItemInfo
                          }
                        >
                          <Text
                            style={
                              styles.topItemName
                            }
                            numberOfLines={1}
                          >
                            {item.name}
                          </Text>

                          <View
                            style={
                              styles.topItemBarBackground
                            }
                          >
                            <View
                              style={[
                                styles.topItemBar,
                                {
                                  width: `${percentage}%`,
                                },
                              ]}
                            />
                          </View>
                        </View>

                        <View
                          style={
                            styles.topItemStats
                          }
                        >
                          <Text
                            style={
                              styles.topItemQuantity
                            }
                          >
                            {item.quantity}{" "}
                            sold
                          </Text>

                          <Text
                            style={
                              styles.topItemRevenue
                            }
                          >
                            {formatCurrency(
                              item.revenue
                            )}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                )
              )}
            </View>
          </View>

          {/* =================================================
              RECENT TRANSACTIONS
          ================================================= */}

          <View
            style={styles.transactionsCard}
          >
            <View
              style={
                styles.dashboardCardHeader
              }
            >
              <View
                style={
                  styles.dashboardCardHeaderText
                }
              >
                <Text
                  style={
                    styles.dashboardCardTitle
                  }
                >
                  Pinakabagong
                  Transaksyon
                </Text>

                <Text
                  style={
                    styles.dashboardCardSubtitle
                  }
                >
                  Latest sales activity
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  router.push(
                    "/admin/history"
                  )
                }
                style={({ pressed }) => [
                  styles.viewAllButton,
                  pressed &&
                    styles.pressed,
                ]}
              >
                <Text
                  style={
                    styles.viewAllLink
                  }
                >
                  Tingnan Lahat
                </Text>

                <MaterialIcons
                  name="arrow-forward"
                  size={17}
                  color={COLORS.primary}
                />
              </Pressable>
            </View>

            {recentTransactions.length ===
            0 ? (
              <View
                style={
                  styles.emptyBlock
                }
              >
                <MaterialIcons
                  name="receipt-long"
                  size={32}
                  color={
                    COLORS.textFaint
                  }
                />

                <Text
                  style={
                    styles.emptyText
                  }
                >
                  No transactions yet.
                </Text>
              </View>
            ) : (
              <View
                style={
                  styles.transactionTable
                }
              >
                {/* TABLE HEADER */}

                <View
                  style={
                    styles.transactionTableHeader
                  }
                >
                  <Text
                    style={
                      styles.tableHeaderTransaction
                    }
                  >
                    TRANSACTION
                  </Text>

                  <Text
                    style={
                      styles.tableHeaderItems
                    }
                  >
                    ITEMS
                  </Text>

                  <Text
                    style={
                      styles.tableHeaderTime
                    }
                  >
                    TIME
                  </Text>

                  <Text
                    style={
                      styles.tableHeaderPayment
                    }
                  >
                    PAYMENT
                  </Text>

                  <Text
                    style={[
                      styles.tableHeaderAmount,
                      styles.amountColumn,
                    ]}
                  >
                    AMOUNT
                  </Text>
                </View>

                {/* TABLE ROWS */}

                {recentTransactions.map(
                  (
                    transaction,
                    index
                  ) => {
                    const transactionTotal =
                      Number(
                        transaction.total
                      );

                    const itemCount =
                      transaction.items.reduce(
                        (
                          sum,
                          item
                        ) =>
                          sum +
                          item.quantity,
                        0
                      );

                    const isLast =
                      index ===
                      recentTransactions.length -
                        1;

                    return (
                      <View
                        key={
                          transaction.id
                        }
                        style={[
                          styles.transactionTableRow,
                          isLast &&
                            styles.lastTransactionRow,
                        ]}
                      >
                        {/* TRANSACTION */}

                        <View
                          style={
                            styles.tableTransaction
                          }
                        >
                          <View
                            style={
                              styles.transactionIcon
                            }
                          >
                            <MaterialIcons
                              name="receipt"
                              size={17}
                              color={
                                COLORS.onSurfaceVariant
                              }
                            />
                          </View>

                          <View
                            style={
                              styles.transactionInfo
                            }
                          >
                            <Text
                              style={
                                styles.transactionId
                              }
                              numberOfLines={
                                1
                              }
                            >
                              TXN-
                              {transaction.id
                                .slice(
                                  0,
                                  4
                                )
                                .toUpperCase()}
                            </Text>

                            <Text
                              style={
                                styles.transactionDate
                              }
                              numberOfLines={
                                1
                              }
                            >
                              {new Date(
                                transaction.date
                              ).toLocaleDateString(
                                "en-US"
                              )}
                            </Text>
                          </View>
                        </View>

                        {/* ITEMS */}

                        <Text
                          style={[
                            styles.tableCell,
                            styles.itemsColumn,
                          ]}
                          numberOfLines={
                            1
                          }
                        >
                          {itemCount}{" "}
                          items
                        </Text>

                        {/* TIME */}

                        <Text
                          style={[
                            styles.tableCell,
                            styles.timeColumn,
                          ]}
                          numberOfLines={
                            1
                          }
                        >
                          {formatTransactionTime(
                            transaction.date
                          )}
                        </Text>

                        {/* PAYMENT */}

                        <View
                          style={
                            styles.paymentCell
                          }
                        >
                          <View
                            style={[
                              styles.paymentBadge,
                              transaction.paymentMethod
                                ? styles.paidBadge
                                : styles.unpaidBadge,
                            ]}
                          >
                            <Text
                              style={
                                transaction.paymentMethod
                                  ? styles.paidLabel
                                  : styles.unpaidLabel
                              }
                              numberOfLines={
                                1
                              }
                            >
                              {transaction.paymentMethod
                                ? "✓ Bayad"
                                : "Hindi pa bayad"}
                            </Text>
                          </View>
                        </View>

                        {/* AMOUNT */}

                        <Text
                          style={[
                            styles.tableAmount,
                            styles.amountColumn,
                          ]}
                          numberOfLines={
                            1
                          }
                          adjustsFontSizeToFit
                        >
                          {formatCurrency(
                            transactionTotal
                          )}
                        </Text>
                      </View>
                    );
                  }
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <AdminBottomNav />
    </View>
  );
}
