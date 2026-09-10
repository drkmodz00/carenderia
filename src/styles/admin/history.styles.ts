import { StyleSheet } from "react-native";

import { COLORS as THEME_COLORS } from "./theme";

import {
  BREAKPOINTS,
  responsiveFont,
  responsiveNumber,
  responsiveSpacing,
  SCREEN,
} from "@/styles/components/admin/responsive";

// =====================================================
// COLORS
// =====================================================

export const COLORS = THEME_COLORS;

// =====================================================
// STATUS META
// =====================================================

export const getStatusMeta = (status: string) => {
  const normalized = status.toLowerCase().trim();

  if (normalized === "ongoing") {
    return {
      bg: COLORS.warningBg,
      color: COLORS.warning,
      label: "Ongoing",
      shortLabel: "Ongoing",
    };
  }

  if (normalized === "completed") {
    return {
      bg: COLORS.successBg,
      color: COLORS.success,
      label: "Completed",
      shortLabel: "Done",
    };
  }

  if (normalized === "cancelled") {
    return {
      bg: COLORS.dangerBg,
      color: COLORS.danger,
      label: "Cancelled",
      shortLabel: "Cancelled",
    };
  }

  return {
    bg: COLORS.cardAlt,
    color: COLORS.muted,
    label: status,
    shortLabel: status,
  };
};

// =====================================================
// HISTORY STYLES
// =====================================================

