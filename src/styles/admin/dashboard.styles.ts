import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({

  // ==========================================
  // MAIN LAYOUT
  // ==========================================

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F7F7F8",
  },

  main: {
    flex: 1,
  },

  content: {
    padding: 28,
    paddingBottom: 50,
  },


  // ==========================================
  // SUMMARY CARDS
  // ==========================================

  cardsContainer: {
    flexDirection: "row",
    gap: 16,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardLabel: {
    fontSize: 13,
    color: "#6B7280",
  },

  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  cardIconText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  cardValue: {
    marginTop: 12,
    fontSize: 25,
    fontWeight: "700",
    color: "#111827",
  },

  cardDescription: {
    marginTop: 7,
    fontSize: 11,
    color: "#9CA3AF",
  },


  // ==========================================
  // ANALYTICS
  // ==========================================

  analyticsRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },

  salesSection: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  bestSellingSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },

  sectionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#9CA3AF",
  },


  // ==========================================
  // SALES CHART
  // ==========================================

  chartArea: {
    height: 230,
    marginTop: 20,
    flexDirection: "row",
  },

  yAxis: {
    width: 50,
    justifyContent: "space-between",
    paddingBottom: 25,
  },

  axisText: {
    fontSize: 9,
    color: "#9CA3AF",
  },

  barsArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
  },

  barWrapper: {
    flex: 1,
    height: 210,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bar: {
    width: "70%",
    backgroundColor: "#111827",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  barLabel: {
    position: "absolute",
    bottom: -20,
    fontSize: 9,
    color: "#9CA3AF",
  },


  // ==========================================
  // BEST SELLING
  // ==========================================

  bestSellingList: {
    marginTop: 14,
  },

  bestSellingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  rank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  rankText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },

  itemQuantity: {
    marginTop: 3,
    fontSize: 10,
    color: "#9CA3AF",
  },

  itemTotal: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },


  // ==========================================
  // RECENT ORDERS
  // ==========================================

  ordersSection: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  ordersHeader: {
    padding: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },


  // ==========================================
  // TABLE
  // ==========================================

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 13,
    backgroundColor: "#F9FAFB",
  },

  tableHeaderText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6B7280",
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  tableText: {
    fontSize: 11,
    color: "#374151",
  },


  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  orderColumn: {
    flex: 1.1,
  },

  timeColumn: {
    flex: 0.9,
  },

  itemsColumn: {
    flex: 2.3,
  },

  totalColumn: {
    flex: 1,
  },

  staffColumn: {
    flex: 1,
  },

  statusColumn: {
    flex: 1.2,
  },


  // ==========================================
  // ORDER STATUS
  // ==========================================

  completedStatus: {
    color: "#15803D",
    backgroundColor: "#DCFCE7",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
  },

  pendingStatus: {
    color: "#B45309",
    backgroundColor: "#FEF3C7",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
  },

});