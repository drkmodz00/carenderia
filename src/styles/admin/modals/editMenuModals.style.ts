import { StyleSheet } from "react-native";

export const editMenuModalStyles =
  StyleSheet.create({

    /* =====================================================
       OVERLAY
    ===================================================== */

    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.48)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },

    /* =====================================================
       MODAL
    ===================================================== */

    modal: {
      width: "100%",
      maxWidth: 575,
      maxHeight: "96%",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      overflow: "hidden",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.18,
      shadowRadius: 25,
      elevation: 12,
    },

    /* =====================================================
       HEADER
    ===================================================== */

    header: {
      minHeight: 84,
      paddingHorizontal: 29,
      paddingVertical: 17,

      borderBottomWidth: 1,
      borderBottomColor: "#EFEAE4",

      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    title: {
      color: "#111111",
      fontSize: 24,
      fontWeight: "700",
      fontFamily: "serif",
    },

    subtitle: {
      marginTop: 3,
      color: "#A07868",
      fontSize: 14,
      fontWeight: "400",
    },

    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 16,

      backgroundColor: "#F5F1ED",

      alignItems: "center",
      justifyContent: "center",
    },

    closeText: {
      color: "#A38D81",
      fontSize: 22,
      lineHeight: 24,
    },

    /* =====================================================
       SCROLL
    ===================================================== */

    scrollView: {
      flexGrow: 0,
    },

    scrollContent: {
      paddingHorizontal: 30,
      paddingTop: 26,
      paddingBottom: 24,
    },

    /* =====================================================
       LABEL
    ===================================================== */

    label: {
      marginBottom: 9,
      marginTop: 0,

      color: "#987566",
      fontSize: 14,
      fontWeight: "700",
      letterSpacing: 0.3,
    },

    /* =====================================================
       IMAGE
    ===================================================== */

    imageContainer: {
      height: 225,
      width: "100%",

      borderRadius: 18,
      overflow: "hidden",

      backgroundColor: "#F1EDE8",

      marginBottom: 26,

      position: "relative",
    },

    foodImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },

    noImage: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#EAE4DE",
    },

    noImageText: {
      color: "#9A8A7F",
      fontSize: 15,
      fontWeight: "600",
    },

    selectedBadge: {
      position: "absolute",
      right: 14,
      top: 14,

      paddingHorizontal: 13,
      paddingVertical: 8,

      borderRadius: 18,

      backgroundColor: "#E47D00",
    },

    selectedBadgeText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "700",
    },

    imageActions: {
      position: "absolute",

      bottom: 14,
      left: 0,
      right: 0,

      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      gap: 10,
    },

    changeImageButton: {
      minHeight: 38,

      paddingHorizontal: 17,

      borderRadius: 19,

      backgroundColor: "#FFFFFF",

      alignItems: "center",
      justifyContent: "center",
    },

    changeImageButtonText: {
      color: "#161616",
      fontSize: 13,
      fontWeight: "700",
    },

    removeButton: {
      minHeight: 38,

      paddingHorizontal: 17,

      borderRadius: 19,

      backgroundColor: "#F04444",

      alignItems: "center",
      justifyContent: "center",
    },

    removeButtonText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "700",
    },

    /* =====================================================
       INPUT
    ===================================================== */

    input: {
      height: 52,

      paddingHorizontal: 20,

      borderWidth: 1,
      borderColor: "#E8DED5",

      borderRadius: 15,

      backgroundColor: "#FFFFFF",

      color: "#171717",
      fontSize: 16,

      marginBottom: 25,
    },

    /* =====================================================
       SELECT
    ===================================================== */

    select: {
      height: 52,

      paddingHorizontal: 20,

      borderWidth: 1,
      borderColor: "#E8DED5",

      borderRadius: 15,

      backgroundColor: "#FFFFFF",

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      marginBottom: 8,
    },

    selectText: {
      color: "#292929",
      fontSize: 16,
    },

    arrow: {
      color: "#171717",
      fontSize: 21,
    },

    categoryDropdown: {
      borderWidth: 1,
      borderColor: "#E8DED5",

      borderRadius: 14,

      backgroundColor: "#FFFFFF",

      marginBottom: 25,

      overflow: "hidden",
    },

    categoryOption: {
      minHeight: 43,

      paddingHorizontal: 18,

      justifyContent: "center",

      borderBottomWidth: 1,
      borderBottomColor: "#F1ECE7",
    },

    selectedCategoryOption: {
      backgroundColor: "#FFF3E1",
    },

    categoryOptionText: {
      color: "#333333",
      fontSize: 14,
    },

    selectedCategoryText: {
      color: "#D97500",
      fontWeight: "700",
    },

    /* =====================================================
       PRICE
    ===================================================== */

    priceInputContainer: {
      height: 52,

      borderWidth: 1,
      borderColor: "#E8DED5",

      borderRadius: 15,

      backgroundColor: "#FFFFFF",

      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: 17,

      marginBottom: 25,
    },

    currency: {
      color: "#D97500",
      fontSize: 17,
      fontWeight: "700",

      marginRight: 10,
    },

    priceInput: {
      flex: 1,

      height: "100%",

      color: "#171717",
      fontSize: 16,
    },

    /* =====================================================
       AVAILABILITY
    ===================================================== */

    availabilityContainer: {
      minHeight: 79,

      borderWidth: 1,
      borderColor: "#E8DED5",

      borderRadius: 15,

      backgroundColor: "#FFFFFF",

      paddingHorizontal: 20,
      paddingVertical: 14,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    availabilityTitle: {
      color: "#181818",
      fontSize: 16,
      fontWeight: "600",
    },

    availabilitySubtitle: {
      marginTop: 4,

      color: "#A08C80",
      fontSize: 13,
    },

    switch: {
      width: 61,
      height: 32,

      borderRadius: 18,

      justifyContent: "center",
    },

    switchActive: {
      backgroundColor: "#E27A00",
    },

    switchInactive: {
      backgroundColor: "#CFC8C1",
    },

    switchKnob: {
      width: 26,
      height: 26,

      borderRadius: 13,

      backgroundColor: "#FFFFFF",

      position: "absolute",
    },

    switchKnobActive: {
      right: 3,
    },

    switchKnobInactive: {
      left: 3,
    },

    /* =====================================================
       FOOTER
    ===================================================== */

    footer: {
      paddingHorizontal: 30,
      paddingTop: 13,
      paddingBottom: 29,

      flexDirection: "row",
      gap: 15,

      borderTopWidth: 1,
      borderTopColor: "#F1ECE7",

      backgroundColor: "#FFFFFF",
    },

    cancelButton: {
      flex: 1,
      height: 56,

      borderRadius: 15,

      backgroundColor: "#F3F1EF",

      alignItems: "center",
      justifyContent: "center",
    },

    cancelButtonText: {
      color: "#5E5048",
      fontSize: 16,
      fontWeight: "600",
    },

    saveButton: {
      flex: 1,
      height: 56,

      borderRadius: 15,

      backgroundColor: "#E27A00",

      alignItems: "center",
      justifyContent: "center",
    },

    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });