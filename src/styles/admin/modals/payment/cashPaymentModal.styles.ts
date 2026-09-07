import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const cashPaymentModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  modal: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    maxHeight: "95%",
  },

  modalTablet: {
    maxWidth: 520,
    padding: 24,
    borderRadius: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerTextWrap: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  closeText: {
    color: COLORS.muted,
    fontSize: 25,
    fontWeight: "400",
    lineHeight: 27,
  },

  amountGrid: {
    width: "100%",
    gap: 10,
    marginBottom: 16,
  },

  amountGridTablet: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  totalBox: {
    flex: 1,
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },

  totalLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  totalValue: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "900",
  },

  cashBox: {
    flex: 1,
    backgroundColor: COLORS.cardAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },

  cashBoxValid: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryMuted,
  },

  cashLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  cashValue: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  changeBox: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    paddingVertical: 13,
    justifyContent: "center",
  },

  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  changeLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },

  changeValue: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "900",
  },

  changeValueEmpty: {
    color: COLORS.mutedLight,
  },

  quickLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
  },

  quickRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },

  quickButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: 11,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  quickButtonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
  },

  keypad: {
    width: "100%",
    gap: 8,
    marginBottom: 16,
  },

  keypadRow: {
    flexDirection: "row",
    gap: 8,
  },

  keypadButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  keypadBackspace: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.borderLight,
  },

  keypadText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  backspaceText: {
    color: COLORS.muted,
    fontSize: 20,
  },

  confirmButton: {
    width: "100%",
    height: 50,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },

  confirmText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  confirmTextDisabled: {
    opacity: 0.7,
  },
});
