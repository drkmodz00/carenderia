import { StyleSheet } from "react-native";

export const checkoutModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modal: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  title: {
    color: "#292929",
    fontSize: 20,
    fontWeight: "800",
  },

  subtitle: {
    color: "#999999",
    fontSize: 12,
    marginTop: 3,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF0E8",
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: "#F45B00",
    fontSize: 24,
    lineHeight: 26,
  },

  totalCard: {
    backgroundColor: "#FFF4EC",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  totalLabel: {
    color: "#8E8178",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  totalAmount: {
    color: "#F45B00",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 3,
  },

  label: {
    color: "#5C554F",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 4,
  },

  paymentMethods: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  paymentButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#E4DED8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  paymentButtonActive: {
    backgroundColor: "#F45B00",
    borderColor: "#F45B00",
  },

  paymentText: {
    color: "#777777",
    fontSize: 13,
    fontWeight: "700",
  },

  paymentTextActive: {
    color: "#FFFFFF",
  },

  amountContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#DED7D0",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  currency: {
    color: "#F45B00",
    fontSize: 18,
    fontWeight: "800",
    marginRight: 7,
  },

  amountInput: {
    flex: 1,
    color: "#292929",
    fontSize: 18,
    fontWeight: "600",
  },

  changeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE8E2",
  },

  changeLabel: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
  },

  changeAmount: {
    color: "#16803C",
    fontSize: 18,
    fontWeight: "800",
  },

  footer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F3F1EF",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: "#666666",
    fontSize: 13,
    fontWeight: "700",
  },

  confirmButton: {
    flex: 1.5,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F45B00",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});