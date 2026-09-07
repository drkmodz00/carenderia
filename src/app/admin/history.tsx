import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createHistoryStyles, COLORS, getStatusMeta } from "@/styles/admin/history.styles";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import OrderDetailsModal, { OrderDetailsData } from "@/components/admin/modals/OrderDetailsModal";
import ReceiptModal, { ReceiptData } from "@/components/admin/modals/ReceiptModal";
import { supabase } from "@/lib/supabase";

type SaleItem = { product: string; quantity: number; price: number };

type Sale = {
  id: string;
  customerName: string;
  orderId: string;
  date: string;
  items: SaleItem[];
  total: number;
  paymentMethod?: string | null;
  orderType: "Dine In" | "Take Out";
  status: string;
};

type FilterOption = { label: string; value: string };

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "All" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const ORDER_TYPE_OPTIONS: FilterOption[] = [
  { label: "All Types", value: "All" },
  { label: "Dine In", value: "Dine In" },
  { label: "Take Out", value: "Take Out" },
];

export default function History() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isTablet = width >= 768;
  const styles = useMemo(() => createHistoryStyles(isTablet), [isTablet]);

  // STATE
  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("All");
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showOrderTypeDropdown, setShowOrderTypeDropdown] = useState(false);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsData | null>(null);

  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

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
            customer_name,
            status,
            order_type,
            created_at,
            order_items (
              id,
              menu_item_id,
              quantity,
              unit_price,
              subtotal,
              menu_items ( id, name )
            )
          )
        `)
        .order("sold_at", { ascending: false });

      if (error) throw error;

      const loadedSales = data ?? [];

      const formattedSales: Sale[] = loadedSales.map((sale: any) => {
        const order = Array.isArray(sale.orders) ? sale.orders[0] : sale.orders;
        const orderItems = order?.order_items ?? [];

        const items: SaleItem[] = orderItems.map((item: any) => {
          const menuItem = Array.isArray(item.menu_items) ? item.menu_items?.[0] : item.menu_items;
          return {
            product: menuItem?.name ?? "Unknown Item",
            quantity: Number(item.quantity),
            price: Number(item.unit_price),
          };
        });

        const rawOrderType = order?.order_type;
        let orderType: "Dine In" | "Take Out";

        if (rawOrderType === "dine_in") {
          orderType = "Dine In";
        } else if (rawOrderType === "take_out") {
          orderType = "Take Out";
        } else {
          throw new Error(`Invalid order type for order ${order?.id ?? sale.order_id}.`);
        }

        return {
          id: sale.id,
          orderId: sale.order_id ?? order?.id ?? "",
          customerName: order?.customer_name ?? "",
          date: sale.sold_at ?? order?.created_at ?? new Date().toISOString(),
          items,
          total: Number(sale.total),
          paymentMethod: sale.payment_method,
          orderType,
          status: order?.status ?? "completed",
        };
      });

      setSales(formattedSales);
    } catch (error) {
      console.error("Failed to load sales history:", error);
      const message = error instanceof Error ? error.message : "Unable to load sales history.";
      Alert.alert("History Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  // NAVIGATION
  const handleBackToSales = () => {
    router.push("/admin/sales");
  };

  // FORMATTERS
  const formatCurrency = (amount: number) => `₱${Number(amount).toFixed(2)}`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const getItemsPreview = (sale: Sale) => sale.items.map((item) => item.product).join(", ");

  // SUMMARY
  const completedCount = useMemo(
    () => sales.filter((sale) => sale.status.toLowerCase().trim() === "completed").length,
    [sales]
  );

  const cancelledCount = useMemo(
    () => sales.filter((sale) => sale.status.toLowerCase().trim() === "cancelled").length,
    [sales]
  );

  const totalRevenue = useMemo(
    () =>
      sales
        .filter((sale) => sale.status.toLowerCase().trim() === "completed")
        .reduce((sum, sale) => sum + Number(sale.total), 0),
    [sales]
  );

  // SEARCH + FILTER
  const filteredSales = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sales.filter((sale) => {
      const items = getItemsPreview(sale).toLowerCase();

      const matchesSearch =
        !query ||
        sale.id.toLowerCase().includes(query) ||
        sale.orderId.toLowerCase().includes(query) ||
        sale.customerName.toLowerCase().includes(query) ||
        items.includes(query) ||
        (sale.paymentMethod ?? "").toLowerCase().includes(query) ||
        sale.orderType.toLowerCase().includes(query) ||
        sale.status.toLowerCase().includes(query);

      const normalizedStatus = sale.status.toLowerCase().trim();
      const matchesStatus = statusFilter === "All" || normalizedStatus === statusFilter;
      const matchesOrderType = orderTypeFilter === "All" || sale.orderType === orderTypeFilter;

      return matchesSearch && matchesStatus && matchesOrderType;
    });
  }, [search, sales, statusFilter, orderTypeFilter]);

  // FILTER LABELS
  const statusLabel =
    statusFilter === "All"
      ? "All Status"
      : statusFilter === "completed"
      ? "Completed"
      : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1);

  const orderTypeLabel = orderTypeFilter === "All" ? "All Types" : orderTypeFilter;

  // VIEW ORDER
  const handleViewOrder = (sale: Sale) => {
    const orderNumber = `Order #${sale.orderId.slice(0, 8)}`;

    const orderDetails: OrderDetailsData = {
      id: sale.orderId,
      customerName: sale.customerName,
      orderNumber,
      date: formatDate(sale.date),
      time: formatTime(sale.date),
      orderType: sale.orderType,
      status: sale.status,
      items: sale.items.map((item, index) => ({
        id: `${sale.orderId}-${index}`,
        name: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      total: sale.total,
    };

    setSelectedOrder(orderDetails);
    setShowOrderDetails(true);
  };

  // CLOSE ORDER DETAILS
  const handleCloseOrderDetails = () => {
    if (isUpdatingOrder) return;
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  // MARK ORDER COMPLETED
  const handleMarkCompleted = async () => {
    if (!selectedOrder || isUpdatingOrder) return;

    const currentStatus = selectedOrder.status.toLowerCase().trim();
    if (currentStatus !== "ongoing") return;

    try {
      setIsUpdatingOrder(true);

      const { error } = await supabase
        .from("orders")
        .update({ status: "completed", completed_at: new Date().toISOString() })
        .eq("id", selectedOrder.id);

      if (error) throw error;

      setSelectedOrder((current) => (current ? { ...current, status: "completed" } : null));
      setSales((current) =>
        current.map((sale) => (sale.orderId === selectedOrder.id ? { ...sale, status: "completed" } : sale))
      );
    } catch (error) {
      console.error("Failed to complete order:", error);
      Alert.alert("Update Failed", error instanceof Error ? error.message : "Unable to complete the order.");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // CANCEL ORDER
  const handleCancelOrder = () => {
    if (!selectedOrder || isUpdatingOrder) return;

    const currentStatus = selectedOrder.status.toLowerCase().trim();
    if (currentStatus !== "ongoing") return;

    setShowCancelConfirm(true);
  };

  // CONFIRM CANCEL
  const confirmCancelOrder = async () => {
    if (!selectedOrder || isUpdatingOrder) return;

    try {
      setIsUpdatingOrder(true);

      const { error } = await supabase.from("orders").update({ status: "cancelled" }).eq("id", selectedOrder.id);
      if (error) throw error;

      setSelectedOrder((current) => (current ? { ...current, status: "cancelled" } : null));
      setSales((current) =>
        current.map((sale) => (sale.orderId === selectedOrder.id ? { ...sale, status: "cancelled" } : sale))
      );

      setShowCancelConfirm(false);
    } catch (error) {
      console.error("Failed to cancel order:", error);
      Alert.alert("Cancel Failed", error instanceof Error ? error.message : "Unable to cancel the order.");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // PRINT / VIEW RECEIPT
  const handlePrintReceipt = () => {
    if (!selectedOrder) return;

    const sale = sales.find((item) => item.orderId === selectedOrder.id);

    const receipt: ReceiptData = {
      orderId: selectedOrder.id,
      items: selectedOrder.items.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total: selectedOrder.total,
      paymentMethod: sale?.paymentMethod ?? null,
      soldAt: sale?.date ?? new Date().toISOString(),
      cashReceived: null,
      change: null,
    };

    setReceiptData(receipt);
    setShowOrderDetails(false);
    setShowReceipt(true);
  };

  // CLOSE RECEIPT
  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceiptData(null);
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setOrderTypeFilter("All");
    setShowStatusDropdown(false);
    setShowOrderTypeDropdown(false);
  };

  if (isLoading) {
    return (
      <View style={[styles.page, styles.centered, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingTitle}>Loading sales history</Text>
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
        <AdminBottomNav />
      </View>
    );
  }

  return (
    <View style={[styles.page, { paddingLeft: insets.left, paddingRight: insets.right }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.pageContent,
          isTablet && styles.pageContentTablet,
          { paddingTop: 18 + insets.top, paddingBottom: 24 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Sales History</Text>
            <Text style={styles.headerSubtitle}>Review and manage all transactions</Text>
          </View>
        </View>

        {/* SEARCH + FILTERS — one row, narrow dropdown buttons */}
        <View style={styles.controlsRow}>
          <View style={styles.searchCard}>
            <View style={styles.searchBar}>
              <MaterialIcons name="search" size={20} color={COLORS.muted} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search orders, customers, or items..."
                placeholderTextColor={COLORS.muted}
                style={styles.searchInput}
                returnKeyType="search"
              />
              {search.length > 0 && (
                <Pressable onPress={() => setSearch("")} hitSlop={8}>
                  <MaterialIcons name="close" size={19} color={COLORS.muted} />
                </Pressable>
              )}
            </View>
          </View>

          {/* STATUS FILTER */}
          <View style={[styles.filterWrapper, showStatusDropdown && styles.filterWrapperActive]}>
            <Pressable
              onPress={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowOrderTypeDropdown(false);
              }}
              style={({ pressed }) => [styles.filterButton, pressed && styles.pressed]}
            >
              <MaterialIcons name="filter-list" size={16} color={COLORS.primary} />
              <Text style={styles.filterText} numberOfLines={1}>{statusLabel}</Text>
              <MaterialIcons
                name={showStatusDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={18}
                color={COLORS.muted}
              />
            </Pressable>

            {showStatusDropdown && (
              <View style={styles.dropdown}>
                {STATUS_OPTIONS.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      setStatusFilter(option.value);
                      setShowStatusDropdown(false);
                    }}
                    style={({ pressed }) => [
                      styles.dropdownItem,
                      statusFilter === option.value && styles.dropdownItemActive,
                      pressed && styles.dropdownItemPressed,
                    ]}
                  >
                    <Text style={[styles.dropdownText, statusFilter === option.value && styles.dropdownTextActive]}>
                      {option.label}
                    </Text>
                    {statusFilter === option.value && (
                      <MaterialIcons name="check" size={16} color={COLORS.primary} />
                    )}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* ORDER TYPE FILTER */}
          <View style={[styles.filterWrapper, showOrderTypeDropdown && styles.filterWrapperActive]}>
            <Pressable
              onPress={() => {
                setShowOrderTypeDropdown((prev) => !prev);
                setShowStatusDropdown(false);
              }}
              style={({ pressed }) => [styles.filterButton, pressed && styles.pressed]}
            >
              <MaterialIcons name="restaurant" size={16} color={COLORS.primary} />
              <Text style={styles.filterText} numberOfLines={1}>{orderTypeLabel}</Text>
              <MaterialIcons
                name={showOrderTypeDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={18}
                color={COLORS.muted}
              />
            </Pressable>

            {showOrderTypeDropdown && (
              <View style={styles.dropdown}>
                {ORDER_TYPE_OPTIONS.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      setOrderTypeFilter(option.value);
                      setShowOrderTypeDropdown(false);
                    }}
                    style={({ pressed }) => [
                      styles.dropdownItem,
                      orderTypeFilter === option.value && styles.dropdownItemActive,
                      pressed && styles.dropdownItemPressed,
                    ]}
                  >
                    <Text
                      style={[styles.dropdownText, orderTypeFilter === option.value && styles.dropdownTextActive]}
                    >
                      {option.label}
                    </Text>
                    {orderTypeFilter === option.value && (
                      <MaterialIcons name="check" size={16} color={COLORS.primary} />
                    )}
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        <View style={[styles.summaryGrid, !isTablet && styles.summaryGridMobile]}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconPrimary]}>
              <MaterialIcons name="receipt-long" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Total Orders</Text>
              <Text style={styles.summaryValue}>{sales.length}</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconSuccess]}>
              <MaterialIcons name="check-circle" size={20} color={COLORS.success} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Completed</Text>
              <Text style={styles.summaryValue}>{completedCount}</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconDanger]}>
              <MaterialIcons name="cancel" size={20} color={COLORS.danger} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Cancelled</Text>
              <Text style={styles.summaryValue}>{cancelledCount}</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconWarning]}>
              <MaterialIcons name="payments" size={20} color={COLORS.warning} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Revenue</Text>
              <Text style={styles.summaryValue} numberOfLines={1} adjustsFontSizeToFit>
                {formatCurrency(totalRevenue)}
              </Text>
            </View>
          </View>
        </View>

        {/* TRANSACTIONS HEADER */}
        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Transactions</Text>
            <Text style={styles.sectionSubtitle}>
              {filteredSales.length} matching transaction{filteredSales.length !== 1 ? "s" : ""}
            </Text>
          </View>

          {(search || statusFilter !== "All" || orderTypeFilter !== "All") && (
            <Pressable onPress={clearFilters} style={styles.clearButton}>
              <MaterialIcons name="clear" size={15} color={COLORS.primary} />
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
          )}
        </View>

        {/* HISTORY CARD */}
        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <View>
              <Text style={styles.historyTitle}>Order History</Text>
              <Text style={styles.historySubtitle}>Previous transactions and order details</Text>
            </View>
            <View style={styles.orderCountBadge}>
              <Text style={styles.orderCountText}>{filteredSales.length}</Text>
            </View>
          </View>

          {isTablet && filteredSales.length > 0 && (
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableHeaderCell, styles.colOrder]}>ORDER</Text>
              <Text style={[styles.tableHeaderCell, styles.colDate]}>DATE & TIME</Text>
              <Text style={[styles.tableHeaderCell, styles.colItems]}>ITEMS</Text>
              <Text style={[styles.tableHeaderCell, styles.colType]}>TYPE</Text>
              <Text style={[styles.tableHeaderCell, styles.colStatus]}>STATUS</Text>
              <Text style={[styles.tableHeaderCell, styles.colTotal]}>TOTAL</Text>
              <Text style={[styles.tableHeaderCell, styles.colAction]}>ACTION</Text>
            </View>
          )}

          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => {
              const statusMeta = getStatusMeta(sale.status);
              const itemsPreview = getItemsPreview(sale);

              return (
                <Pressable
                  key={sale.id}
                  onPress={() => handleViewOrder(sale)}
                  style={({ pressed }) => [
                    styles.tableRow,
                    !isTablet && styles.mobileOrderCard,
                    pressed && styles.rowPressed,
                  ]}
                >
                  {/* ORDER */}
                  <View style={[styles.cell, styles.colOrder]}>
                    <Text style={styles.orderIdText} numberOfLines={1}>#{sale.orderId.slice(0, 8)}</Text>
                    <Text style={styles.customerText} numberOfLines={1}>
                      {sale.customerName || "Walk-in Customer"}
                    </Text>
                  </View>

                  {/* DATE */}
                  <View style={[styles.cell, styles.colDate]}>
                    <Text style={styles.dateText}>{formatDate(sale.date)}</Text>
                    <Text style={styles.timeText}>{formatTime(sale.date)}</Text>
                  </View>

                  {/* ITEMS */}
                  <View style={[styles.cell, styles.colItems]}>
                    <Text style={styles.itemsText} numberOfLines={1}>{itemsPreview || "No items"}</Text>
                    {!isTablet && (
                      <Text style={styles.mobileItemsHint}>
                        {sale.items.length} item{sale.items.length !== 1 ? "s" : ""}
                      </Text>
                    )}
                  </View>

                  {/* TYPE */}
                  <View style={[styles.cell, styles.colType]}>
                    <View style={styles.typeBadge}>
                      <MaterialIcons
                        name={sale.orderType === "Dine In" ? "restaurant" : "takeout-dining"}
                        size={13}
                        color={COLORS.onSurfaceVariant}
                      />
                      <Text style={styles.typeBadgeText} numberOfLines={1}>{sale.orderType}</Text>
                    </View>
                  </View>

                  {/* STATUS */}
                  <View style={[styles.cell, styles.colStatus]}>
                    <View style={[styles.statusBadge, { backgroundColor: statusMeta.bg }]}>
                      <Text style={[styles.statusBadgeText, { color: statusMeta.color }]} numberOfLines={1}>
                        {isTablet ? statusMeta.label : statusMeta.shortLabel}
                      </Text>
                    </View>
                  </View>

                  {/* TOTAL */}
                  <View style={[styles.cell, styles.colTotal]}>
                    <Text style={styles.amountText}>{formatCurrency(sale.total)}</Text>
                  </View>

                  {/* ACTION */}
                  <View style={[styles.cell, styles.colAction]}>
                    <View style={styles.viewButton}>
                      <MaterialIcons name="visibility" size={17} color={COLORS.primary} />
                      {isTablet && <Text style={styles.viewText}>View</Text>}
                    </View>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <MaterialIcons name="receipt-long" size={32} color={COLORS.muted} />
              </View>
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptyText}>Try changing your search or filters.</Text>

              {(search || statusFilter !== "All" || orderTypeFilter !== "All") && (
                <Pressable onPress={clearFilters} style={styles.clearFiltersButton}>
                  <Text style={styles.clearFiltersText}>Clear Filters</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <AdminBottomNav />

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          visible={showOrderDetails}
          data={selectedOrder}
          onClose={handleCloseOrderDetails}
          onEdit={() => {
            if (!selectedOrder) return;

            setShowOrderDetails(false);
            setSelectedOrder(null);

            router.push({
              pathname: "/admin/orders",
              params: {
                mode: "edit",
                orderId: selectedOrder.id,
                customerName: selectedOrder.customerName ?? "",
                orderType: selectedOrder.orderType,
                orderItems: JSON.stringify(selectedOrder.items),
              },
            });
          }}
          onMarkCompleted={handleMarkCompleted}
          onCancelOrder={handleCancelOrder}
          onPrintReceipt={handlePrintReceipt}
        />
      )}

      {/* CANCEL CONFIRMATION */}
      {showCancelConfirm && (
        <Modal
          visible={showCancelConfirm}
          transparent
          animationType="fade"
          onRequestClose={() => {
            if (!isUpdatingOrder) setShowCancelConfirm(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.confirmCard}>
              <View style={styles.confirmIcon}>
                <MaterialIcons name="warning" size={28} color={COLORS.danger} />
              </View>

              <Text style={styles.confirmTitle}>Cancel Order?</Text>
              <Text style={styles.confirmText}>
                Are you sure you want to cancel this order? This action cannot be undone.
              </Text>

              <View style={styles.confirmButtons}>
                <Pressable
                  disabled={isUpdatingOrder}
                  onPress={() => setShowCancelConfirm(false)}
                  style={({ pressed }) => [styles.keepButton, pressed && styles.pressed]}
                >
                  <Text style={styles.keepButtonText}>Keep Order</Text>
                </Pressable>

                <Pressable
                  disabled={isUpdatingOrder}
                  onPress={confirmCancelOrder}
                  style={({ pressed }) => [
                    styles.cancelButton,
                    isUpdatingOrder && styles.disabledButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.cancelButtonText}>{isUpdatingOrder ? "Cancelling..." : "Cancel Order"}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* RECEIPT */}
      {receiptData && (
        <ReceiptModal visible={showReceipt} data={receiptData} isHistory onClose={handleCloseReceipt} />
      )}
    </View>
  );
}