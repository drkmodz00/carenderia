import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const gcashPaymentModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },

  modal: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: COLORS.panel,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },

  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: COLORS.primaryMuted,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  headerText: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  amountCard: {
    backgroundColor: COLORS.primaryMuted,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 18,
  },

  amountLabel: {
    color: COLORS.muted,
    fontSize: 10.5,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 3,
  },

  amountValue: {
    color: COLORS.primary,
    fontSize: 27,
    fontWeight: "900",
  },

  qrSection: {
    alignItems: "center",
    marginBottom: 16,
  },

  scanTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 11,
  },

  qrContainer: {
    width: 220,
    height: 220,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },

  qrCode: {
    width: 200,
    height: 200,
  },

  instruction: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 11,
    maxWidth: 300,
  },

  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.warningBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.warning,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  statusText: {
    flex: 1,
    color: COLORS.warning,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    marginLeft: 9,
  },

  confirmButton: {
    height: 50,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  confirmButtonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },

  confirmText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },

  cancelButton: {
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
  },
});