import { StyleSheet } from "react-native";
import { COLORS } from "./theme"

export { COLORS };

export const createSalesStyles = (isTablet: boolean) => {
  const pad = isTablet ? 24 : 16;
  const summaryColumns = isTablet ? 4 : 2;
  const summaryCardWidth = `${100 / summaryColumns - 2}%` as const;
  const dashboardCardFlex = isTablet ? { flex: 1 } : {};

  return StyleSheet.create({
    /* ROOT */
    page: { flex: 1, backgroundColor: COLORS.bg },
    centered: { justifyContent: "center", alignItems: "center" },
    loadingText: { marginTop: 12, fontSize: 14, color: COLORS.muted },
    container: { flex: 1 },
    content: { paddingBottom: 32 },
    contentInner: { paddingHorizontal: pad, paddingTop: 20, gap: 20 },

    /* HEADER */
    header: { paddingHorizontal: pad, paddingVertical: isTablet ? 18 : 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: COLORS.border },
    headerTitle: { color: COLORS.text, fontSize: isTablet ? 22 : 19, fontWeight: "800" },
    headerDate: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
    refreshButton: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.borderLight },
    pressed: { opacity: 0.7 },
    refreshText: { color: COLORS.text, fontSize: 13, fontWeight: "600" },

    /* SECTION LABEL */
    sectionLabel: { color: COLORS.muted, fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6 },

    /* SUMMARY GRID */
    summaryGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 12 },
    summaryCard: { width: summaryCardWidth, backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, borderLeftWidth: 3, padding: 16, gap: 6 },
    salesCard: { borderLeftColor: COLORS.primary },
    transactionCard: { borderLeftColor: "#5B8DEF" },
    averageCard: { borderLeftColor: "#B084F5" },
    itemsCard: { borderLeftColor: COLORS.success },

    summaryTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    summaryIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: COLORS.cardAlt, alignItems: "center", justifyContent: "center" },
    summaryTrend: { color: COLORS.textFaint, fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
    summaryCardLabel: { color: COLORS.muted, fontSize: 12.5, fontWeight: "600" },
    salesAmount: { color: COLORS.text, fontSize: isTablet ? 24 : 20, fontWeight: "800" },
    transactionAmount: { color: COLORS.text, fontSize: isTablet ? 24 : 20, fontWeight: "800" },
    averageAmount: { color: COLORS.text, fontSize: isTablet ? 24 : 20, fontWeight: "800" },
    itemsAmount: { color: COLORS.text, fontSize: isTablet ? 24 : 20, fontWeight: "800" },
    summaryCaption: { color: COLORS.mutedLight, fontSize: 11 },

    /* DASHBOARD GRID */
    dashboardGrid: { flexDirection: isTablet ? "row" : "column", gap: 16 },
    salesWeekCard: { ...dashboardCardFlex, backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: pad },
    topSellingCard: { ...dashboardCardFlex, backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: pad },
    transactionsCard: { backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: pad },

    dashboardCardHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 },
    dashboardCardHeaderText: { flex: 1, paddingRight: 12 },
    dashboardCardTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
    dashboardCardSubtitle: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
    cardHeaderIcon: { width: 32, height: 32, borderRadius: 9, backgroundColor: COLORS.cardAlt, alignItems: "center", justifyContent: "center" },

    /* WEEK CHART */
    weekContainer: { gap: 10 },
    weekRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    dayText: { width: 32, color: COLORS.muted, fontSize: 12, fontWeight: "600" },
    progressBackground: { flex: 1, height: 8, borderRadius: 4, backgroundColor: COLORS.borderLight, overflow: "hidden" },
    progressBar: { height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
    weekAmount: { width: 68, textAlign: "right", color: COLORS.muted, fontSize: 12, fontWeight: "600" },

    /* EMPTY STATE */
    emptyBlock: { alignItems: "center", justifyContent: "center", paddingVertical: 36, gap: 8 },
    emptyText: { color: COLORS.muted, fontSize: 13 },

    /* TOP SELLING ITEMS */
    topItemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    lastRow: { borderBottomWidth: 0 },
    rankBadge: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    rankBadgeText: { color: "#14161A", fontSize: 11, fontWeight: "800" },
    topItemInfo: { flex: 1, marginHorizontal: 10, gap: 5 },
    topItemName: { color: COLORS.text, fontSize: 13, fontWeight: "600" },
    topItemBarBackground: { height: 6, borderRadius: 3, backgroundColor: COLORS.borderLight, overflow: "hidden" },
    topItemBar: { height: 6, borderRadius: 3, backgroundColor: COLORS.primary },
    topItemStats: { alignItems: "flex-end" },
    topItemQuantity: { color: COLORS.text, fontSize: 12, fontWeight: "700" },
    topItemRevenue: { color: COLORS.muted, fontSize: 11, marginTop: 2 },

    /* RECENT TRANSACTIONS */
    viewAllButton: { flexDirection: "row", alignItems: "center", gap: 4 },
    viewAllLink: { color: COLORS.primary, fontSize: 12.5, fontWeight: "600" },

    transactionTable: { marginTop: 4 },
    transactionTableHeader: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
    tableHeaderTransaction: { flex: 2, color: COLORS.textFaint, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4 },
    tableHeaderItems: { flex: 1, color: COLORS.textFaint, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4 },
    tableHeaderTime: { flex: 1, color: COLORS.textFaint, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4 },
    tableHeaderPayment: { flex: 1, color: COLORS.textFaint, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4 },
    tableHeaderAmount: { flex: 1, color: COLORS.textFaint, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4 },
    amountColumn: { textAlign: "right" },

    transactionTableRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    lastTransactionRow: { borderBottomWidth: 0 },

    tableTransaction: { flex: 2, flexDirection: "row", alignItems: "center", gap: 8 },
    transactionIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.cardAlt, alignItems: "center", justifyContent: "center" },
    transactionInfo: { gap: 2 },
    transactionId: { color: COLORS.text, fontSize: 12, fontWeight: "700" },
    transactionDate: { color: COLORS.muted, fontSize: 10 },

    tableCell: { flex: 1, color: COLORS.muted, fontSize: 12 },
    itemsColumn: {},
    timeColumn: {},
    paymentCell: { flex: 1 },
    paymentBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
    paidBadge: { backgroundColor: COLORS.successBg },
    unpaidBadge: { backgroundColor: COLORS.warningBg },
    paidLabel: { color: COLORS.success, fontSize: 10, fontWeight: "700" },
    unpaidLabel: { color: COLORS.warning, fontSize: 10, fontWeight: "700" },
    tableAmount: { flex: 1, color: COLORS.text, fontSize: 13, fontWeight: "700" },
  });
};