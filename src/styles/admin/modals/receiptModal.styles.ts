import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const receiptModalStyles = StyleSheet.create({
  // =====================================================
  // BACKDROP
  // =====================================================

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  // =====================================================
  // RECEIPT CONTAINER
  // =====================================================

  receiptContainer: {
    width: "100%",
    maxWidth: 430,
    maxHeight: "94%",
    backgroundColor: "transparent",
  },

  receiptScroll: {
    width: "100%",
  },

  receiptScrollContent: {
    alignItems: "center",
  },

  // =====================================================
  // RECEIPT
  // =====================================================

  receipt: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 10,
  },

  receiptInner: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 22,
  },

  // =====================================================
  // TOP ZIGZAG
  // =====================================================

  zigzagRow: {
    width: "100%",
    height: 10,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },

  zigzagTriangle: {
    flex: 1,
    height: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  // =====================================================
  // BOTTOM ZIGZAG
  // =====================================================

  zigzagRowBottom: {
    width: "100%",
    height: 10,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },

  zigzagTriangleBottom: {
    flex: 1,
    height: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  // =====================================================
  // STORE
  // =====================================================

  logo: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 2,
    marginBottom: 4,
  },

  storeName: {
    textAlign: "center",
    color: "#111827",
    fontSize: 21,
    fontWeight: "900",
  },

  storeMeta: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 11,
    marginTop: 3,
  },

  // =====================================================
  // DIVIDER
  // =====================================================

  dashedDivider: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    borderStyle: "dashed",
    marginVertical: 12,
  },

  // =====================================================
  // INFO
  // =====================================================

  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },

  infoLabel: {
    color: "#6B7280",
    fontSize: 12,
  },

  infoValue: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
    maxWidth: "65%",
    textAlign: "right",
  },

  infoValueBold: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
    maxWidth: "65%",
    textAlign: "right",
  },

  // =====================================================
  // ITEMS TABLE
  // =====================================================

  itemsHeaderRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  itemsHeaderLabel: {
    color: "#9CA3AF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  itemColumn: {
    flex: 1,
    minWidth: 0,
    paddingRight: 6,
  },

  qtyColumn: {
    width: 35,
    textAlign: "center",
  },

  priceColumn: {
    width: 62,
    textAlign: "right",
  },

  amountColumn: {
    width: 72,
    textAlign: "right",
  },

  itemRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 38,
    marginBottom: 3,
  },

  itemName: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "700",
  },

  itemQty: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
  },

  itemPrice: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
  },

  itemAmount: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
  },

  // =====================================================
  // TOTALS
  // =====================================================

  subtotalValue: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
  },

  totalLabel: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  totalValue: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "900",
  },

  cashValue: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
  },

  sukliLabel: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: "900",
  },

  sukliValue: {
    color: COLORS.success,
    fontSize: 18,
    fontWeight: "900",
  },

  // =====================================================
  // RECEIPT FOOTER
  // =====================================================

  thankYouText: {
    textAlign: "center",
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 2,
  },

  visitText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 11,
    marginTop: 3,
  },

  poweredByText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 9,
    marginTop: 12,
  },

  // =====================================================
  // BUTTONS ATTACHED TO RECEIPT
  // =====================================================

  actionFooter: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
    backgroundColor: "#FFFFFF",
  },

  printButton: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  printButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  newOrderButton: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  newOrderButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
  },
});