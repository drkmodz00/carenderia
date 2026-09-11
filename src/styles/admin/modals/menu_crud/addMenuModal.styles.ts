import { StyleSheet } from "react-native";

import { COLORS } from "@/styles/admin/theme";

export const addMenuModalStyles = StyleSheet.create({
  // =====================================================
  // OVERLAY
  // =====================================================

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },

  // =====================================================
  // MODAL
  // =====================================================

  modalContainer: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "92%",
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    overflow: "hidden",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  // =====================================================
  // HEADER
  // =====================================================

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  titleContainer: {
    flex: 1,
    paddingRight: 12,
  },

  modalTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  modalSubtitle: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
  },

  closeText: {
    color: COLORS.muted,
    fontSize: 25,
    fontWeight: "300",
    lineHeight: 28,
  },

  pressed: {
    opacity: 0.65,
  },

  // =====================================================
  // FIELD LABEL
  // =====================================================

  fieldLabel: {
    marginBottom: 8,
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  imageUpload: {
    width: "100%",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    paddingVertical: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderStyle: "dashed",
    borderRadius: 17,
  },

  cameraCircle: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  cameraIcon: {
    fontSize: 26,
  },

  imagePreviewContainer: {
    position: "relative",
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: COLORS.cardAlt,
  },

  imagePreview: {
    width: "100%",
    height: "100%",
  },

  changeImageBadge: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "rgba(15, 17, 21, 0.82)",
  },

  changeImageText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "700",
  },

  uploadTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },

  uploadSubtitle: {
    marginTop: 3,
    color: COLORS.muted,
    fontSize: 11,
  },

  // =====================================================
  // TEXT INPUT
  // =====================================================

  input: {
    height: 48,
    marginBottom: 18,
    paddingHorizontal: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    color: COLORS.text,
    fontSize: 14,
  },

  // =====================================================
  // CATEGORY DROPDOWN
  // =====================================================

  dropdownWrapper: {
    position: "relative",
    zIndex: 10,
    marginBottom: 18,
  },

  dropdown: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
  },

  dropdownActive: {
    borderColor: COLORS.primary,
  },

  dropdownLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  categoryDot: {
    width: 7,
    height: 7,
    marginRight: 9,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },

  dropdownText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },

  dropdownPlaceholder: {
    color: COLORS.muted,
    fontWeight: "400",
  },

  dropdownArrow: {
    marginLeft: 10,
    color: COLORS.muted,
    fontSize: 19,
    lineHeight: 20,
  },

  dropdownMenu: {
    marginTop: 6,
    padding: 5,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 13,
    overflow: "hidden",
  },

  dropdownOption: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 9,
  },

  dropdownOptionActive: {
    backgroundColor: COLORS.primaryMuted,
  },

  dropdownOptionText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: "600",
  },

  dropdownOptionTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  checkIcon: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },

  // =====================================================
  // PRICE
  // =====================================================

  priceInputContainer: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    overflow: "hidden",
  },

  currencyBox: {
    width: 46,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryMuted,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderLight,
  },

  currencySymbol: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "800",
  },

  priceInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    paddingVertical: 0,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },

  // =====================================================
  // FOOTER
  // =====================================================

  footer: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 2,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 13,
  },

  cancelButtonText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    fontWeight: "700",
  },

  saveButton: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 13,
  },

  saveButtonPressed: {
    opacity: 0.8,
  },

  saveButtonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },

  saveButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
  },
});