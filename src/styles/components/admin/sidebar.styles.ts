import { StyleSheet } from "react-native";
import { COLORS } from "@/styles/admin/theme";

export const sidebarStyles = StyleSheet.create({
  // =====================================
  // SIDEBAR
  // =====================================

  sidebar: {
    width: 240,
    height: "100%",
    backgroundColor: COLORS.panel,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  // =====================================
  // BRAND
  // =====================================

  brand: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 35,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  brandName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  brandSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },

  // =====================================
  // NAVIGATION
  // =====================================

  navigation: {
    flex: 1,
  },

  menuLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.muted,
    marginBottom: 10,
    paddingHorizontal: 10,
    letterSpacing: 1,
  },

  menuItem: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 9,
    marginBottom: 5,
  },

  menuItemActive: {
    backgroundColor: COLORS.primaryMuted,
  },

  menuIcon: {
    width: 28,
    fontSize: 17,
    color: COLORS.muted,
    textAlign: "center",
  },

  menuIconActive: {
    color: COLORS.primary,
  },

  menuText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.onSurfaceVariant,
  },

  menuTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  // =====================================
  // BOTTOM SECTION
  // =====================================

  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.cardAlt,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  userInfo: {
    marginLeft: 10,
  },

  userName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  userRole: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 2,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 8,
  },

  logoutIcon: {
    fontSize: 17,
    color: COLORS.muted,
    width: 28,
    textAlign: "center",
  },

  logoutText: {
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.muted,
  },

  // =====================================
  // MOBILE BOTTOM NAV
  // =====================================

  bottomNav: {
    height: 72,
    backgroundColor: COLORS.panel,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 5,
  },

  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomNavIcon: {
    color: COLORS.mutedLight,
    fontSize: 22,
    lineHeight: 25,
  },

  bottomNavIconActive: {
    color: COLORS.primary,
  },

  bottomNavText: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 3,
  },

  bottomNavTextActive: {
    color: COLORS.primary,
  },
});