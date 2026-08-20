import { StyleSheet } from "react-native";

export const addMenuModalStyles = StyleSheet.create({

  // ==========================================
  // OVERLAY
  // ==========================================

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.42)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // ==========================================
  // MODAL
  // ==========================================

  modalContainer: {
    width: 500,
    maxWidth: "100%",
    maxHeight: "92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 28,
    paddingTop: 25,
    paddingBottom: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },

  // ==========================================
  // HEADER
  // ==========================================

  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#27211D",
  },

  modalSubtitle: {
    fontSize: 11,
    color: "#A08778",
    marginTop: 5,
  },

  closeButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    fontSize: 23,
    fontWeight: "400",
    color: "#9A8577",
    lineHeight: 25,
  },

  // ==========================================
  // LABEL
  // ==========================================

  fieldLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6F5B4E",
    letterSpacing: 0.8,
    marginBottom: 7,
    marginTop: 15,
  },

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  imageUpload: {
    borderWidth: 1,
    borderColor: "#E6DDD5",
    borderStyle: "dashed",
    borderRadius: 12,
    minHeight: 145,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    backgroundColor: "#FCFAF8",
  },

  cameraCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#F4EBDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  cameraIcon: {
    fontSize: 19,
  },

  uploadTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#302A26",
  },

  uploadSubtitle: {
    fontSize: 10,
    color: "#A08778",
    marginTop: 3,
  },

  imageUrlInput: {
    width: "75%",
    height: 34,
    borderWidth: 1,
    borderColor: "#E2D8D0",
    borderRadius: 7,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 10,
    color: "#302A26",
    backgroundColor: "#FFFFFF",
  },

  previewImage: {
    fontSize: 9,
    color: "#3D9B72",
    marginTop: 5,
  },

  // ==========================================
  // INPUT
  // ==========================================

  input: {
    height: 43,
    borderWidth: 1,
    borderColor: "#E2D8D0",
    borderRadius: 9,
    paddingHorizontal: 12,
    fontSize: 12,
    color: "#302A26",
    backgroundColor: "#FFFFFF",
  },

  // ==========================================
  // CATEGORY DROPDOWN
  // ==========================================

  dropdownWrapper: {
    position: "relative",
    zIndex: 20,
  },

  dropdown: {
    height: 43,
    borderWidth: 1,
    borderColor: "#E2D8D0",
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  dropdownText: {
    fontSize: 12,
    color: "#302A26",
  },

  dropdownArrow: {
    fontSize: 15,
    color: "#806F63",
  },

  dropdownMenu: {
    position: "absolute",
    top: 47,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2D8D0",
    borderRadius: 9,
    overflow: "hidden",
    zIndex: 50,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  dropdownOption: {
    height: 38,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  dropdownOptionActive: {
    backgroundColor: "#FFF4D6",
  },

  dropdownOptionText: {
    fontSize: 11,
    color: "#302A26",
  },

  dropdownOptionTextActive: {
    color: "#D97700",
    fontWeight: "600",
  },

  // ==========================================
  // PRICE
  // ==========================================

  priceInputContainer: {
    height: 43,
    borderWidth: 1,
    borderColor: "#E2D8D0",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  currencySymbol: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6F5B4E",
    paddingLeft: 12,
    paddingRight: 5,
  },

  priceInput: {
    flex: 1,
    height: 42,
    fontSize: 12,
    color: "#302A26",
    paddingHorizontal: 5,
  },

  // ==========================================
  // AVAILABILITY
  // ==========================================

  availabilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    paddingVertical: 4,
  },

  availabilityInfo: {
    flex: 1,
  },

  availabilityTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6F5B4E",
    letterSpacing: 0.8,
  },

  availabilitySubtitle: {
    fontSize: 10,
    color: "#A08778",
    marginTop: 4,
  },

  toggle: {
    width: 45,
    height: 25,
    borderRadius: 14,
    backgroundColor: "#D9D4D0",
    padding: 3,
    justifyContent: "center",
  },

  toggleActive: {
    backgroundColor: "#E77D00",
  },

  toggleKnob: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },

  toggleKnobActive: {
    alignSelf: "flex-end",
  },

  // ==========================================
  // FOOTER
  // ==========================================

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginTop: 25,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#EDE6E0",
  },

  cancelButton: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F2EF",
  },

  cancelButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6F5B4E",
  },

  saveButton: {
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E77D00",
  },

  saveButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },

});