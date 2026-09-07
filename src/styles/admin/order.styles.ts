import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

/**
 * "New Order" screen — same dark theme as the rest of the app
 * (login/register): near-black background, orange accent, dark cards.
 * Tablet (>=768dp): side-by-side layout with a fixed order panel.
 * Phone (<768dp): menu stacks above the order panel.
 */

export const createOrderStyles = (isTablet: boolean, numColumns: number) => {
  const gap = 2;
  const cardWidth = `${100 / numColumns - gap}%` as const;
  const pad = isTablet ? 24 : 16;

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg },
    centered: { justifyContent: "center", alignItems: "center" },
    loadingText: { marginTop: 12, fontSize: 16, color: COLORS.muted },

    /* HEADER */
    pageHeader: { paddingHorizontal: pad, paddingVertical: isTablet ? 18 : 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    pageTitle: { color: COLORS.text, fontSize: isTablet ? 22 : 19, fontWeight: "800" },
    pageHint: { color: COLORS.muted, fontSize: 13, marginTop: 2 },

    /* LAYOUT */
    mainRow: { flex: 1, flexDirection: isTablet ? "row" : "column" },
    leftPane: { flex: isTablet ? 1 : 1.3 },

    /* CATEGORY PILLS */
    categoryScroll: { maxHeight: 60, backgroundColor: COLORS.bg },
    categoryContent: { paddingHorizontal: pad, paddingVertical: 12, gap: 10 },
    categoryTab: { backgroundColor: COLORS.card, borderRadius: 24, paddingHorizontal: 18, height: 36, justifyContent: "center", borderWidth: 1, borderColor: COLORS.border },
    activeCategoryTab: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    categoryTabText: { color: COLORS.muted, fontSize: 13, fontWeight: "600" },
    activeCategoryTabText: { color: COLORS.text },

    /* FOOD GRID */
    menuScroll: { flex: 1 },
    menuGrid: { paddingHorizontal: isTablet ? 22 : 14, paddingTop: 8, paddingBottom: 24, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    emptyMenu: { width: "100%", alignItems: "center", paddingVertical: 40 },
    emptyMenuText: { fontSize: 15, color: COLORS.muted },

    foodCard: { width: cardWidth, backgroundColor: COLORS.card, borderRadius: 16, marginBottom: 14, overflow: "hidden", borderWidth: 1, borderColor: COLORS.border },
    foodCardSelected: { borderColor: COLORS.primary, borderWidth: 2 },
    unavailableCard: { opacity: 0.5 },

    foodImageWrap: { width: "100%", aspectRatio: 1.2, backgroundColor: COLORS.panel, position: "relative" },
    foodImage: { width: "100%", height: "100%" },
    foodImagePlaceholder: { width: "100%", height: "100%", alignItems: "center", justifyContent: "center" },
    foodIcon: { fontSize: isTablet ? 32 : 26 },

    quantityBadge: { position: "absolute", top: 8, right: 8, backgroundColor: COLORS.primaryDisabled, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
    quantityBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: "800" },

    soldOutBadge: { position: "absolute", top: 8, left: 8, backgroundColor: COLORS.dangerBg, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
    soldOutBadgeText: { color: COLORS.danger, fontSize: 9, fontWeight: "700" },

    foodCardBody: { paddingHorizontal: 12, paddingVertical: 10 },
    foodName: { color: COLORS.text, fontSize: isTablet ? 14 : 13, fontWeight: "700", marginBottom: 4 },
    foodPrice: { color: COLORS.primary, fontSize: isTablet ? 13.5 : 12.5, fontWeight: "800" },

    /* CURRENT ORDER PANEL: fixed sidebar on tablet, full-width section on phone */
    orderPanel: isTablet
      ? { width: 340, backgroundColor: COLORS.card, borderLeftWidth: 1, borderLeftColor: COLORS.border }
      : { flex: 1, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },

    orderPanelHeader: { paddingHorizontal: pad, paddingTop: 20, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
    orderPanelTitle: { color: COLORS.text, fontSize: 18, fontWeight: "800", marginBottom: 14 },
    tableInputLabel: { color: COLORS.muted, fontSize: 13, fontWeight: "600", marginBottom: 8 },
    tableInput: { height: 44, borderRadius: 10, borderWidth: 1, borderColor: COLORS.borderLight, backgroundColor: COLORS.bg, paddingHorizontal: 14, fontSize: 14, color: COLORS.text },

    /* ORDER TYPE */
    orderTypeSection: { paddingHorizontal: pad, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
    orderTypeLabel: { color: COLORS.muted, fontSize: 13, fontWeight: "600", marginBottom: 10 },
    orderTypeButtons: { flexDirection: "row", gap: 10 },
    orderTypeButton: { flex: 1, height: 44, borderRadius: 10, borderWidth: 1, borderColor: COLORS.borderLight, backgroundColor: COLORS.bg, alignItems: "center", justifyContent: "center" },
    orderTypeButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    orderTypeButtonText: { color: COLORS.muted, fontSize: 13.5, fontWeight: "700" },
    orderTypeButtonTextActive: { color: COLORS.text },

    /* EMPTY STATE */
    emptyOrderContainer: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, paddingVertical: isTablet ? 0 : 24 },
    emptyCartIcon: { fontSize: 42, opacity: 0.35, marginBottom: 10 },
    emptyOrderTitle: { color: COLORS.text, fontSize: 14, fontWeight: "700", marginBottom: 4, textAlign: "center" },
    emptyOrderSubtitle: { color: COLORS.mutedLight, fontSize: 12, textAlign: "center" },

    /* ORDER LINE ITEMS */
    orderItemsList: { flex: 1 },
    orderLineItem: { flexDirection: "row", alignItems: "center", paddingHorizontal: pad, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    orderLineInfo: { flex: 1, minWidth: 0 },
    orderLineName: { color: COLORS.text, fontSize: 13.5, fontWeight: "700" },
    orderLineSub: { color: COLORS.muted, fontSize: 11.5, marginTop: 2 },

    orderLineControls: { flexDirection: "row", alignItems: "center", marginHorizontal: 10 },
    stepperButton: { width: 26, height: 26, borderRadius: 7, borderWidth: 1, borderColor: COLORS.borderLight, backgroundColor: COLORS.bg, alignItems: "center", justifyContent: "center" },
    stepperButtonPlus: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    stepperButtonText: { color: COLORS.muted, fontSize: 16, lineHeight: 18 },
    stepperButtonTextPlus: { color: COLORS.text },
    stepperValue: { width: 24, textAlign: "center", color: COLORS.text, fontSize: 13.5, fontWeight: "700" },
    orderLineTotal: { width: 60, textAlign: "right", color: COLORS.text, fontSize: 13.5, fontWeight: "800" },

    /* TOTAL FOOTER */
    orderFooter: { paddingHorizontal: pad, paddingTop: 16, paddingBottom: 20, borderTopWidth: 1, borderTopColor: COLORS.border },
    subtotalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    subtotalLabel: { color: COLORS.muted, fontSize: 13.5 },
    subtotalValue: { color: COLORS.text, fontSize: 13.5, fontWeight: "600" },
    totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
    totalLabelBold: { color: COLORS.text, fontSize: 16, fontWeight: "800" },
    totalValueBold: { color: COLORS.primary, fontSize: 21, fontWeight: "800" },

    saveOrderButton: { height: 52, borderRadius: 12, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
    saveOrderButtonDisabled: { backgroundColor: COLORS.primaryDisabled },
    saveOrderButtonText: { color: COLORS.text, fontSize: 14.5, fontWeight: "800", letterSpacing: 0.8 },

    footerBottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 14 },
    clearOrderLink: { color: COLORS.muted, fontSize: 12.5, fontWeight: "600" },
    helpCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: COLORS.borderLight, alignItems: "center", justifyContent: "center" },
    helpCircleText: { color: COLORS.muted, fontSize: 11, fontWeight: "700" },
  });
};