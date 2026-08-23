import { StyleSheet } from "react-native";

export const settingStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  /* =========================================================
     HEADER
  ========================================================= */

  header: {
    height: 55,
    backgroundColor: "#F45B00",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },

  /* =========================================================
     CONTAINER
  ========================================================= */

  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  content: {
    padding: 14,
    paddingBottom: 25,
  },

  /* =========================================================
     CARD
  ========================================================= */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",

    // Android
    elevation: 2,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  sectionTitle: {
    color: "#9A8E84",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },

  /* =========================================================
     ROWS
  ========================================================= */

  row: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  rowLabel: {
    flex: 1,
    color: "#111111",
    fontSize: 14,
    fontWeight: "400",
    paddingRight: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F3F3",
    marginLeft: 16,
  },

  /* =========================================================
     INPUTS
  ========================================================= */

  valueInput: {
    width: "72%",
    height: 34,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#333333",
    fontSize: 13,
    backgroundColor: "#FFFFFF",
  },

  footerInput: {
    flex: 0.9,
    color: "#777777",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },

  disabledText: {
    color: "#BDBDBD",
  },

  /* =========================================================
     PRINTER / ACCOUNT
  ========================================================= */

  statusText: {
    color: "#999999",
    fontSize: 12,
  },

  accountValue: {
    color: "#777777",
    fontSize: 12,
  },

  /* =========================================================
     LOGOUT
  ========================================================= */

  logoutButton: {
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#FF7777",
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 20,
  },

  logoutButtonPressed: {
    backgroundColor: "#FFE7E7",
  },

  logoutText: {
    color: "#E40000",
    fontSize: 14,
    fontWeight: "600",
  },

  /* =========================================================
     FOOTER
  ========================================================= */

  versionText: {
    color: "#D2C8BF",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
  },
});
