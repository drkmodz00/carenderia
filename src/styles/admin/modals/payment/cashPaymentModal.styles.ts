import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const cashPaymentModalStyles =
  StyleSheet.create({
    keyboardContainer: {
      flex: 1,
    },

    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      paddingVertical: 20,
    },

    overlayShort: {
      paddingVertical: 10,
    },

    modal: {
      width: "100%",
      maxWidth: 460,
      backgroundColor: COLORS.card,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: 20,
    },

    modalTablet: {
      maxWidth: 520,
      padding: 24,
      borderRadius: 24,
    },

    modalShort: {
      padding: 15,
      borderRadius: 18,
    },

    modalVeryShort: {
      padding: 12,
      borderRadius: 16,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18,
    },

    headerShort: {
      marginBottom: 10,
    },

    headerTextWrap: {
      flex: 1,
      minWidth: 0,
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    title: {
      color: COLORS.text,
      fontSize: 18,
      fontWeight: "900",
    },

    titleShort: {
      fontSize: 16,
    },

    subtitle: {
      color: COLORS.muted,
      fontSize: 12,
      marginTop: 3,
    },

    subtitleShort: {
      fontSize: 10,
      marginTop: 1,
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

    closeButtonShort: {
      width: 30,
      height: 30,
      borderRadius: 15,
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

    amountGridShort: {
      gap: 6,
      marginBottom: 10,
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

    amountBoxShort: {
      paddingHorizontal: 11,
      paddingVertical: 8,
      borderRadius: 11,
    },

    totalLabel: {
      color: COLORS.muted,
      fontSize: 10,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 4,
    },

    cashLabel: {
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

    cashValue: {
      color: COLORS.text,
      fontSize: 22,
      fontWeight: "900",
    },

    amountValueShort: {
      fontSize: 18,
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

    changeValueShort: {
      fontSize: 17,
    },

    quickLabel: {
      color: COLORS.muted,
      fontSize: 11,
      fontWeight: "700",
      marginBottom: 8,
    },

    quickLabelShort: {
      fontSize: 10,
      marginBottom: 5,
    },

    quickRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 14,
    },

    quickRowShort: {
      gap: 5,
      marginBottom: 8,
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

    quickButtonShort: {
      minHeight: 32,
      borderRadius: 8,
      paddingHorizontal: 5,
    },

    quickButtonText: {
      color: COLORS.text,
      fontSize: 12,
      fontWeight: "800",
    },

    quickButtonTextShort: {
      fontSize: 10,
    },

    keypad: {
      width: "100%",
      gap: 8,
      marginBottom: 16,
    },

    keypadShort: {
      gap: 5,
      marginBottom: 9,
    },

    keypadRow: {
      flexDirection: "row",
      gap: 8,
    },

    keypadRowShort: {
      gap: 5,
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

    keypadButtonShort: {
      height: 38,
      borderRadius: 9,
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

    keypadTextShort: {
      fontSize: 15,
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

    confirmButtonShort: {
      height: 42,
      borderRadius: 10,
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

    confirmTextShort: {
      fontSize: 12,
    },

    confirmTextDisabled: {
      opacity: 0.7,
    },
  });
