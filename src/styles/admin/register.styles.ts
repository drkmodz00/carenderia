import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const registerStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  eyebrow: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 2,
    color: COLORS.primary,
    marginBottom: 10,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 20,
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    color: COLORS.text,
    backgroundColor: COLORS.bg,
  },

  passwordInput: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 10,
    padding: 14,
    marginBottom: 22,
    color: COLORS.text,
    backgroundColor: COLORS.bg,
  },

  roleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
    marginBottom: 8,
  },

  roleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  roleButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.bg,
  },

  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  roleText: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "600",
  },

  roleTextActive: {
    color: COLORS.text,
  },

  registerButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
  },

  registerButtonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },

  registerButtonText: {
    color: COLORS.text,
    textAlign: "center",
    fontWeight: "700",
  },

  loginButton: {
    marginTop: 16,
    padding: 8,
  },

  loginButtonText: {
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 13,
  },
});