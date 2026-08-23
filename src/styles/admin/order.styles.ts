import { StyleSheet } from "react-native";

export const orderStyles = StyleSheet.create({

  /* =====================================================
     MAIN
  ===================================================== */

  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  /* =====================================================
     HEADER
  ===================================================== */

  orangeHeader: {
    height: 105,
    backgroundColor: "#F45B00",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flex: 1,
    paddingRight: 8,
  },

  storeTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 5,
  },

  dateText: {
    color: "#FFE8D7",
    fontSize: 12,
  },

  cashierBox: {
    backgroundColor: "#F47A32",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    minWidth: 64,
  },

  cashierLabel: {
    color: "#FFEDE1",
    fontSize: 9,
    fontWeight: "500",
  },

  cashierName: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },

  /* =====================================================
     CATEGORIES
  ===================================================== */

  categoryScroll: {
    maxHeight: 58,
    backgroundColor: "#FFF8EF",
  },

  categoryContent: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 7,
  },

  categoryTab: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 34,
    justifyContent: "center",
  },

  activeCategoryTab: {
    backgroundColor: "#F45B00",
  },

  categoryTabText: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "600",
  },

  activeCategoryTabText: {
    color: "#FFFFFF",
  },

  /* =====================================================
     MENU
  ===================================================== */

  menuScroll: {
    flex: 1,
  },

  menuGrid: {
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  menuCard: {
    width: "48.5%",
    minHeight: 109,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 9,
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5,

    elevation: 2,
  },

  unavailableCard: {
    opacity: 0.5,
  },

  foodIconContainer: {
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },

  foodIcon: {
    fontSize: 29,
  },

  foodName: {
    color: "#292929",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
    minHeight: 34,
  },

  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 1,
  },

  foodPrice: {
    color: "#F45B00",
    fontSize: 14,
    fontWeight: "700",
  },

  /* =====================================================
     PLUS BUTTON
  ===================================================== */

  plusButton: {
    width: 25,
    height: 25,
    borderRadius: 7,
    backgroundColor: "#F45B00",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledPlusButton: {
    backgroundColor: "#BDBDBD",
    opacity: 0.7,
  },

  plusText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "500",
    lineHeight: 22,
  },

  /* =====================================================
     CURRENT ORDER PANEL
  ===================================================== */

  orderPanel: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 8,

    maxHeight: 355,
  },

  orderHeader: {
    minHeight: 61,
    paddingHorizontal: 20,
    paddingVertical: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#F1EDE8",
  },

  orderTitle: {
    color: "#292929",
    fontSize: 16,
    fontWeight: "800",
  },

  orderCount: {
    color: "#8E8E8E",
    fontSize: 11,
    marginTop: 2,
  },

  clearButton: {
    backgroundColor: "#FFE4E4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  clearOrderText: {
    color: "#E43B3B",
    fontSize: 11,
    fontWeight: "700",
  },

  /* =====================================================
     ORDER ITEMS
  ===================================================== */

  orderItems: {
    maxHeight: 170,
  },

  orderItem: {
    minHeight: 65,
    paddingHorizontal: 20,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#F2EFEC",
  },

  orderItemInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  orderItemIcon: {
    width: 32,
    fontSize: 22,
    marginRight: 8,
  },

  orderItemTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  orderItemName: {
    color: "#343434",
    fontSize: 12,
    fontWeight: "600",
  },

  orderItemPrice: {
    color: "#999999",
    fontSize: 10,
    marginTop: 3,
  },

  /* =====================================================
     QUANTITY
  ===================================================== */

  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },

  quantityButton: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#E2DED9",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  quantityButtonText: {
    color: "#777777",
    fontSize: 18,
    lineHeight: 20,
  },

  quantityText: {
    color: "#292929",
    fontSize: 13,
    fontWeight: "700",
    width: 25,
    textAlign: "center",
  },

  orderItemTotal: {
    width: 55,
    textAlign: "right",
    color: "#292929",
    fontSize: 12,
    fontWeight: "700",
  },

  /* =====================================================
     ORDER FOOTER
  ===================================================== */

  orderFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 13,

    borderTopWidth: 1,
    borderTopColor: "#F0ECE7",
  },

  totalLabel: {
    color: "#292929",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 3,
  },

  totalAmount: {
    color: "#F05A00",
    fontSize: 19,
    fontWeight: "800",
  },

  checkoutButton: {
    height: 48,
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: "#F05A00",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#F05A00",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 3,
  },

  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

});