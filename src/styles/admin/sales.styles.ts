import { DimensionValue, StyleSheet } from "react-native";

import { COLORS } from "./theme";

import {
  CONTENT_MAX_WIDTH,
  getDevice,
  responsiveFont,
  responsiveSpacing,
} from "@/styles/components/admin/responsive";

export { COLORS };

// =====================================================
// TYPES
// =====================================================

export type SalesResponsiveOptions = {
  width: number;
  height?: number;
};

// =====================================================
// RESPONSIVE VALUES
// =====================================================

const getResponsiveValues = (width: number) => {
  const device = getDevice(width);

  const {
    isSmallPhone,
    isPhone,
    isTablet,
    isLargeTablet,
    isDesktop,
    isLargeDesktop,
  } = device;

  // ===================================================
  // PAGE PADDING
  // ===================================================

  const pagePadding = isSmallPhone
    ? 10
    : isPhone
      ? 14
      : isTablet
        ? 22
        : isLargeTablet
          ? 28
          : isLargeDesktop
            ? 36
            : 32;

  // ===================================================
  // CONTENT MAX WIDTH
  // ===================================================

  const maxContentWidth =
    isLargeDesktop
      ? CONTENT_MAX_WIDTH.largeDesktop
      : isDesktop
        ? CONTENT_MAX_WIDTH.desktop
        : isLargeTablet
          ? CONTENT_MAX_WIDTH.tablet
          : undefined;

  // ===================================================
  // SUMMARY GRID
  // ===================================================

  let summaryColumns = 2;

  if (isSmallPhone) {
    summaryColumns = 1;
  } else if (isPhone) {
    summaryColumns = 2;
  } else if (isTablet) {
    summaryColumns = 2;
  } else {
    summaryColumns = 4;
  }

  const summaryGap = isSmallPhone
    ? 8
    : isPhone
      ? 10
      : isTablet
        ? 14
        : isLargeTablet
          ? 16
          : 18;

  const summaryCardWidth: DimensionValue =
    summaryColumns === 1
      ? "100%"
      : summaryColumns === 2
        ? "48%"
        : "23.5%";

  // ===================================================
  // DASHBOARD
  // ===================================================

  const dashboardGap = isSmallPhone
    ? 10
    : isPhone
      ? 12
      : isTablet
        ? 16
        : isLargeTablet
          ? 18
          : 20;

  const dashboardHorizontal =
    isTablet ||
    isLargeTablet ||
    isDesktop ||
    isLargeDesktop;

  // ===================================================
  // FONT SIZES
  // ===================================================

  const headerTitleSize = isSmallPhone
    ? 17
    : isPhone
      ? 19
      : isTablet
        ? 21
        : isLargeTablet
          ? 22
          : 23;

  const amountSize = isSmallPhone
    ? 16
    : isPhone
      ? 19
      : isTablet
        ? 23
        : isLargeTablet
          ? 25
          : 26;

  // ===================================================
  // CARD PADDING
  // ===================================================

  const cardPadding = isSmallPhone
    ? 10
    : isPhone
      ? 14
      : isTablet
        ? 18
        : isLargeTablet
          ? 22
          : 24;

  // ===================================================
  // CARD RADIUS
  // ===================================================

  const cardRadius = isSmallPhone
    ? 11
    : isPhone
      ? 14
      : 16;

  return {
    isSmallPhone,
    isPhone,
    isTablet,
    isLargeTablet,
    isDesktop,
    isLargeDesktop,

    pagePadding,
    maxContentWidth,

    summaryColumns,
    summaryGap,
    summaryCardWidth,

    dashboardGap,
    dashboardHorizontal,

    headerTitleSize,
    amountSize,

    cardPadding,
    cardRadius,
  };
};

// =====================================================
// SALES STYLES
// =====================================================

