import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const createPaymentStyles = (isTablet: boolean) => {
  const pad = isTablet ? 24 : 16;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
    },

    mainScroll: {
      flex: 1,
    },

    mainContent: {
      paddingHorizontal: pad,
      paddingTop: 20,
      paddingBottom: 30,
    },

    grid: {
      flexDirection: isTablet ? "row" : "column",
      alignItems: "flex-start",
      gap: 16,
    },

    topGrid: {
      flexDirection: isTablet ? "row" : "column",
      alignItems: "stretch",
      gap: 16,
      marginBottom: 20,
    },

    bottomGrid: {
      flexDirection: isTablet ? "row" : "column",
      alignItems: "stretch",
      gap: 16,
      marginBottom: 18,
    },

    header: {
      backgroundColor: COLORS.bg,
      paddingHorizontal: 16,
      paddingBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },

    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    backText: {
      color: COLORS.text,
      fontSize: 18,
      fontWeight: "700",
    },

    headerTextWrap: {
      flex: 1,
      justifyContent: "center",
    },

    headerTitle: {
      color: COLORS.text,
      fontSize: 19,
      fontWeight: "800",
    },

    headerSubtitle: {
      color: COLORS.muted,
      fontSize: 12,
      marginTop: 2,
    },

    cardSection: {
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: pad,
    },

    cardSectionTitle: {
      color: COLORS.text,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 12,
    },

    orderInfoCard: {
      flex: isTablet ? 1.2 : 1,
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: pad,
    },

    orderInfoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 14,
    },

    orderInfoRowLast: {
      marginBottom: 0,
    },

    orderInfoColumn: {
      flex: 1,
      minWidth: 0,
      alignItems: "flex-start",
    },

    orderInfoColumnRight: {
      flex: 1,
      minWidth: 0,
      alignItems: "flex-end",
    },

    orderInfoLabel: {
      color: COLORS.muted,
      fontSize: 11,
      fontWeight: "600",
      marginBottom: 4,
    },

    orderInfoValue: {
      color: COLORS.text,
      fontSize: 13,
      fontWeight: "800",
      textAlign: "left",
    },

    orderInfoValueRight: {
      color: COLORS.text,
      fontSize: 13,
      fontWeight: "800",
      textAlign: "right",
    },

    infoGrid: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      width: "100%",
      gap: 16,
    },

    infoColumn: {
      flex: 1,
      minWidth: 0,
      alignItems: "flex-start",
    },

    infoColumnRight: {
      flex: 1,
      minWidth: 0,
      alignItems: "flex-start",
      marginLeft: 16,
    },

    totalCard: {
      flex: isTablet ? 0.8 : 1,
      backgroundColor: COLORS.card,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: COLORS.border,
      paddingHorizontal: isTablet ? 24 : 20,
      paddingVertical: isTablet ? 22 : 20,
      justifyContent: "center",
    },

    totalLabel: {
      color: COLORS.muted,
      fontSize: 11,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginBottom: 5,
    },

    totalValue: {
      color: COLORS.primary,
      fontSize: isTablet ? 34 : 30,
      fontWeight: "900",
    },

    totalSubtext: {
      color: COLORS.mutedLight,
      fontSize: 11,
      marginTop: 4,
      lineHeight: 16,
    },

    paymentMethodSection: {
      width: "100%",
      marginBottom: 20,
    },

    paymentMethodSectionTitle: {
      color: COLORS.text,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 5,
    },

    paymentMethodSectionSubtitle: {
      color: COLORS.muted,
      fontSize: 12,
      marginBottom: 12,
    },

    paymentMethodRow: {
      flexDirection: isTablet ? "row" : "column",
      gap: 12,
      width: "100%",
    },

    paymentMethodCard: {
      flex: 1,
      minHeight: isTablet ? 112 : 90,
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
    },

    paymentMethodCardSelected: {
      borderColor: COLORS.primary,
      borderWidth: 2,
      backgroundColor: COLORS.primaryMuted,
    },

    paymentMethodCardDisabled: {
      opacity: 0.5,
    },

    paymentMethodIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: COLORS.cardAlt,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 13,
    },

    paymentMethodIconSelected: {
      backgroundColor: COLORS.primary,
    },

    paymentMethodEmoji: {
      fontSize: 21,
    },

    paymentMethodContent: {
      flex: 1,
      minWidth: 0,
    },

    paymentMethodTitle: {
      color: COLORS.text,
      fontSize: 14,
      fontWeight: "800",
      marginBottom: 3,
    },

    paymentMethodTitleSelected: {
      color: COLORS.primary,
    },

    paymentMethodDescription: {
      color: COLORS.muted,
      fontSize: 11,
      lineHeight: 16,
    },

    paymentMethodArrow: {
      color: COLORS.primary,
      fontSize: 20,
      fontWeight: "700",
      marginLeft: 8,
    },

    paymentMethodCheck: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: COLORS.primary,
      alignItems: "center",
      justifyContent: "center",
    },

    selectedPaymentCard: {
      flex: 1,
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderLeftWidth: 3,
      borderLeftColor: COLORS.primary,
      padding: 16,
    },

    selectedPaymentHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },

    selectedPaymentTitle: {
      color: COLORS.text,
      fontSize: 13,
      fontWeight: "800",
    },

    selectedPaymentSub: {
      color: COLORS.muted,
      fontSize: 11,
      marginTop: 2,
    },

    changePaymentButton: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
      backgroundColor: COLORS.cardAlt,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
    },

    changePaymentText: {
      color: COLORS.primary,
      fontSize: 11,
      fontWeight: "800",
    },

    selectedPaymentRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 7,
    },

    selectedPaymentLabel: {
      color: COLORS.muted,
      fontSize: 12,
      fontWeight: "600",
    },

    selectedPaymentValue: {
      color: COLORS.text,
      fontSize: 13,
      fontWeight: "800",
    },

    selectedPaymentValueOrange: {
      color: COLORS.primary,
      fontSize: 15,
      fontWeight: "900",
    },

    selectedPaymentDivider: {
      height: 1,
      backgroundColor: COLORS.border,
      marginVertical: 9,
    },

    summaryCard: {
      flex: 1,
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: pad,
    },

    summaryCardFull: {
      width: "100%",
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: pad,
      marginBottom: 18,
    },

    summaryTitle: {
      color: COLORS.text,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 14,
    },

    summaryItemRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 9,
    },

    summaryItemTextWrap: {
      flex: 1,
      minWidth: 0,
      marginLeft: 12,
    },

    summaryItemName: {
      color: COLORS.text,
      fontSize: 13,
      fontWeight: "700",
    },

    summaryItemSub: {
      color: COLORS.muted,
      fontSize: 11,
      marginTop: 2,
    },

    summaryItemTotal: {
      color: COLORS.text,
      fontSize: 13,
      fontWeight: "800",
      marginLeft: 8,
    },

    summaryItemImage: {
      width: 45,
      height: 45,
      borderRadius: 8,
      backgroundColor: COLORS.cardAlt,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
    },

    summaryItemImagePlaceholder: {
      width: 45,
      height: 45,
      borderRadius: 8,
      backgroundColor: COLORS.cardAlt,
      alignItems: "center",
      justifyContent: "center",
    },

    summaryItemImagePlaceholderText: {
      fontSize: 20,
    },

    summaryDivider: {
      height: 1,
      backgroundColor: COLORS.border,
      marginVertical: 5,
    },

    summaryTotalRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 12,
    },

    summaryTotalLabel: {
      color: COLORS.muted,
      fontSize: 11.5,
      fontWeight: "800",
      letterSpacing: 0.5,
    },

    summaryTotalValue: {
      color: COLORS.primary,
      fontSize: 19,
      fontWeight: "900",
    },

    emptySummary: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 25,
    },

    emptySummaryText: {
      color: COLORS.muted,
      fontSize: 12,
    },

    actionSection: {
      width: "100%",
      marginTop: 2,
    },

    confirmButton: {
      height: 52,
      borderRadius: 14,
      backgroundColor: COLORS.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },

    confirmButtonDisabled: {
      backgroundColor: COLORS.primaryDisabled,
    },

    confirmText: {
      color: COLORS.text,
      fontSize: 15,
      fontWeight: "800",
      letterSpacing: 0.3,
    },

    confirmTextDisabled: {
      color: COLORS.text,
      opacity: 0.85,
    },

    cancelButton: {
      height: 46,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.card,
      alignItems: "center",
      justifyContent: "center",
    },

    cancelText: {
      color: COLORS.muted,
      fontSize: 14,
      fontWeight: "700",
    },

    sectionTitle: {
      color: COLORS.text,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 10,
    },

    sectionSubtitle: {
      color: COLORS.muted,
      fontSize: 12,
      marginBottom: 14,
    },
  });
};
