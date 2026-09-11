import { StyleSheet } from "react-native";

import { COLORS } from "@/styles/admin/theme";

import {
  BREAKPOINTS,
  responsiveFont,
  responsiveNumber,
  responsiveSpacing,
} from "@/styles/components/admin/responsive";

// =====================================================
// MOBILE ORDER MODAL STYLES
// =====================================================

export const createMobileOrderModalStyles = (
  screenWidth: number
) => {
  const smallPhone =
    screenWidth < BREAKPOINTS.smallPhone;

  const phone =
    screenWidth < BREAKPOINTS.tablet;

  const horizontalPadding = smallPhone
    ? 12
    : phone
      ? 16
      : 20;

  const headerPadding = smallPhone
    ? 12
    : phone
      ? 16
      : 20;

  const cardRadius = smallPhone
    ? 10
    : phone
      ? 12
      : 14;

  return StyleSheet.create({
    // =================================================
    // MODAL SCREEN
    // =================================================

    screen: {
      flex: 1,

      backgroundColor: COLORS.bg,

      minWidth: 0,
      minHeight: 0,
    },

    // =================================================
    // HEADER
    // =================================================

    header: {
      width: "100%",

      minHeight: smallPhone ? 58 : 66,

      paddingHorizontal: headerPadding,

      paddingVertical: smallPhone ? 9 : 12,

      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      backgroundColor: COLORS.bg,

      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,

      flexShrink: 0,
    },

    headerTextContainer: {
      flex: 1,

      minWidth: 0,

      paddingRight: 10,
    },

    title: {
      color: COLORS.text,

      fontSize: smallPhone
        ? 22
        : phone
          ? 24
          : 26,

      lineHeight: smallPhone
        ? 27
        : phone
          ? 29
          : 32,

      fontWeight: "800",

      flexShrink: 1,
    },

    closeButton: {
      width: smallPhone ? 38 : 42,

      height: smallPhone ? 38 : 42,

      borderRadius: smallPhone ? 19 : 21,

      alignItems: "center",
      justifyContent: "center",

      backgroundColor: COLORS.card,

      borderWidth: 1,
      borderColor: COLORS.border,

      flexShrink: 0,
    },

    closeButtonText: {
      color: COLORS.text,

      fontSize: smallPhone ? 24 : 26,

      fontWeight: "300",

      lineHeight: smallPhone ? 26 : 28,
    },

    // =================================================
    // CONTENT
    // =================================================

    contentScroll: {
      flex: 1,

      backgroundColor: COLORS.bg,

      minHeight: 0,
    },

    content: {
      paddingBottom: responsiveSpacing(
        smallPhone ? 20 : 28,
        screenWidth
      ),

      minWidth: 0,
    },

    // =================================================
    // SECTION
    // =================================================

    section: {
      width: "100%",

      paddingHorizontal: horizontalPadding,

      paddingTop: smallPhone ? 13 : 16,

      paddingBottom: smallPhone ? 13 : 16,

      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,

      backgroundColor: COLORS.bg,
    },

    label: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        smallPhone ? 11 : 12,
        screenWidth
      ),

      fontWeight: "600",

      marginBottom: smallPhone ? 6 : 8,
    },

    // =================================================
    // CUSTOMER INPUT
    // =================================================

    input: {
      width: "100%",

      height: smallPhone ? 44 : 48,

      borderRadius: cardRadius,

      borderWidth: 1,
      borderColor: COLORS.border,

      backgroundColor: COLORS.card,

      paddingHorizontal: smallPhone
        ? 12
        : 14,

      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 12 : 13,
        screenWidth
      ),

      flexShrink: 0,
    },

    // =================================================
    // ORDER TYPE
    // =================================================

    orderTypeButtons: {
      width: "100%",

      flexDirection: "row",

      gap: smallPhone ? 8 : 10,

      minWidth: 0,
    },

    orderTypeButton: {
      flex: 1,

      minHeight: smallPhone ? 46 : 50,

      borderRadius: cardRadius,

      borderWidth: 1,
      borderColor: COLORS.border,

      backgroundColor: COLORS.card,

      alignItems: "center",
      justifyContent: "center",

      minWidth: 0,
    },

    orderTypeButtonActive: {
      backgroundColor: COLORS.primary,

      borderColor: COLORS.primary,
    },

    orderTypeButtonText: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        smallPhone ? 12 : 13,
        screenWidth
      ),

      fontWeight: "700",

      flexShrink: 1,
    },

    orderTypeButtonTextActive: {
      color: COLORS.text,
    },

    // =================================================
    // ITEMS
    // =================================================

    itemsSection: {
      width: "100%",

      paddingHorizontal: horizontalPadding,

      paddingTop: smallPhone ? 14 : 18,

      backgroundColor: COLORS.bg,
    },

    itemsTitle: {
      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 15 : 17,
        screenWidth
      ),

      fontWeight: "800",

      marginBottom: smallPhone ? 9 : 12,
    },

    // =================================================
    // EMPTY ORDER
    // =================================================

    emptyOrder: {
      minHeight: smallPhone ? 190 : 220,

      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: 20,

      paddingVertical: 30,

      borderRadius: cardRadius,

      backgroundColor: COLORS.card,

      borderWidth: 1,
      borderColor: COLORS.border,
    },

    emptyIcon: {
      fontSize: smallPhone ? 42 : 48,

      opacity: 0.35,

      marginBottom: 10,
    },

    emptyTitle: {
      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 16 : 18,
        screenWidth
      ),

      fontWeight: "700",

      textAlign: "center",

      marginBottom: 5,
    },

    emptySubtitle: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        smallPhone ? 11 : 12,
        screenWidth
      ),

      textAlign: "center",

      lineHeight: 18,
    },

    // =================================================
    // ORDER ITEM
    // =================================================

    orderItem: {
      width: "100%",

      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: smallPhone
        ? 10
        : 12,

      paddingVertical: smallPhone
        ? 10
        : 12,

      marginBottom: smallPhone
        ? 8
        : 10,

      borderRadius: cardRadius,

      backgroundColor: COLORS.card,

      borderWidth: 1,
      borderColor: COLORS.border,

      minWidth: 0,
    },

    itemInfo: {
      flex: 1,

      minWidth: 0,

      paddingRight: 8,
    },

    itemName: {
      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 12 : 13,
        screenWidth
      ),

      fontWeight: "700",

      lineHeight: 17,

      flexShrink: 1,
    },

    itemPrice: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        smallPhone ? 10 : 11,
        screenWidth
      ),

      marginTop: 3,

      flexShrink: 0,
    },

    // =================================================
    // ITEM CONTROLS
    // =================================================

    itemControls: {
      flexDirection: "row",

      alignItems: "center",

      flexShrink: 0,

      gap: 5,
    },

    stepperButton: {
      width: smallPhone ? 30 : 34,

      height: smallPhone ? 30 : 34,

      borderRadius: smallPhone ? 8 : 9,

      borderWidth: 1,
      borderColor: COLORS.border,

      backgroundColor: COLORS.bg,

      alignItems: "center",
      justifyContent: "center",
    },

    plusButton: {
      backgroundColor: COLORS.primary,

      borderColor: COLORS.primary,
    },

    stepperText: {
      color: COLORS.muted,

      fontSize: smallPhone ? 16 : 18,

      fontWeight: "600",
    },

    plusText: {
      color: COLORS.text,
    },

    quantity: {
      width: smallPhone ? 24 : 28,

      textAlign: "center",

      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 12 : 13,
        screenWidth
      ),

      fontWeight: "700",
    },

    itemTotal: {
      width: smallPhone ? 58 : 68,

      textAlign: "right",

      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 11 : 12,
        screenWidth
      ),

      fontWeight: "800",

      flexShrink: 0,
    },

    // =================================================
    // FOOTER
    // =================================================

    footer: {
      width: "100%",

      paddingHorizontal: horizontalPadding,

      paddingTop: smallPhone ? 12 : 14,

      paddingBottom: smallPhone ? 8 : 10,

      backgroundColor: COLORS.card,

      borderTopWidth: 1,
      borderTopColor: COLORS.border,

      flexShrink: 0,
    },

    // =================================================
    // SUBTOTAL
    // =================================================

    subtotalRow: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginBottom: 4,

      minHeight: 20,
    },

    subtotalLabel: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        smallPhone ? 11 : 12,
        screenWidth
      ),
    },

    subtotalValue: {
      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 11 : 12,
        screenWidth
      ),

      fontWeight: "600",
    },

    // =================================================
    // TOTAL
    // =================================================

    totalRow: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginBottom: smallPhone ? 9 : 11,

      minHeight: 28,
    },

    totalLabel: {
      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 17 : 19,
        screenWidth
      ),

      fontWeight: "800",
    },

    totalValue: {
      color: COLORS.primary,

      fontSize: responsiveFont(
        smallPhone ? 22 : 25,
        screenWidth
      ),

      fontWeight: "800",
    },

    // =================================================
    // SAVE
    // =================================================

    saveButton: {
      width: "100%",

      minHeight: smallPhone ? 46 : 50,

      borderRadius: cardRadius,

      backgroundColor: COLORS.primary,

      alignItems: "center",
      justifyContent: "center",
    },

    saveButtonDisabled: {
      backgroundColor: COLORS.primaryDisabled,
    },

    saveButtonText: {
      color: COLORS.text,

      fontSize: responsiveFont(
        smallPhone ? 12 : 13,
        screenWidth
      ),

      fontWeight: "800",

      letterSpacing: 0.5,
    },

    // =================================================
    // FOOTER BOTTOM
    // =================================================

    footerBottom: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginTop: smallPhone ? 6 : 8,

      minHeight: 24,
    },

    clearText: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        smallPhone ? 10 : 11,
        screenWidth
      ),

      fontWeight: "600",
    },

    clearTextDisabled: {
      color: COLORS.mutedLight,

      opacity: 0.55,
    },

    helpButton: {
      width: smallPhone ? 28 : 30,

      height: smallPhone ? 28 : 30,

      borderRadius: 999,

      borderWidth: 1,
      borderColor: COLORS.border,

      backgroundColor: COLORS.card,

      alignItems: "center",
      justifyContent: "center",
    },

    helpButtonText: {
      color: COLORS.muted,

      fontSize: smallPhone ? 13 : 14,

      fontWeight: "700",
    },

    // =================================================
    // FLOATING CART BUTTON
    // =================================================

    cartButton: {
      position: "absolute",

      right: smallPhone ? 14 : 18,

      bottom: smallPhone ? 82 : 92,

      width: smallPhone ? 58 : 62,

      height: smallPhone ? 58 : 62,

      borderRadius: 999,

      backgroundColor: COLORS.primary,

      alignItems: "center",
      justifyContent: "center",

      elevation: 7,

      shadowOffset: {
        width: 0,
        height: 4,
      },

      shadowOpacity: 0.18,

      shadowRadius: 8,

      zIndex: 50,
    },

    cartBadge: {
      position: "absolute",

      top: -2,
      right: -2,

      minWidth: 22,
      height: 22,

      paddingHorizontal: 5,

      borderRadius: 11,

      backgroundColor: COLORS.danger,

      alignItems: "center",
      justifyContent: "center",

      borderWidth: 2,
      borderColor: COLORS.bg,
    },

    cartBadgeText: {
      color: "#FFFFFF",

      fontSize: 9,

      fontWeight: "800",
    },

    cartButtonDisabled: {
      opacity: 0.5,
    },
  });
};