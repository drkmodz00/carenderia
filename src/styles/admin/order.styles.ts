import { StyleSheet } from "react-native";

import { COLORS } from "@/styles/admin/theme";

import {
  FONT_SIZE,
  PAGE_PADDING,
} from "../components/admin/responsive";

// =====================================================
// ORDER STYLES
// =====================================================

export const createOrderStyles = (
  isTablet: boolean,
  numColumns: number
) => {
  // ===================================================
  // COMPACT RESPONSIVE VALUES
  // ===================================================

  const horizontalPadding = isTablet ? 14 : 12;
  const menuPadding = isTablet ? 16 : 10;
  const gridGap = 8;

  const pageTitleSize = isTablet ? 20 : 17;
  const pageHintSize = isTablet ? 12 : 10;

  const foodNameSize = isTablet ? 14 : 12;
  const foodPriceSize = isTablet ? 14 : 12;

  // ===================================================
  // MENU CARD WIDTH
  // ===================================================

  const cardBasis =
    numColumns === 1
      ? "100%"
      : numColumns === 2
        ? "48%"
        : numColumns === 3
          ? "31.5%"
          : "23.5%";

  return StyleSheet.create({
    // =================================================
    // SCREEN
    // =================================================

    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
      minWidth: 0,
      minHeight: 0,
    },

    centered: {
      justifyContent: "center",
      alignItems: "center",
    },

    loadingText: {
      marginTop: 8,
      fontSize: FONT_SIZE.md,
      color: COLORS.muted,
    },

    // =================================================
    // HEADER
    // =================================================

    pageHeader: {
      paddingHorizontal: PAGE_PADDING,
      paddingTop: isTablet ? 10 : 8,
      paddingBottom: isTablet ? 10 : 8,

      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,

      backgroundColor: COLORS.bg,

      flexShrink: 0,
    },

    pageTitle: {
      color: COLORS.text,

      fontSize: pageTitleSize,
      lineHeight: isTablet ? 23 : 20,

      fontWeight: "800",

      flexShrink: 0,
    },

    pageHint: {
      color: COLORS.muted,

      fontSize: pageHintSize,
      lineHeight: 15,

      marginTop: 1,

      flexShrink: 0,
    },

    // =================================================
    // MAIN LAYOUT
    // =================================================

    mainRow: {
      flex: 1,

      flexDirection: isTablet ? "row" : "column",

      minHeight: 0,
      minWidth: 0,
    },

    // =================================================
    // LEFT PANE
    // =================================================

    leftPane: {
      flex: 1,

      minWidth: 0,
      minHeight: 0,

      backgroundColor: COLORS.bg,
    },

    // =================================================
    // CATEGORY
    // =================================================

    categoryScroll: {
      maxHeight: isTablet ? 54 : 50,

      backgroundColor: COLORS.bg,

      flexGrow: 0,
      flexShrink: 0,
    },

    categoryContent: {
      paddingHorizontal: PAGE_PADDING,

      paddingVertical: 7,

      gap: 7,

      alignItems: "center",
    },

    categoryTab: {
      minHeight: 32,

      paddingHorizontal: isTablet ? 14 : 12,

      borderRadius: 16,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: COLORS.card,

      borderWidth: 1,
      borderColor: COLORS.border,

      flexShrink: 0,
    },

    activeCategoryTab: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },

    categoryTabText: {
      color: COLORS.muted,

      fontSize: 11,

      fontWeight: "600",

      flexShrink: 0,
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

      paddingTop: 8,

      paddingBottom: isTablet ? 80 : 90,

      flexDirection: "row",

      flexWrap: "wrap",

      justifyContent:
        numColumns === 1 ? "flex-start" : "space-between",

      columnGap: gridGap,

      rowGap: 0,
    },

    emptyMenu: {
      width: "100%",

      alignItems: "center",
      justifyContent: "center",

      paddingVertical: 35,
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

      borderRadius: 10,

      marginBottom: 10,

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

      aspectRatio: isTablet ? 1.25 : 1.1,

      backgroundColor: COLORS.panel,

      position: "relative",

      flexShrink: 0,
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
      fontSize: isTablet ? 28 : 24,
    },

    // =================================================
    // BADGES
    // =================================================

    quantityBadge: {
      position: "absolute",

      top: 6,
      right: 6,

      backgroundColor: COLORS.primaryDisabled,

      borderRadius: 7,

      paddingHorizontal: 6,
      paddingVertical: 2,

      flexShrink: 0,
    },

    quantityBadgeText: {
      color: COLORS.primary,

      fontSize: 9,

      fontWeight: "800",
    },

    soldOutBadge: {
      position: "absolute",

      top: 6,
      left: 6,

      backgroundColor: COLORS.dangerBg,

      borderRadius: 5,

      paddingHorizontal: 5,
      paddingVertical: 2,

      flexShrink: 0,
    },

    soldOutBadgeText: {
      color: COLORS.danger,

      fontSize: 8,

      fontWeight: "700",
    },

    // =================================================
    // FOOD BODY
    // =================================================

    foodCardBody: {
      paddingHorizontal: 8,

      paddingVertical: 7,

      minWidth: 0,

      flexShrink: 0,
    },

    foodName: {
      color: COLORS.text,

      fontSize: foodNameSize,

      lineHeight: 16,

      fontWeight: "700",

      marginBottom: 2,

      flexShrink: 1,
    },

    foodPrice: {
      color: COLORS.primary,

      fontSize: foodPriceSize,

      fontWeight: "800",

      flexShrink: 0,
    },

    // =================================================
    // ORDER PANEL
    // =================================================

    // =================================================
    // ORDER PANEL
    // =================================================

    orderPanel: isTablet
      ? {
          width: 340,

          maxWidth: "40%",

          minWidth: 290,

          minHeight: 0,

          backgroundColor: COLORS.card,

          borderLeftWidth: 1,
          borderLeftColor: COLORS.border,

          flexShrink: 0,
        }
      : {
          display: "none",
        },
    // =================================================
    // ORDER HEADER
    // =================================================

    orderPanelHeader: {
      paddingHorizontal: horizontalPadding,

      paddingTop: 9,
      paddingBottom: 9,

      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,

      flexShrink: 0,
    },

    orderPanelTitle: {
      color: COLORS.text,

      fontSize: isTablet ? 17 : 16,

      lineHeight: 20,

      fontWeight: "800",

      marginBottom: 7,

      flexShrink: 0,
    },

    tableInputLabel: {
      color: COLORS.muted,

      fontSize: 10,

      fontWeight: "600",

      marginBottom: 4,

      flexShrink: 0,
    },

    tableInput: {
      width: "100%",

      height: 40,

      borderRadius: 8,

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      backgroundColor: COLORS.bg,

      paddingHorizontal: 10,

      fontSize: 12,

      color: COLORS.text,

      flexShrink: 0,
    },

    // =================================================
    // ORDER TYPE
    // =================================================

    orderTypeSection: {
      paddingHorizontal: horizontalPadding,

      paddingVertical: 7,

      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,

      flexShrink: 0,
    },

    orderTypeLabel: {
      color: COLORS.muted,

      fontSize: 10,

      fontWeight: "600",

      marginBottom: 5,

      flexShrink: 0,
    },

    orderTypeButtons: {
      flexDirection: "row",

      gap: 7,

      minWidth: 0,
    },

    orderTypeButton: {
      flex: 1,

      minWidth: 0,

      minHeight: 38,

      borderRadius: 8,

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      backgroundColor: COLORS.bg,

      alignItems: "center",
      justifyContent: "center",

      flexShrink: 0,
    },

    orderTypeButtonActive: {
      backgroundColor: COLORS.primary,

      borderColor: COLORS.primary,
    },

    orderTypeButtonText: {
      color: COLORS.muted,

      fontSize: 11,

      fontWeight: "700",

      flexShrink: 0,
    },

    orderTypeButtonTextActive: {
      color: COLORS.text,
    },

    // =================================================
    // EMPTY ORDER
    // =================================================

    emptyOrderContainer: {
      flex: 1,

      minHeight: 100,

      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: 16,
      paddingVertical: 12,
    },

    emptyCartIcon: {
      fontSize: isTablet ? 36 : 32,

      opacity: 0.35,

      marginBottom: 6,
    },

    emptyOrderTitle: {
      color: COLORS.text,

      fontSize: 12,

      fontWeight: "700",

      marginBottom: 2,

      textAlign: "center",
    },

    emptyOrderSubtitle: {
      color: COLORS.mutedLight,

      fontSize: 10,

      textAlign: "center",
    },

    // =================================================
    // ORDER ITEMS
    // =================================================

    orderItemsList: {
      flex: 1,

      minHeight: 0,

      minWidth: 0,
    },

    orderLineItem: {
      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: horizontalPadding,

      paddingVertical: 5,

      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,

      minWidth: 0,

      flexShrink: 0,
    },

    orderLineInfo: {
      flex: 1,

      minWidth: 0,

      paddingRight: 3,

      flexShrink: 1,
    },

    orderLineName: {
      color: COLORS.text,

      fontSize: 11,

      lineHeight: 14,

      fontWeight: "700",

      flexShrink: 1,
    },

    orderLineSub: {
      color: COLORS.muted,

      fontSize: 9,

      lineHeight: 11,

      marginTop: 0,

      flexShrink: 0,
    },

    // =================================================
    // STEPPER
    // =================================================

    orderLineControls: {
      flexDirection: "row",

      alignItems: "center",

      marginHorizontal: 3,

      flexShrink: 0,
    },

    stepperButton: {
      width: 26,

      height: 26,

      borderRadius: 6,

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      backgroundColor: COLORS.bg,

      alignItems: "center",
      justifyContent: "center",

      flexShrink: 0,
    },

    stepperButtonPlus: {
      backgroundColor: COLORS.primary,

      borderColor: COLORS.primary,
    },

    stepperButtonText: {
      color: COLORS.muted,

      fontSize: 14,

      lineHeight: 15,

      fontWeight: "600",
    },

    stepperButtonTextPlus: {
      color: COLORS.text,
    },

    stepperValue: {
      width: 22,

      textAlign: "center",

      color: COLORS.text,

      fontSize: 11,

      fontWeight: "700",

      flexShrink: 0,
    },

    // =================================================
    // ORDER TOTAL
    // =================================================

    orderLineTotal: {
      width: 54,

      textAlign: "right",

      color: COLORS.text,

      fontSize: 11,

      fontWeight: "800",

      flexShrink: 0,
    },

    // =================================================
    // FOOTER
    // =================================================

    orderFooter: {
      paddingHorizontal: horizontalPadding,

      paddingTop: 6,

      paddingBottom: 6,

      borderTopWidth: 1,
      borderTopColor: COLORS.border,

      backgroundColor: COLORS.card,

      flexShrink: 0,
    },

    subtotalRow: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",

      marginBottom: 1,

      minHeight: 16,

      flexShrink: 0,
    },

    subtotalLabel: {
      color: COLORS.muted,

      fontSize: 10,

      flexShrink: 0,
    },

    subtotalValue: {
      color: COLORS.text,

      fontSize: 10,

      fontWeight: "600",

      flexShrink: 0,
    },

    // =================================================
    // TOTAL
    // =================================================

    totalRow: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",

      marginBottom: 6,

      minHeight: 21,

      flexShrink: 0,
    },

    totalLabelBold: {
      color: COLORS.text,

      fontSize: 14,

      fontWeight: "800",

      flexShrink: 0,
    },

    totalValueBold: {
      color: COLORS.primary,

      fontSize: 19,

      fontWeight: "800",

      flexShrink: 0,
    },

    // =================================================
    // SAVE BUTTON
    // =================================================

    saveOrderButton: {
      width: "100%",

      minHeight: 42,

      borderRadius: 9,

      backgroundColor: COLORS.primary,

      alignItems: "center",
      justifyContent: "center",

      flexShrink: 0,
    },

    saveOrderButtonDisabled: {
      backgroundColor: COLORS.primaryDisabled,
    },

    saveOrderButtonText: {
      color: COLORS.text,

      fontSize: 11,

      fontWeight: "800",

      letterSpacing: 0.5,

      flexShrink: 0,
    },

    // =================================================
    // FOOTER BOTTOM
    // =================================================

    footerBottomRow: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginTop: 5,

      minHeight: 20,

      flexShrink: 0,
    },

    clearOrderLink: {
      color: COLORS.muted,

      fontSize: 9,

      fontWeight: "600",

      flexShrink: 0,
    },

    helpCircle: {
      width: 21,

      height: 21,

      borderRadius: 11,

      borderWidth: 1,
      borderColor: COLORS.borderLight,

      alignItems: "center",
      justifyContent: "center",

      flexShrink: 0,
    },

    helpCircleText: {
      color: COLORS.muted,

      fontSize: 9,

      fontWeight: "700",
    },
  });
};