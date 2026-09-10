import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

type GCashPaymentModalStyleOptions = {
  isSmallPhone: boolean;
  isPhone: boolean;
  isTablet: boolean;
  modalWidth: number;
  modalHeight: number;
  horizontalPadding: number;
  verticalPadding: number;
  qrSize: number;
  headerIconSize: number;
  closeSize: number;
};

export const createGcashPaymentModalStyles = ({
  isSmallPhone,
  isPhone,
  isTablet,
  horizontalPadding,
  verticalPadding,
}: GCashPaymentModalStyleOptions) => {
  const modalPadding = isSmallPhone
    ? 12
    : isPhone
      ? 15
      : isTablet
        ? 24
        : 22;

  const modalRadius = isSmallPhone
    ? 16
    : isPhone
      ? 18
      : isTablet
        ? 24
        : 22;

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.75)",

      justifyContent: "center",
      alignItems: "center",

      paddingHorizontal: horizontalPadding,
      paddingVertical: verticalPadding,
    },

    modal: {
      width: "100%",
      maxWidth: isTablet ? 520 : 430,

      backgroundColor: COLORS.panel,

      borderRadius: modalRadius,

      padding: modalPadding,

      borderWidth: 1,
      borderColor: COLORS.border,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.35,
      shadowRadius: 18,
      elevation: 10,
    },

    // =====================================================
    // HEADER
    // =====================================================

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      marginBottom: isSmallPhone
        ? 10
        : isPhone
          ? 12
          : 18,
    },

    headerLeft: {
      flexDirection: "row",
      alignItems: "center",

      flex: 1,
      minWidth: 0,
    },

    headerIcon: {
      width: isSmallPhone
        ? 34
        : isPhone
          ? 38
          : 44,

      height: isSmallPhone
        ? 34
        : isPhone
          ? 38
          : 44,

      borderRadius: isSmallPhone
        ? 10
        : isPhone
          ? 11
          : 13,

      backgroundColor: COLORS.primaryMuted,

      borderWidth: 1,
      borderColor: COLORS.primary,

      alignItems: "center",
      justifyContent: "center",

      marginRight: isSmallPhone
        ? 8
        : isPhone
          ? 10
          : 12,
    },

    headerText: {
      flex: 1,
      minWidth: 0,
    },

    title: {
      color: COLORS.text,

      fontSize: isSmallPhone
        ? 15
        : isPhone
          ? 16
          : 18,

      fontWeight: "800",
    },

    subtitle: {
      color: COLORS.muted,

      fontSize: isSmallPhone
        ? 10
        : isPhone
          ? 11
          : 12,

      marginTop: isSmallPhone ? 1 : 3,
    },

    closeButton: {
      width: isSmallPhone
        ? 30
        : isPhone
          ? 32
          : 34,

      height: isSmallPhone
        ? 30
        : isPhone
          ? 32
          : 34,

      borderRadius: isSmallPhone
        ? 15
        : isPhone
          ? 16
          : 17,

      backgroundColor: COLORS.card,

      alignItems: "center",
      justifyContent: "center",

      marginLeft: 8,

      borderWidth: 1,
      borderColor: COLORS.border,
    },

    // =====================================================
    // AMOUNT
    // =====================================================

    amountCard: {
      backgroundColor: COLORS.primaryMuted,

      borderRadius: isSmallPhone
        ? 11
        : isPhone
          ? 13
          : 15,

      borderWidth: 1,
      borderColor: COLORS.primary,

      paddingVertical: isSmallPhone
        ? 7
        : isPhone
          ? 9
          : 13,

      paddingHorizontal: isSmallPhone
        ? 10
        : isPhone
          ? 12
          : 16,

      alignItems: "center",

      marginBottom: isSmallPhone
        ? 9
        : isPhone
          ? 11
          : 18,
    },

    amountLabel: {
      color: COLORS.muted,

      fontSize: isSmallPhone
        ? 8
        : isPhone
          ? 9
          : 10.5,

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: 0.5,

      marginBottom: isSmallPhone ? 1 : 3,
    },

    amountValue: {
      color: COLORS.primary,

      fontSize: isSmallPhone
        ? 20
        : isPhone
          ? 23
          : 27,

      fontWeight: "900",
    },

    // =====================================================
    // QR SECTION
    // =====================================================

    qrSection: {
      alignItems: "center",

      marginBottom: isSmallPhone
        ? 8
        : isPhone
          ? 10
          : 16,
    },

    scanTitle: {
      color: COLORS.text,

      fontSize: isSmallPhone
        ? 12
        : isPhone
          ? 13
          : 15,

      fontWeight: "800",

      marginBottom: isSmallPhone
        ? 6
        : isPhone
          ? 8
          : 11,
    },

    qrContainer: {
      backgroundColor: "#FFFFFF",

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      alignItems: "center",
      justifyContent: "center",

      shadowColor: "#000",

      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.15,
      shadowRadius: 8,

      elevation: 2,
    },

    instruction: {
      color: COLORS.muted,

      fontSize: isSmallPhone
        ? 9
        : isPhone
          ? 10
          : 12,

      lineHeight: isSmallPhone
        ? 13
        : isPhone
          ? 15
          : 18,

      textAlign: "center",

      marginTop: isSmallPhone
        ? 6
        : isPhone
          ? 8
          : 11,

      maxWidth: isSmallPhone
        ? 230
        : isPhone
          ? 270
          : 300,
    },

    // =====================================================
    // PAYMENT STATUS
    // =====================================================

    statusBox: {
      flexDirection: "row",
      alignItems: "center",

      backgroundColor: COLORS.warningBg,

      borderRadius: isSmallPhone
        ? 9
        : isPhone
          ? 10
          : 12,

      borderWidth: 1,
      borderColor: COLORS.warning,

      paddingHorizontal: isSmallPhone
        ? 8
        : isPhone
          ? 10
          : 12,

      paddingVertical: isSmallPhone
        ? 6
        : isPhone
          ? 8
          : 10,

      marginBottom: isSmallPhone
        ? 8
        : isPhone
          ? 10
          : 16,
    },

    statusText: {
      flex: 1,

      color: COLORS.warning,

      fontSize: isSmallPhone
        ? 9
        : isPhone
          ? 10
          : 11,

      lineHeight: isSmallPhone
        ? 12
        : isPhone
          ? 14
          : 16,

      fontWeight: "600",

      marginLeft: isSmallPhone
        ? 6
        : 9,
    },

    // =====================================================
    // CONFIRM
    // =====================================================

    confirmButton: {
      height: isSmallPhone
        ? 42
        : isPhone
          ? 46
          : 50,

      borderRadius: isSmallPhone
        ? 10
        : isPhone
          ? 11
          : 13,

      backgroundColor: COLORS.primary,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",

      marginBottom: isSmallPhone
        ? 6
        : isPhone
          ? 8
          : 10,

      paddingHorizontal: 8,
    },

    confirmButtonDisabled: {
      backgroundColor: COLORS.primaryDisabled,
    },

    confirmText: {
      color: "#FFFFFF",

      fontSize: isSmallPhone
        ? 11
        : isPhone
          ? 12
          : 14,

      fontWeight: "800",

      marginLeft: isSmallPhone
        ? 5
        : 8,
    },

    // =====================================================
    // CANCEL
    // =====================================================

    cancelButton: {
      height: isSmallPhone
        ? 38
        : isPhone
          ? 42
          : 46,

      borderRadius: isSmallPhone
        ? 10
        : isPhone
          ? 11
          : 13,

      backgroundColor: COLORS.card,

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      alignItems: "center",
      justifyContent: "center",
    },

    cancelText: {
      color: COLORS.muted,

      fontSize: isSmallPhone
        ? 11
        : isPhone
          ? 12
          : 14,

      fontWeight: "700",
    },
  });
};
