import { StyleSheet } from "react-native";

export const deleteMenuModalStyles =
  StyleSheet.create({

    /* =====================================================
       OVERLAY
    ===================================================== */

    overlay: {
      flex: 1,

      backgroundColor:
        "rgba(0, 0, 0, 0.48)",

      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: 30,
    },

    /* =====================================================
       MODAL
    ===================================================== */

    modal: {
      width: "100%",
      maxWidth: 430,

      backgroundColor: "#FFFFFF",

      borderRadius: 20,

      paddingHorizontal: 30,
      paddingTop: 30,
      paddingBottom: 28,

      alignItems: "center",

      shadowColor: "#000",

      shadowOffset: {
        width: 0,
        height: 10,
      },

      shadowOpacity: 0.18,
      shadowRadius: 25,

      elevation: 12,

      position: "relative",
    },

    /* =====================================================
       CLOSE
    ===================================================== */

    closeButton: {
      position: "absolute",

      top: 15,
      right: 15,

      width: 38,
      height: 38,

      borderRadius: 14,

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
       ICON
    ===================================================== */

    iconContainer: {
      width: 62,
      height: 62,

      borderRadius: 31,

      backgroundColor: "#FFF0F0",

      alignItems: "center",
      justifyContent: "center",

      marginTop: 8,
      marginBottom: 17,
    },

    iconText: {
      color: "#E53935",

      fontSize: 30,
      fontWeight: "700",
    },

    /* =====================================================
       TITLE
    ===================================================== */

    title: {
      color: "#171717",

      fontSize: 22,
      fontWeight: "700",

      marginBottom: 10,

      textAlign: "center",
    },

    /* =====================================================
       DESCRIPTION
    ===================================================== */

    description: {
      color: "#806F65",

      fontSize: 14,

      lineHeight: 21,

      textAlign: "center",

      maxWidth: 330,
    },

    /* =====================================================
       ITEM
    ===================================================== */

    itemContainer: {
      width: "100%",

      minHeight: 48,

      borderRadius: 12,

      backgroundColor: "#FFF7F2",

      borderWidth: 1,
      borderColor: "#F1DDD1",

      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: 15,

      marginTop: 17,
    },

    itemName: {
      color: "#D93636",

      fontSize: 15,
      fontWeight: "700",

      textAlign: "center",
    },

    /* =====================================================
       WARNING
    ===================================================== */

    warning: {
      color: "#A08D82",

      fontSize: 12.5,

      marginTop: 10,

      textAlign: "center",
    },

    /* =====================================================
       ACTIONS
    ===================================================== */

    actions: {
      width: "100%",

      flexDirection: "row",

      gap: 12,

      marginTop: 25,
    },

    /* =====================================================
       CANCEL
    ===================================================== */

    cancelButton: {
      flex: 1,

      height: 50,

      borderRadius: 13,

      backgroundColor: "#F3F1EF",

      alignItems: "center",
      justifyContent: "center",
    },

    cancelText: {
      color: "#5E514A",

      fontSize: 15,

      fontWeight: "600",
    },

    /* =====================================================
       DELETE
    ===================================================== */

    deleteButton: {
      flex: 1,

      height: 50,

      borderRadius: 13,

      backgroundColor: "#E53935",

      alignItems: "center",
      justifyContent: "center",
    },

    deleteText: {
      color: "#FFFFFF",

      fontSize: 15,

      fontWeight: "700",
    },
  });