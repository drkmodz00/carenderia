import { StyleSheet } from "react-native";

export const orderHistoryModalStyles = StyleSheet.create({

  // ==========================================
  // OVERLAY
  // ==========================================

  overlay: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.42)",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 20,
  },


  // ==========================================
  // MODAL
  // ==========================================

  modalContainer: {
    width: 385,
    maxWidth: "100%",

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 26,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.15,

    shadowRadius: 20,

    elevation: 10,
  },


  // ==========================================
  // HEADER
  // ==========================================

  modalHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#27211D",
  },

  closeButton: {
    width: 25,
    height: 25,

    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    fontSize: 20,

    fontWeight: "400",

    color: "#9A8577",

    lineHeight: 22,
  },


  // ==========================================
  // ORDER INFO
  // ==========================================

  orderInfo: {
    fontSize: 11,

    color: "#A08778",

    marginTop: 16,
  },


  // ==========================================
  // DIVIDER
  // ==========================================

  divider: {
    height: 1,

    backgroundColor: "#E8DED6",

    marginTop: 16,

    marginBottom: 15,
  },


  // ==========================================
  // ITEMS
  // ==========================================

  itemsContainer: {
    gap: 13,
  },

  itemRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  itemName: {
    flex: 1,

    fontSize: 13,

    color: "#302A26",

    paddingRight: 20,
  },

  itemPrice: {
    fontSize: 13,

    fontWeight: "500",

    color: "#302A26",
  },


  // ==========================================
  // TOTAL
  // ==========================================

  totalDivider: {
    height: 1,

    backgroundColor: "#E8DED6",

    marginTop: 18,

    marginBottom: 18,
  },

  totalRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  totalLabel: {
    fontSize: 15,

    fontWeight: "700",

    color: "#27211D",
  },

  totalValue: {
    fontSize: 19,

    fontWeight: "700",

    color: "#E77D00",
  },

});
