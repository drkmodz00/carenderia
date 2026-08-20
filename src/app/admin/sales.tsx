import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { salesStyles as styles } from "@/styles/admin/sales.styles";

type Period = "Today" | "This Week" | "This Month";

type SaleItem = {
  product: string;
  quantity: number;
  price: number;
};

type Sale = {
  id: number;
  date: string;
  items: SaleItem[];
};

/* =========================================================
   MOCK SALES DATA
   This will later come from your backend/database.
========================================================= */

const salesData: Sale[] = [
  {
    id: 1,
    date: "2026-08-20T06:30:00",
    items: [
      {
        product: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
      {
        product: "Chicken Adobo",
        quantity: 1,
        price: 50,
      },
    ],
  },

  {
    id: 2,
    date: "2026-08-20T07:15:00",
    items: [
      {
        product: "Steamed Rice",
        quantity: 3,
        price: 15,
      },
      {
        product: "Fried Chicken",
        quantity: 1,
        price: 60,
      },
    ],
  },

  {
    id: 3,
    date: "2026-08-20T08:20:00",
    items: [
      {
        product: "Chicken Adobo",
        quantity: 2,
        price: 50,
      },
      {
        product: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
    ],
  },

  {
    id: 4,
    date: "2026-08-20T09:40:00",
    items: [
      {
        product: "Pork Giniling",
        quantity: 1,
        price: 50,
      },
      {
        product: "Steamed Rice",
        quantity: 1,
        price: 15,
      },
    ],
  },

  {
    id: 5,
    date: "2026-08-20T11:10:00",
    items: [
      {
        product: "Fried Chicken",
        quantity: 2,
        price: 60,
      },
      {
        product: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
      {
        product: "Softdrink",
        quantity: 1,
        price: 30,
      },
    ],
  },

  {
    id: 6,
    date: "2026-08-20T12:30:00",
    items: [
      {
        product: "Chicken Adobo",
        quantity: 2,
        price: 50,
      },
      {
        product: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
    ],
  },

  {
    id: 7,
    date: "2026-08-19T08:30:00",
    items: [
      {
        product: "Steamed Rice",
        quantity: 4,
        price: 15,
      },
      {
        product: "Chicken Adobo",
        quantity: 2,
        price: 50,
      },
    ],
  },

  {
    id: 8,
    date: "2026-08-19T12:00:00",
    items: [
      {
        product: "Fried Chicken",
        quantity: 3,
        price: 60,
      },
      {
        product: "Softdrink",
        quantity: 2,
        price: 30,
      },
    ],
  },

  {
    id: 9,
    date: "2026-08-18T09:00:00",
    items: [
      {
        product: "Pork Giniling",
        quantity: 3,
        price: 50,
      },
      {
        product: "Steamed Rice",
        quantity: 3,
        price: 15,
      },
    ],
  },

  {
    id: 10,
    date: "2026-08-17T10:00:00",
    items: [
      {
        product: "Chicken Adobo",
        quantity: 3,
        price: 50,
      },
      {
        product: "Steamed Rice",
        quantity: 3,
        price: 15,
      },
    ],
  },

  {
    id: 11,
    date: "2026-08-16T11:30:00",
    items: [
      {
        product: "Fried Chicken",
        quantity: 2,
        price: 60,
      },
      {
        product: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
    ],
  },

  {
    id: 12,
    date: "2026-08-15T13:00:00",
    items: [
      {
        product: "Pork Giniling",
        quantity: 2,
        price: 50,
      },
      {
        product: "Softdrink",
        quantity: 2,
        price: 30,
      },
    ],
  },

  {
    id: 13,
    date: "2026-08-10T08:00:00",
    items: [
      {
        product: "Chicken Adobo",
        quantity: 4,
        price: 50,
      },
      {
        product: "Steamed Rice",
        quantity: 4,
        price: 15,
      },
    ],
  },

  {
    id: 14,
    date: "2026-08-05T12:00:00",
    items: [
      {
        product: "Fried Chicken",
        quantity: 5,
        price: 60,
      },
      {
        product: "Steamed Rice",
        quantity: 5,
        price: 15,
      },
    ],
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (amount: number): string => {
  return `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
  })}`;
};

const getSaleTotal = (sale: Sale): number => {
  return sale.items.reduce(
    (total, item) =>
      total + item.quantity * item.price,
    0
  );
};

const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date);

  const day = result.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
};

/* =========================================================
   DONUT CHART
========================================================= */

function DonutChart({
  data,
}: {
  data: {
    name: string;
    percentage: number;
    color: string;
  }[];
}) {
  const size = 190;
  const strokeWidth = 28;

  const radius = (size - strokeWidth) / 2;

  const circumference =
    2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <View style={styles.donutWrapper}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: [{ rotate: "-90deg" }],
        }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F1E9DF"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {data.map((item) => {
          const dashLength =
            (item.percentage / 100) *
            circumference;

          const gap = 4;

          const segment = (
            <Circle
              key={item.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${dashLength - gap} ${
                circumference -
                dashLength +
                gap
              }`}
              strokeDashoffset={
                -(
                  (accumulatedPercentage /
                    100) *
                  circumference
                )
              }
            />
          );

          accumulatedPercentage +=
            item.percentage;

          return segment;
        })}
      </Svg>

      <View style={styles.donutCenter}>
        <Text style={styles.donutTotal}>
          100%
        </Text>

        <Text style={styles.donutLabel}>
          Sales
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Sales() {
  const [period, setPeriod] =
    useState<Period>("Today");

  const [selectedHour, setSelectedHour] =
    useState<string | null>(null);

  const { width } = useWindowDimensions();

  const isSmallScreen = width < 700;

  /* =======================================================
     FILTER SALES
  ======================================================= */

  const filteredSales = useMemo(() => {
    const now = new Date(
      "2026-08-20T23:00:00"
    );

    const todayStart = new Date(now);

    todayStart.setHours(0, 0, 0, 0);

    if (period === "Today") {
      return salesData.filter((sale) => {
        const saleDate = new Date(
          sale.date
        );

        return saleDate >= todayStart;
      });
    }

    if (period === "This Week") {
      const weekStart =
        getStartOfWeek(now);

      return salesData.filter((sale) => {
        const saleDate = new Date(
          sale.date
        );

        return saleDate >= weekStart;
      });
    }

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    return salesData.filter((sale) => {
      const saleDate = new Date(
        sale.date
      );

      return saleDate >= monthStart;
    });
  }, [period]);

  /* =======================================================
     TOTAL SALES
  ======================================================= */

  const totalSales = useMemo(() => {
    return filteredSales.reduce(
      (total, sale) =>
        total + getSaleTotal(sale),
      0
    );
  }, [filteredSales]);

  /* =======================================================
     TOTAL ORDERS
  ======================================================= */

  const totalOrders =
    filteredSales.length;

  /* =======================================================
     AVERAGE ORDER VALUE
  ======================================================= */

  const averageOrder =
    totalOrders > 0
      ? totalSales / totalOrders
      : 0;

  /* =======================================================
     ITEM SALES
  ======================================================= */

  const itemStats = useMemo(() => {
    const stats: Record<
      string,
      {
        quantity: number;
        revenue: number;
      }
    > = {};

    filteredSales.forEach((sale) => {
      sale.items.forEach((item) => {
        if (!stats[item.product]) {
          stats[item.product] = {
            quantity: 0,
            revenue: 0,
          };
        }

        stats[item.product].quantity +=
          item.quantity;

        stats[item.product].revenue +=
          item.quantity * item.price;
      });
    });

    return Object.entries(stats)
      .map(([name, value]) => ({
        name,
        quantity: value.quantity,
        revenue: value.revenue,
      }))
      .sort(
        (a, b) =>
          b.quantity - a.quantity
      );
  }, [filteredSales]);

  /* =======================================================
     BEST SELLING ITEM
  ======================================================= */

  const bestSellingItem =
    itemStats.length > 0
      ? itemStats[0]
      : null;

  /* =======================================================
     TOP ITEMS TABLE
  ======================================================= */

  const topItems = useMemo(() => {
    if (totalSales === 0) {
      return [];
    }

    return itemStats
      .slice(0, 5)
      .map((item) => ({
        ...item,
        percentage:
          (item.revenue / totalSales) *
          100,
      }));
  }, [itemStats, totalSales]);

  /* =======================================================
     SALES BY HOUR
  ======================================================= */

  const salesByHour = useMemo(() => {
    const hours: Record<
      string,
      number
    > = {};

    for (let i = 6; i <= 17; i++) {
      const hour = new Date();

      hour.setHours(i, 0, 0, 0);

      const label =
        i < 12
          ? `${i}AM`
          : i === 12
          ? "12PM"
          : `${i - 12}PM`;

      hours[label] = 0;
    }

    filteredSales.forEach((sale) => {
      const saleDate = new Date(
        sale.date
      );

      const hour =
        saleDate.getHours();

      if (hour < 6 || hour > 17) {
        return;
      }

      const label =
        hour < 12
          ? `${hour}AM`
          : hour === 12
          ? "12PM"
          : `${hour - 12}PM`;

      hours[label] +=
        getSaleTotal(sale);
    });

    return Object.entries(hours).map(
      ([hour, sales]) => ({
        hour,
        sales,
      })
    );
  }, [filteredSales]);

  const maxSales = Math.max(
    ...salesByHour.map(
      (item) => item.sales
    ),
    100
  );

  /* =======================================================
     DONUT DATA
  ======================================================= */

  const donutData = useMemo(() => {
    const colors = [
      "#C85C00",
      "#F5B51B",
      "#A94B00",
      "#E27B00",
      "#D96F00",
    ];

    if (totalSales === 0) {
      return [];
    }

    return topItems.map(
      (item, index) => ({
        name: item.name,
        percentage:
          item.percentage,
        color:
          colors[index % colors.length],
      })
    );
  }, [topItems, totalSales]);

  /* =======================================================
     PERIOD LABEL
  ======================================================= */

  const periodDescription =
    period === "Today"
      ? "Today's overview and analytics"
      : period === "This Week"
      ? "This week's overview and analytics"
      : "This month's overview and analytics";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <View style={styles.page}>
      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <AdminSidebar />

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={[
            styles.header,
            isSmallScreen &&
              styles.headerSmall,
          ]}
        >
          <View>
            <Text style={styles.title}>
              Sales Reports
            </Text>

            <Text style={styles.subtitle}>
              {periodDescription}
            </Text>
          </View>

          {/* =================================================
              FILTER BUTTONS
          ================================================= */}

          <View
            style={styles.periodContainer}
          >
            {(
              [
                "Today",
                "This Week",
                "This Month",
              ] as Period[]
            ).map((item) => {
              const active =
                period === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => {
                    setPeriod(item);
                    setSelectedHour(
                      null
                    );
                  }}
                  style={[
                    styles.periodButton,
                    active &&
                      styles.periodButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.periodText,
                      active &&
                        styles.periodTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <View
          style={[
            styles.summaryGrid,
            isSmallScreen &&
              styles.summaryGridSmall,
          ]}
        >
          {/* TOTAL SALES */}

          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              TOTAL SALES
            </Text>

            <Text style={styles.salesValue}>
              {formatCurrency(
                totalSales
              )}
            </Text>
          </View>

          {/* TOTAL ORDERS */}

          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              TOTAL ORDERS
            </Text>

            <Text style={styles.numberValue}>
              {totalOrders}
            </Text>
          </View>

          {/* AVERAGE */}

          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              AVG ORDER VALUE
            </Text>

            <Text style={styles.salesValue}>
              {formatCurrency(
                averageOrder
              )}
            </Text>
          </View>

          {/* BEST SELLING */}

          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              BEST-SELLING ITEM
            </Text>

            <Text
              style={styles.bestItem}
              numberOfLines={1}
            >
              {bestSellingItem
                ? bestSellingItem.name
                : "No sales"}
            </Text>

            <Text style={styles.smallText}>
              {bestSellingItem
                ? `${bestSellingItem.quantity} sold`
                : "No data"}
            </Text>
          </View>
        </View>

        {/* =================================================
            CHARTS
        ================================================= */}

        <View
          style={[
            styles.chartRow,
            isSmallScreen &&
              styles.chartRowSmall,
          ]}
        >
          {/* =================================================
              SALES BY HOUR
          ================================================= */}

          <View
            style={[
              styles.chartCard,
              styles.hourChartCard,
              isSmallScreen &&
                styles.fullWidthCard,
            ]}
          >
            <Text
              style={styles.sectionTitle}
            >
              Sales by Hour
            </Text>

            <View
              style={styles.barChart}
            >
              {/* Y AXIS */}

              <View
                style={styles.yAxis}
              >
                <Text
                  style={
                    styles.axisText
                  }
                >
                  ₱{Math.round(maxSales)}
                </Text>

                <Text
                  style={
                    styles.axisText
                  }
                >
                  ₱{Math.round(
                    maxSales * 0.75
                  )}
                </Text>

                <Text
                  style={
                    styles.axisText
                  }
                >
                  ₱{Math.round(
                    maxSales * 0.5
                  )}
                </Text>

                <Text
                  style={
                    styles.axisText
                  }
                >
                  ₱{Math.round(
                    maxSales * 0.25
                  )}
                </Text>

                <Text
                  style={
                    styles.axisText
                  }
                >
                  ₱0
                </Text>
              </View>

              {/* BARS */}

              <View
                style={
                  styles.barsContainer
                }
              >
                <View
                  style={
                    styles.gridLineContainer
                  }
                >
                  {[0, 1, 2, 3, 4].map(
                    (item) => (
                      <View
                        key={item}
                        style={
                          styles.gridLine
                        }
                      />
                    )
                  )}
                </View>

                <View
                  style={styles.bars}
                >
                  {salesByHour.map(
                    (item) => {
                      const height =
                        (item.sales /
                          maxSales) *
                        220;

                      const isSelected =
                        selectedHour ===
                        item.hour;

                      return (
                        <Pressable
                          key={item.hour}
                          style={
                            styles.barColumn
                          }
                          onPress={() =>
                            setSelectedHour(
                              isSelected
                                ? null
                                : item.hour
                            )
                          }
                        >
                          {isSelected && (
                            <View
                              style={
                                styles.tooltip
                              }
                            >
                              <Text
                                style={
                                  styles.tooltipHour
                                }
                              >
                                {
                                  item.hour
                                }
                              </Text>

                              <Text
                                style={
                                  styles.tooltipSales
                                }
                              >
                                Sales:{" "}
                                {formatCurrency(
                                  item.sales
                                )}
                              </Text>
                            </View>
                          )}

                          <View
                            style={[
                              styles.bar,
                              {
                                height:
                                  item.sales >
                                  0
                                    ? Math.max(
                                        height,
                                        6
                                      )
                                    : 0,
                              },
                            ]}
                          />

                          <Text
                            style={
                              styles.hourLabel
                            }
                          >
                            {item.hour}
                          </Text>
                        </Pressable>
                      );
                    }
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* =================================================
              DONUT
          ================================================= */}

          <View
            style={[
              styles.chartCard,
              styles.donutCard,
              isSmallScreen &&
                styles.fullWidthCard,
            ]}
          >
            <Text
              style={styles.sectionTitle}
            >
              Top Items by Volume
            </Text>

            {donutData.length > 0 ? (
              <>
                <DonutChart
                  data={donutData}
                />

                <View
                  style={styles.legend}
                >
                  {donutData.map(
                    (item) => (
                      <View
                        key={item.name}
                        style={
                          styles.legendItem
                        }
                      >
                        <View
                          style={[
                            styles.legendDot,
                            {
                              backgroundColor:
                                item.color,
                            },
                          ]}
                        />

                        <Text
                          style={
                            styles.legendText
                          }
                        >
                          {item.name}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </>
            ) : (
              <View
                style={
                  styles.emptyChart
                }
              >
                <Text
                  style={
                    styles.emptyText
                  }
                >
                  No sales data
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* =================================================
            TOP SELLING TABLE
        ================================================= */}

        <View
          style={styles.tableCard}
        >
          <View
            style={styles.tableHeader}
          >
            <Text
              style={styles.sectionTitle}
            >
              Top-Selling Items
            </Text>

            <View
              style={
                styles.actionButtons
              }
            >
              <Pressable
                style={
                  styles.actionButton
                }
              >
                <Text
                  style={
                    styles.actionText
                  }
                >
                  Generate Report
                </Text>
              </Pressable>

              <Pressable
                style={
                  styles.actionButton
                }
              >
                <Text
                  style={
                    styles.actionText
                  }
                >
                  Print Report
                </Text>
              </Pressable>

              <Pressable
                style={
                  styles.actionButton
                }
              >
                <Text
                  style={
                    styles.actionText
                  }
                >
                  Export
                </Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
          >
            <View
              style={styles.table}
            >
              {/* TABLE HEADER */}

              <View
                style={
                  styles.tableRowHeader
                }
              >
                <Text
                  style={[
                    styles.tableHeaderText,
                    styles.rankColumn,
                  ]}
                >
                  RANK
                </Text>

                <Text
                  style={[
                    styles.tableHeaderText,
                    styles.itemColumn,
                  ]}
                >
                  ITEM
                </Text>

                <Text
                  style={[
                    styles.tableHeaderText,
                    styles.quantityColumn,
                  ]}
                >
                  QTY SOLD
                </Text>

                <Text
                  style={[
                    styles.tableHeaderText,
                    styles.revenueColumn,
                  ]}
                >
                  REVENUE
                </Text>

                <Text
                  style={[
                    styles.tableHeaderText,
                    styles.percentColumn,
                  ]}
                >
                  % OF TOTAL
                </Text>
              </View>

              {/* TABLE ROWS */}

              {topItems.length > 0 ? (
                topItems.map(
                  (item, index) => (
                    <View
                      key={item.name}
                      style={
                        styles.tableRow
                      }
                    >
                      {/* RANK */}

                      <View
                        style={
                          styles.rankColumn
                        }
                      >
                        <View
                          style={
                            styles.rankCircle
                          }
                        >
                          <Text
                            style={
                              styles.rankText
                            }
                          >
                            {index + 1}
                          </Text>
                        </View>
                      </View>

                      {/* ITEM */}

                      <Text
                        style={[
                          styles.itemText,
                          styles.itemColumn,
                        ]}
                      >
                        {item.name}
                      </Text>

                      {/* QTY */}

                      <Text
                        style={[
                          styles.tableValue,
                          styles.quantityColumn,
                        ]}
                      >
                        {item.quantity}
                      </Text>

                      {/* REVENUE */}

                      <Text
                        style={[
                          styles.tableValue,
                          styles.revenueColumn,
                        ]}
                      >
                        {formatCurrency(
                          item.revenue
                        )}
                      </Text>

                      {/* PERCENT */}

                      <View
                        style={[
                          styles.percentColumn,
                          styles.percentWrapper,
                        ]}
                      >
                        <View
                          style={
                            styles.progressBackground
                          }
                        >
                          <View
                            style={[
                              styles.progress,
                              {
                                width: `${Math.min(
                                  item.percentage,
                                  100
                                )}%`,
                              },
                            ]}
                          />
                        </View>

                        <Text
                          style={
                            styles.percentText
                          }
                        >
                          {item.percentage.toFixed(
                            0
                          )}
                          %
                        </Text>
                      </View>
                    </View>
                  )
                )
              ) : (
                <View
                  style={
                    styles.emptyTable
                  }
                >
                  <Text
                    style={
                      styles.emptyText
                    }
                  >
                    No sales found for this
                    period.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}