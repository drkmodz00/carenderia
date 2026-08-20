import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({

  /* =====================================================
     MAIN LAYOUT
  ===================================================== */

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F7F7F8",
  },

  main: {
    flex: 1,
    minWidth: 0,
  },

  content: {
    padding: 28,
    paddingBottom: 40,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  headingContainer: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#27211D",
  },

  subtitle: {
    fontSize: 12,
    color: "#9A8577",
    marginTop: 5,
  },

  /* =====================================================
     ADD BUTTON
  ===================================================== */

  addButton: {
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#E77D00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 7,
    lineHeight: 20,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  /* =====================================================
     SEARCH
  ===================================================== */

  searchContainer: {
    width: 280,
    height: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8DED6",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 12,
    color: "#302A26",
  },

  /* =====================================================
     TABLE
  ===================================================== */

  tableContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8DED6",
    borderRadius: 16,
    overflow: "hidden",
  },

  tableHeader: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFBFA",
    borderBottomWidth: 1,
    borderBottomColor: "#E8DED6",
  },

  tableRow: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEAE6",
  },

  /* =====================================================
     COLUMNS
  ===================================================== */

  itemColumn: {
    flex: 3,
    paddingHorizontal: 22,
    justifyContent: "center",
    minWidth: 250,
  },

  categoryColumn: {
    flex: 1.45,
    paddingHorizontal: 12,
    justifyContent: "center",
    minWidth: 130,
  },

  priceColumn: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    minWidth: 110,
  },

  statusColumn: {
    flex: 1.4,
    paddingHorizontal: 12,
    justifyContent: "center",
    minWidth: 150,
  },

  actionsColumn: {
    flex: 1.65,
    paddingHorizontal: 18,
    justifyContent: "center",
    minWidth: 180,
  },

  /* =====================================================
     HEADER TEXT
  ===================================================== */

  headerText: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#8D7769",
  },

  /* =====================================================
     ITEM
  ===================================================== */

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 7,
    backgroundColor: "#F3F4F6",
    marginRight: 13,
  },

  itemName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: "#302A26",
  },

  /* =====================================================
     CATEGORY
  ===================================================== */

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#FFF0C7",
    justifyContent: "center",
    alignItems: "center",
  },

  categoryText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#D86F00",
  },

  /* =====================================================
     PRICE
  ===================================================== */

  priceText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#302A26",
  },

  /* =====================================================
     STATUS
  ===================================================== */

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 13,
    height: 25,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  availableBadge: {
    backgroundColor: "#CFF7E5",
  },

  unavailableBadge: {
    backgroundColor: "#F1F2F4",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },

  availableText: {
    color: "#147A52",
  },

  unavailableText: {
    color: "#6B7280",
  },

  /* =====================================================
     ACTIONS
  ===================================================== */

  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  editButton: {
    height: 29,
    paddingHorizontal: 13,
    borderRadius: 8,
    backgroundColor: "#FFF1C8",
    justifyContent: "center",
    alignItems: "center",
  },

  editButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#C96A00",
  },

  deleteButton: {
    height: 29,
    paddingHorizontal: 13,
    borderRadius: 8,
    backgroundColor: "#FFE1E1",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#D14343",
  },

  /* =====================================================
     EMPTY
  ===================================================== */

  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#302A26",
  },

  emptySubtitle: {
    fontSize: 11,
    color: "#9A8577",
    marginTop: 5,
  },
  foodImage: {
  width: 48,
  height: 48,
  borderRadius: 10,
  backgroundColor: "#F3F4F6",
  marginRight: 12,
},

actionButtons: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},
deleteOverlay: {
  position: "absolute",

  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  backgroundColor: "rgba(0, 0, 0, 0.48)",

  alignItems: "center",
  justifyContent: "center",

  paddingHorizontal: 25,

  zIndex: 999,
},

deleteModal: {
  width: "100%",
  maxWidth: 420,

  backgroundColor: "#FFFFFF",

  borderRadius: 18,

  padding: 28,

  alignItems: "center",

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.2,
  shadowRadius: 20,

  elevation: 15,
},

deleteIcon: {
  width: 54,
  height: 54,

  borderRadius: 27,

  backgroundColor: "#FFF0F0",

  alignItems: "center",
  justifyContent: "center",

  marginBottom: 15,
},

deleteIconText: {
  color: "#E53935",

  fontSize: 28,
  fontWeight: "700",
},

deleteTitle: {
  color: "#171717",

  fontSize: 21,
  fontWeight: "700",

  marginBottom: 10,
},

deleteMessage: {
  color: "#6F625B",

  fontSize: 15,

  lineHeight: 22,

  textAlign: "center",

  maxWidth: 340,
},

deleteItemName: {
  color: "#222222",
  fontWeight: "700",
},

deleteWarning: {
  color: "#A18F84",

  fontSize: 13,

  marginTop: 7,

  textAlign: "center",
},

deleteActions: {
  width: "100%",

  flexDirection: "row",

  gap: 12,

  marginTop: 24,
},

deleteCancelButton: {
  flex: 1,

  height: 48,

  borderRadius: 12,

  backgroundColor: "#F3F1EF",

  alignItems: "center",
  justifyContent: "center",
},

deleteCancelText: {
  color: "#5E514A",

  fontSize: 15,
  fontWeight: "600",
},

deleteConfirmButton: {
  flex: 1,

  height: 48,

  borderRadius: 12,

  backgroundColor: "#E53935",

  alignItems: "center",
  justifyContent: "center",
},

deleteConfirmText: {
  color: "#FFFFFF",

  fontSize: 15,
  fontWeight: "700",
},

});

