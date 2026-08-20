import React, { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import AdminSidebar from "../../components/admin/AdminSidebar";

import OrderHistoryModal, {
  OrderHistoryData,
} from "../../components/admin/OrderHistoryModal";

import { historyStyles as styles } from "@/styles/admin/history.styles";

/* =====================================================
   TYPES
===================================================== */

type OrderStatus = "Completed" | "Voided";

type Filter = "All" | "Completed" | "Voided";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  time: string;
  items: string;
  total: number;
  staff: string;
  status: OrderStatus;
  orderItems: OrderItem[];
};

/* =====================================================
   MOCK DATA
===================================================== */

const MOCK_ORDERS: Order[] = [
  {
    id: "010",
    date: "Aug 18, 2026",
    time: "12:10 PM",
    items: "Fried Chicken×1, Chopseuy×1, Steamed Rice...",
    total: 160,
    staff: "Maria",
    status: "Completed",
    orderItems: [
      {
        name: "Fried Chicken",
        quantity: 1,
        price: 55,
      },
      {
        name: "Chopseuy",
        quantity: 1,
        price: 35,
      },
      {
        name: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
      {
        name: "Softdrink",
        quantity: 1,
        price: 20,
      },
    ],
  },

  {
    id: "009",
    date: "Aug 18, 2026",
    time: "11:32 AM",
    items: "Chicken Adobo×1, Steamed Rice×2",
    total: 80,
    staff: "Admin",
    status: "Completed",
    orderItems: [
      {
        name: "Chicken Adobo",
        quantity: 1,
        price: 50,
      },
      {
        name: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
    ],
  },

  {
    id: "008",
    date: "Aug 18, 2026",
    time: "10:47 AM",
    items: "Chicken Tinola×1, Steamed Rice×1",
    total: 60,
    staff: "Jose",
    status: "Completed",
    orderItems: [
      {
        name: "Chicken Tinola",
        quantity: 1,
        price: 45,
      },
      {
        name: "Steamed Rice",
        quantity: 1,
        price: 15,
      },
    ],
  },

  {
    id: "007",
    date: "Aug 18, 2026",
    time: "10:05 AM",
    items: "Pork Adobo×1, Steamed Rice×1, Bottled Water...",
    total: 80,
    staff: "Maria",
    status: "Completed",
    orderItems: [
      {
        name: "Pork Adobo",
        quantity: 1,
        price: 45,
      },
      {
        name: "Steamed Rice",
        quantity: 1,
        price: 15,
      },
      {
        name: "Bottled Water",
        quantity: 1,
        price: 20,
      },
    ],
  },

  {
    id: "006",
    date: "Aug 18, 2026",
    time: "9:18 AM",
    items: "Chicken Adobo×2, Steamed Rice×2",
    total: 130,
    staff: "Admin",
    status: "Completed",
    orderItems: [
      {
        name: "Chicken Adobo",
        quantity: 2,
        price: 50,
      },
      {
        name: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
    ],
  },

  {
    id: "005",
    date: "Aug 18, 2026",
    time: "9:00 AM",
    items: "Chopseuy×1, Steamed Rice×2, Softdrink×2",
    total: 105,
    staff: "Maria",
    status: "Completed",
    orderItems: [
      {
        name: "Chopseuy",
        quantity: 1,
        price: 35,
      },
      {
        name: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
      {
        name: "Softdrink",
        quantity: 2,
        price: 20,
      },
    ],
  },

  {
    id: "004",
    date: "Aug 18, 2026",
    time: "8:33 AM",
    items: "Fried Fish×1, Steamed Rice×1",
    total: 55,
    staff: "Jose",
    status: "Completed",
    orderItems: [
      {
        name: "Fried Fish",
        quantity: 1,
        price: 40,
      },
      {
        name: "Steamed Rice",
        quantity: 1,
        price: 15,
      },
    ],
  },

  {
    id: "003",
    date: "Aug 17, 2026",
    time: "5:42 PM",
    items: "Pork Adobo×2, Steamed Rice×2",
    total: 120,
    staff: "Maria",
    status: "Completed",
    orderItems: [
      {
        name: "Pork Adobo",
        quantity: 2,
        price: 45,
      },
      {
        name: "Steamed Rice",
        quantity: 2,
        price: 15,
      },
    ],
  },

  {
    id: "002",
    date: "Aug 17, 2026",
    time: "4:20 PM",
    items: "Fried Chicken×1, Softdrink×1",
    total: 75,
    staff: "Admin",
    status: "Voided",
    orderItems: [
      {
        name: "Fried Chicken",
        quantity: 1,
        price: 55,
      },
      {
        name: "Softdrink",
        quantity: 1,
        price: 20,
      },
    ],
  },

  {
    id: "001",
    date: "Aug 17, 2026",
    time: "3:15 PM",
    items: "Chicken Tinola×1, Steamed Rice×1",
    total: 60,
    staff: "Jose",
    status: "Completed",
    orderItems: [
      {
        name: "Chicken Tinola",
        quantity: 1,
        price: 45,
      },
      {
        name: "Steamed Rice",
        quantity: 1,
        price: 15,
      },
    ],
  },
];

/* =====================================================
   CURRENCY
===================================================== */

const formatCurrency = (amount: number): string => {
  return `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/* =====================================================
   STATUS BADGE
===================================================== */

type StatusBadgeProps = {
  status: OrderStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isCompleted = status === "Completed";

  return (
    <View
      style={[
        styles.statusBadge,
        isCompleted
          ? styles.completedBadge
          : styles.voidedBadge,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isCompleted
            ? styles.completedText
            : styles.voidedText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

/* =====================================================
   MAIN SCREEN
===================================================== */

export default function OrderHistoryScreen() {
  /* ===================================================
     SEARCH
  =================================================== */

  const [search, setSearch] = useState<string>("");

  /* ===================================================
     FILTER
  =================================================== */

  const [filter, setFilter] = useState<Filter>("All");

  const [showFilter, setShowFilter] =
    useState<boolean>(false);

  /* ===================================================
     MODAL
  =================================================== */

  const [selectedOrder, setSelectedOrder] =
    useState<OrderHistoryData | null>(null);

  const [showOrderModal, setShowOrderModal] =
    useState<boolean>(false);

  /* ===================================================
     FILTER OPTIONS
  =================================================== */

  const filterOptions: Filter[] = [
    "All",
    "Completed",
    "Voided",
  ];

  /* ===================================================
     FILTER + SEARCH
  =================================================== */

  const filteredOrders = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return MOCK_ORDERS.filter((order: Order) => {
      const matchesFilter =
        filter === "All" ||
        order.status === filter;

      const matchesSearch =
        searchValue === "" ||
        order.id
          .toLowerCase()
          .includes(searchValue) ||
        order.staff
          .toLowerCase()
          .includes(searchValue) ||
        order.items
          .toLowerCase()
          .includes(searchValue);

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  /* ===================================================
     OPEN MODAL
  =================================================== */

  const handleViewOrder = (order: Order): void => {
    const modalOrder: OrderHistoryData = {
      id: order.id,
      date: order.date,
      time: order.time,
      staff: order.staff,
      total: order.total,
      items: order.orderItems,
    };

    setSelectedOrder(modalOrder);
    setShowOrderModal(true);
  };

  /* ===================================================
     CLOSE MODAL
  =================================================== */

  const handleCloseModal = (): void => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  /* ===================================================
     SCREEN
  =================================================== */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F7F8"
      />

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <View style={styles.container}>

        {/* =================================================
            SIDEBAR

            IMPORTANT:
            Keep this OUTSIDE styles.main so it stays
            on the left side just like your Orders page.
        ================================================= */}

        <AdminSidebar />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <View style={styles.main}>

          {/* ===============================================
              HEADER
          =============================================== */}

          <View style={styles.topHeader}>

            {/* TITLE */}

            <View style={styles.headingContainer}>
              <Text style={styles.title}>
                Order History
              </Text>

              <Text style={styles.subtitle}>
                {MOCK_ORDERS.length} total orders today
              </Text>
            </View>

            {/* =============================================
                SEARCH + FILTER
            ============================================= */}

            <View style={styles.controls}>

              {/* SEARCH */}

              <View style={styles.searchContainer}>
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search orders..."
                  placeholderTextColor="#9CA3AF"
                  style={styles.searchInput}
                  returnKeyType="search"
                />
              </View>

              {/* FILTER */}

              <View style={styles.filterWrapper}>

                <Pressable
                  onPress={() =>
                    setShowFilter(
                      (current: boolean) =>
                        !current
                    )
                  }
                  style={styles.filterSelect}
                >
                  <Text
                    style={
                      styles.filterSelectText
                    }
                  >
                    {filter}
                  </Text>

                  <Text
                    style={styles.filterArrow}
                  >
                    {showFilter ? "⌃" : "⌄"}
                  </Text>
                </Pressable>

                {/* FILTER DROPDOWN */}

                {showFilter && (
                  <View
                    style={styles.filterMenu}
                  >
                    {filterOptions.map(
                      (option: Filter) => {
                        const active =
                          filter === option;

                        return (
                          <Pressable
                            key={option}
                            onPress={() => {
                              setFilter(option);
                              setShowFilter(false);
                            }}
                            style={[
                              styles.filterOption,
                              active &&
                                styles.filterOptionActive,
                            ]}
                          >
                            <Text
                              style={[
                                styles.filterOptionText,
                                active &&
                                  styles.filterOptionTextActive,
                              ]}
                            >
                              {option}
                            </Text>
                          </Pressable>
                        );
                      }
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* ===============================================
              TABLE
          =============================================== */}

          <View style={styles.tableContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {/* =========================================
                  TABLE HEADER
              ========================================= */}

              <View style={styles.tableHeader}>

                <View style={styles.orderColumn}>
                  <Text style={styles.headerText}>
                    ORDER #
                  </Text>
                </View>

                <View style={styles.dateColumn}>
                  <Text style={styles.headerText}>
                    DATE
                  </Text>
                </View>

                <View style={styles.timeColumn}>
                  <Text style={styles.headerText}>
                    TIME
                  </Text>
                </View>

                <View style={styles.itemsColumn}>
                  <Text style={styles.headerText}>
                    ITEMS
                  </Text>
                </View>

                <View style={styles.totalColumn}>
                  <Text style={styles.headerText}>
                    TOTAL
                  </Text>
                </View>

                <View style={styles.staffColumn}>
                  <Text style={styles.headerText}>
                    STAFF
                  </Text>
                </View>

                <View style={styles.statusColumn}>
                  <Text style={styles.headerText}>
                    STATUS
                  </Text>
                </View>

                <View style={styles.actionColumn}>
                  <Text style={styles.headerText}>
                    ACTION
                  </Text>
                </View>
              </View>

              {/* =========================================
                  TABLE BODY
              ========================================= */}

              {filteredOrders.length === 0 ? (
                <View
                  style={styles.emptyContainer}
                >
                  <Text
                    style={styles.emptyTitle}
                  >
                    No orders found
                  </Text>

                  <Text
                    style={styles.emptySubtitle}
                  >
                    Try changing your search or
                    filter.
                  </Text>

                  {search.length > 0 && (
                    <Pressable
                      onPress={() =>
                        setSearch("")
                      }
                      style={styles.clearButton}
                    >
                      <Text
                        style={
                          styles.clearButtonText
                        }
                      >
                        Clear search
                      </Text>
                    </Pressable>
                  )}
                </View>
              ) : (
                filteredOrders.map(
                  (order: Order) => (
                    <View
                      key={order.id}
                      style={styles.tableRow}
                    >

                      {/* ORDER NUMBER */}

                      <View
                        style={styles.orderColumn}
                      >
                        <Text
                          style={
                            styles.orderNumber
                          }
                        >
                          #{order.id}
                        </Text>
                      </View>

                      {/* DATE */}

                      <View
                        style={styles.dateColumn}
                      >
                        <Text
                          style={styles.cellText}
                        >
                          {order.date}
                        </Text>
                      </View>

                      {/* TIME */}

                      <View
                        style={styles.timeColumn}
                      >
                        <Text
                          style={styles.cellText}
                        >
                          {order.time}
                        </Text>
                      </View>

                      {/* ITEMS */}

                      <View
                        style={styles.itemsColumn}
                      >
                        <Text
                          style={styles.cellText}
                          numberOfLines={1}
                        >
                          {order.items}
                        </Text>
                      </View>

                      {/* TOTAL */}

                      <View
                        style={styles.totalColumn}
                      >
                        <Text
                          style={styles.totalText}
                        >
                          {formatCurrency(
                            order.total
                          )}
                        </Text>
                      </View>

                      {/* STAFF */}

                      <View
                        style={styles.staffColumn}
                      >
                        <Text
                          style={styles.cellText}
                        >
                          {order.staff}
                        </Text>
                      </View>

                      {/* STATUS */}

                      <View
                        style={styles.statusColumn}
                      >
                        <StatusBadge
                          status={order.status}
                        />
                      </View>

                      {/* ACTION */}

                      <View
                        style={styles.actionColumn}
                      >
                        <Pressable
                          onPress={() =>
                            handleViewOrder(
                              order
                            )
                          }
                          style={styles.viewButton}
                        >
                          <Text
                            style={
                              styles.viewButtonText
                            }
                          >
                            View
                          </Text>
                        </Pressable>
                      </View>

                    </View>
                  )
                )
              )}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* =================================================
          ORDER HISTORY MODAL
          
          This stays exactly as your existing modal.
      ================================================= */}

      <OrderHistoryModal
        visible={showOrderModal}
        order={selectedOrder}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}