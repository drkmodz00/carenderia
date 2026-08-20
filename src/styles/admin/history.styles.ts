import { StyleSheet } from "react-native";

export const historyStyles = StyleSheet.create({

  // ==========================================
  // MAIN LAYOUT
  // ==========================================

  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F8",
  },

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F7F7F8",
  },

  main: {
    flex: 1,
    minWidth: 0,
    padding: 0,
  },


  // ==========================================
  // TOP HEADER
  // ==========================================

  topHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    paddingHorizontal: 5,
    paddingTop: 14,
    paddingBottom: 24,
  },

  headingContainer: {
    flex: 1,
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#27211D",
  },

  subtitle: {
    fontSize: 12,
    color: "#8D8178",
    marginTop: 5,
  },


  // ==========================================
  // SEARCH + FILTER CONTROLS
  // ==========================================

  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  searchContainer: {
    width: 220,
    height: 42,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E7DFD7",

    borderRadius: 12,

    justifyContent: "center",

    paddingHorizontal: 15,
  },

  searchInput: {
    flex: 1,

    fontSize: 12,
    color: "#27211D",

    paddingVertical: 0,
  },


  // ==========================================
  // FILTER DROPDOWN
  // ==========================================

  filterWrapper: {
    position: "relative",
    zIndex: 100,
  },

  filterSelect: {
    width: 125,
    height: 42,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E7DFD7",

    borderRadius: 12,

    paddingHorizontal: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  filterSelectText: {
    fontSize: 12,
    color: "#27211D",
  },

  filterArrow: {
    fontSize: 16,
    color: "#27211D",
    marginTop: -3,
  },

  filterMenu: {
    position: "absolute",

    top: 47,
    left: 0,
    right: 0,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E7DFD7",

    borderRadius: 10,

    overflow: "hidden",

    zIndex: 999,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,
  },

  filterOption: {
    height: 38,

    justifyContent: "center",

    paddingHorizontal: 14,
  },

  filterOptionActive: {
    backgroundColor: "#FFF7E6",
  },

  filterOptionText: {
    fontSize: 12,
    color: "#4B4038",
  },

  filterOptionTextActive: {
    color: "#E77D00",
    fontWeight: "600",
  },


  // ==========================================
  // TABLE
  // ==========================================

  tableContainer: {
    flex: 1,

    marginHorizontal: 5,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E7DFD7",

    borderRadius: 15,

    overflow: "hidden",
  },


  // ==========================================
  // TABLE HEADER
  // ==========================================

  tableHeader: {
    height: 44,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FCFBF9",

    borderBottomWidth: 1,
    borderBottomColor: "#E7DFD7",

    paddingHorizontal: 20,
  },

  headerText: {
    fontSize: 10,
    fontWeight: "600",

    color: "#8D8178",

    letterSpacing: 1,
  },


  // ==========================================
  // TABLE ROW
  // ==========================================

  tableRow: {
    minHeight: 57,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#F0EBE6",
  },


  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  orderColumn: {
    width: "10%",
    minWidth: 80,
  },

  dateColumn: {
    width: "13%",
    minWidth: 105,
  },

  timeColumn: {
    width: "10%",
    minWidth: 85,
  },

  itemsColumn: {
    flex: 1,
    minWidth: 240,
    paddingRight: 15,
  },

  totalColumn: {
    width: "10%",
    minWidth: 90,
  },

  staffColumn: {
    width: "9%",
    minWidth: 75,
  },

  statusColumn: {
    width: "12%",
    minWidth: 100,
  },

  actionColumn: {
    width: "8%",
    minWidth: 65,

    alignItems: "flex-start",
  },


  // ==========================================
  // TABLE CELL TEXT
  // ==========================================

  orderNumber: {
    fontSize: 12,
    fontWeight: "600",

    color: "#E77D00",
  },

  cellText: {
    fontSize: 12,
    color: "#4B4038",
  },

  totalText: {
    fontSize: 12,
    fontWeight: "700",

    color: "#27211D",
  },


  // ==========================================
  // STATUS
  // ==========================================

  statusBadge: {
    alignSelf: "flex-start",

    paddingHorizontal: 12,
    paddingVertical: 5,

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },

  completedBadge: {
    backgroundColor: "#D1FAE5",
  },

  voidedBadge: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },

  completedText: {
    color: "#047857",
  },

  voidedText: {
    color: "#B91C1C",
  },


  // ==========================================
  // VIEW BUTTON
  // ==========================================

  viewButton: {
    minWidth: 50,
    height: 29,

    paddingHorizontal: 12,

    borderRadius: 8,

    backgroundColor: "#FFF0BD",

    justifyContent: "center",
    alignItems: "center",
  },

  viewButtonText: {
    fontSize: 10,
    fontWeight: "600",

    color: "#B56A00",
  },


  // ==========================================
  // EMPTY STATE
  // ==========================================

  emptyContainer: {
    minHeight: 350,

    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  emptySubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 5,
  },

  clearButton: {
    marginTop: 15,

    height: 36,

    paddingHorizontal: 16,

    borderRadius: 8,

    backgroundColor: "#E77D00",

    justifyContent: "center",
    alignItems: "center",
  },

  clearButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },

});