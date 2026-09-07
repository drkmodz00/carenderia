import { StyleSheet } from "react-native";
import { COLORS } from "../theme";

export const createOrderDetailsModalStyles = (isTablet: boolean) => {
  return StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 20 },
    modal: { width: "100%", maxWidth: isTablet ? 520 : 420, maxHeight: "85%", backgroundColor: COLORS.card, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, overflow: "hidden" },

    /* HEADER */
    header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    title: { color: COLORS.text, fontSize: 17, fontWeight: "800" },
    orderNumber: { color: COLORS.muted, fontSize: 12, marginTop: 3 },
    closeButton: { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.cardAlt, borderWidth: 1, borderColor: COLORS.borderLight, alignItems: "center", justifyContent: "center" },
    closeText: { color: COLORS.text, fontSize: 18, lineHeight: 18, fontWeight: "700" },

    scrollContent: { padding: 20, gap: 18 },

    /* ORDER INFORMATION */
    infoCard: { flexDirection: "row", backgroundColor: COLORS.cardAlt, borderRadius: 14, borderWidth: 1, borderColor: COLORS.borderLight, padding: 16, gap: 16 },
    infoColumn: { flex: 1, gap: 12 },
    infoItem: { gap: 3 },
    infoLabel: { color: COLORS.textFaint, fontSize: 10, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.4 },
    infoValue: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
    ongoingStatus: { color: COLORS.warning },
    completedStatus: { color: COLORS.success },
    cancelledStatus: { color: COLORS.danger },

    /* ITEMS */
    itemsSection: { gap: 4 },
    sectionTitle: { color: COLORS.text, fontSize: 14, fontWeight: "700", marginBottom: 8 },
    itemRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    itemName: { flex: 1, color: COLORS.text, fontSize: 13, marginRight: 10 },
    itemPrice: { color: COLORS.muted, fontSize: 13, fontWeight: "600" },

    /* TOTAL */
    totalRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 4 },
    totalLabel: { color: COLORS.text, fontSize: 15, fontWeight: "800" },
    totalValue: { color: COLORS.primary, fontSize: 19, fontWeight: "900" },

    /* ACTIONS */
    actionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    editButton: { flexBasis: "47%", flexGrow: 1, height: 46, borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderLight, backgroundColor: COLORS.cardAlt, alignItems: "center", justifyContent: "center" },
    editButtonText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
    completeButton: { flexBasis: "47%", flexGrow: 1, height: 46, borderRadius: 12, backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center" },
    completeButtonText: { color: "#0F1115", fontSize: 13, fontWeight: "800" },
    cancelButton: { flexBasis: "47%", flexGrow: 1, height: 46, borderRadius: 12, backgroundColor: COLORS.danger, alignItems: "center", justifyContent: "center" },
    cancelButtonText: { color: "#0F1115", fontSize: 13, fontWeight: "800" },
    printButton: { flexBasis: "100%", height: 46, borderRadius: 12, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
    printButtonText: { color: "#0F1115", fontSize: 13, fontWeight: "800" },

    disabledButton: { opacity: 0.4 },
  });
};