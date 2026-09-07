import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const editMenuModalStyles = StyleSheet.create({
  // =====================================================
  // OVERLAY / MODAL
  // =====================================================

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 650,
    maxHeight: "92%",
    backgroundColor: COLORS.panel,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  // =====================================================
  // HEADER
  // =====================================================

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },

  modalTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
  },

  modalSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: COLORS.muted,
    fontSize: 25,
    fontWeight: "300",
    lineHeight: 27,
  },

  // =====================================================
  // FORM LABEL
  // =====================================================

  fieldLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 20,
  },

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  imageUpload: {
    marginHorizontal: 20,
    minHeight: 210,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderStyle: "dashed",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingVertical: 20,
  },

  cameraCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryMuted,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  cameraIcon: {
    fontSize: 30,
  },

  uploadTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },

  uploadSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },

  // =====================================================
  // INPUT
  // =====================================================

  input: {
    height: 56,
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: COLORS.text,
    fontSize: 16,
  },

  // =====================================================
  // CATEGORY DROPDOWN
  // =====================================================

  dropdownWrapper: {
    marginHorizontal: 20,
    position: "relative",
    zIndex: 10,
  },

  dropdown: {
    height: 56,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownText: {
    color: COLORS.text,
    fontSize: 16,
  },

  dropdownArrow: {
    color: COLORS.muted,
    fontSize: 16,
  },

  dropdownMenu: {
    marginTop: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 14,
    overflow: "hidden",
  },

  dropdownOption: {
    minHeight: 48,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    justifyContent: "center",
  },

  dropdownOptionActive: {
    backgroundColor: COLORS.primaryMuted,
  },

  dropdownOptionText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },

  dropdownOptionTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  // =====================================================
  // PRICE
  // =====================================================

  priceInputContainer: {
    height: 56,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 14,
    overflow: "hidden",
  },

  currencySymbol: {
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: "800",
    paddingLeft: 16,
    paddingRight: 10,
  },

  priceInput: {
    flex: 1,
    height: "100%",
    color: COLORS.text,
    fontSize: 16,
    paddingRight: 16,
  },

  // =====================================================
  // FOOTER
  // =====================================================

  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.panel,
  },

  cancelButton: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },

  saveButton: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});