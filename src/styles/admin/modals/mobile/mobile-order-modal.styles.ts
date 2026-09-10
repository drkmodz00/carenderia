import { StyleSheet } from "react-native";

import {
  BREAKPOINTS,
  responsiveFont,
  responsiveNumber,
  responsiveSpacing,
} from "@/styles/components/admin/responsive";

// =====================================================
// COLORS
// =====================================================

const COLORS = {
  green: "#319A6B",

  greenDark: "#287D58",

  greenLight: "#A8CEBA",

  white: "#FFFFFF",

  background: "#FAFAF8",

  text: "#363636",

  muted: "#777777",

  mutedLight: "#A09A92",

  border: "#D8D8D4",

  inputBorder: "#D8D8D4",

  orange: "#F45B00",

  disabled: "#A9CCB9",
};

// =====================================================
// MOBILE ORDER MODAL STYLES
// =====================================================

export const createMobileOrderModalStyles = (
  screenWidth: number
) => {
  // ===================================================
  // DEVICE
  // ===================================================

  const isSmallPhone =
    screenWidth < BREAKPOINTS.smallPhone;

  // ===================================================
  // RESPONSIVE VALUES
  // ===================================================

  const horizontalPadding =
    responsiveSpacing(
      16,
      screenWidth
    );

  const titleSize =
    responsiveFont(
      17,
      screenWidth
    );

  const labelSize =
    responsiveFont(
      10,
      screenWidth
    );

  const bodySize =
    responsiveFont(
      12,
      screenWidth
    );

  const totalSize =
    responsiveFont(
      17,
      screenWidth
    );

  const inputHeight =
    responsiveNumber(
      40,
      44,
      46
    );

  const typeButtonHeight =
    responsiveNumber(
      38,
      42,
      44
    );

  const saveButtonHeight =
    responsiveNumber(
      40,
      44,
      46
    );

  return StyleSheet.create({
    // =================================================
    // SCREEN
    // =================================================

    screen: {
      flex: 1,

      width: "100%",

      backgroundColor:
        COLORS.background,
    },

    // =================================================
    // HEADER
    // =================================================

    header: {
      width: "100%",

      minHeight:
        responsiveNumber(
          46,
          50,
          54
        ),

      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "space-between",

      paddingHorizontal:
        horizontalPadding,

      backgroundColor:
        COLORS.background,

      borderBottomWidth: 1,

      borderBottomColor:
        COLORS.border,
    },

    headerTextContainer: {
      flex: 1,

      minWidth: 0,
    },

    title: {
      color:
        COLORS.text,

      fontSize:
        titleSize,

      lineHeight:
        titleSize + 4,

      fontWeight:
        "800",

      letterSpacing:
        -0.2,
    },

    closeButton: {
      width: 30,

      height: 30,

      alignItems:
        "center",

      justifyContent:
        "center",

      marginLeft: 8,
    },

    closeButtonText: {
      color:
        COLORS.muted,

      fontSize: 25,

      lineHeight: 28,

      fontWeight:
        "300",
    },

    // =================================================
    // CONTENT
    // =================================================

    contentScroll: {
      flex: 1,

      backgroundColor:
        COLORS.background,
    },

    content: {
      paddingBottom: 4,
    },

    // =================================================
    // SECTION
    // =================================================

    section: {
      width: "100%",

      paddingHorizontal:
        horizontalPadding,

      paddingTop: 7,

      paddingBottom: 8,

      borderBottomWidth: 1,

      borderBottomColor:
        COLORS.border,

      backgroundColor:
        COLORS.background,
    },

    // =================================================
    // LABEL
    // =================================================

    label: {
      color:
        COLORS.muted,

      fontSize:
        labelSize,

      lineHeight: 13,

      marginBottom: 4,

      fontWeight:
        "400",
    },

    // =================================================
    // CUSTOMER INPUT
    // =================================================

    input: {
      width: "100%",

      height:
        inputHeight,

      borderWidth: 1,

      borderColor:
        COLORS.inputBorder,

      borderRadius: 8,

      backgroundColor:
        COLORS.white,

      paddingHorizontal: 11,

      paddingVertical: 0,

      color:
        COLORS.text,

      fontSize:
        bodySize,
    },

    // =================================================
    // ORDER TYPE
    // =================================================

    orderTypeButtons: {
      width: "100%",

      flexDirection:
        "row",

      gap: 7,
    },

    orderTypeButton: {
      flex: 1,

      height:
        typeButtonHeight,

      borderWidth: 1,

      borderColor:
        COLORS.inputBorder,

      borderRadius: 8,

      backgroundColor:
        COLORS.white,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    orderTypeButtonActive: {
      backgroundColor:
        COLORS.green,

      borderColor:
        COLORS.green,
    },

    orderTypeButtonText: {
      color:
        "#666666",

      fontSize:
        bodySize,

      fontWeight:
        "700",
    },

    orderTypeButtonTextActive: {
      color:
        COLORS.white,
    },

    // =================================================
    // ITEMS SECTION
    // =================================================

    itemsSection: {
      width: "100%",

      paddingTop: 7,

      paddingBottom: 0,

      backgroundColor:
        COLORS.background,
    },

    itemsTitle: {
      color:
        COLORS.text,

      fontSize:
        bodySize,

      fontWeight:
        "800",

      paddingHorizontal:
        horizontalPadding,

      marginBottom: 4,
    },

    // =================================================
    // EMPTY ORDER
    // =================================================

    emptyOrder: {
      width: "100%",

      minHeight:
        responsiveNumber(
          112,
          130,
          145
        ),

      alignItems:
        "center",

      justifyContent:
        "center",

      paddingHorizontal: 20,

      paddingVertical: 15,

      backgroundColor:
        COLORS.background,

      borderBottomWidth: 1,

      borderBottomColor:
        COLORS.border,
    },

    // =================================================
    // EMPTY CART ICON
    // =================================================

    emptyIcon: {
      fontSize:
        isSmallPhone
          ? 30
          : 34,

      lineHeight:
        isSmallPhone
          ? 34
          : 38,

      opacity: 0.35,

      marginBottom: 2,
    },

    // =================================================
    // EMPTY TITLE
    // =================================================

    emptyTitle: {
      color:
        COLORS.text,

      fontSize:
        bodySize,

      fontWeight:
        "800",

      textAlign:
        "center",

      marginTop: 0,
    },

    // =================================================
    // EMPTY SUBTITLE
    // =================================================

    emptySubtitle: {
      color:
        COLORS.mutedLight,

      fontSize:
        labelSize,

      textAlign:
        "center",

      marginTop: 2,
    },

    // =================================================
    // ORDER ITEMS
    // =================================================

    orderItem: {
      width: "100%",

      minHeight: 52,

      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal:
        horizontalPadding,

      paddingVertical: 7,

      backgroundColor:
        COLORS.background,

      borderTopWidth: 1,

      borderTopColor:
        "#E5E5E1",
    },

    itemInfo: {
      flex: 1,

      minWidth: 0,

      paddingRight: 5,
    },

    itemName: {
      color:
        COLORS.text,

      fontSize:
        bodySize,

      lineHeight:
        bodySize + 4,

      fontWeight:
        "700",
    },

    itemPrice: {
      color:
        COLORS.muted,

      fontSize:
        labelSize,

      marginTop: 1,
    },

    // =================================================
    // QUANTITY CONTROLS
    // =================================================

    itemControls: {
      flexDirection:
        "row",

      alignItems:
        "center",

      marginHorizontal: 4,
    },

    stepperButton: {
      width: 28,

      height: 28,

      borderRadius: 6,

      borderWidth: 1,

      borderColor:
        COLORS.inputBorder,

      backgroundColor:
        COLORS.white,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    plusButton: {
      backgroundColor:
        COLORS.green,

      borderColor:
        COLORS.green,
    },

    stepperText: {
      color:
        COLORS.muted,

      fontSize: 17,

      lineHeight: 19,

      fontWeight:
        "600",
    },

    plusText: {
      color:
        COLORS.white,
    },

    quantity: {
      width: 25,

      textAlign:
        "center",

      color:
        COLORS.text,

      fontSize:
        bodySize,

      fontWeight:
        "800",
    },

    itemTotal: {
      width: 62,

      textAlign:
        "right",

      color:
        COLORS.text,

      fontSize:
        bodySize,

      fontWeight:
        "800",
    },

    // =================================================
    // FOOTER
    // =================================================

    footer: {
      width: "100%",

      backgroundColor:
        COLORS.background,

      borderTopWidth: 1,

      borderTopColor:
        COLORS.border,

      paddingHorizontal:
        horizontalPadding,

      paddingTop: 7,

      paddingBottom:
        isSmallPhone
          ? 6
          : 8,
    },

    // =================================================
    // SUBTOTAL
    // =================================================

    subtotalRow: {
      width: "100%",

      minHeight: 17,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",
    },

    subtotalLabel: {
      color:
        COLORS.muted,

      fontSize:
        labelSize,
    },

    subtotalValue: {
      color:
        COLORS.text,

      fontSize:
        labelSize,

      fontWeight:
        "600",
    },

    // =================================================
    // TOTAL
    // =================================================

    totalRow: {
      width: "100%",

      minHeight: 24,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      marginBottom: 5,
    },

    totalLabel: {
      color:
        COLORS.text,

      fontSize:
        responsiveFont(
          14,
          screenWidth
        ),

      fontWeight:
        "800",
    },

    totalValue: {
      color:
        COLORS.green,

      fontSize:
        totalSize,

      fontWeight:
        "900",
    },

    // =================================================
    // SAVE ORDER
    // =================================================

    saveButton: {
      width: "100%",

      height:
        saveButtonHeight,

      borderRadius: 8,

      backgroundColor:
        COLORS.greenLight,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    saveButtonDisabled: {
      backgroundColor:
        COLORS.disabled,
    },

    saveButtonText: {
      color:
        "#26382F",

      fontSize:
        labelSize,

      fontWeight:
        "900",

      letterSpacing:
        0.2,
    },

    // =================================================
    // FOOTER BOTTOM
    // =================================================

    footerBottom: {
      width: "100%",

      minHeight: 25,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      marginTop: 1,
    },

    clearText: {
      color:
        COLORS.muted,

      fontSize:
        labelSize,

      fontWeight:
        "400",
    },

    clearTextDisabled: {
      opacity: 0.5,
    },

    // =================================================
    // HELP BUTTON
    // =================================================

    helpButton: {
      width: 21,

      height: 21,

      borderRadius: 10.5,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      backgroundColor:
        COLORS.white,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    helpButtonText: {
      color:
        COLORS.muted,

      fontSize: 11,

      lineHeight: 13,

      fontWeight:
        "600",
    },

    // =================================================
    // FLOATING CART BUTTON
    //
    // This is for orders.tsx.
    // =================================================

    cartButton: {
      position:
        "absolute",

      right:
        responsiveSpacing(
          12,
          screenWidth
        ),

      bottom:
        responsiveNumber(
          72,
          80,
          88
        ),

      width:
        responsiveNumber(
          52,
          58,
          62
        ),

      height:
        responsiveNumber(
          52,
          58,
          62
        ),

      borderRadius:
        responsiveNumber(
          26,
          29,
          31
        ),

      backgroundColor:
        COLORS.green,

      alignItems:
        "center",

      justifyContent:
        "center",

      zIndex: 999,

      elevation: 10,

      shadowOffset: {
        width: 0,

        height: 4,
      },

      shadowOpacity: 0.25,

      shadowRadius: 7,
    },

    // =================================================
    // CART BADGE
    // =================================================

    cartBadge: {
      position:
        "absolute",

      top: -3,

      right: -3,

      minWidth:
        isSmallPhone
          ? 18
          : 21,

      height:
        isSmallPhone
          ? 18
          : 21,

      paddingHorizontal: 4,

      borderRadius: 20,

      backgroundColor:
        COLORS.orange,

      borderWidth: 2,

      borderColor:
        COLORS.white,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    cartBadgeText: {
      color:
        COLORS.white,

      fontSize:
        isSmallPhone
          ? 9
          : 10,

      fontWeight:
        "900",
    },

    cartButtonDisabled: {
      opacity: 0.55,
    },
  });
};