export const createSalesStyles = ({
  width,
}: SalesResponsiveOptions) => {
  const r = getResponsiveValues(width);

  return StyleSheet.create({
    // =================================================
    // ROOT
    // =================================================

    page: {
      flex: 1,
      backgroundColor: COLORS.bg,
    },

    centered: {
      justifyContent: "center",
      alignItems: "center",
    },

    loadingText: {
      marginTop: responsiveSpacing(12, width),
      fontSize: responsiveFont(14, width),
      color: COLORS.muted,
    },

    container: {
      flex: 1,
    },

    content: {
      paddingBottom: responsiveSpacing(
        r.isSmallPhone ? 24 : 32,
        width
      ),
    },

    contentInner: {
      width: "100%",

      maxWidth: r.maxContentWidth,

      alignSelf: "center",

      paddingHorizontal: r.pagePadding,

      paddingTop: responsiveSpacing(
        r.isSmallPhone ? 14 : 20,
        width
      ),

      gap: r.dashboardGap,
    },

    // =================================================
    // HEADER
    // =================================================

    header: {
      width: "100%",

      maxWidth: r.maxContentWidth,

      alignSelf: "center",

      paddingHorizontal: r.pagePadding,

      paddingVertical: r.isSmallPhone
        ? 10
        : r.isPhone
          ? 13
          : r.isTablet
            ? 17
            : 20,

      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      gap: r.isSmallPhone ? 7 : 12,

      borderBottomWidth: 1,

      borderBottomColor: COLORS.border,
    },

    headerTitle: {
      flexShrink: 1,

      color: COLORS.text,

      fontSize: r.headerTitleSize,

      fontWeight: "800",
    },

    headerDate: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12,
        width
      ),

      marginTop: 2,

      flexShrink: 1,
    },

    refreshButton: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "center",

      paddingHorizontal: r.isSmallPhone
        ? 8
        : r.isPhone
          ? 11
          : 14,

      paddingVertical: r.isSmallPhone
        ? 7
        : 9,

      borderRadius: r.isSmallPhone ? 8 : 10,

      backgroundColor: COLORS.card,

      borderWidth: 1,

      borderColor: COLORS.borderLight,

      flexShrink: 0,
    },

    pressed: {
      opacity: 0.7,
    },

    refreshText: {
      color: COLORS.text,

      fontSize: responsiveFont(
        r.isSmallPhone ? 11 : 13,
        width
      ),

      fontWeight: "600",
    },

    // =================================================
    // SECTION LABEL
    // =================================================

    sectionLabel: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12,
        width
      ),

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: r.isSmallPhone ? 0.4 : 0.6,

      flexShrink: 1,
    },

    // =================================================
    // SUMMARY GRID
    // =================================================

    summaryGrid: {
      width: "100%",

      flexDirection: "row",

      flexWrap: "wrap",

      justifyContent:
        r.summaryColumns === 1
          ? "flex-start"
          : "space-between",

      gap: r.summaryGap,
    },

    summaryCard: {
      width: r.summaryCardWidth,

      backgroundColor: COLORS.card,

      borderRadius: r.cardRadius,

      borderWidth: 1,

      borderColor: COLORS.border,

      borderLeftWidth: r.isSmallPhone ? 2 : 3,

      padding: r.cardPadding,

      gap: r.isSmallPhone ? 4 : 6,

      minHeight: r.isSmallPhone
        ? 92
        : r.isPhone
          ? 105
          : r.isTablet
            ? 115
            : 120,

      overflow: "hidden",
    },

    salesCard: {
      borderLeftColor: COLORS.primary,
    },

    transactionCard: {
      borderLeftColor: "#5B8DEF",
    },

    averageCard: {
      borderLeftColor: "#B084F5",
    },

    itemsCard: {
      borderLeftColor: COLORS.success,
    },

    summaryTopRow: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      gap: 6,

      minWidth: 0,
    },

    summaryIcon: {
      width: r.isSmallPhone ? 27 : 34,

      height: r.isSmallPhone ? 27 : 34,

      borderRadius: r.isSmallPhone ? 7 : 10,

      backgroundColor: COLORS.cardAlt,

      alignItems: "center",

      justifyContent: "center",

      flexShrink: 0,
    },

    summaryTrend: {
      flexShrink: 1,

      color: COLORS.textFaint,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      letterSpacing: r.isSmallPhone ? 0.2 : 0.5,

      textAlign: "right",
    },

    summaryCardLabel: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12.5,
        width
      ),

      fontWeight: "600",

      flexShrink: 1,
    },

    salesAmount: {
      color: COLORS.text,

      fontSize: r.amountSize,

      fontWeight: "800",

      flexShrink: 1,
    },

    transactionAmount: {
      color: COLORS.text,

      fontSize: r.amountSize,

      fontWeight: "800",

      flexShrink: 1,
    },

    averageAmount: {
      color: COLORS.text,

      fontSize: r.amountSize,

      fontWeight: "800",

      flexShrink: 1,
    },

    itemsAmount: {
      color: COLORS.text,

      fontSize: r.amountSize,

      fontWeight: "800",

      flexShrink: 1,
    },

    summaryCaption: {
      color: COLORS.mutedLight,

      fontSize: responsiveFont(
        r.isSmallPhone ? 9 : 11,
        width
      ),

      flexShrink: 1,
    },

    // =================================================
    // DASHBOARD GRID
    // =================================================

    dashboardGrid: {
      width: "100%",

      flexDirection: r.dashboardHorizontal
        ? "row"
        : "column",

      gap: r.dashboardGap,

      alignItems: "stretch",
    },

    salesWeekCard: {
      flex: r.dashboardHorizontal ? 1 : undefined,

      width: r.dashboardHorizontal
        ? undefined
        : "100%",

      minWidth: 0,

      backgroundColor: COLORS.card,

      borderRadius: r.cardRadius,

      borderWidth: 1,

      borderColor: COLORS.border,

      padding: r.cardPadding,
    },

    topSellingCard: {
      flex: r.dashboardHorizontal ? 1 : undefined,

      width: r.dashboardHorizontal
        ? undefined
        : "100%",

      minWidth: 0,

      backgroundColor: COLORS.card,

      borderRadius: r.cardRadius,

      borderWidth: 1,

      borderColor: COLORS.border,

      padding: r.cardPadding,
    },

    transactionsCard: {
      width: "100%",

      backgroundColor: COLORS.card,

      borderRadius: r.cardRadius,

      borderWidth: 1,

      borderColor: COLORS.border,

      padding: r.cardPadding,

      minWidth: 0,
    },

    // =================================================
    // DASHBOARD CARD HEADER
    // =================================================

    dashboardCardHeader: {
      flexDirection: "row",

      alignItems: "flex-start",

      justifyContent: "space-between",

      marginBottom: r.isSmallPhone
        ? 9
        : r.isPhone
          ? 12
          : 16,

      gap: 8,

      minWidth: 0,
    },

    dashboardCardHeaderText: {
      flex: 1,

      minWidth: 0,

      paddingRight: 5,
    },

    dashboardCardTitle: {
      color: COLORS.text,

      fontSize: responsiveFont(
        r.isSmallPhone ? 13 : 16,
        width
      ),

      fontWeight: "700",

      flexShrink: 1,
    },

    dashboardCardSubtitle: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12,
        width
      ),

      marginTop: 2,

      flexShrink: 1,
    },

    cardHeaderIcon: {
      width: r.isSmallPhone ? 27 : 32,

      height: r.isSmallPhone ? 27 : 32,

      borderRadius: r.isSmallPhone ? 7 : 9,

      backgroundColor: COLORS.cardAlt,

      alignItems: "center",

      justifyContent: "center",

      flexShrink: 0,
    },

    // =================================================
    // WEEK CHART
    // =================================================

    weekContainer: {
      width: "100%",

      gap: r.isSmallPhone ? 7 : 10,
    },

    weekRow: {
      width: "100%",

      flexDirection: "row",

      alignItems: "center",

      gap: r.isSmallPhone ? 5 : 10,

      minWidth: 0,
    },

    dayText: {
      width: r.isSmallPhone ? 22 : 32,

      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12,
        width
      ),

      fontWeight: "600",

      flexShrink: 0,
    },

    progressBackground: {
      flex: 1,

      minWidth: 0,

      height: r.isSmallPhone ? 6 : 8,

      borderRadius: 4,

      backgroundColor: COLORS.borderLight,

      overflow: "hidden",
    },

    progressBar: {
      height: r.isSmallPhone ? 6 : 8,

      borderRadius: 4,

      backgroundColor: COLORS.primary,
    },

    weekAmount: {
      width: r.isSmallPhone ? 52 : 68,

      textAlign: "right",

      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 9 : 12,
        width
      ),

      fontWeight: "600",

      flexShrink: 0,
    },

    // =================================================
    // EMPTY STATE
    // =================================================

    emptyBlock: {
      alignItems: "center",

      justifyContent: "center",

      paddingVertical: r.isSmallPhone
        ? 22
        : r.isPhone
          ? 28
          : 36,

      gap: r.isSmallPhone ? 5 : 8,
    },

    emptyText: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 11 : 13,
        width
      ),

      textAlign: "center",

      flexShrink: 1,
    },

    // =================================================
    // TOP SELLING ITEMS
    // =================================================

    topItemRow: {
      width: "100%",

      flexDirection: "row",

      alignItems: "center",

      paddingVertical: r.isSmallPhone
        ? 6
        : 10,

      borderBottomWidth: 1,

      borderBottomColor: COLORS.border,

      gap: r.isSmallPhone ? 5 : 0,

      minWidth: 0,
    },

    lastRow: {
      borderBottomWidth: 0,
    },

    rankBadge: {
      width: r.isSmallPhone ? 20 : 24,

      height: r.isSmallPhone ? 20 : 24,

      borderRadius: 12,

      alignItems: "center",

      justifyContent: "center",

      flexShrink: 0,
    },

    rankBadgeText: {
      color: "#14161A",

      fontSize: responsiveFont(
        r.isSmallPhone ? 9 : 11,
        width
      ),

      fontWeight: "800",
    },

    topItemInfo: {
      flex: 1,

      minWidth: 0,

      marginHorizontal: r.isSmallPhone
        ? 5
        : 10,

      gap: r.isSmallPhone ? 3 : 5,
    },

    topItemName: {
      color: COLORS.text,

      fontSize: responsiveFont(
        r.isSmallPhone ? 11 : 13,
        width
      ),

      fontWeight: "600",

      flexShrink: 1,
    },

    topItemBarBackground: {
      width: "100%",

      height: r.isSmallPhone ? 5 : 6,

      borderRadius: 3,

      backgroundColor: COLORS.borderLight,

      overflow: "hidden",
    },

    topItemBar: {
      height: r.isSmallPhone ? 5 : 6,

      borderRadius: 3,

      backgroundColor: COLORS.primary,
    },

    topItemStats: {
      alignItems: "flex-end",

      flexShrink: 0,

      maxWidth: r.isSmallPhone
        ? 55
        : 75,
    },

    topItemQuantity: {
      color: COLORS.text,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12,
        width
      ),

      fontWeight: "700",
    },

    topItemRevenue: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 9 : 11,
        width
      ),

      marginTop: 2,
    },

    // =================================================
    // RECENT TRANSACTIONS
    // =================================================

    viewAllButton: {
      flexDirection: "row",

      alignItems: "center",

      gap: 4,

      flexShrink: 0,
    },

    viewAllLink: {
      color: COLORS.primary,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12.5,
        width
      ),

      fontWeight: "600",
    },

    transactionTable: {
      width: "100%",

      marginTop: 4,

      minWidth: 0,
    },

    transactionTableHeader: {
      width: "100%",

      flexDirection: "row",

      alignItems: "center",

      paddingVertical: r.isSmallPhone
        ? 6
        : 8,

      borderBottomWidth: 1,

      borderBottomColor: COLORS.borderLight,

      minWidth: 0,
    },

    tableHeaderTransaction: {
      flex: 2,

      minWidth: 0,

      color: COLORS.textFaint,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: 0.3,
    },

    tableHeaderItems: {
      flex: 1,

      minWidth: 0,

      color: COLORS.textFaint,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: 0.3,
    },

    tableHeaderTime: {
      flex: 1,

      minWidth: 0,

      color: COLORS.textFaint,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: 0.3,
    },

    tableHeaderPayment: {
      flex: 1,

      minWidth: 0,

      color: COLORS.textFaint,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: 0.3,
    },

    tableHeaderAmount: {
      flex: 1,

      minWidth: 0,

      color: COLORS.textFaint,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: 0.3,

      textAlign: "right",
    },

    amountColumn: {
      textAlign: "right",
    },

    // =================================================
    // TRANSACTION ROW
    // =================================================

    transactionTableRow: {
      width: "100%",

      flexDirection: "row",

      alignItems: "center",

      paddingVertical: r.isSmallPhone
        ? 7
        : 12,

      borderBottomWidth: 1,

      borderBottomColor: COLORS.border,

      minWidth: 0,
    },

    lastTransactionRow: {
      borderBottomWidth: 0,
    },

    tableTransaction: {
      flex: 2,

      minWidth: 0,

      flexDirection: "row",

      alignItems: "center",

      gap: r.isSmallPhone ? 4 : 8,
    },

    transactionIcon: {
      width: r.isSmallPhone ? 22 : 28,

      height: r.isSmallPhone ? 22 : 28,

      borderRadius: r.isSmallPhone ? 6 : 8,

      backgroundColor: COLORS.cardAlt,

      alignItems: "center",

      justifyContent: "center",

      flexShrink: 0,
    },

    transactionInfo: {
      flex: 1,

      minWidth: 0,

      gap: 2,
    },

    transactionId: {
      color: COLORS.text,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 12,
        width
      ),

      fontWeight: "700",

      flexShrink: 1,
    },

    transactionDate: {
      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      flexShrink: 1,
    },

    tableCell: {
      flex: 1,

      minWidth: 0,

      color: COLORS.muted,

      fontSize: responsiveFont(
        r.isSmallPhone ? 9 : 12,
        width
      ),

      flexShrink: 1,
    },

    itemsColumn: {
      flex: 1,

      minWidth: 0,
    },

    timeColumn: {
      flex: 1,

      minWidth: 0,
    },

    paymentCell: {
      flex: 1,

      minWidth: 0,
    },

    paymentBadge: {
      alignSelf: "flex-start",

      paddingHorizontal: r.isSmallPhone
        ? 4
        : 8,

      paddingVertical: r.isSmallPhone
        ? 2
        : 3,

      borderRadius: r.isSmallPhone
        ? 5
        : 6,

      maxWidth: "100%",

      flexShrink: 1,
    },

    paidBadge: {
      backgroundColor: COLORS.successBg,
    },

    unpaidBadge: {
      backgroundColor: COLORS.warningBg,
    },

    paidLabel: {
      color: COLORS.success,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      flexShrink: 1,
    },

    unpaidLabel: {
      color: COLORS.warning,

      fontSize: responsiveFont(
        r.isSmallPhone ? 8 : 10,
        width
      ),

      fontWeight: "700",

      flexShrink: 1,
    },

    tableAmount: {
      flex: 1,

      minWidth: 0,

      color: COLORS.text,

      fontSize: responsiveFont(
        r.isSmallPhone ? 10 : 13,
        width
      ),

      fontWeight: "700",

      textAlign: "right",

      flexShrink: 1,
    },
  });
};
