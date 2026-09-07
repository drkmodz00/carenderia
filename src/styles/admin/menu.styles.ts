import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const menuStyles = StyleSheet.create({
  // =========================
  // SCREEN
  // =========================

  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.muted,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingBottom: 14,

    backgroundColor: COLORS.panel,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
  },

  headerDate: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    paddingHorizontal: 14,
    paddingVertical: 9,

    borderRadius: 10,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },

  refreshText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.65,
  },

  // =========================
  // GCASH
  // =========================

  paymentQrRow: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 16,
    marginTop: 14,

    minHeight: 72,
    paddingHorizontal: 13,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 16,
  },

  paymentQrThumbWrap: {
    width: 48,
    height: 48,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    backgroundColor: COLORS.cardAlt,

    borderRadius: 12,

    overflow: "hidden",
  },

  paymentQrThumb: {
    width: "100%",
    height: "100%",
  },

  paymentQrThumbIcon: {
    fontSize: 20,
    color: COLORS.mutedLight,
  },

  paymentQrInfo: {
    flex: 1,
    minWidth: 0,
  },

  paymentQrTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  paymentQrSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: COLORS.muted,
  },

  paymentQrChevron: {
    marginLeft: 8,
    fontSize: 22,
    color: COLORS.mutedLight,
  },

  // =========================
  // PAYMENT MODAL
  // =========================

  paymentBackdrop: {
    flex: 1,
    justifyContent: "flex-end",

    backgroundColor: "rgba(0,0,0,0.68)",
  },

  paymentSheet: {
    maxHeight: "88%",

    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 24,

    backgroundColor: COLORS.panel,

    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 12,
  },

  paymentTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.text,
  },

  paymentCloseIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: COLORS.muted,
  },

  paymentScrollContent: {
    paddingBottom: 8,
  },

  paymentLabel: {
    marginTop: 14,
    marginBottom: 8,

    fontSize: 13,
    fontWeight: "700",
    color: COLORS.onSurfaceVariant,
  },

  qrPickerBox: {
    width: 170,
    height: 170,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderStyle: "dashed",

    borderRadius: 18,

    overflow: "hidden",
  },

  qrImage: {
    width: "100%",
    height: "100%",
  },

  qrEmpty: {
    alignItems: "center",
    gap: 6,
  },

  qrEmptyIcon: {
    fontSize: 30,
    color: COLORS.mutedLight,
  },

  qrEmptyText: {
    fontSize: 12,
    color: COLORS.muted,
  },

  paymentInput: {
    minHeight: 46,

    paddingHorizontal: 14,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.borderLight,

    borderRadius: 12,

    fontSize: 14,
    color: COLORS.text,
  },

  paymentActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  paymentButton: {
    flex: 1,

    minHeight: 46,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 13,
  },

  removeButton: {
    backgroundColor: COLORS.dangerBg,
    borderWidth: 1,
    borderColor: COLORS.dangerBg,
  },

  removeButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.danger,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
  },

  saveButtonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },

  saveButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  paymentHint: {
    marginTop: 8,
    marginBottom: 18,

    fontSize: 12,
    lineHeight: 18,

    color: COLORS.muted,
  },

  // =========================
  // CATEGORIES
  // =========================

  categoryList: {
    marginHorizontal: 16,
    marginTop: 14,

    maxHeight: 58,

    backgroundColor: COLORS.panel,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 15,
  },

  categoryListContent: {
    flexGrow: 1,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 9,
    paddingVertical: 8,

    gap: 8,
  },

  categoryButton: {
    height: 38,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 15,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.borderLight,

    borderRadius: 10,
  },

  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  categoryButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
  },

  categoryButtonTextActive: {
    color: COLORS.text,
    fontWeight: "700",
  },

  // =========================
  // MENU LIST
  // =========================

  menuListContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 120,

    gap: 10,
  },

  // =========================
  // MENU CARD
  // =========================

  card: {
    flexDirection: "row",

    padding: 11,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 17,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,

    elevation: 2,
  },

  cardUnavailable: {
    opacity: 0.52,
  },

  // =========================
  // FOOD IMAGE
  // =========================

  thumbWrap: {
    width: 82,
    height: 82,

    marginRight: 13,

    backgroundColor: COLORS.cardAlt,

    borderRadius: 13,

    overflow: "hidden",
  },

  thumb: {
    width: "100%",
    height: "100%",
  },

  thumbFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  thumbFallbackIcon: {
    fontSize: 28,
  },

  unavailableBadge: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    paddingVertical: 4,

    backgroundColor: "rgba(52,58,52,0.9)",
  },

  unavailableBadgeText: {
    textAlign: "center",

    fontSize: 9,
    fontWeight: "700",

    color: COLORS.text,

    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // =========================
  // CARD CONTENT
  // =========================

  cardBody: {
    flex: 1,
    minWidth: 0,

    justifyContent: "space-between",
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemName: {
    flex: 1,

    marginRight: 8,

    fontSize: 16,
    fontWeight: "700",

    color: COLORS.text,
  },

  textMuted: {
    color: COLORS.muted,
  },

  // =========================
  // CATEGORY PILL
  // =========================

  categoryPill: {
    alignSelf: "flex-start",

    maxWidth: "70%",

    marginTop: 6,

    paddingHorizontal: 9,
    paddingVertical: 4,

    backgroundColor: COLORS.primaryMuted,

    borderWidth: 1,
    borderColor: "rgba(51,147,102,0.18)",

    borderRadius: 7,
  },

  categoryPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
  },

  // =========================
  // CARD FOOTER
  // =========================

  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 8,
  },

  itemPrice: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.primary,
  },

  cardActions: {
    flexDirection: "row",
    gap: 7,
  },

  iconButton: {
    width: 32,
    height: 32,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: COLORS.cardAlt,

    borderWidth: 1,
    borderColor: COLORS.borderLight,

    borderRadius: 9,
  },

  iconButtonText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },

  iconButtonDanger: {
    backgroundColor: COLORS.dangerBg,
    borderColor: COLORS.dangerBg,
  },

  iconButtonDangerText: {
    fontSize: 14,
    color: COLORS.danger,
  },

  // =========================
  // TOGGLE
  // =========================

  toggle: {
    width: 42,
    height: 24,

    justifyContent: "center",

    padding: 2,

    borderRadius: 999,
  },

  toggleOn: {
    alignItems: "flex-end",
    backgroundColor: COLORS.success,
  },

  toggleOff: {
    alignItems: "flex-start",
    backgroundColor: COLORS.mutedLight,
  },

  toggleKnob: {
    width: 20,
    height: 20,

    backgroundColor: COLORS.card,

    borderRadius: 999,
  },

  toggleKnobOn: {},

  toggleKnobOff: {},

  // =========================
  // EMPTY STATE
  // =========================

  emptyState: {
    alignItems: "center",

    paddingTop: 65,
    paddingHorizontal: 20,
  },

  emptyStateIcon: {
    marginBottom: 10,
    fontSize: 38,
  },

  emptyStateText: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.muted,
  },

  // =========================
  // FLOATING ADD BUTTON
  // =========================

  fab: {
    position: "absolute",

    right: 18,
    bottom: 78,

    width: 54,
    height: 54,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: COLORS.primary,

    borderRadius: 27,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 7,

    elevation: 5,
  },

  fabDisabled: {
    backgroundColor: COLORS.primaryDisabled,

    shadowOpacity: 0,
    elevation: 0,
  },

  fabIcon: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "400",
    color: COLORS.text,
  },
});