import {
  StyleSheet,
} from "react-native";

export const loginStyles =
  StyleSheet.create({

    /* =================================================
       PAGE
    ================================================= */

    page: {
      flex: 1,
      backgroundColor: "#FFE0B5",
    },

    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      paddingVertical: 30,
    },

    container: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 10,
    },

    /* =================================================
       LOGO
    ================================================= */

    logo: {
      width: 80,
      height: 80,

      borderRadius: 23,

      backgroundColor: "#F45B00",

      alignItems: "center",
      justifyContent: "center",

      marginBottom: 17,

      shadowColor: "#C94A00",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.22,
      shadowRadius: 10,

      elevation: 6,
    },

    logoText: {
      fontSize: 38,
    },

    /* =================================================
       BRAND
    ================================================= */

    brandName: {
      color: "#111111",
      fontSize: 26,
      fontWeight: "800",
      letterSpacing: -0.8,
    },

    brandSubtitle: {
      color: "#987C67",
      fontSize: 13,
      marginTop: 4,
      marginBottom: 34,
    },

    /* =================================================
       CARD
    ================================================= */

    card: {
      width: "100%",
      maxWidth: 430,

      backgroundColor: "#FFFFFF",

      borderRadius: 25,

      paddingHorizontal: 24,
      paddingTop: 27,
      paddingBottom: 25,

      shadowColor: "#A96B37",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.12,
      shadowRadius: 15,

      elevation: 5,
    },

    /* =================================================
       TITLE
    ================================================= */

    title: {
      color: "#151515",
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 23,
    },

    /* =================================================
       INPUT GROUP
    ================================================= */

    inputGroup: {
      width: "100%",
      marginBottom: 17,
    },

    label: {
      color: "#3D3028",
      fontSize: 12,
      fontWeight: "500",
      marginBottom: 8,
    },

    input: {
      width: "100%",
      height: 48,

      borderWidth: 1,
      borderColor: "#E1DDD9",

      borderRadius: 11,

      backgroundColor: "#FCFCFC",

      paddingHorizontal: 14,

      color: "#222222",
      fontSize: 13,
    },

    /* =================================================
       PASSWORD
    ================================================= */

    passwordContainer: {
      width: "100%",
      height: 48,

      flexDirection: "row",
      alignItems: "center",

      borderWidth: 1,
      borderColor: "#E1DDD9",

      borderRadius: 11,

      backgroundColor: "#FCFCFC",
    },

    passwordInput: {
      flex: 1,
      height: "100%",

      paddingHorizontal: 14,

      color: "#222222",
      fontSize: 13,
    },

    showButton: {
      height: "100%",

      paddingHorizontal: 13,

      justifyContent: "center",
      alignItems: "center",
    },

    showButtonText: {
      color: "#F45B00",
      fontSize: 11,
      fontWeight: "700",
    },

    /* =================================================
       LOGIN BUTTON
    ================================================= */

    loginButton: {
      width: "100%",
      height: 52,

      marginTop: 2,

      borderRadius: 12,

      backgroundColor: "#F45B00",

      alignItems: "center",
      justifyContent: "center",

      shadowColor: "#E04D00",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.22,
      shadowRadius: 8,

      elevation: 4,
    },

    loginButtonDisabled: {
      backgroundColor: "#F59A69",
    },

    loginButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "800",
    },

    /* =================================================
       ERROR
    ================================================= */

    errorBox: {
      width: "100%",

      flexDirection: "row",
      alignItems: "center",

      backgroundColor: "#FFF1F1",

      borderWidth: 1,
      borderColor: "#FFD0D0",

      borderRadius: 9,

      paddingHorizontal: 10,
      paddingVertical: 9,

      marginBottom: 15,
    },

    errorIcon: {
      width: 20,
      height: 20,

      borderRadius: 10,

      backgroundColor: "#E53935",

      color: "#FFFFFF",

      textAlign: "center",
      lineHeight: 20,

      fontSize: 12,
      fontWeight: "800",

      marginRight: 8,
    },

    errorText: {
      flex: 1,

      color: "#D32F2F",
      fontSize: 11,
    },

    /* =================================================
       DEMO
    ================================================= */

    demoBox: {
      width: "100%",
      maxWidth: 430,

      marginTop: 15,

      paddingVertical: 11,
      paddingHorizontal: 15,

      borderRadius: 10,

      backgroundColor: "rgba(255,255,255,0.35)",
    },

    demoTitle: {
      color: "#9B765A",
      fontSize: 10,
      fontWeight: "700",
      marginBottom: 3,
    },

    demoText: {
      color: "#A98F79",
      fontSize: 10,
      lineHeight: 16,
    },

    /* =================================================
       FOOTER
    ================================================= */

    footer: {
      color: "#B4967C",

      fontSize: 10,

      marginTop: 16,

      textAlign: "center",
    },
  });
  