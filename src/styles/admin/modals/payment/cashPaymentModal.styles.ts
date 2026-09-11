import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const cashPaymentModalStyles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  overlayShort: {
    paddingVertical: 6,
  },

  modal: {
    width: "100%",
    maxWidth: 460,
    maxHeight: "96%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    overflow: "hidden",
  },

  modalTablet: {
    maxWidth: 520,
    maxHeight: "92%",
    padding: 24,
    borderRadius: 24,
  },

  modalShort: {
    maxHeight: "98%",
    padding: 11,
    borderRadius: 16,
  },

  modalVeryShort: {
    maxHeight: "99%",
    padding: 9,
    borderRadius: 14,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    flexShrink: 0,
  },

  headerShort: {
    marginBottom: 7,
  },

  headerTextWrap: {
    flex: 1,
    minWidth: 0,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    minWidth: 0,
  },

  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    flexShrink: 1,
  },

  titleShort: {
    fontSize: 15,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 2,
  },

  subtitleShort: {
    fontSize: 9,
    marginTop: 0,
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
    marginLeft: 10,
    flexShrink: 0,
  },

  closeButtonShort: {
    width: 29,
    height: 29,
    borderRadius: 15,
  },

  closeText: {
    color: COLORS.muted,
    fontSize: 23,
    fontWeight: "400",
    lineHeight: 25,
  },

  /* =====================================================
     AMOUNT SUMMARY

     IMPORTANT:
     Keep all three boxes in one row on mobile.
     This prevents the summary from consuming the
     entire vertical space of a phone.
  ===================================================== */

  amountGrid: {
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    gap: 6,
    marginBottom: 10,
    flexShrink: 0,
  },

  amountGridTablet: {
    gap: 10,
    marginBottom: 14,
  },

  amountGridShort: {
    gap: 4,
    marginBottom: 7,
  },

  totalBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    overflow: "hidden",
  },

  cashBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.cardAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    overflow: "hidden",
  },

  cashBoxValid: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryMuted,
  },

  changeBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    overflow: "hidden",
  },

  amountBoxShort: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
  },

  totalLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.25,
    marginBottom: 2,
  },

  cashLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.25,
    marginBottom: 2,
  },

  totalValue: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "900",
  },

  cashValue: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  amountValueShort: {
    fontSize: 14,
  },

  changeRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  changeLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: "700",
    marginBottom: 2,
  },

  changeValue: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "900",
  },

  changeValueEmpty: {
    color: COLORS.mutedLight,
  },

  changeValueShort: {
    fontSize: 14,
  },

  /* =====================================================
     QUICK VALUE
  ===================================================== */

  quickLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 5,
    flexShrink: 0,
  },

  quickLabelShort: {
    fontSize: 9,
    marginBottom: 3,
  },

  quickRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 9,
    flexShrink: 0,
  },

  quickRowShort: {
    gap: 4,
    marginBottom: 6,
  },

  quickButton: {
    flex: 1,
    minWidth: 0,
    minHeight: 34,
    borderRadius: 9,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  quickButtonShort: {
    minHeight: 29,
    borderRadius: 7,
    paddingHorizontal: 2,
  },

  quickButtonText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },

  quickButtonTextShort: {
    fontSize: 9,
  },

  /* =====================================================
     KEYPAD
  ===================================================== */

  keypad: {
    width: "100%",
    gap: 6,
    marginBottom: 10,
    flexShrink: 0,
  },

  keypadShort: {
    gap: 4,
    marginBottom: 6,
  },

  keypadRow: {
    flexDirection: "row",
    gap: 6,
  },

  keypadRowShort: {
    gap: 4,
  },

  keypadButton: {
    flex: 1,
    height: 43,
    borderRadius: 10,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  keypadButtonShort: {
    height: 34,
    borderRadius: 8,
  },

  keypadBackspace: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.borderLight,
  },

  keypadText: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },

  keypadTextShort: {
    fontSize: 14,
  },

  backspaceText: {
    color: COLORS.muted,
    fontSize: 19,
  },

  /* =====================================================
     CONFIRM
  ===================================================== */

  confirmButton: {
    width: "100%",
    height: 46,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  confirmButtonShort: {
    height: 38,
    borderRadius: 9,
  },

  confirmButtonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },

  confirmText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  confirmTextShort: {
    fontSize: 11,
  },

  confirmTextDisabled: {
    opacity: 0.7,
  },
});
