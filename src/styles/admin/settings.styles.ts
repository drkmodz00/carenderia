import { StyleSheet } from "react-native";

import { COLORS } from "@/styles/admin/theme";

import {
  DEVICE,
  FORM,
  PAGE_PADDING,
  CARD_PADDING_HORIZONTAL,
  CARD_PADDING_VERTICAL,
  BUTTON,
  MODAL,
  responsiveFont,
  responsiveSpacing,
  responsiveValue,
} from "../components/admin/responsive";

// =====================================================
// SETTINGS STYLES
// =====================================================

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
    width: "100%",
    alignSelf: "center",

    paddingHorizontal: PAGE_PADDING,
    paddingTop: responsiveSpacing(16),
    paddingBottom: responsiveSpacing(80),

    maxWidth: DEVICE.isLargeTablet
      ? 1400
      : undefined,
  },

  // =====================================================
  // HEADER
  // =====================================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",

    paddingBottom: responsiveSpacing(10),

    backgroundColor: COLORS.panel,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  pageTitle: {
    flex: 1,
    minWidth: 0,

    fontSize: responsiveFont(22),
    lineHeight: responsiveFont(27),

    fontWeight: "800",

    color: COLORS.text,

    letterSpacing: -0.2,
  },

  pageSubtitle: {
    flex: 1,
    minWidth: 0,

    marginTop: 2,

    fontSize: responsiveFont(13),
    lineHeight: responsiveFont(17),

    color: COLORS.muted,
  },

  // =====================================================
  // CARD
  // =====================================================

  card: {
    width: "100%",

    backgroundColor: COLORS.panel,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: responsiveSpacing(15),

    paddingHorizontal:
      CARD_PADDING_HORIZONTAL,

    paddingVertical:
      CARD_PADDING_VERTICAL,

    marginBottom: responsiveSpacing(20),

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.22,
    shadowRadius: 12,

    elevation: 3,
  },

  cardHeader: {
    width: "100%",

    flexDirection: "row",
    alignItems: "flex-start",

    marginBottom: responsiveSpacing(20),
  },

  iconBox: {
    width: responsiveSpacing(42),
    height: responsiveSpacing(42),

    borderRadius: responsiveSpacing(11),

    backgroundColor: COLORS.primaryMuted,

    alignItems: "center",
    justifyContent: "center",

    marginRight: responsiveSpacing(11),

    flexShrink: 0,
  },

  dangerIconBox: {
    backgroundColor: COLORS.dangerBg,
  },

  iconText: {
    fontSize: responsiveFont(18),
  },

  cardHeaderText: {
    flex: 1,
    minWidth: 0,

    paddingTop: 0,
  },

  cardTitle: {
    fontSize: responsiveFont(19),
    lineHeight: responsiveFont(24),

    fontWeight: "800",

    color: COLORS.text,

    flexShrink: 1,
  },

  cardDescription: {
    marginTop: 3,

    fontSize: responsiveFont(14),
    lineHeight: responsiveFont(19),

    color: COLORS.muted,

    flexShrink: 1,
  },

  // =====================================================
  // FORM
  // =====================================================

  formGrid: {
    width: "100%",

    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  inputGroup: {
    width: FORM.columnWidth as `${number}%`,

    marginBottom: responsiveSpacing(16),
  },

  fullInputGroup: {
    width: FORM.fullWidth as `${number}%`,

    marginBottom: responsiveSpacing(16),
  },

  label: {
    fontSize: responsiveFont(13),

    fontWeight: "700",

    color: COLORS.onSurfaceVariant,

    marginBottom: responsiveSpacing(7),

    letterSpacing: 0.3,
  },

  inputLabel: {
    fontSize: responsiveFont(13),

    fontWeight: "700",

    color: COLORS.onSurfaceVariant,

    marginBottom: responsiveSpacing(7),

    letterSpacing: 0.3,
  },

  input: {
    width: "100%",

    height: responsiveSpacing(44),

    borderWidth: 1,
    borderColor: COLORS.borderLight,

    borderRadius: responsiveSpacing(10),

    backgroundColor: COLORS.card,

    paddingHorizontal: responsiveSpacing(12),

    fontSize: responsiveFont(14),

    color: COLORS.text,
  },

  textInput: {
    width: "100%",

    minHeight: responsiveSpacing(44),

    borderWidth: 1,
    borderColor: COLORS.borderLight,

    borderRadius: responsiveSpacing(10),

    backgroundColor: COLORS.card,

    paddingHorizontal: responsiveSpacing(12),

    fontSize: responsiveFont(14),

    color: COLORS.text,
  },

  textArea: {
    width: "100%",

    minHeight: responsiveSpacing(85),

    borderWidth: 1,
    borderColor: COLORS.borderLight,

    borderRadius: responsiveSpacing(10),

    backgroundColor: COLORS.card,

    paddingHorizontal: responsiveSpacing(12),
    paddingTop: responsiveSpacing(12),
    paddingBottom: responsiveSpacing(12),

    fontSize: responsiveFont(14),

    color: COLORS.text,

    textAlignVertical: "top",
  },

  inputText: {
    fontSize: responsiveFont(14),
    color: COLORS.text,
  },

  placeholderText: {
    fontSize: responsiveFont(14),
    color: COLORS.muted,
  },

  multilineInput: {
    minHeight: responsiveSpacing(85),

    height: undefined,

    paddingTop: responsiveSpacing(12),
    paddingBottom: responsiveSpacing(12),

    textAlignVertical: "top",
  },

  verificationInput: {
    letterSpacing: 3,
  },

  // =====================================================
  // SETTINGS ROW
  // =====================================================

  settingRow: {
    width: "100%",

    minHeight: responsiveSpacing(58),

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: responsiveSpacing(9),

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  settingRowLast: {
    borderBottomWidth: 0,
  },

  settingRowText: {
    flex: 1,
    minWidth: 0,

    paddingRight: responsiveSpacing(16),
  },

  settingRowTitle: {
    fontSize: responsiveFont(15),

    fontWeight: "700",

    color: COLORS.text,

    flexShrink: 1,
  },

  settingRowDescription: {
    marginTop: 3,

    fontSize: responsiveFont(13),
    lineHeight: responsiveFont(17),

    color: COLORS.muted,

    flexShrink: 1,
  },

  // =====================================================
  // LEGACY ALIASES
  // =====================================================

  settingText: {
    flex: 1,
    minWidth: 0,

    paddingRight: responsiveSpacing(16),
  },

  settingTitle: {
    fontSize: responsiveFont(15),

    fontWeight: "700",

    color: COLORS.text,

    flexShrink: 1,
  },

  settingDescription: {
    marginTop: 3,

    fontSize: responsiveFont(13),
    lineHeight: responsiveFont(17),

    color: COLORS.muted,

    flexShrink: 1,
  },

  // =====================================================
  // SWITCH
  // =====================================================

  switch: {
    width: responsiveSpacing(48),
    height: responsiveSpacing(29),

    borderRadius: 18,

    backgroundColor: COLORS.border,

    padding: 3,

    justifyContent: "center",

    flexShrink: 0,
  },

  switchActive: {
    backgroundColor: COLORS.primary,
  },

  switchThumb: {
    width: responsiveSpacing(23),
    height: responsiveSpacing(23),

    borderRadius: 14,

    backgroundColor: "#FFFFFF",

    alignSelf: "flex-start",
  },

  switchThumbActive: {
    alignSelf: "flex-end",
  },

  // =====================================================
  // PRINTER
  // =====================================================

  printerStatusBox: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderRadius: responsiveSpacing(10),

    paddingHorizontal: responsiveSpacing(13),
    paddingVertical: responsiveSpacing(11),

    marginBottom: responsiveSpacing(14),
  },

  printerStatusConnected: {
    backgroundColor: COLORS.successBg,
    borderColor: COLORS.success,
  },

  printerStatusDisconnected: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },

  printerStatusError: {
    backgroundColor: COLORS.dangerBg,
    borderColor: COLORS.danger,
  },

  printerStatusDot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    marginRight: 9,

    backgroundColor: COLORS.muted,

    flexShrink: 0,
  },

  printerStatusDotConnected: {
    backgroundColor: COLORS.success,
  },

  printerStatusDotError: {
    backgroundColor: COLORS.danger,
  },

  printerStatusText: {
    flex: 1,
    minWidth: 0,

    fontSize: responsiveFont(14),

    fontWeight: "700",

    color: COLORS.text,
  },

  printerDeviceBox: {
    width: "100%",

    borderWidth: 1,

    borderColor: COLORS.borderLight,

    borderRadius: responsiveSpacing(10),

    backgroundColor: COLORS.card,

    padding: responsiveSpacing(13),

    marginBottom: responsiveSpacing(14),
  },

  printerDeviceHeader: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    minWidth: 0,
  },

  printerDeviceIcon: {
    width: responsiveSpacing(38),
    height: responsiveSpacing(38),

    borderRadius: responsiveSpacing(9),

    backgroundColor: COLORS.primaryMuted,

    alignItems: "center",
    justifyContent: "center",

    marginRight: responsiveSpacing(10),

    flexShrink: 0,
  },

  printerDeviceInfo: {
    flex: 1,
    minWidth: 0,
  },

  printerDeviceName: {
    fontSize: responsiveFont(14),

    fontWeight: "800",

    color: COLORS.text,

    flexShrink: 1,
  },

  printerDeviceAddress: {
    marginTop: 3,

    fontSize: responsiveFont(12),

    color: COLORS.muted,

    flexShrink: 1,
  },

  printerDeviceSelected: {
    borderColor: COLORS.primary,
  },

  printerDeviceSelectedText: {
    color: COLORS.primary,
  },

  printerInfoBox: {
    width: "100%",

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: responsiveSpacing(10),

    backgroundColor: COLORS.card,

    padding: responsiveSpacing(13),

    marginTop: responsiveSpacing(13),

    marginBottom: responsiveSpacing(14),
  },

  printerList: {
    width: "100%",

    marginBottom: responsiveSpacing(14),
  },

  printerListTitle: {
    fontSize: responsiveFont(13),

    fontWeight: "700",

    color: COLORS.onSurfaceVariant,

    marginBottom: responsiveSpacing(8),

    letterSpacing: 0.2,
  },

  printerEmpty: {
    width: "100%",

    borderWidth: 1,

    borderStyle: "dashed",

    borderColor: COLORS.borderLight,

    borderRadius: responsiveSpacing(10),

    padding: responsiveSpacing(15),

    alignItems: "center",

    justifyContent: "center",

    marginBottom: responsiveSpacing(14),
  },

  printerEmptyText: {
    fontSize: responsiveFont(14),

    color: COLORS.muted,

    textAlign: "center",

    lineHeight: responsiveFont(19),

    flexShrink: 1,
  },

  paperWidthRow: {
    width: "100%",

    flexDirection: "row",

    flexWrap: "wrap",

    gap: 9,

    marginBottom: responsiveSpacing(16),
  },

  paperWidthButton: {
    minWidth: responsiveValue(
      82,
      88,
      96
    ),

    minHeight: responsiveSpacing(40),

    paddingHorizontal: responsiveSpacing(15),

    borderRadius: responsiveSpacing(9),

    borderWidth: 1,

    borderColor: COLORS.borderLight,

    backgroundColor: COLORS.card,

    alignItems: "center",

    justifyContent: "center",
  },

  paperWidthButtonActive: {
    backgroundColor: COLORS.primaryMuted,

    borderColor: COLORS.primary,
  },

  paperWidthButtonText: {
    fontSize: responsiveFont(14),

    fontWeight: "700",

    color: COLORS.muted,
  },

  paperWidthButtonTextActive: {
    color: COLORS.primary,
  },

  printerActions: {
    width: "100%",

    flexDirection: "row",

    flexWrap: "wrap",

    gap: 9,

    marginTop: 4,
  },

  // =====================================================
  // OPTIONS
  // =====================================================

  optionRow: {
    width: "100%",

    flexDirection: "row",

    flexWrap: "wrap",

    gap: 9,

    marginTop: 7,

    marginBottom: responsiveSpacing(15),
  },

  optionButton: {
    minHeight: responsiveSpacing(40),

    minWidth: responsiveValue(
      82,
      88,
      96
    ),

    paddingHorizontal: responsiveSpacing(15),

    borderRadius: responsiveSpacing(9),

    borderWidth: 1,

    borderColor: COLORS.borderLight,

    backgroundColor: COLORS.card,

    alignItems: "center",

    justifyContent: "center",
  },

  optionButtonActive: {
    backgroundColor: COLORS.primaryMuted,

    borderColor: COLORS.primary,
  },

  optionText: {
    fontSize: responsiveFont(14),

    fontWeight: "700",

    color: COLORS.muted,
  },

  optionTextActive: {
    color: COLORS.primary,
  },

  optionButtonText: {
    fontSize: responsiveFont(14),

    fontWeight: "700",

    color: COLORS.muted,
  },

  optionButtonTextActive: {
    color: COLORS.primary,
  },

  // =====================================================
  // BUTTONS
  // =====================================================
