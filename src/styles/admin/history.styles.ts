import { StyleSheet } from "react-native";
import { COLORS as THEME_COLORS } from "./theme";

export const COLORS = THEME_COLORS;

export const getStatusMeta = (status: string) => {
  const normalized = status.toLowerCase().trim();

  if (normalized === "ongoing") {
    return { bg: COLORS.warningBg, color: COLORS.warning, label: "Ongoing", shortLabel: "Ongoing" };
  }
  if (normalized === "completed") {
    return { bg: COLORS.successBg, color: COLORS.success, label: "Completed", shortLabel: "Done" };
  }
  if (normalized === "cancelled") {
    return { bg: COLORS.dangerBg, color: COLORS.danger, label: "Cancelled", shortLabel: "Cancelled" };
  }
  return { bg: COLORS.cardAlt, color: COLORS.muted, label: status, shortLabel: status };
};

export const createHistoryStyles = (isTablet: boolean) => {
  const pad = isTablet ? 24 : 16;
  const summaryCardWidth = isTablet ? "23.5%" : "48%";

  return StyleSheet.create({
    /* ROOT */
    page: { flex: 1, backgroundColor: COLORS.bg },
    centered: { justifyContent: "center", alignItems: "center" },
    loadingCard: { backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 24, alignItems: "center", gap: 6 },
    loadingTitle: { color: COLORS.text, fontSize: 15, fontWeight: "700", marginTop: 8 },
    loadingText: { color: COLORS.muted, fontSize: 12 },

    scroll: { flex: 1 },
    pageContent: { paddingHorizontal: pad, paddingTop: 18, gap: 16 },
    pageContentTablet: { paddingHorizontal: 24 },

    /* HEADER */
    header: { flexDirection: "row", alignItems: "center" },
    headerText: { flex: 1 },
    headerTitle: { color: COLORS.text, fontSize: isTablet ? 22 : 19, fontWeight: "800" },
    headerSubtitle: { color: COLORS.muted, fontSize: 12, marginTop: 2 },

    /* SEARCH + FILTERS (one row) */
    controlsRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 10, zIndex: 50 },
    searchCard: { flex: 1, minWidth: 160 },
    searchBar: { flexDirection: "row", alignItems: "center", gap: 8, height: 46, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card, paddingHorizontal: 14 },
    searchInput: { flex: 1, color: COLORS.text, fontSize: 13 },

    filterWrapper: { width: 126, position: "relative", zIndex: 10 },
    filterWrapperActive: { zIndex: 999 },
    filterButton: { flexDirection: "row", alignItems: "center", gap: 6, height: 46, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card, paddingHorizontal: 10 },
    pressed: { opacity: 0.7 },
    filterText: { flex: 1, color: COLORS.text, fontSize: 12, fontWeight: "700" },

    dropdown: { position: "absolute", top: 52, left: 0, right: 0, backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, overflow: "hidden", zIndex: 1000, elevation: 16, shadowColor: "#000", shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
    dropdownItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 42, paddingHorizontal: 12 },
    dropdownItemActive: { backgroundColor: COLORS.primaryMuted },
    dropdownItemPressed: { backgroundColor: COLORS.cardAlt },
    dropdownText: { color: COLORS.text, fontSize: 12, fontWeight: "600" },
    dropdownTextActive: { color: COLORS.primary, fontWeight: "800" },

    /* SUMMARY */
    summaryGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 12, zIndex: 1 },
    summaryGridMobile: { rowGap: 10 },
    summaryCard: { width: summaryCardWidth, flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 14 },
    summaryIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: COLORS.cardAlt, alignItems: "center", justifyContent: "center" },
    summaryIconPrimary: { backgroundColor: COLORS.primaryMuted },
    summaryIconSuccess: { backgroundColor: COLORS.successBg },
    summaryIconDanger: { backgroundColor: COLORS.dangerBg },
    summaryIconWarning: { backgroundColor: COLORS.warningBg },
    summaryInfo: { flex: 1, minWidth: 0 },
    summaryLabel: { color: COLORS.muted, fontSize: 11, fontWeight: "600" },
    summaryValue: { color: COLORS.text, fontSize: 17, fontWeight: "800", marginTop: 2 },

    /* SECTION HEADING */
    sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", zIndex: 1 },
    sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
    sectionSubtitle: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
    clearButton: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: COLORS.cardAlt, borderWidth: 1, borderColor: COLORS.borderLight },
    clearButtonText: { color: COLORS.primary, fontSize: 12, fontWeight: "700" },

    /* HISTORY CARD */
    historyCard: { backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, overflow: "hidden", zIndex: 1 },
    historyHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: pad, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    historyTitle: { color: COLORS.text, fontSize: 15, fontWeight: "700" },
    historySubtitle: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
    orderCountBadge: { minWidth: 28, height: 28, paddingHorizontal: 8, borderRadius: 14, backgroundColor: COLORS.cardAlt, alignItems: "center", justifyContent: "center" },
    orderCountText: { color: COLORS.text, fontSize: 12, fontWeight: "700" },

    tableHeaderRow: { flexDirection: "row", paddingHorizontal: pad, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
    tableHeaderCell: { color: COLORS.textFaint, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4 },

    colOrder: { flex: 1.3 },
    colDate: { flex: 1.1 },
    colItems: { flex: 1.6 },
    colType: { flex: 1 },
    colStatus: { flex: 1 },
    colTotal: { flex: 0.9 },
    colAction: { flex: 0.8, alignItems: "flex-end" },

    tableRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: pad, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    mobileOrderCard: { flexWrap: "wrap", borderRadius: 12, marginHorizontal: 12, marginVertical: 5, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.cardAlt, paddingVertical: 12, paddingHorizontal: 12 },
    rowPressed: { opacity: 0.8 },
    cell: { paddingRight: 8 },

    orderIdText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
    customerText: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
    dateText: { color: COLORS.text, fontSize: 12.5, fontWeight: "600" },
    timeText: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
    itemsText: { color: COLORS.muted, fontSize: 12 },
    mobileItemsHint: { color: COLORS.textFaint, fontSize: 10, marginTop: 2 },

    typeBadge: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: COLORS.cardAlt },
    typeBadgeText: { color: COLORS.muted, fontSize: 11, fontWeight: "600" },

    statusBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
    statusBadgeText: { fontSize: 10.5, fontWeight: "700" },

    amountText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },

    viewButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-end", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: COLORS.cardAlt, borderWidth: 1, borderColor: COLORS.borderLight },
    viewText: { color: COLORS.primary, fontSize: 12, fontWeight: "700" },

    /* EMPTY */
    emptyContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 48, gap: 6 },
    emptyIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.cardAlt, alignItems: "center", justifyContent: "center", marginBottom: 4 },
    emptyTitle: { color: COLORS.text, fontSize: 14, fontWeight: "700" },
    emptyText: { color: COLORS.muted, fontSize: 12, textAlign: "center" },
    clearFiltersButton: { marginTop: 12, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: COLORS.primary },
    clearFiltersText: { color: "#14161A", fontSize: 12.5, fontWeight: "700" },

    bottomSpacing: { height: 24 },

    /* CANCEL CONFIRM MODAL */
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 20 },
    confirmCard: { width: "100%", maxWidth: 380, backgroundColor: COLORS.card, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, padding: 24, alignItems: "center" },
    confirmIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.dangerBg, alignItems: "center", justifyContent: "center", marginBottom: 12 },
    confirmTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text, marginBottom: 8, textAlign: "center" },
    confirmText: { fontSize: 13, lineHeight: 20, color: COLORS.muted, textAlign: "center", marginBottom: 20 },
    confirmButtons: { flexDirection: "row", gap: 10, width: "100%" },
    keepButton: { flex: 1, height: 46, borderRadius: 12, backgroundColor: COLORS.cardAlt, borderWidth: 1, borderColor: COLORS.borderLight, justifyContent: "center", alignItems: "center" },
    keepButtonText: { color: COLORS.text, fontSize: 13, fontWeight: "800" },
    cancelButton: { flex: 1, height: 46, borderRadius: 12, backgroundColor: COLORS.danger, justifyContent: "center", alignItems: "center" },
    cancelButtonText: { color: "#14161A", fontSize: 13, fontWeight: "800" },
    disabledButton: { opacity: 0.5 },
  });
};