import { StyleSheet } from "react-native";

export const historyStyles = StyleSheet.create({

  /* =====================================================
     PAGE
  ===================================================== */

  page: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    height: 65,
    backgroundColor: "#F45B00",
    paddingHorizontal: 16,
    paddingTop: 11,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 4,
  },

  /* =====================================================
     SEARCH
  ===================================================== */

  searchContainer: {
    height: 48,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,

    backgroundColor: "#F3F3F3",
    borderRadius: 13,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 13,
  },

  searchInput: {
    flex: 1,
    height: 46,

    color: "#222222",
    fontSize: 13,

    marginLeft: 8,
  },

  /* =====================================================
     SCROLL
  ===================================================== */

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 3,
    paddingBottom: 20,
  },

  /* =====================================================
     HISTORY CARD
  ===================================================== */

  historyCard: {
    minHeight: 84,

    backgroundColor: "#FFFFFF",
    borderRadius: 15,

    marginBottom: 9,

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  /* =====================================================
     RECEIPT ICON
  ===================================================== */

  receiptIconContainer: {
    width: 40,
    height: 40,

    borderRadius: 12,

    backgroundColor: "#FFF5EA",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  receiptIcon: {
    fontSize: 18,
  },

  /* =====================================================
     TRANSACTION DETAILS
  ===================================================== */

  transactionInfo: {
    flex: 1,
    minWidth: 0,
  },

  transactionId: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "700",
  },

  transactionDate: {
    color: "#A09791",
    fontSize: 10,
    marginTop: 4,
  },

  itemsText: {
    color: "#756B64",
    fontSize: 10,
    marginTop: 4,
    paddingRight: 5,
  },

  /* =====================================================
     RIGHT SIDE
  ===================================================== */

  rightSide: {
    width: 68,
    alignItems: "flex-end",
    marginLeft: 5,
  },

  amount: {
    color: "#F45B00",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 7,
  },

  viewButton: {
    height: 28,

    borderWidth: 1,
    borderColor: "#FFB77F",

    borderRadius: 8,

    paddingHorizontal: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 4,
  },

  viewText: {
    color: "#F45B00",
    fontSize: 11,
    fontWeight: "600",
  },

  /* =====================================================
     EMPTY
  ===================================================== */

  emptyContainer: {
    alignItems: "center",
    paddingTop: 50,
  },

  emptyText: {
    color: "#A09791",
    fontSize: 13,
  },

  /* =====================================================
     BOTTOM NAV
  ===================================================== */

  bottomNav: {
    height: 51,

    backgroundColor: "#FFF8EF",

    borderTopWidth: 1,
    borderTopColor: "#EDE7DF",

    flexDirection: "row",
  },

  navItem: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    borderTopWidth: 2,
    borderTopColor: "transparent",
  },

  activeNavItem: {
    borderTopColor: "#F45B00",
  },

  navText: {
    color: "#A39A93",
    fontSize: 12,
  },

  activeNavText: {
    color: "#F45B00",
    fontSize: 12,
    fontWeight: "700",
  },
});