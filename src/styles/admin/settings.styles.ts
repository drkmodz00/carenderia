import { StyleSheet } from "react-native";

const ORANGE = "#E47A00";

export const settingStyles = StyleSheet.create({

  /* =========================================================
     PAGE
  ========================================================= */

  page: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAF9F7",
  },

  container: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },

  content: {
    padding: 32,
    paddingBottom: 60,
  },

  /* =========================================================
     HEADER
  ========================================================= */

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#9B8675",
  },

  /* =========================================================
     COLUMNS
  ========================================================= */

  columns: {
    flexDirection: "row",
    gap: 24,
    alignItems: "flex-start",
  },

  leftColumn: {
    flex: 1,
  },

  rightColumn: {
    flex: 1,
    gap: 24,
  },

  /* =========================================================
     CARD
  ========================================================= */

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9E0D7",
    borderRadius: 20,
    padding: 30,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 24,
  },

  /* =========================================================
     INPUT
  ========================================================= */

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#9B8675",
    marginBottom: 9,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E8DFD6",
    borderRadius: 15,
    backgroundColor: "#FBFAF8",
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#111111",
  },

  disabledInput: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E8DFD6",
    borderRadius: 15,
    backgroundColor: "#FBFAF8",
    paddingHorizontal: 18,
    justifyContent: "center",
  },

  disabledInputText: {
    fontSize: 16,
    color: "#111111",
  },

  /* =========================================================
     PRIMARY BUTTON
  ========================================================= */

  primaryButton: {
    alignSelf: "flex-start",
    backgroundColor: ORANGE,
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 4,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  /* =========================================================
     DATA MANAGEMENT
  ========================================================= */

  managementButton: {
    height: 53,
    borderWidth: 1,
    borderColor: "#E8DFD6",
    borderRadius: 15,
    backgroundColor: "#FBFAF8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  managementIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  managementText: {
    fontSize: 16,
    color: "#55483F",
    fontWeight: "600",
  },

  /* =========================================================
     DANGER BUTTON
  ========================================================= */

  dangerButton: {
    height: 53,
    borderWidth: 1,
    borderColor: "#FFB8B8",
    borderRadius: 15,
    backgroundColor: "#FFF1F1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  dangerIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  dangerText: {
    fontSize: 16,
    color: "#C72D2D",
    fontWeight: "600",
  },

  /* =========================================================
     VERSION
  ========================================================= */

  versionCard: {
    backgroundColor: "#FFFBEA",
    borderWidth: 1,
    borderColor: "#F2CF55",
    borderRadius: 20,
    padding: 26,
  },

  versionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#C46A00",
    marginBottom: 8,
  },

  versionName: {
    fontSize: 16,
    color: "#B75F00",
    marginBottom: 8,
  },

  versionDate: {
    fontSize: 14,
    color: "#C47B31",
  },
  /* =========================================================
     TOAST
  ========================================================= */

  toast: {
    position: "absolute",
    top: 25,
    right: 30,

    minWidth: 330,
    maxWidth: 420,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingVertical: 15,
    paddingHorizontal: 16,

    zIndex: 9999,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    elevation: 10,
  },

  toastSuccess: {
    borderLeftWidth: 4,
    borderLeftColor: "#2E9B5B",
  },

  toastError: {
    borderLeftWidth: 4,
    borderLeftColor: "#D64545",
  },

  toastIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  toastIconSuccess: {
    backgroundColor: "#E4F6EB",
  },

  toastIconError: {
    backgroundColor: "#FCE5E5",
  },

  toastIconText: {
    fontSize: 18,
    fontWeight: "800",
  },

  toastContent: {
    flex: 1,
  },

  toastTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 3,
  },

  toastMessage: {
    fontSize: 13,
    color: "#806F60",
    lineHeight: 18,
  },
});