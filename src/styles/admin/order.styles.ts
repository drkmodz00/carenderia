import { StyleSheet } from "react-native";

import { COLORS } from "@/styles/admin/theme";

import {
  FONT_SIZE,
  PAGE_PADDING,
  responsiveFont,
  responsiveSpacing,
  responsiveValue,
} from "../components/admin/responsive";

// =====================================================
// ORDER STYLES
// =====================================================

export const createOrderStyles = (
  isTablet: boolean,
  numColumns: number
) => {
  const horizontalPadding = responsiveValue(12, 18, 24);
  const menuPadding = responsiveValue(12, 18, 24);
  const gridGap = responsiveSpacing(10);

  const cardBasis =
    numColumns === 1
      ? "100%"
      : numColumns === 2
        ? "48%"
        : numColumns === 3
          ? "31.5%"
          : "23.5%";

  const pageTitleSize = responsiveValue(18, 20, 22);
  const pageHintSize = responsiveValue(11, 12, 13);

  const foodNameSize = responsiveValue(12, 13, 14);
  const foodPriceSize = responsiveValue(12, 13, 14);

  return StyleSheet.create({
    // =================================================
    // SCREEN
    // =================================================

    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
    },

    centered: {
      justifyContent: "center",
      alignItems: "center",
    },

    loadingText: {
      marginTop: responsiveSpacing(10),
      fontSize: FONT_SIZE.md,
      color: COLORS.muted,
    },

    // =================================================
    // HEADER
    // =================================================

    pageHeader: {
      paddingHorizontal: PAGE_PADDING,
      paddingTop: responsiveSpacing(10),
      paddingBottom: responsiveSpacing(10),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
      backgroundColor: COLORS.bg,
    },

    pageTitle: {
      color: COLORS.text,
      fontSize: pageTitleSize,
      lineHeight: responsiveFont(25),
      fontWeight: "800",
    },

    pageHint: {
      color: COLORS.muted,
      fontSize: pageHintSize,
      lineHeight: responsiveFont(17),
      marginTop: responsiveSpacing(1),
    },

    // =================================================
    // MAIN LAYOUT
    // =================================================

    mainRow: {
      flex: 1,
      flexDirection: isTablet ? "row" : "column",
      minHeight: 0,
    },

    leftPane: isTablet
      ? {
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          backgroundColor: COLORS.bg,
        }
      : {
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          backgroundColor: COLORS.bg,
        },

    // =================================================
    // CATEGORY
    // =================================================

    categoryScroll: {
      maxHeight: responsiveSpacing(56),
      backgroundColor: COLORS.bg,
    },

    categoryContent: {
      paddingHorizontal: PAGE_PADDING,
      paddingVertical: responsiveSpacing(9),
      gap: responsiveSpacing(8),
      alignItems: "center",
    },

    categoryTab: {
      minHeight: responsiveSpacing(34),
      paddingHorizontal: responsiveSpacing(14),
      borderRadius: responsiveSpacing(18),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
    },

    activeCategoryTab: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },

    categoryTabText: {
      color: COLORS.muted,
      fontSize: FONT_SIZE.sm,
      fontWeight: "600",
    },

    activeCategoryTabText: {
      color: COLORS.text,
    },

    // =================================================
    // MENU
    // =================================================

    menuScroll: {
      flex: 1,
      minWidth: 0,
      minHeight: 0,
    },

    menuGrid: {
      paddingHorizontal: menuPadding,
      paddingTop: responsiveSpacing(8),
      paddingBottom: responsiveSpacing(90),

      flexDirection: "row",
      flexWrap: "wrap",

      justifyContent: "space-between",

      // Helps prevent cards from getting squeezed
      columnGap: gridGap,
    },

    emptyMenu: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: responsiveSpacing(40),
    },

    emptyMenuText: {
      fontSize: FONT_SIZE.md,
      color: COLORS.muted,
      textAlign: "center",
    },

    // =================================================
    // FOOD CARD
    // =================================================

    foodCard: {
      width: cardBasis,

      flexGrow: 0,
      flexShrink: 0,

      backgroundColor: COLORS.card,

      borderRadius: responsiveSpacing(12),

      marginBottom: responsiveSpacing(12),

      overflow: "hidden",

      borderWidth: 1,
      borderColor: COLORS.border,
    },

    foodCardSelected: {
      borderColor: COLORS.primary,
      borderWidth: 2,
    },

    unavailableCard: {
      opacity: 0.5,
    },

    // =================================================
    // FOOD IMAGE
    // =================================================

    foodImageWrap: {
      width: "100%",

      aspectRatio: isTablet ? 1.25 : 1.15,

      backgroundColor: COLORS.panel,

      position: "relative",
    },

    foodImage: {
      width: "100%",
      height: "100%",
    },

    foodImagePlaceholder: {
      width: "100%",
      height: "100%",

      alignItems: "center",
      justifyContent: "center",
    },

    foodIcon: {
      fontSize: responsiveValue(24, 28, 32),
    },

    // =================================================
    // BADGES
    // =================================================

    quantityBadge: {
      position: "absolute",

      top: responsiveSpacing(7),
      right: responsiveSpacing(7),

      backgroundColor: COLORS.primaryDisabled,

      borderRadius: responsiveSpacing(8),

      paddingHorizontal: responsiveSpacing(7),
      paddingVertical: responsiveSpacing(3),
    },

    quantityBadgeText: {
      color: COLORS.primary,

      fontSize: responsiveFont(10),

      fontWeight: "800",
    },

    soldOutBadge: {
      position: "absolute",

      top: responsiveSpacing(7),
      left: responsiveSpacing(7),

      backgroundColor: COLORS.dangerBg,

      borderRadius: responsiveSpacing(6),

      paddingHorizontal: responsiveSpacing(6),
      paddingVertical: responsiveSpacing(3),
    },

    soldOutBadgeText: {
      color: COLORS.danger,

      fontSize: responsiveFont(9),

      fontWeight: "700",
    },

    // =================================================
    // FOOD BODY
    // =================================================

    foodCardBody: {
      paddingHorizontal: responsiveSpacing(10),
      paddingVertical: responsiveSpacing(9),

      minWidth: 0,
    },

    foodName: {
      color: COLORS.text,

      fontSize: foodNameSize,

      lineHeight: responsiveFont(18),

      fontWeight: "700",

      marginBottom: responsiveSpacing(3),

      flexShrink: 1,
    },

    foodPrice: {
      color: COLORS.primary,

      fontSize: foodPriceSize,

      fontWeight: "800",
    },

    // =================================================
    // ORDER PANEL
    // =================================================

    orderPanel: isTablet
      ? {
          width: 360,
          maxWidth: "42%",

          minWidth: 300,
          minHeight: 0,

          backgroundColor: COLORS.card,

          borderLeftWidth: 1,
          borderLeftColor: COLORS.border,
        }
      : {
          width: "100%",

          // IMPORTANT:
          // Mobile gets a fixed minimum area for the order.
          // This prevents the menu from consuming the whole screen.
          height: 370,
          minHeight: 350,

          backgroundColor: COLORS.card,

          borderTopWidth: 1,
          borderTopColor: COLORS.border,
        },

    // =================================================
    // ORDER HEADER
    // =================================================

    orderPanelHeader: {
      paddingHorizontal: horizontalPadding,

      paddingTop: responsiveSpacing(14),
      paddingBottom: responsiveSpacing(14),

      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,
    },

    orderPanelTitle: {
      color: COLORS.text,

      fontSize: responsiveValue(16, 17, 18),

      lineHeight: responsiveFont(23),

      fontWeight: "800",

      marginBottom: responsiveSpacing(10),
    },

    tableInputLabel: {
      color: COLORS.muted,

      fontSize: FONT_SIZE.sm,

      fontWeight: "600",

      marginBottom: responsiveSpacing(6),
    },

    tableInput: {
      width: "100%",

      height: responsiveSpacing(42),

      borderRadius: responsiveSpacing(9),

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      backgroundColor: COLORS.bg,

      paddingHorizontal: responsiveSpacing(12),

      fontSize: FONT_SIZE.md,

      color: COLORS.text,
    },

    // =================================================
    // ORDER TYPE
    // =================================================

    orderTypeSection: {
      paddingHorizontal: horizontalPadding,

      paddingVertical: responsiveSpacing(12),

      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,
    },

    orderTypeLabel: {
      color: COLORS.muted,

      fontSize: FONT_SIZE.sm,

      fontWeight: "600",

      marginBottom: responsiveSpacing(8),
    },

    orderTypeButtons: {
      flexDirection: "row",

      gap: responsiveSpacing(8),
    },

    orderTypeButton: {
      flex: 1,

      minHeight: responsiveSpacing(40),

      borderRadius: responsiveSpacing(9),

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      backgroundColor: COLORS.bg,

      alignItems: "center",
      justifyContent: "center",
    },

    orderTypeButtonActive: {
      backgroundColor: COLORS.primary,

      borderColor: COLORS.primary,
    },

    orderTypeButtonText: {
      color: COLORS.muted,

      fontSize: FONT_SIZE.sm,

      fontWeight: "700",
    },

    orderTypeButtonTextActive: {
      color: COLORS.text,
    },

    // =================================================
    // EMPTY ORDER
    // =================================================

    emptyOrderContainer: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: responsiveSpacing(20),
      paddingVertical: responsiveSpacing(18),
    },

    emptyCartIcon: {
      fontSize: responsiveValue(34, 38, 42),

      opacity: 0.35,

      marginBottom: responsiveSpacing(8),
    },

    emptyOrderTitle: {
      color: COLORS.text,

      fontSize: FONT_SIZE.md,

      fontWeight: "700",

      marginBottom: responsiveSpacing(3),

      textAlign: "center",
    },

    emptyOrderSubtitle: {
      color: COLORS.mutedLight,

      fontSize: FONT_SIZE.sm,

      textAlign: "center",
    },

    // =================================================
    // ORDER ITEMS
    // =================================================

    orderItemsList: {
      flex: 1,

      minHeight: 0,
    },

    orderLineItem: {
      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: horizontalPadding,

      paddingVertical: responsiveSpacing(9),

      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,

      minWidth: 0,
    },

    orderLineInfo: {
      flex: 1,

      minWidth: 0,

      paddingRight: responsiveSpacing(5),
    },

    orderLineName: {
      color: COLORS.text,

      fontSize: FONT_SIZE.sm,

      lineHeight: responsiveFont(17),

      fontWeight: "700",

      flexShrink: 1,
    },

    orderLineSub: {
      color: COLORS.muted,

      fontSize: FONT_SIZE.xs,

      lineHeight: responsiveFont(15),

      marginTop: responsiveSpacing(1),
    },

    // =================================================
    // STEPPER
    // =================================================

    orderLineControls: {
      flexDirection: "row",

      alignItems: "center",

      marginHorizontal: responsiveSpacing(6),

      flexShrink: 0,
    },

    stepperButton: {
      width: responsiveSpacing(27),
      height: responsiveSpacing(27),

      borderRadius: responsiveSpacing(7),

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      backgroundColor: COLORS.bg,

      alignItems: "center",
      justifyContent: "center",
    },

    stepperButtonPlus: {
      backgroundColor: COLORS.primary,

      borderColor: COLORS.primary,
    },

    stepperButtonText: {
      color: COLORS.muted,

      fontSize: responsiveFont(16),

      lineHeight: responsiveFont(18),

      fontWeight: "600",
    },

    stepperButtonTextPlus: {
      color: COLORS.text,
    },

    stepperValue: {
      width: responsiveSpacing(25),

      textAlign: "center",

      color: COLORS.text,

      fontSize: FONT_SIZE.sm,

      fontWeight: "700",
    },

    orderLineTotal: {
      width: responsiveSpacing(64),

      textAlign: "right",

      color: COLORS.text,

      fontSize: FONT_SIZE.sm,

      fontWeight: "800",

      flexShrink: 0,
    },

    // =================================================
    // FOOTER
    // =================================================

    orderFooter: {
      paddingHorizontal: horizontalPadding,

      paddingTop: responsiveSpacing(10),

      paddingBottom: responsiveSpacing(10),

      borderTopWidth: 1,
      borderTopColor: COLORS.border,

      backgroundColor: COLORS.card,
    },

    subtotalRow: {
      flexDirection: "row",

      justifyContent: "space-between",

      marginBottom: responsiveSpacing(5),
    },

    subtotalLabel: {
      color: COLORS.muted,

      fontSize: FONT_SIZE.sm,
    },

    subtotalValue: {
      color: COLORS.text,

      fontSize: FONT_SIZE.sm,

      fontWeight: "600",
    },

    totalRow: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",

      marginBottom: responsiveSpacing(10),
    },

    totalLabelBold: {
      color: COLORS.text,

      fontSize: responsiveValue(14, 15, 16),

      fontWeight: "800",
    },

    totalValueBold: {
      color: COLORS.primary,

      fontSize: responsiveValue(18, 20, 21),

      fontWeight: "800",
    },

    // =================================================
    // SAVE BUTTON
    // =================================================

    saveOrderButton: {
      width: "100%",

      minHeight: responsiveSpacing(44),

      borderRadius: responsiveSpacing(10),

      backgroundColor: COLORS.primary,

      alignItems: "center",
      justifyContent: "center",
    },

    saveOrderButtonDisabled: {
      backgroundColor: COLORS.primaryDisabled,
    },

    saveOrderButtonText: {
      color: COLORS.text,

      fontSize: FONT_SIZE.sm,

      fontWeight: "800",

      letterSpacing: responsiveValue(0.5, 0.7, 0.8),
    },

    // =================================================
    // FOOTER BOTTOM
    // =================================================

    footerBottomRow: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginTop: responsiveSpacing(8),

      minHeight: responsiveSpacing(24),
    },

    clearOrderLink: {
      color: COLORS.muted,

      fontSize: FONT_SIZE.xs,

      fontWeight: "600",
    },

    helpCircle: {
      width: responsiveSpacing(22),
      height: responsiveSpacing(22),

      borderRadius: responsiveSpacing(11),

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      alignItems: "center",
      justifyContent: "center",
    },

    helpCircleText: {
      color: COLORS.muted,

      fontSize: FONT_SIZE.xs,

      fontWeight: "700",
    },
  });
};