saveBar: {
  width: "100%",
  paddingHorizontal: PAGE_PADDING,
  paddingTop: responsiveSpacing(12),
  paddingBottom: responsiveSpacing(12),
  backgroundColor: COLORS.panel,
  borderTopWidth: 1,
  borderTopColor: COLORS.border,
},

saveBarButton: {
  width: "100%",
  alignSelf: "stretch",
},
  primaryButton: {
    minHeight: BUTTON.minHeight,

    alignSelf: "flex-start",

    paddingHorizontal: BUTTON.paddingHorizontal,

    borderRadius: responsiveSpacing(9),

    backgroundColor: COLORS.primary,

    alignItems: "center",

    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",

    fontSize: responsiveFont(14),

    fontWeight: "800",

    letterSpacing: 0,
  },

  secondaryButton: {
    minHeight: BUTTON.minHeight,

    paddingHorizontal: BUTTON.paddingHorizontal,

    borderRadius: responsiveSpacing(9),

    backgroundColor: COLORS.cardAlt,

    borderWidth: 1,

    borderColor: COLORS.borderLight,

    alignItems: "center",

    justifyContent: "center",
  },

  secondaryButtonText: {
    color: COLORS.text,

    fontSize: responsiveFont(14),

    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.55,
  },

  dangerButton: {
    minHeight: BUTTON.minHeight,

    alignSelf: "flex-start",

    paddingHorizontal: BUTTON.paddingHorizontal,

    borderRadius: responsiveSpacing(9),

    backgroundColor: COLORS.danger,

    alignItems: "center",

    justifyContent: "center",
  },

  dangerButtonText: {
    color: "#FFFFFF",

    fontSize: responsiveFont(14),

    fontWeight: "800",
  },

  buttonRow: {
    width: "100%",

    flexDirection: "row",

    flexWrap: "wrap",

    alignItems: "center",

    gap: 9,

    marginTop: 4,
  },

  // =====================================================
  // TWO-STEP VERIFICATION
  // =====================================================

  twoFactorStatus: {
    width: "100%",

    minHeight: responsiveSpacing(44),

    borderWidth: 1,

    borderColor: COLORS.success,

    backgroundColor: COLORS.successBg,

    borderRadius: responsiveSpacing(10),

    paddingHorizontal: responsiveSpacing(13),

    paddingVertical: responsiveSpacing(8),

    flexDirection: "row",

    alignItems: "center",

    marginBottom: responsiveSpacing(16),

    flexWrap: "wrap",
  },

  enabledDot: {
    fontSize: responsiveFont(14),

    color: COLORS.success,

    marginRight: 5,
  },

  enabledText: {
    fontSize: responsiveFont(14),

    fontWeight: "800",

    color: COLORS.success,

    marginRight: 10,
  },

  statusDescription: {
    flexShrink: 1,

    fontSize: responsiveFont(14),

    color: COLORS.onSurfaceVariant,
  },

  setupBox: {
    width: "100%",

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: responsiveSpacing(11),

    backgroundColor: COLORS.card,

    padding: responsiveSpacing(17),
  },

  setupTitle: {
    fontSize: responsiveFont(17),

    fontWeight: "800",

    color: COLORS.text,

    marginBottom: 5,
  },

  setupDescription: {
    fontSize: responsiveFont(14),

    lineHeight: responsiveFont(19),

    color: COLORS.muted,

    marginBottom: responsiveSpacing(14),

    flexShrink: 1,
  },

  codeRow: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    flexWrap: "wrap",

    gap: 12,
  },

  codeBox: {
    minWidth: responsiveValue(
      135,
      145,
      158
    ),

    height: responsiveSpacing(48),

    borderWidth: 1,

    borderColor: COLORS.borderLight,

    backgroundColor: COLORS.panel,

    borderRadius: responsiveSpacing(10),

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: responsiveSpacing(12),
  },

  codeText: {
    fontSize: responsiveFont(22),

    fontWeight: "800",

    letterSpacing: 5,

    color: COLORS.text,
  },

  // =====================================================
  // STATUS
  // =====================================================

  statusRow: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    minHeight: responsiveSpacing(38),

    paddingVertical: responsiveSpacing(6),

    borderBottomWidth: 1,

    borderBottomColor: COLORS.border,
  },

  statusLabel: {
    flex: 1,

    minWidth: 0,

    paddingRight: responsiveSpacing(10),

    fontSize: responsiveFont(14),

    fontWeight: "700",

    color: COLORS.onSurfaceVariant,
  },

  statusValue: {
    fontSize: responsiveFont(14),

    fontWeight: "800",

    color: COLORS.text,

    flexShrink: 0,
  },

  onlineStatus: {
    color: COLORS.success,
  },

  offlineStatus: {
    color: COLORS.muted,
  },

  // =====================================================
  // DANGER / WARNING
  // =====================================================

  dangerCard: {
    borderColor: COLORS.danger,
  },

  warningBox: {
    width: "100%",

    flexDirection: "row",

    flexWrap: "wrap",

    alignItems: "center",

    backgroundColor: COLORS.warningBg,

    borderWidth: 1,

    borderColor: COLORS.warning,

    borderRadius: responsiveSpacing(10),

    paddingHorizontal: responsiveSpacing(13),

    paddingVertical: responsiveSpacing(11),

    marginBottom: responsiveSpacing(14),
  },

  warningText: {
    fontSize: responsiveFont(14),

    fontWeight: "800",

    color: COLORS.warning,

    marginRight: 4,
  },

  warningDescription: {
    flexShrink: 1,

    fontSize: responsiveFont(14),

    color: COLORS.onSurfaceVariant,
  },

  // =====================================================
  // LOGOUT / VERSION
  // =====================================================

  logoutButton: {
    width: "100%",

    minHeight: responsiveSpacing(42),

    borderWidth: 1,

    borderColor: COLORS.borderLight,

    borderRadius: responsiveSpacing(9),

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: COLORS.card,

    marginTop: 0,
  },

  logoutText: {
    fontSize: responsiveFont(14),

    fontWeight: "700",

    color: COLORS.onSurfaceVariant,
  },

  version: {
    textAlign: "center",

    marginTop: responsiveSpacing(14),

    fontSize: responsiveFont(12),

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

    padding: responsiveSpacing(16),
  },

  modalBackdrop: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.75)",

    alignItems: "center",

    justifyContent: "center",

    padding: responsiveSpacing(16),
  },

  modalCard: {
    width: "100%",

    maxWidth: MODAL.maxWidth,

    maxHeight: "90%",

    backgroundColor: COLORS.panel,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: MODAL.borderRadius,

    padding: MODAL.padding,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.35,

    shadowRadius: 20,

    elevation: 10,
  },

  modalHeader: {
    width: "100%",

    marginBottom: responsiveSpacing(14),
  },

  modalTitle: {
    fontSize: responsiveFont(20),

    fontWeight: "800",

    color: COLORS.text,

    marginBottom: 6,

    flexShrink: 1,
  },

  modalDescription: {
    fontSize: responsiveFont(14),

    lineHeight: responsiveFont(20),

    color: COLORS.muted,

    marginBottom: responsiveSpacing(18),

    flexShrink: 1,
  },

  modalInputGroup: {
    width: "100%",

    marginBottom: responsiveSpacing(13),
  },

  authNote: {
    width: "100%",

    backgroundColor: COLORS.card,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: responsiveSpacing(10),

    padding: responsiveSpacing(11),

    marginTop: 2,

    marginBottom: responsiveSpacing(12),
  },

  authNoteTitle: {
    fontSize: responsiveFont(14),

    fontWeight: "800",

    color: COLORS.text,

    marginBottom: 2,
  },

  authNoteText: {
    fontSize: responsiveFont(13),

    color: COLORS.muted,

    flexShrink: 1,
  },

  errorBox: {
    width: "100%",

    backgroundColor: COLORS.dangerBg,

    borderWidth: 1,

    borderColor: COLORS.danger,

    borderRadius: responsiveSpacing(10),

    paddingHorizontal: responsiveSpacing(12),

    paddingVertical: responsiveSpacing(10),

    marginBottom: responsiveSpacing(12),
  },

  errorText: {
    fontSize: responsiveFont(14),

    color: COLORS.danger,

    marginBottom: responsiveSpacing(12),

    fontWeight: "600",

    flexShrink: 1,
  },

  modalButtons: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "flex-end",

    alignItems: "center",

    flexWrap: "wrap",

    gap: 9,

    marginTop: 4,
  },

  modalActions: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "flex-end",

    alignItems: "center",

    flexWrap: "wrap",

    gap: 9,

    marginTop: responsiveSpacing(8),
  },

  cancelButton: {
    minHeight: BUTTON.minHeight,

    paddingHorizontal: BUTTON.paddingHorizontal,

    borderRadius: responsiveSpacing(9),

    backgroundColor: COLORS.card,

    borderWidth: 1,

    borderColor: COLORS.borderLight,

    alignItems: "center",

    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: responsiveFont(14),

    fontWeight: "700",

    color: COLORS.text,
  },

  verifyButton: {
    alignSelf: "auto",
  },

  bottomSpacer: {
    height: 24,
  },

  loadingContainer: {
    flex: 1,

    backgroundColor: COLORS.bg,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: PAGE_PADDING,
  },

  loadingText: {
    marginTop: 10,

    fontSize: responsiveFont(14),

    color: COLORS.muted,
  },
});