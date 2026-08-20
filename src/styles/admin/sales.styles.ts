import { StyleSheet } from "react-native";

const ORANGE = "#E47A00";

export const salesStyles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAF9F7",
  },

  container: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },

  content: {
    padding: 32,
    paddingBottom: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 34,
  },

  headerSmall: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#A28770",
  },

  periodContainer: {
    flexDirection: "row",
    gap: 10,
  },

  periodButton: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E7DED4",
    backgroundColor: "#FFFFFF",
  },

  periodButtonActive: {
    backgroundColor: ORANGE,
    borderColor: ORANGE,
  },

  periodText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#433A33",
  },

  periodTextActive: {
    color: "#FFFFFF",
  },

  /* SUMMARY */

  summaryGrid: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },

  summaryGridSmall: {
    flexDirection: "column",
  },

  card: {
    flex: 1,
    minHeight: 156,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9E0D7",
    borderRadius: 20,
    padding: 24,
    justifyContent: "center",
  },

  cardLabel: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#9B8675",
    marginBottom: 20,
  },

  salesValue: {
    fontSize: 34,
    fontWeight: "800",
    color: ORANGE,
  },

  numberValue: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111111",
  },

  bestItem: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 5,
  },

  smallText: {
    fontSize: 14,
    color: "#9B8675",
  },

  /* CHARTS */

  chartRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 26,
  },

  chartRowSmall: {
    flexDirection: "column",
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9E0D7",
    borderRadius: 20,
    padding: 26,
  },

  hourChartCard: {
    flex: 2,
    minHeight: 365,
  },

  donutCard: {
    flex: 1,
    minHeight: 365,
  },

  fullWidthCard: {
    width: "100%",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 24,
  },

  /* BAR CHART */

  barChart: {
    flexDirection: "row",
    height: 270,
  },

  yAxis: {
    width: 55,
    height: 225,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 8,
  },

  axisText: {
    fontSize: 11,
    color: "#A98F79",
  },

  barsContainer: {
    flex: 1,
    height: 270,
    position: "relative",
  },

  gridLineContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 225,
    justifyContent: "space-between",
  },

  gridLine: {
    borderTopWidth: 1,
    borderColor: "#EDE5DD",
    borderStyle: "dashed",
  },

  bars: {
    height: 270,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },

  barColumn: {
    height: 270,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },

  bar: {
    width: "65%",
    minWidth: 10,
    backgroundColor: ORANGE,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  hourLabel: {
    fontSize: 11,
    color: "#9B8675",
    marginTop: 9,
  },

  tooltip: {
    position: "absolute",
    bottom: 85,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minWidth: 110,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },

  tooltipHour: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 5,
  },

  tooltipSales: {
    fontSize: 12,
    color: ORANGE,
    fontWeight: "600",
  },

  /* DONUT */

  donutWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 5,
  },

  donutCenter: {
    position: "absolute",
    alignItems: "center",
  },

  donutTotal: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111111",
  },

  donutLabel: {
    fontSize: 12,
    color: "#9B8675",
    marginTop: 2,
  },

  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },

  legendText: {
    fontSize: 11,
    color: "#8F725A",
  },

  /* TABLE */

  tableCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9E0D7",
    borderRadius: 20,
    padding: 26,
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  actionButtons: {
    flexDirection: "row",
    gap: 9,
  },

  actionButton: {
    backgroundColor: "#FFF3C9",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  actionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C46700",
  },

  table: {
    minWidth: 850,
  },

  tableRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8DFD6",
    paddingBottom: 12,
  },

  tableHeaderText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9B8675",
    letterSpacing: 0.8,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#F0E9E2",
  },

  rankColumn: {
    width: 90,
  },

  itemColumn: {
    width: 280,
  },

  quantityColumn: {
    width: 180,
  },

  revenueColumn: {
    width: 200,
  },

  percentColumn: {
    width: 190,
  },

  rankCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: ORANGE,
    justifyContent: "center",
    alignItems: "center",
  },

  rankText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },

  tableValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111111",
  },

  percentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  progressBackground: {
    width: 100,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#E8E1D8",
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: ORANGE,
    borderRadius: 10,
  },

  percentText: {
    fontSize: 13,
    color: "#9B8675",
  },
    emptyChart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 220,
    },

    emptyTable: {
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
    },

    emptyText: {
    fontSize: 14,
    color: "#9B8675",
    },
});