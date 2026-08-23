import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { historyStyles as styles } from "@/styles/admin/history.styles";
import AdminBottomNav from "@/components/admin/AdminBottomNav";

type SaleItem = {
  product: string;
  quantity: number;
  price: number;
};

type Sale = {
  id: string;
  date: string;
  items: SaleItem[];
};

const salesData: Sale[] = [
  {
    id: "TXN-0042",
    date: "2026-08-22T12:34:00",
    items: [
      {
        product: "Pork Adobo",
        quantity: 1,
        price: 100,
      },
      {
        product: "Kanin (Rice)",
        quantity: 1,
        price: 50,
      },
      {
        product: "Softdrink",
        quantity: 1,
        price: 40,
      },
    ],
  },

  {
    id: "TXN-0041",
    date: "2026-08-22T11:58:00",
    items: [
      {
        product: "Sinigang na Baboy",
        quantity: 1,
        price: 75,
      },
      {
        product: "Kanin (Rice)",
        quantity: 1,
        price: 50,
      },
    ],
  },

  {
    id: "TXN-0040",
    date: "2026-08-22T11:15:00",
    items: [
      {
        product: "Fried Chicken",
        quantity: 1,
        price: 100,
      },
      {
        product: "Kanin (Rice)",
        quantity: 1,
        price: 50,
      },
      {
        product: "Softdrink",
        quantity: 1,
        price: 105,
      },
    ],
  },

  {
    id: "TXN-0039",
    date: "2026-08-22T10:42:00",
    items: [
      {
        product: "Bicol Express",
        quantity: 1,
        price: 60,
      },
      {
        product: "Garlic Rice",
        quantity: 1,
        price: 30,
      },
      {
        product: "Tubig",
        quantity: 1,
        price: 20,
      },
    ],
  },

  {
    id: "TXN-0038",
    date: "2026-08-21T13:05:00",
    items: [
      {
        product: "Lechon Kawali",
        quantity: 1,
        price: 120,
      },
      {
        product: "Kanin (Rice)",
        quantity: 1,
        price: 50,
      },
      {
        product: "Halo-Halo",
        quantity: 1,
        price: 50,
      },
    ],
  },
];

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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
};

const getItemsPreview = (sale: Sale) => {
  return sale.items
    .map((item) => item.product)
    .join(", ");
};

export default function History() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredSales = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return salesData;
    }

    return salesData.filter((sale) => {
      const items = getItemsPreview(sale).toLowerCase();

      return (
        sale.id.toLowerCase().includes(query) ||
        items.includes(query)
      );
    });
  }, [search]);

  const handleViewReceipt = (sale: Sale) => {
    const total = getSaleTotal(sale);

    const firstItem = sale.items[0];

    router.push({
      pathname: "/admin/receipt",
      params: {
        transactionId: sale.id,
        itemName: firstItem?.product ?? "Item",
        quantity: String(
          firstItem?.quantity ?? 1
        ),
        itemPrice: String(
          firstItem?.price ?? 0
        ),
        total: String(total),
        cash: String(total),
      },
    });
  };

  return (
    <View style={styles.page}>

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Sales History
        </Text>

        <Text style={styles.headerSubtitle}>
          Lahat ng transaksyon
        </Text>

      </View>

      {/* =================================================
          SEARCH
      ================================================= */}

      <View style={styles.searchContainer}>


        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Maghanap ng transaksyon..."
          placeholderTextColor="#A79F99"
          style={styles.searchInput}
        />

      </View>

      {/* =================================================
          HISTORY LIST
      ================================================= */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {filteredSales.map((sale) => {

          const total = getSaleTotal(sale);

          const items = getItemsPreview(sale);

          return (
            <View
              key={sale.id}
              style={styles.historyCard}
            >

              {/* ICON */}

              <View style={styles.receiptIconContainer}>
                <Text style={styles.receiptIcon}>
                  🧾
                </Text>
              </View>

              {/* DETAILS */}

              <View style={styles.transactionInfo}>

                <Text style={styles.transactionId}>
                  {sale.id}
                </Text>

                <Text style={styles.transactionDate}>
                  {formatDate(sale.date)}
                  {" · "}
                  {formatTime(sale.date)}
                </Text>

                <Text
                  style={styles.itemsText}
                  numberOfLines={1}
                >
                  {items}
                </Text>

              </View>

              {/* RIGHT SIDE */}

              <View style={styles.rightSide}>

                <Text style={styles.amount}>
                  {formatCurrency(total)}
                </Text>

                <Pressable
                  style={styles.viewButton}
                  onPress={() =>
                    handleViewReceipt(sale)
                  }
                >


                  <Text style={styles.viewText}>
                    View
                  </Text>

                </Pressable>

              </View>

            </View>
          );
        })}

        {filteredSales.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Walang transaction na nakita.
            </Text>
          </View>
        )}

      </ScrollView>

      {/* =================================================
          BOTTOM NAV
      ================================================= */}

      <View style={styles.bottomNav}>

        {/* DASHBOARD */}

        <Pressable
          style={styles.navItem}
          onPress={() =>
            router.replace("/admin/sales")
          }
        >

          <Text style={styles.navText}>
            Dashboard
          </Text>

        </Pressable>

        {/* HISTORY */}

        <Pressable
          style={[
            styles.navItem,
            styles.activeNavItem,
          ]}
        >

          <Text style={styles.activeNavText}>
            History
          </Text>

        </Pressable>

      </View>
      <AdminBottomNav/>
    </View>
  );
}