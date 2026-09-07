import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const deleteMenuStyles = StyleSheet.create({
  // =====================================================
  // BACKDROP
  // =====================================================

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  // =====================================================
  // MODAL
  // =====================================================

  sheet: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.panel,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 20,
    elevation: 10,
  },

  // =====================================================
  // ICON
  // =====================================================

  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.dangerBg,
    borderWidth: 1,
    borderColor: COLORS.danger,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  iconWrapWarning: {
    backgroundColor: COLORS.warningBg,
    borderColor: COLORS.warning,
  },

  icon: {
    fontSize: 24,
  },

  // =====================================================
  // TEXT
  // =====================================================

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 8,
  },

  message: {
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 20,
  },

  itemName: {
    fontWeight: "700",
    color: COLORS.text,
  },

  // =====================================================
  // ACTIONS
  // =====================================================

  actions: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },

  button: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  // =====================================================
  // CANCEL
  // =====================================================

  cancelButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },

  cancelButtonText: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 14,
  },

  // =====================================================
  // DELETE
  // =====================================================

  deleteButton: {
    backgroundColor: COLORS.danger,
  },

  deleteButtonDisabled: {
    backgroundColor: COLORS.dangerBg,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
  },

  // =====================================================
  // MARK UNAVAILABLE
  // =====================================================

  primaryButton: {
    backgroundColor: COLORS.primary,
  },

  primaryButtonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
  },
});