export const createHistoryStyles = (
  isTablet: boolean
) => {
  // ===================================================
  // CURRENT SCREEN WIDTH
  // ===================================================

  const screenWidth = SCREEN.width;

  // ===================================================
  // DEVICE
  // ===================================================

  const isSmallPhone =
    screenWidth < BREAKPOINTS.smallPhone;

  const isPhone =
    screenWidth < BREAKPOINTS.tablet;

  const isLargeTablet =
    screenWidth >= BREAKPOINTS.largeTablet &&
    screenWidth < BREAKPOINTS.desktop;

  const isDesktop =
    screenWidth >= BREAKPOINTS.desktop;

  // ===================================================
  // RESPONSIVE VALUES
  // ===================================================

  const pagePadding = responsiveNumber(
    12,
    24,
    32
  );

  const contentTop = responsiveSpacing(
    14,
    screenWidth
  );

  const contentGap = responsiveSpacing(
    14,
    screenWidth
  );

  const titleSize = responsiveFont(
    19,
    screenWidth
  );

  const subtitleSize = responsiveFont(
    11,
    screenWidth
  );

  const bodySize = responsiveFont(
    12,
    screenWidth
  );

  const smallSize = responsiveFont(
    10,
    screenWidth
  );

  const summaryCardWidth = isPhone
    ? "48.5%"
    : "23.5%";

  // ===================================================
  // SEARCH WIDTH
  // ===================================================

  const searchMinWidth = isSmallPhone
    ? 140
    : isPhone
      ? 160
      : 200;

  // ===================================================
  // FILTER WIDTH
  // ===================================================

  const filterWidth = isSmallPhone
    ? 108
    : isPhone
      ? 118
      : 126;

  // ===================================================
  // TABLE PADDING
  // ===================================================
  //
  // Smaller on phones so the table has more room.
  //

  const tablePadding = isSmallPhone
    ? 5
    : isPhone
      ? 7
      : isTablet
        ? 18
        : 24;

  // ===================================================
  // TABLE COLUMN SIZES
  // ===================================================
  //
  // The mobile table is intentionally compact.
  // The total flex is distributed across the available
  // width so columns stay visible instead of overflowing.
  //

  const columnOrder = isPhone
    ? 0.85
    : 1.3;

  const columnDate = isPhone
    ? 1.05
    : 1.1;

  const columnItems = isPhone
    ? 1.15
    : 1.6;

  const columnType = isPhone
    ? 0.75
    : 1;

  const columnStatus = isPhone
    ? 0.9
    : 1;

  const columnTotal = isPhone
    ? 0.75
    : 0.9;

  const columnAction = isPhone
    ? 0.55
    : 0.8;

  // ===================================================
  // TABLE FONT SIZES
  // ===================================================

  const tableHeaderSize = isSmallPhone
    ? 7.5
    : isPhone
      ? 8
      : 9;

  const tableTextSize = isSmallPhone
    ? 9
    : isPhone
      ? 9.5
      : 12;

  const tableSmallTextSize = isSmallPhone
    ? 8
    : isPhone
      ? 8.5
      : 10;

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

    loadingCard: {
      backgroundColor: COLORS.card,
      borderRadius: responsiveNumber(
        14,
        16,
        18
      ),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: responsiveNumber(
        20,
        24,
        28
      ),
      alignItems: "center",
      gap: 6,
    },

    loadingTitle: {
      color: COLORS.text,
      fontSize: responsiveFont(
        14,
        screenWidth
      ),
      fontWeight: "700",
      marginTop: 8,
    },

    loadingText: {
      color: COLORS.muted,
      fontSize: smallSize,
    },

    scroll: {
      flex: 1,
    },

    pageContent: {
      paddingHorizontal: pagePadding,
      paddingTop: contentTop,
      gap: contentGap,
      paddingBottom: responsiveSpacing(
        20,
        screenWidth
      ),
    },

    pageContentTablet: {
      paddingHorizontal: isDesktop
        ? 32
        : 24,
    },

    // =================================================
    // HEADER
    // =================================================

    header: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },

    headerText: {
      flex: 1,
      minWidth: 0,
    },

    headerTitle: {
      color: COLORS.text,
      fontSize: titleSize,
      lineHeight: titleSize + 4,
      fontWeight: "800",
    },

    headerSubtitle: {
      color: COLORS.muted,
      fontSize: subtitleSize,
      marginTop: 2,
    },

    // =================================================
    // SEARCH + FILTERS
    // =================================================

    controlsRow: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      gap: responsiveNumber(
        8,
        10,
        12
      ),
      zIndex: 50,
    },

    searchCard: {
      flex: 1,
      minWidth: searchMinWidth,
    },

    searchBar: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      height: responsiveNumber(
        42,
        46,
        48
      ),
      borderRadius: responsiveNumber(
        10,
        12,
        14
      ),
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.card,
      paddingHorizontal: responsiveNumber(
        11,
        14,
        16
      ),
    },

    searchInput: {
      flex: 1,
      minWidth: 0,
      color: COLORS.text,
      fontSize: bodySize,
    },

    filterWrapper: {
      width: filterWidth,
      position: "relative",
      zIndex: 10,
    },

    filterWrapperActive: {
      zIndex: 999,
    },

    filterButton: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      height: responsiveNumber(
        42,
        46,
        48
      ),
      borderRadius: responsiveNumber(
        10,
        12,
        14
      ),
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.card,
      paddingHorizontal: responsiveNumber(
        9,
        10,
        12
      ),
    },

    pressed: {
      opacity: 0.7,
    },

    filterText: {
      flex: 1,
      color: COLORS.text,
      fontSize: smallSize,
      fontWeight: "700",
    },

    dropdown: {
      position: "absolute",
      top: responsiveNumber(
        47,
        52,
        54
      ),
      left: 0,
      right: 0,
      backgroundColor: COLORS.card,
      borderRadius: responsiveNumber(
        10,
        12,
        14
      ),
      borderWidth: 1,
      borderColor: COLORS.border,
      overflow: "hidden",
      zIndex: 1000,
      elevation: 16,
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 6,
      },
    },

    dropdownItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: responsiveNumber(
        40,
        42,
        44
      ),
      paddingHorizontal: responsiveNumber(
        10,
        12,
        14
      ),
    },

    dropdownItemActive: {
      backgroundColor: COLORS.primaryMuted,
    },

    dropdownItemPressed: {
      backgroundColor: COLORS.cardAlt,
    },

    dropdownText: {
      color: COLORS.text,
      fontSize: smallSize,
      fontWeight: "600",
    },

    dropdownTextActive: {
      color: COLORS.primary,
      fontWeight: "800",
    },

    // =================================================
    // SUMMARY
    // =================================================

    summaryGrid: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: responsiveNumber(
        9,
        12,
        14
      ),
      zIndex: 1,
    },

    summaryGridMobile: {
      rowGap: responsiveNumber(
        8,
        10,
        12
      ),
    },

    summaryCard: {
      width: summaryCardWidth,
      minHeight: responsiveNumber(
        68,
        76,
        82
      ),
      flexDirection: "row",
      alignItems: "center",
      gap: responsiveNumber(
        8,
        10,
        12
      ),
      backgroundColor: COLORS.card,
      borderRadius: responsiveNumber(
        12,
        14,
        16
      ),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: responsiveNumber(
        11,
        14,
        16
      ),
    },

    summaryIcon: {
      width: responsiveNumber(
        34,
        38,
        42
      ),
      height: responsiveNumber(
        34,
        38,
        42
      ),
      borderRadius: responsiveNumber(
        9,
        10,
        11
      ),
      backgroundColor: COLORS.cardAlt,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },

    summaryIconPrimary: {
      backgroundColor: COLORS.primaryMuted,
    },

    summaryIconSuccess: {
      backgroundColor: COLORS.successBg,
    },

    summaryIconDanger: {
      backgroundColor: COLORS.dangerBg,
    },

    summaryIconWarning: {
      backgroundColor: COLORS.warningBg,
    },

    summaryInfo: {
      flex: 1,
      minWidth: 0,
    },

    summaryLabel: {
      color: COLORS.muted,
      fontSize: responsiveFont(
        10,
        screenWidth
      ),
      fontWeight: "600",
    },

    summaryValue: {
      color: COLORS.text,
      fontSize: responsiveFont(
        16,
        screenWidth
      ),
      fontWeight: "800",
      marginTop: 2,
    },

    // =================================================
    // SECTION HEADING
    // =================================================

    sectionHeading: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1,
    },

    sectionTitle: {
      color: COLORS.text,
      fontSize: responsiveFont(
        15,
        screenWidth
      ),
      fontWeight: "700",
    },

    sectionSubtitle: {
      color: COLORS.muted,
      fontSize: smallSize,
      marginTop: 2,
    },

    clearButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: responsiveNumber(
        8,
        10,
        12
      ),
      paddingVertical: responsiveNumber(
        5,
        6,
        7
      ),
      borderRadius: responsiveNumber(
        7,
        8,
        9
      ),
      backgroundColor: COLORS.cardAlt,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
    },

    clearButtonText: {
      color: COLORS.primary,
      fontSize: smallSize,
      fontWeight: "700",
    },

    // =================================================
    // HISTORY CARD
    // =================================================

    historyCard: {
      width: "100%",
      backgroundColor: COLORS.card,
      borderRadius: responsiveNumber(
        14,
        16,
        18
      ),
      borderWidth: 1,
      borderColor: COLORS.border,
      overflow: "hidden",
      zIndex: 1,
    },

    historyHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: tablePadding,
      paddingVertical: responsiveNumber(
        12,
        14,
        16
      ),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },

    historyTitle: {
      color: COLORS.text,
      fontSize: responsiveFont(
        14,
        screenWidth
      ),
      fontWeight: "700",
    },

    historySubtitle: {
      color: COLORS.muted,
      fontSize: smallSize,
      marginTop: 2,
    },

    orderCountBadge: {
      minWidth: responsiveNumber(
        26,
        28,
        30
      ),
      height: responsiveNumber(
        26,
        28,
        30
      ),
      paddingHorizontal: 8,
      borderRadius: responsiveNumber(
        13,
        14,
        15
      ),
      backgroundColor: COLORS.cardAlt,
      alignItems: "center",
      justifyContent: "center",
    },

    orderCountText: {
      color: COLORS.text,
      fontSize: smallSize,
      fontWeight: "700",
    },

    // =================================================
    // TABLE HEADER
    // =================================================

    tableHeaderRow: {
      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: tablePadding,

      paddingVertical: isPhone
        ? 6
        : responsiveNumber(
            9,
            10,
            11
          ),

      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,
    },

    tableHeaderCell: {
      color: COLORS.textFaint,

      fontSize: tableHeaderSize,

      fontWeight: "700",

      textTransform: "uppercase",

      letterSpacing: isPhone
        ? 0
        : 0.4,
    },

    // =================================================
    // TABLE COLUMNS
    // =================================================
    //
    // These are intentionally smaller on phones.
    //

    colOrder: {
      flex: columnOrder,
      minWidth: 0,
    },

    colDate: {
      flex: columnDate,
      minWidth: 0,
    },

    colItems: {
      flex: columnItems,
      minWidth: 0,
    },

    colType: {
      flex: columnType,
      minWidth: 0,
    },

    colStatus: {
      flex: columnStatus,
      minWidth: 0,
    },

    colTotal: {
      flex: columnTotal,
      minWidth: 0,
    },

    colAction: {
      flex: columnAction,
      minWidth: 0,
      alignItems: "flex-end",
    },

    // =================================================
    // TABLE ROW
    // =================================================

    tableRow: {
      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: tablePadding,

      paddingVertical: isPhone
        ? isSmallPhone
          ? 7
          : 8
        : responsiveNumber(
            10,
            12,
            14
          ),

      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,

      minHeight: isPhone
        ? isSmallPhone
          ? 46
          : 50
        : responsiveNumber(
            54,
            60,
            64
          ),
    },

    // =================================================
    // MOBILE ORDER CARD
    // =================================================

    mobileOrderCard: {
      width: "auto",
      flexWrap: "wrap",

      borderRadius: responsiveNumber(
        10,
        12,
        14
      ),

      marginHorizontal: responsiveNumber(
        8,
        12,
        14
      ),

      marginVertical: responsiveNumber(
        4,
        5,
        6
      ),

      borderWidth: 1,
      borderColor: COLORS.border,

      backgroundColor: COLORS.cardAlt,

      paddingVertical: responsiveNumber(
        10,
        12,
        14
      ),

      paddingHorizontal: responsiveNumber(
        10,
        12,
        14
      ),
    },

    rowPressed: {
      opacity: 0.8,
    },

    // =================================================
    // CELLS
    // =================================================

    cell: {
      paddingRight: isPhone
        ? 3
        : responsiveNumber(
            6,
            8,
            10
          ),

      minWidth: 0,

      flexShrink: 1,
    },

    orderIdText: {
      color: COLORS.text,

      fontSize: tableTextSize,

      fontWeight: "700",

      flexShrink: 1,
    },

    customerText: {
      color: COLORS.muted,

      fontSize: tableSmallTextSize,

      marginTop: 2,

      flexShrink: 1,
    },

    dateText: {
      color: COLORS.text,

      fontSize: tableTextSize,

      fontWeight: "600",

      flexShrink: 1,
    },

    timeText: {
      color: COLORS.muted,

      fontSize: tableSmallTextSize,

      marginTop: 2,

      flexShrink: 1,
    },

    itemsText: {
      color: COLORS.muted,

      fontSize: tableTextSize,

      flexShrink: 1,
    },

    mobileItemsHint: {
      color: COLORS.textFaint,

      fontSize: tableSmallTextSize,

      marginTop: 2,

      flexShrink: 1,
    },

    // =================================================
    // ORDER TYPE BADGE
    // =================================================

    typeBadge: {
      flexDirection: "row",

      alignItems: "center",

      gap: isPhone ? 2 : 4,

      alignSelf: "flex-start",

      paddingHorizontal: isPhone
        ? 4
        : responsiveNumber(
            7,
            8,
            9
          ),

      paddingVertical: isPhone
        ? 2
        : responsiveNumber(
            3,
            3,
            4
          ),

      borderRadius: responsiveNumber(
        5,
        6,
        7
      ),

      backgroundColor: COLORS.cardAlt,

      maxWidth: "100%",
    },

    typeBadgeText: {
      color: COLORS.muted,

      fontSize: isPhone
        ? tableSmallTextSize
        : responsiveFont(
            10,
            screenWidth
          ),

      fontWeight: "600",

      flexShrink: 1,
    },

    // =================================================
    // STATUS
    // =================================================

    statusBadge: {
      alignSelf: "flex-start",

      paddingHorizontal: isPhone
        ? 4
        : responsiveNumber(
            7,
            8,
            9
          ),

      paddingVertical: isPhone
        ? 2
        : responsiveNumber(
            3,
            3,
            4
          ),

      borderRadius: responsiveNumber(
        5,
        6,
        7
      ),

      maxWidth: "100%",
    },

    statusBadgeText: {
      fontSize: isPhone
        ? tableSmallTextSize
        : responsiveFont(
            9.5,
            screenWidth
          ),

      fontWeight: "700",

      flexShrink: 1,
    },

    // =================================================
    // AMOUNT
    // =================================================

    amountText: {
      color: COLORS.text,

      fontSize: tableTextSize,

      fontWeight: "700",

      flexShrink: 1,

      textAlign: "right",
    },

    // =================================================
    // VIEW BUTTON
    // =================================================

    viewButton: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "center",

      gap: isPhone ? 2 : 4,

      alignSelf: "flex-end",

      width: isPhone
        ? isSmallPhone
          ? 27
          : 30
        : undefined,

      minHeight: isPhone
        ? isSmallPhone
          ? 27
          : 30
        : undefined,

      paddingHorizontal: isPhone
        ? 4
        : responsiveNumber(
            8,
            10,
            12
          ),

      paddingVertical: isPhone
        ? 4
        : responsiveNumber(
            5,
            6,
            7
          ),

      borderRadius: responsiveNumber(
        7,
        8,
        9
      ),

      backgroundColor: COLORS.cardAlt,

      borderWidth: 1,

      borderColor: COLORS.borderLight,

      flexShrink: 0,
    },

    viewText: {
      color: COLORS.primary,

      fontSize: isPhone
        ? 8
        : responsiveFont(
            10,
            screenWidth
          ),

      fontWeight: "700",

      flexShrink: 1,
    },

    // =================================================
    // EMPTY
    // =================================================

    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",

      paddingVertical: responsiveNumber(
        40,
        48,
        56
      ),

      gap: 6,
    },

    emptyIconContainer: {
      width: responsiveNumber(
        56,
        64,
        70
      ),

      height: responsiveNumber(
        56,
        64,
        70
      ),

      borderRadius: responsiveNumber(
        28,
        32,
        35
      ),

      backgroundColor: COLORS.cardAlt,

      alignItems: "center",
      justifyContent: "center",

      marginBottom: 4,
    },

    emptyTitle: {
      color: COLORS.text,

      fontSize: responsiveFont(
        13,
        screenWidth
      ),

      fontWeight: "700",
    },

    emptyText: {
      color: COLORS.muted,

      fontSize: bodySize,

      textAlign: "center",

      paddingHorizontal: responsiveNumber(
        20,
        30,
        40
      ),
    },

    clearFiltersButton: {
      marginTop: 12,

      paddingHorizontal: responsiveNumber(
        14,
        16,
        18
      ),

      paddingVertical: responsiveNumber(
        9,
        10,
        11
      ),

      borderRadius: responsiveNumber(
        9,
        10,
        11
      ),

      backgroundColor: COLORS.primary,
    },

    clearFiltersText: {
      color: "#14161A",

      fontSize: responsiveFont(
        12,
        screenWidth
      ),

      fontWeight: "700",
    },

    bottomSpacing: {
      height: responsiveNumber(
        20,
        24,
        30
      ),
    },

    // =================================================
    // CANCEL CONFIRM MODAL
    // =================================================

    modalOverlay: {
      flex: 1,

      backgroundColor:
        "rgba(0,0,0,0.6)",

      justifyContent: "center",

      alignItems: "center",

      padding: responsiveNumber(
        16,
        20,
        24
      ),
    },

    confirmCard: {
      width: "100%",

      maxWidth: isDesktop
        ? 420
        : isLargeTablet
          ? 400
          : 380,

      backgroundColor: COLORS.card,

      borderRadius: responsiveNumber(
        17,
        20,
        22
      ),

      borderWidth: 1,

      borderColor: COLORS.border,

      padding: responsiveNumber(
        20,
        24,
        28
      ),

      alignItems: "center",
    },

    confirmIcon: {
      width: responsiveNumber(
        50,
        56,
        60
      ),

      height: responsiveNumber(
        50,
        56,
        60
      ),

      borderRadius: responsiveNumber(
        25,
        28,
        30
      ),

      backgroundColor: COLORS.dangerBg,

      alignItems: "center",

      justifyContent: "center",

      marginBottom: 12,
    },

    confirmTitle: {
      fontSize: responsiveFont(
        17,
        screenWidth
      ),

      fontWeight: "800",

      color: COLORS.text,

      marginBottom: 8,

      textAlign: "center",
    },

    confirmText: {
      fontSize: bodySize,

      lineHeight: responsiveNumber(
        18,
        20,
        22
      ),

      color: COLORS.muted,

      textAlign: "center",

      marginBottom: 20,
    },

    confirmButtons: {
      flexDirection: "row",

      gap: responsiveNumber(
        8,
        10,
        12
      ),

      width: "100%",
    },

    keepButton: {
      flex: 1,

      height: responsiveNumber(
        42,
        46,
        48
      ),

      borderRadius: responsiveNumber(
        10,
        12,
        13
      ),

      backgroundColor: COLORS.cardAlt,

      borderWidth: 1,

      borderColor: COLORS.borderLight,

      justifyContent: "center",

      alignItems: "center",
    },

    keepButtonText: {
      color: COLORS.text,

      fontSize: responsiveFont(
        12,
        screenWidth
      ),

      fontWeight: "800",
    },

    cancelButton: {
      flex: 1,

      height: responsiveNumber(
        42,
        46,
        48
      ),

      borderRadius: responsiveNumber(
        10,
        12,
        13
      ),

      backgroundColor: COLORS.danger,

      justifyContent: "center",

      alignItems: "center",
    },

    cancelButtonText: {
      color: "#14161A",

      fontSize: responsiveFont(
        12,
        screenWidth
      ),

      fontWeight: "800",
    },

    disabledButton: {
      opacity: 0.5,
    },
  });
};