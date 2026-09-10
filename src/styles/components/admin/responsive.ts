import {
  Dimensions,
  PixelRatio,
  ScaledSize,
} from "react-native";

// =====================================================
// TYPES
// =====================================================

export type ResponsiveValue<T> = {
  phone: T;
  tablet: T;
  desktop: T;
};

// =====================================================
// SCREEN
// =====================================================

const getWindow = () => Dimensions.get("window");

export const SCREEN = {
  get width() {
    return getWindow().width;
  },

  get height() {
    return getWindow().height;
  },
};

// =====================================================
// BREAKPOINTS
// =====================================================

export const BREAKPOINTS = {
  smallPhone: 360,
  phone: 600,

  // Tablet
  tablet: 768,

  // Large tablet
  largeTablet: 1024,

  // Desktop
  desktop: 1200,

  // Large desktop
  largeDesktop: 1440,
};

// =====================================================
// DEVICE
// =====================================================

export const getDevice = (screenWidth?: number) => {
  const width = screenWidth ?? SCREEN.width;

  return {
    isSmallPhone: width < BREAKPOINTS.smallPhone,

    isPhone: width < BREAKPOINTS.tablet,

    isTablet:
      width >= BREAKPOINTS.tablet &&
      width < BREAKPOINTS.largeTablet,

    isLargeTablet:
      width >= BREAKPOINTS.largeTablet &&
      width < BREAKPOINTS.desktop,

    isDesktop:
      width >= BREAKPOINTS.desktop,

    isLargeDesktop:
      width >= BREAKPOINTS.largeDesktop,
  };
};

// Backwards-compatible device object
export const DEVICE = {
  get isSmallPhone() {
    return getDevice().isSmallPhone;
  },

  get isPhone() {
    return getDevice().isPhone;
  },

  get isTablet() {
    return getDevice().isTablet;
  },

  get isLargeTablet() {
    return getDevice().isLargeTablet;
  },

  get isDesktop() {
    return getDevice().isDesktop;
  },

  get isLargeDesktop() {
    return getDevice().isLargeDesktop;
  },
};

// =====================================================
// WIDTH
// =====================================================

export const responsiveWidth = (
  percentage: number,
  screenWidth?: number
) => {
  const width = screenWidth ?? SCREEN.width;

  return width * (percentage / 100);
};

// =====================================================
// HEIGHT
// =====================================================

export const responsiveHeight = (
  percentage: number,
  screenHeight?: number
) => {
  const height = screenHeight ?? SCREEN.height;

  return height * (percentage / 100);
};

// =====================================================
// RESPONSIVE FONT
// =====================================================

export const responsiveFont = (
  size: number,
  screenWidth?: number
) => {
  const width = screenWidth ?? SCREEN.width;

  const scale = width / 375;

  const scaledSize = size * scale;

  // Don't allow text to become ridiculously
  // large on tablets/desktops.
  const minimum = size * 0.85;
  const maximum = size * 1.12;

  const clampedSize = Math.max(
    minimum,
    Math.min(scaledSize, maximum)
  );

  return Math.round(
    PixelRatio.roundToNearestPixel(clampedSize)
  );
};

// =====================================================
// RESPONSIVE SPACING
// =====================================================

export const responsiveSpacing = (
  size: number,
  screenWidth?: number
) => {
  const device = getDevice(screenWidth);

  if (device.isSmallPhone) {
    return size * 0.75;
  }

  if (device.isPhone) {
    return size;
  }

  if (device.isTablet) {
    return size * 1.05;
  }

  if (device.isLargeTablet) {
    return size * 1.1;
  }

  return size * 1.15;
};

// =====================================================
// RESPONSIVE VALUE
// =====================================================

export const responsiveValue = <T>(
  phoneValue: T,
  tabletValue: T,
  desktopValue?: T
): T => {
  const device = getDevice();

  if (device.isPhone || device.isSmallPhone) {
    return phoneValue;
  }

  if (device.isTablet) {
    return tabletValue;
  }

  return desktopValue ?? tabletValue;
};

// =====================================================
// RESPONSIVE NUMBER
// =====================================================

