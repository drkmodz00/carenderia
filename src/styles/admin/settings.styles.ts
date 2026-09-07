import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const settingStyles = StyleSheet.create({
  // =====================================================
  // SCREEN
  // =====================================================

  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 120,
  },

  // =====================================================
  // HEADER
  // =====================================================

// =====================================================
// HEADER
// =====================================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingBottom: 14,

    backgroundColor: COLORS.panel,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

pageTitle: {
  fontSize: 22,
  fontWeight: "800",
  color: COLORS.text,
  letterSpacing: -0.3,
},

pageSubtitle: {
  marginTop: 3,
  fontSize: 13,
  color: COLORS.muted,
  lineHeight: 18,
},

  // =====================================================
  // CARD
  // =====================================================

  card: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 28,
    paddingVertical: 28,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: COLORS.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  dangerIconBox: {
    backgroundColor: COLORS.dangerBg,
  },

  iconText: {
    fontSize: 22,
  },

  cardHeaderText: {
    flex: 1,
    paddingTop: 0,
  },

  cardTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: COLORS.text,
  },

  cardDescription: {
    marginTop: 3,
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 21,
  },

  // =====================================================
  // FORM
  // =====================================================

  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  inputGroup: {
    width: "48.5%",
    marginBottom: 19,
  },

  label: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.onSurfaceVariant,
    marginBottom: 8,
    letterSpacing: 0.4,
  },

  input: {
    height: 47,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 11,
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
    fontSize: 16,
    color: COLORS.text,
  },

  verificationInput: {
    letterSpacing: 3,
  },

  // =====================================================
  // BUTTONS
  // =====================================================

  primaryButton: {
    minHeight: 44,
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.1,
  },

  secondaryButton: {
    minHeight: 43,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
  },

  disabledButton: {
    opacity: 0.55,
  },

  // =====================================================
  // TWO FACTOR
  // =====================================================

  twoFactorStatus: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.success,
    backgroundColor: COLORS.successBg,
    borderRadius: 11,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  enabledDot: {
    fontSize: 15,
    color: COLORS.success,
    marginRight: 5,
  },

  enabledText: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.success,
    marginRight: 12,
  },

  statusDescription: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
  },

  setupBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    backgroundColor: COLORS.card,
    padding: 20,
  },

  setupTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },

  setupDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.muted,
    marginBottom: 17,
  },

  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  codeBox: {
    minWidth: 164,
    height: 53,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.panel,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  codeText: {
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: 6,
    color: COLORS.text,
  },

  // =====================================================
  // DANGER
  // =====================================================

  dangerCard: {
    borderColor: COLORS.danger,
  },

  warningBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: COLORS.warningBg,
    borderWidth: 1,
    borderColor: COLORS.warning,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 18,
  },

  warningText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.warning,
    marginRight: 4,
  },

  warningDescription: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    flexShrink: 1,
  },

  dangerButton: {
    minHeight: 44,
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: COLORS.danger,
    alignItems: "center",
    justifyContent: "center",
  },

  dangerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  // =====================================================
  // LOGOUT
  // =====================================================

  logoutButton: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    marginTop: 0,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.onSurfaceVariant,
  },

  version: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
    color: COLORS.mutedLight,
  },

  // =====================================================
  // MODAL
  // =====================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 26,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 7,
  },

  modalDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
    marginBottom: 22,
  },

  modalInputGroup: {
    marginBottom: 16,
  },

  authNote: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 13,
    marginTop: 2,
    marginBottom: 14,
  },

  authNoteTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 2,
  },

  authNoteText: {
    fontSize: 13,
    color: COLORS.muted,
  },

  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    marginBottom: 14,
    fontWeight: "600",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },

  cancelButton: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  verifyButton: {
    alignSelf: "auto",
  },

  // =====================================================
  // LOADING
  // =====================================================

  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.muted,
  },
});