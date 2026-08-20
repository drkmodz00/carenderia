import { StyleSheet } from "react-native";

const ORANGE = "#E47A00";

export const loginStyles = StyleSheet.create({
  /* ============================================
     PAGE
  ============================================ */

  page: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  loginContainer: {
    width: "100%",
    maxWidth: 460,
    alignItems: "center",
  },

  /* ============================================
     LOGO
  ============================================ */

  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: ORANGE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
  },

  /* ============================================
     BRAND
  ============================================ */

  brandName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111111",
  },

  brandSubtitle: {
    fontSize: 14,
    color: "#9B8675",
    marginTop: 3,
    marginBottom: 28,
  },

  /* ============================================
     CARD
  ============================================ */

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9E0D7",
    borderRadius: 20,
    padding: 30,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 14,
    color: "#9B8675",
    marginBottom: 26,
  },

  /* ============================================
     ERROR
  ============================================ */

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FFBABA",
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginBottom: 20,
  },

  errorIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#D64545",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "800",
    marginRight: 9,
  },

  errorText: {
    flex: 1,
    color: "#B82F2F",
    fontSize: 13,
    fontWeight: "600",
  },

  /* ============================================
     INPUTS
  ============================================ */

  inputGroup: {
    marginBottom: 19,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#9B8675",
    marginBottom: 8,
  },

  input: {
    height: 53,
    borderWidth: 1,
    borderColor: "#E8DFD6",
    borderRadius: 14,
    backgroundColor: "#FBFAF8",
    paddingHorizontal: 17,
    fontSize: 16,
    color: "#111111",
  },

  /* ============================================
     PASSWORD
  ============================================ */

  passwordContainer: {
    height: 53,
    borderWidth: 1,
    borderColor: "#E8DFD6",
    borderRadius: 14,
    backgroundColor: "#FBFAF8",
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 17,
    fontSize: 16,
    color: "#111111",
  },

  showButton: {
    paddingHorizontal: 15,
  },

  showButtonText: {
    color: ORANGE,
    fontSize: 13,
    fontWeight: "700",
  },

  /* ============================================
     LOGIN BUTTON
  ============================================ */

  loginButton: {
    height: 53,
    backgroundColor: ORANGE,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  /* ============================================
     DEMO ACCOUNT
  ============================================ */

  demoBox: {
    marginTop: 22,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFF9E9",
    borderWidth: 1,
    borderColor: "#F3D98B",
  },

  demoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#B96800",
    marginBottom: 5,
  },

  demoText: {
    fontSize: 12,
    color: "#8D6B46",
    marginTop: 2,
  },

  /* ============================================
     FOOTER
  ============================================ */

  footer: {
    marginTop: 22,
    fontSize: 12,
    color: "#A98F79",
  },
});