/**
 * Use for numbers only.
 *
 * Example:
 *
 * responsiveNumber(16, 24, 32)
 */

export const responsiveNumber = (
  phoneValue: number,
  tabletValue: number,
  desktopValue?: number
): number => {
  const device = getDevice();

  if (device.isPhone || device.isSmallPhone) {
    return phoneValue;
  }

  if (device.isTablet) {
    return tabletValue;
  }

  return desktopValue ?? tabletValue;
};

// =====================================================
// RESPONSIVE BOOLEAN
// =====================================================

export const responsiveBoolean = (
  phoneValue: boolean,
  tabletValue: boolean,
  desktopValue?: boolean
) => {
  const device = getDevice();

  if (device.isPhone || device.isSmallPhone) {
    return phoneValue;
  }

  if (device.isTablet) {
    return tabletValue;
  }

  return desktopValue ?? tabletValue;
};

// =====================================================
// PAGE PADDING
// =====================================================

export const PAGE_PADDING = responsiveNumber(
  16,
  24,
  32
);

// =====================================================
// CARD PADDING
// =====================================================

export const CARD_PADDING_HORIZONTAL = responsiveNumber(
  16,
  22,
  26
);

export const CARD_PADDING_VERTICAL = responsiveNumber(
  18,
  22,
  26
);

// =====================================================
// FONT SIZE
// =====================================================

export const FONT_SIZE = {
  xs: responsiveFont(11),

  sm: responsiveFont(12),

  md: responsiveFont(14),

  lg: responsiveFont(16),

  xl: responsiveFont(18),

  // Normal page title
  title: responsiveFont(20),

  // Card title
  cardTitle: responsiveFont(21),

  // Modal title
  modalTitle: responsiveFont(21),
};

// =====================================================
// FORM
// =====================================================

export const FORM = {
  columnWidth: responsiveValue(
    "100%",
    "48.5%",
    "48.5%"
  ),

  fullWidth: "100%" as const,
};

// =====================================================
// BUTTON
// =====================================================

export const BUTTON = {
  minHeight: responsiveNumber(
    42,
    44,
    44
  ),

  paddingHorizontal: responsiveNumber(
    14,
    18,
    20
  ),
};

// =====================================================
// MODAL
// =====================================================

export const MODAL = {
  width: "100%" as const,

  maxWidth: 520,

  maxHeight: "90%" as const,

  padding: responsiveNumber(
    16,
    22,
    26
  ),

  borderRadius: responsiveNumber(
    14,
    16,
    18
  ),
};

// =====================================================
// CONTENT WIDTH
// =====================================================

export const CONTENT_MAX_WIDTH = {
  tablet: 1000,
  desktop: 1280,
  largeDesktop: 1440,
};

// =====================================================
// COMMON WIDTHS
// =====================================================

export const RESPONSIVE_WIDTHS = {
  sidebar: responsiveNumber(
    0,
    280,
    300
  ),

  orderPanel: responsiveNumber(
    0,
    320,
    360
  ),

  modal: 520,

  input: responsiveNumber(
    0,
    420,
    460
  ),
};

// =====================================================
// GRID
// =====================================================

export const GRID = {
  columns: responsiveNumber(
    2,
    3,
    4
  ),

  gap: responsiveNumber(
    10,
    14,
    18
  ),

  cardRadius: responsiveNumber(
    10,
    12,
    14
  ),
};

// =====================================================
// SAFE CONTENT
// =====================================================

export const CONTENT = {
  paddingHorizontal: PAGE_PADDING,

  paddingTop: responsiveSpacing(16),

  paddingBottom: responsiveSpacing(90),

  width: "100%" as const,

  maxWidth: responsiveValue(
    undefined,
    CONTENT_MAX_WIDTH.tablet,
    CONTENT_MAX_WIDTH.desktop
  ),
};

// =====================================================
// WINDOW CHANGE HELPER
// =====================================================

export const getResponsiveDimensions = (
  dimensions: ScaledSize
) => {
  const device = getDevice(dimensions.width);

  return {
    width: dimensions.width,
    height: dimensions.height,
    ...device,
  };
};
