import { StyleSheet } from "react-native";

export const salesStyles = StyleSheet.create({

  /* =====================================================
     PAGE
  ===================================================== */

  page: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  content: {
    paddingBottom: 20,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    height: 74,
    backgroundColor: "#F45B00",
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: "flex-start",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  date: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 4,
  },

  /* =====================================================
     SUMMARY
  ===================================================== */

  summaryRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 1,
    gap: 8,
  },

  summaryCard: {
    flex: 1,
    height: 92,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  salesCard: {
    backgroundColor: "#FFF3E6",
  },

  transactionCard: {
    backgroundColor: "#F5F0FF",
  },

  averageCard: {
    backgroundColor: "#EEF9FF",
  },

  summaryIcon: {
    fontSize: 20,
    marginBottom: 3,
  },

  salesAmount: {
    color: "#F45B00",
    fontSize: 13,
    fontWeight: "800",
  },

  transactionAmount: {
    color: "#855DE0",
    fontSize: 14,
    fontWeight: "800",
  },

  averageAmount: {
    color: "#008DAF",
    fontSize: 13,
    fontWeight: "800",
  },

  summaryLabel: {
    color: "#756B64",
    fontSize: 10,
    marginTop: 2,
  },

  /* =====================================================
     SECTION CARD
  ===================================================== */

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,

    elevation: 2,

    overflow: "hidden",
  },

  sectionTitle: {
    color: "#222222",
    fontSize: 14,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 13,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#F0ECE8",
  },

  /* =====================================================
     RECENT TRANSACTIONS
  ===================================================== */

  transactionRow: {
    minHeight: 57,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#F2EEEA",
  },

  lastTransactionRow: {
    borderBottomWidth: 0,
  },

  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,

    backgroundColor: "#FFF5EA",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  receiptIcon: {
    fontSize: 17,
  },

  transactionInfo: {
    flex: 1,
  },

  transactionId: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "700",
  },

  transactionDate: {
    color: "#A09791",
    fontSize: 10,
    marginTop: 3,
  },

  transactionAmountValue: {
    color: "#F45B00",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 8,
  },

  /* =====================================================
     SALES THIS WEEK
  ===================================================== */

  weekContainer: {
    paddingHorizontal: 16,
    paddingBottom: 11,
  },

  weekRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  dayText: {
    width: 37,
    color: "#5D554F",
    fontSize: 11,
  },

  progressBackground: {
    flex: 1,
    height: 9,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#FFD09F",
    borderRadius: 10,
  },

  weekAmount: {
    width: 48,
    textAlign: "right",
    color: "#403A36",
    fontSize: 10,
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