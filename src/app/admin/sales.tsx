import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import AdminSidebar from "@/components/admin/AdminBottomNav";
import { salesStyles as styles } from "@/styles/admin/sales.styles";

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
========================================================= */
const router = useRouter();

const salesData: Sale[] = [
  {
    id: 1,
    date: "2026-08-20T06:30:00",
    items: [
      { product: "Steamed Rice", quantity: 2, price: 15 },
      { product: "Chicken Adobo", quantity: 1, price: 50 },
    ],
  },
  {
    id: 2,
    date: "2026-08-20T07:15:00",
    items: [
      { product: "Steamed Rice", quantity: 3, price: 15 },
      { product: "Fried Chicken", quantity: 1, price: 60 },
    ],
  },
  {
    id: 3,
    date: "2026-08-20T08:20:00",
    items: [
      { product: "Chicken Adobo", quantity: 2, price: 50 },
      { product: "Steamed Rice", quantity: 2, price: 15 },
    ],
  },
  {
    id: 4,
    date: "2026-08-20T09:40:00",
    items: [
      { product: "Pork Giniling", quantity: 1, price: 50 },
      { product: "Steamed Rice", quantity: 1, price: 15 },
    ],
  },
  {
    id: 5,
    date: "2026-08-20T11:10:00",
    items: [
      { product: "Fried Chicken", quantity: 2, price: 60 },
      { product: "Steamed Rice", quantity: 2, price: 15 },
      { product: "Softdrink", quantity: 1, price: 30 },
    ],
  },
  {
    id: 6,
    date: "2026-08-20T12:30:00",
    items: [
      { product: "Chicken Adobo", quantity: 2, price: 50 },
      { product: "Steamed Rice", quantity: 2, price: 15 },
    ],
  },
  {
    id: 7,
    date: "2026-08-19T08:30:00",
    items: [
      { product: "Steamed Rice", quantity: 4, price: 15 },
      { product: "Chicken Adobo", quantity: 2, price: 50 },
    ],
  },
  {
    id: 8,
    date: "2026-08-19T12:00:00",
    items: [
      { product: "Fried Chicken", quantity: 3, price: 60 },
      { product: "Softdrink", quantity: 2, price: 30 },
    ],
  },
  {
    id: 9,
    date: "2026-08-18T09:00:00",
    items: [
      { product: "Pork Giniling", quantity: 3, price: 50 },
      { product: "Steamed Rice", quantity: 3, price: 15 },
    ],
  },
  {
    id: 10,
    date: "2026-08-17T10:00:00",
    items: [
      { product: "Chicken Adobo", quantity: 3, price: 50 },
      { product: "Steamed Rice", quantity: 3, price: 15 },
    ],
  },
  {
    id: 11,
    date: "2026-08-16T11:30:00",
    items: [
      { product: "Fried Chicken", quantity: 2, price: 60 },
      { product: "Steamed Rice", quantity: 2, price: 15 },
    ],
  },
  {
    id: 12,
    date: "2026-08-15T13:00:00",
    items: [
      { product: "Pork Giniling", quantity: 2, price: 50 },
      { product: "Softdrink", quantity: 2, price: 30 },
    ],
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getSaleTotal = (sale: Sale) => {
  return sale.items.reduce(
    (total, item) =>
      total + item.quantity * item.price,
    0
  );
};

const formatCurrency = (amount: number) => {
  return `₱${amount.toFixed(2)}`;
};

const formatTransactionDate = (date: string) => {
  const value = new Date(date);

  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const formatTransactionTime = (date: string) => {
  const value = new Date(date);

  return value.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/* =========================================================
   MAIN
========================================================= */

export default function Sales() {

  /*
   * Use the latest date in the mock data as the
   * simulated "today".
   */
  const dashboardDate = new Date(
    "2026-08-20T23:59:59"
  );

  /* =======================================================
     TODAY'S SALES
  ======================================================= */

  const todaySales = useMemo(() => {
    return salesData.filter((sale) => {
      const date = new Date(sale.date);

      return (
        date.getFullYear() === dashboardDate.getFullYear() &&
        date.getMonth() === dashboardDate.getMonth() &&
        date.getDate() === dashboardDate.getDate()
      );
    });
  }, []);

  const totalSales = todaySales.reduce(
    (total, sale) => total + getSaleTotal(sale),
    0
  );

  const totalTransactions = todaySales.length;

  const averageSale =
    totalTransactions > 0
      ? totalSales / totalTransactions
      : 0;

  /* =======================================================
     RECENT TRANSACTIONS
  ======================================================= */

  const recentTransactions = useMemo(() => {
    return [...salesData]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 5);
  }, []);

  /* =======================================================
     SALES THIS WEEK
  ======================================================= */

  const weekSales = useMemo(() => {

    const result = [
      {
        day: "Mon",
        amount: 0,
      },
      {
        day: "Tue",
        amount: 0,
      },
      {
        day: "Wed",
        amount: 0,
      },
      {
        day: "Thu",
        amount: 0,
      },
      {
        day: "Fri",
        amount: 0,
      },
      {
        day: "Sat",
        amount: 0,
      },
      {
        day: "Sun",
        amount: 0,
      },
    ];

    salesData.forEach((sale) => {
      const date = new Date(sale.date);

      /*
       * JS:
       * Sunday = 0
       * Monday = 1
       */
      const dayIndex =
        date.getDay() === 0
          ? 6
          : date.getDay() - 1;

      result[dayIndex].amount += getSaleTotal(sale);
    });

    return result;
  }, []);

  const maxWeekSales = Math.max(
    ...weekSales.map((item) => item.amount),
    1
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <View style={styles.page}>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <Text style={styles.title}>
            Sales Dashboard
          </Text>

          <Text style={styles.date}>
            Aug 20, 2026
          </Text>

        </View>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <View style={styles.summaryRow}>

          {/* TODAY'S SALES */}

          <View
            style={[
              styles.summaryCard,
              styles.salesCard,
            ]}
          >

            <Text style={styles.summaryIcon}>
              💰
            </Text>

            <Text style={styles.salesAmount}>
              {formatCurrency(totalSales)}
            </Text>

            <Text style={styles.summaryLabel}>
              Today's Sales
            </Text>

          </View>

          {/* TRANSACTIONS */}

          <View
            style={[
              styles.summaryCard,
              styles.transactionCard,
            ]}
          >

            <Text style={styles.summaryIcon}>
              🧾
            </Text>

            <Text style={styles.transactionAmount}>
              {totalTransactions}
            </Text>

            <Text style={styles.summaryLabel}>
              Transactions
            </Text>

          </View>

          {/* AVERAGE */}

          <View
            style={[
              styles.summaryCard,
              styles.averageCard,
            ]}
          >

            <Text style={styles.summaryIcon}>
              📊
            </Text>

            <Text style={styles.averageAmount}>
              {formatCurrency(averageSale)}
            </Text>

            <Text style={styles.summaryLabel}>
              Average
            </Text>

          </View>

        </View>

        {/* =================================================
            RECENT TRANSACTIONS
        ================================================= */}

        <View style={styles.sectionCard}>

          <Text style={styles.sectionTitle}>
            Recent Transactions
          </Text>

          <View style={styles.sectionDivider} />

          {recentTransactions.map(
            (transaction, index) => {

              const total =
                getSaleTotal(transaction);

              return (
                <View
                  key={transaction.id}
                  style={[
                    styles.transactionRow,
                    index ===
                      recentTransactions.length - 1 &&
                      styles.lastTransactionRow,
                  ]}
                >

                  {/* ICON */}

                  <View style={styles.transactionIcon}>
                    <Text style={styles.receiptIcon}>
                      🧾
                    </Text>
                  </View>

                  {/* DETAILS */}

                  <View style={styles.transactionInfo}>

                    <Text style={styles.transactionId}>
                      {`TXN-${String(
                        43 - transaction.id + 1
                      ).padStart(4, "0")}`}
                    </Text>

                    <Text style={styles.transactionDate}>
                      {formatTransactionDate(
                        transaction.date
                      )}{" "}
                      ·{" "}
                      {formatTransactionTime(
                        transaction.date
                      )}
                    </Text>

                  </View>

                  {/* AMOUNT */}

                  <Text
                    style={styles.transactionAmountValue}
                  >
                    {formatCurrency(total)}
                  </Text>

                </View>
              );
            }
          )}

        </View>

        {/* =================================================
            SALES THIS WEEK
        ================================================= */}

        <View style={styles.sectionCard}>

          <Text style={styles.sectionTitle}>
            Sales This Week
          </Text>

          <View style={styles.weekContainer}>

            {weekSales.map((item) => {

              const percentage =
                (item.amount / maxWeekSales) *
                100;

              return (
                <View
                  key={item.day}
                  style={styles.weekRow}
                >

                  <Text style={styles.dayText}>
                    {item.day}
                  </Text>

                  <View
                    style={styles.progressBackground}
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

                  <Text style={styles.weekAmount}>
                    ₱{item.amount.toFixed(0)}
                  </Text>

                </View>
              );
            })}

          </View>

        </View>

      </ScrollView>

      {/* =================================================
          BOTTOM NAV
      ================================================= */}
      <View style={styles.bottomNav}>

          <Pressable
            style={[
              styles.navItem,
              styles.activeNavItem,
            ]}
            onPress={() => {
              // Already on Sales Dashboard
            }}
          >
            <Text style={styles.activeNavText}>
              Dashboard
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => router.push("/admin/history")}
          >
            <Text style={styles.navText}>
              History
            </Text>
          </Pressable>

        </View>
      <AdminSidebar />

    </View>
  );
}