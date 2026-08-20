import { StyleSheet } from "react-native";

export const ordersStyles = StyleSheet.create({

  // ==========================================
  // MAIN LAYOUT
  // ==========================================

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F7F7F8",
  },

  main: {
    flex: 1,
  },

  workspace: {
    flex: 1,
    flexDirection: "row",
  },


  // ==========================================
  // LEFT MENU SECTION
  // ==========================================

  menuSection: {
    flex: 1,
    padding: 28,
    minWidth: 0,
  },

  pageHeading: {
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111827",
  },

  pageSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 5,
  },


// ==========================================
// CATEGORIES
// ==========================================

categoryContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginBottom: 20,
  flexWrap: "wrap",
},

categoryButton: {
  height: 46,
  paddingHorizontal: 20,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#E5E7EB",
},

categoryButtonActive: {
  backgroundColor: "#E77D00",
  borderColor: "#E77D00",
},

categoryText: {
  fontSize: 16,
  fontWeight: "500",
  color: "#374151",
},

categoryTextActive: {
  color: "#FFFFFF",
  fontWeight: "600",
},
        

  // ==========================================
  // MENU GRID
  // ==========================================

  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingBottom: 30,
  },

  menuCard: {
    width: "30%",
    minWidth: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  menuImage: {
    width: "100%",
    height: 125,
    backgroundColor: "#F3F4F6",
  },

  menuInfo: {
    padding: 13,
  },

  menuItemName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  menuItemPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    marginTop: 6,
  },


  // ==========================================
  // RIGHT ORDER SECTION
  // ==========================================

  orderSection: {
    width: 390,
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 1,
    borderLeftColor: "#E5E7EB",
  },

  orderHeader: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  orderTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },

  orderSubtitle: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },


  // ==========================================
  // TABLE / CUSTOMER INPUT
  // ==========================================

  inputContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  inputLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 9,
    paddingHorizontal: 12,
    fontSize: 12,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },


  // ==========================================
  // ORDER ITEMS
  // ==========================================

  orderItemsScroll: {
    flex: 1,
    marginTop: 12,
  },

  orderItemsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },

  emptyOrderContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyOrder: {
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  emptyIconText: {
    fontSize: 27,
  },

  emptyTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  emptySubtitle: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 5,
  },


  // ==========================================
  // ORDER ITEM
  // ==========================================

  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  orderItemInfo: {
    flex: 1,
    minWidth: 0,
  },

  orderItemName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },

  orderItemPrice: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
  },


  // ==========================================
  // QUANTITY
  // ==========================================

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  quantityButton: {
    width: 25,
    height: 25,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
  },

  quantityText: {
    width: 25,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: "#111827",
  },

  orderItemTotal: {
    width: 65,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "600",
    color: "#111827",
  },


  // ==========================================
  // SUMMARY
  // ==========================================

  summary: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  summaryValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },


  // ==========================================
  // SAVE BUTTON
  // ==========================================

  saveButton: {
    height: 48,
    backgroundColor: "#111827",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  saveButtonDisabled: {
    opacity: 0.45,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

});