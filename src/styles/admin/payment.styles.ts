import { StyleSheet } from "react-native";

export const paymentStyles = StyleSheet.create({
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

  header: {
    height: 59,
    backgroundColor: "#F45B00",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F77A32",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "300",
    lineHeight: 30,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  /* =====================================================
     CONTENT
  ===================================================== */

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 25,
  },

  /* =====================================================
     CARD
  ===================================================== */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  sectionTitle: {
    color: "#756B64",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 13,
  },

  /* =====================================================
     ORDER SUMMARY
  ===================================================== */

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemName: {
    color: "#5D554F",
    fontSize: 13,
    flex: 1,
  },

  itemPrice: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "600",
  },

  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5DED7",
    borderStyle: "dashed",
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#1E1E1E",
    fontSize: 15,
    fontWeight: "800",
  },

  totalAmount: {
    color: "#E84B00",
    fontSize: 21,
    fontWeight: "800",
  },

  /* =====================================================
     CASH RECEIVED
  ===================================================== */

  cashInputContainer: {
    height: 56,
    borderWidth: 2,
    borderColor: "#F45B00",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    backgroundColor: "#FFFFFF",
  },

  cashInputActive: {
    borderColor: "#F45B00",
  },

  currency: {
    color: "#F45B00",
    fontSize: 20,
    fontWeight: "700",
    marginRight: 9,
    borderWidth: 0,
  },

  cashInput: {
    flex: 1,
    color: "#111111",
    fontSize: 22,
    fontWeight: "700",
    paddingVertical: 0,
  },

  /* =====================================================
     QUICK AMOUNTS
  ===================================================== */

  quickAmounts: {
    flexDirection: "row",
    gap: 7,
    marginTop: 10,
  },

  quickButton: {
    flex: 1,
    height: 37,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  quickButtonSelected: {
    backgroundColor: "#FFD7AA",
    borderWidth: 2,
  },

  quickButtonText: {
    color: "#5D554F",
    fontSize: 12,
    fontWeight: "600",
  },

  quickButtonTextSelected: {
    color: "#222222",
    fontWeight: "700",
  },

  /* =====================================================
     CHANGE / SUKLI
  ===================================================== */

  // DEFAULT: walay sukli
  changeCard: {
    backgroundColor: "#FFF8EF",
    borderWidth: 1,
    borderColor: "#FFC48F",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 20,
  },

  // WITH CHANGE: naay sukli
  changeCardPositive: {
    backgroundColor: "#EFFCF3",
    borderColor: "#5CE28C",
  },

  changeLabel: {
    color: "#756B64",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  // DEFAULT: red
  changeAmount: {
    color: "#D92D2D",
    fontSize: 28,
    fontWeight: "800",
  },

  // WITH CHANGE: green
  changeAmountPositive: {
    color: "#0B9E41",
  },

  /* =====================================================
     FOOTER
  ===================================================== */

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

  cancelButton: {
    flex: 0.95,
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: "#403A36",
    fontSize: 14,
    fontWeight: "600",
  },

  confirmButton: {
    flex: 1.8,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#F45B00",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonDisabled: {
    backgroundColor: "#D3D0CF",
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  confirmTextDisabled: {
    color: "#FFFFFF",
  },
});
