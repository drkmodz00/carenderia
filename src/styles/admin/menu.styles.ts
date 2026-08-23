import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  /* =====================================================
     HEADER
  ===================================================== */

  orangeHeader: {
    height: 74,
    backgroundColor: "#F45B00",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  itemCount: {
    color: "#FFE6D5",
    fontSize: 12,
    marginTop: 2,
  },

  addButton: {
    height: 38,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#EF813E",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* =====================================================
     ADD FORM
  ===================================================== */

  addForm: {
    backgroundColor: "#FFF8EF",
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1D5BF",
  },

  addFormTitle: {
    color: "#E95500",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 9,
  },

  addInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  addIconBox: {
    width: 48,
    height: 40,
    borderWidth: 1,
    borderColor: "#E3DDD8",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  addFoodIcon: {
    fontSize: 20,
  },

  addNameInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#E3DDD8",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    color: "#222222",
    fontSize: 12,
  },

  addPriceBox: {
    width: 64,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3DDD8",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
  },

  pricePrefix: {
    color: "#777777",
    fontSize: 12,
  },

  addPriceInput: {
    flex: 1,
    padding: 0,
    color: "#222222",
    fontSize: 12,
  },

  /* =====================================================
     CATEGORY
  ===================================================== */

  categoryList: {
    gap: 6,
    paddingVertical: 8,
  },

  categoryButton: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#EAE6E3",
    justifyContent: "center",
    alignItems: "center",
  },

  categoryButtonActive: {
    backgroundColor: "#F45B00",
  },

  categoryText: {
    color: "#756D68",
    fontSize: 11,
  },

  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* =====================================================
     FORM BUTTONS
  ===================================================== */

  formActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },

  cancelButton: {
    flex: 0.4,
    height: 38,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: "#555555",
    fontSize: 12,
    fontWeight: "500",
  },

  saveButton: {
    flex: 1,
    height: 38,
    borderRadius: 9,
    backgroundColor: "#F45B00",
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  /* =====================================================
     SCROLL
  ===================================================== */

  menuScroll: {
    flex: 1,
  },

  menuContent: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
  },

  /* =====================================================
     SECTION
  ===================================================== */

  section: {
    marginBottom: 9,
  },

  sectionTitle: {
    color: "#776B63",
    fontSize: 12,
    fontWeight: "500",
    marginHorizontal: 4,
    marginBottom: 7,
  },

  /* =====================================================
     MENU CARD
  ===================================================== */

  menuCard: {
    minHeight: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    marginBottom: 7,
    paddingHorizontal: 9,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,

    elevation: 1,
  },

  menuCardUnavailable: {
    opacity: 0.65,
  },

  /* =====================================================
     FOOD ICON
  ===================================================== */

  foodIconBox: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: "#FFF8F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  foodIcon: {
    fontSize: 20,
  },

  /* =====================================================
     FOOD INFO
  ===================================================== */

  menuInfo: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },

  foodName: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "600",
  },

  unavailableText: {
    color: "#999999",
  },

  foodPrice: {
    color: "#F45B00",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },

  /* =====================================================
     ACTIONS
  ===================================================== */

  menuActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 6,
  },

  /* =====================================================
     ON / OFF
  ===================================================== */

  statusButton: {
    minWidth: 34,
    height: 30,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
  },

  statusOn: {
    backgroundColor: "#F0FFF6",
    borderWidth: 1,
    borderColor: "#5BDE92",
  },

  statusOff: {
    backgroundColor: "#FFF2F2",
    borderWidth: 1,
    borderColor: "#FFAAAA",
  },

  statusText: {
    fontSize: 9,
    fontWeight: "700",
  },

  statusOnText: {
    color: "#18B957",
  },

  statusOffText: {
    color: "#E64A4A",
  },

  /* =====================================================
     EDIT
  ===================================================== */

  editButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFF7F0",
    alignItems: "center",
    justifyContent: "center",
  },

  editIcon: {
    color: "#F45B00",
    fontSize: 18,
    fontWeight: "600",
  },

  /* =====================================================
     SAVE EDIT
  ===================================================== */

  saveEditButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F45B00",
    alignItems: "center",
    justifyContent: "center",
  },

  saveEditIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  /* =====================================================
     DELETE
  ===================================================== */

  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFF3F3",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteIcon: {
    fontSize: 14,
    color: "#E53935",
  },

  /* =====================================================
     INLINE EDIT
  ===================================================== */

  editInfo: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 3,
    justifyContent: "center",
  },

  inlineEditName: {
    height: 30,
    borderWidth: 1,
    borderColor: "#F45B00",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    color: "#222222",
    fontSize: 11,
    marginBottom: 3,
  },

  inlinePriceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pesoSymbol: {
    color: "#F45B00",
    fontSize: 11,
    marginRight: 2,
  },

  inlineEditPrice: {
    width: 55,
    height: 23,
    padding: 0,
    color: "#F45B00",
    fontSize: 11,
  },

  /* =====================================================
     BOTTOM
  ===================================================== */

  bottomSpacer: {
    height: 20,
  },
});
