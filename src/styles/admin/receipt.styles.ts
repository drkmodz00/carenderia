import { StyleSheet } from "react-native";

export const receiptStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    height: 59,
    backgroundColor: "#F45B00",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  /* =========================
     CONTENT
  ========================= */

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 25,
  },

  /* =========================
     RECEIPT CARD
  ========================= */

  receiptCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  /* =========================
     ORANGE STORE HEADER
  ========================= */

  storeHeader: {
    backgroundColor: "#F45B00",
    minHeight: 147,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 17,
  },

  logo: {
    fontSize: 31,
    marginBottom: 7,
  },

  storeName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 5,
  },

  storeInfo: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },

  /* =========================
     RECEIPT BODY
  ========================= */

  receiptBody: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5DED7",
    borderStyle: "dashed",
    marginVertical: 13,
  },

  /* =========================
     TRANSACTION
  ========================= */

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },

  infoLabel: {
    color: "#756B64",
    fontSize: 12,
  },

  infoValue: {
    color: "#222222",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },

  /* =========================
     ORDER
  ========================= */

  orderTitle: {
    color: "#756B64",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 11,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  itemLeft: {
    flex: 1,
  },

  itemName: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "500",
  },

  itemDetails: {
    color: "#756B64",
    fontSize: 12,
    marginTop: 3,
  },

  itemPrice: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 15,
  },

  /* =========================
     TOTALS
  ========================= */

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  totalLabel: {
    color: "#5D554F",
    fontSize: 13,
  },

  totalValue: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "600",
  },

  subtotalLabel: {
    color: "#5D554F",
    fontSize: 13,
  },

  subtotalValue: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "600",
  },

  /* =========================
     CHANGE
  ========================= */

  changeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
    paddingVertical: 3,
  },

  changeLabel: {
    color: "#222222",
    fontSize: 15,
    fontWeight: "800",
  },

  changeValue: {
    color: "#0B9E41",
    fontSize: 18,
    fontWeight: "800",
  },

  /* =========================
     THANK YOU
  ========================= */

  thankYou: {
    color: "#A89C94",
    fontSize: 12,
    textAlign: "center",
    marginTop: 3,
  },

  thankYouSub: {
    color: "#C9C1BB",
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    minHeight: 78,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EDE7DF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 10,
  },

  printButton: {
    flex: 1,
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E2DDD8",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  printText: {
    color: "#5D554F",
    fontSize: 14,
    fontWeight: "800",
  },
  printIcon: {
    color: "#5D554F",
    fontSize: 18,
    fontWeight: "700",
  },
  newOrderButton: {
    flex: 1.65,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#F45B00",
    alignItems: "center",
    justifyContent: "center",
  },

  newOrderText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});