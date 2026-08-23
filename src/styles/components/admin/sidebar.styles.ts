import { StyleSheet } from "react-native";

export const sidebarStyles = StyleSheet.create({

  // =====================================
  // SIDEBAR
  // =====================================

  sidebar: {
    width: 240,
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
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
    backgroundColor: "#111827",
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
    color: "#111827",
  },

  brandSubtitle: {
    fontSize: 11,
    color: "#9CA3AF",
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
    color: "#9CA3AF",
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
    backgroundColor: "#111827",
  },

  menuIcon: {
    width: 28,
    fontSize: 17,
    color: "#6B7280",
    textAlign: "center",
  },

  menuIconActive: {
    color: "#FFFFFF",
  },

  menuText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "500",
    color: "#4B5563",
  },

  menuTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },


  // =====================================
  // BOTTOM
  // =====================================

  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
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
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  userInfo: {
    marginLeft: 10,
  },

  userName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  userRole: {
    fontSize: 10,
    color: "#9CA3AF",
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
    color: "#6B7280",
    width: 28,
    textAlign: "center",
  },

  logoutText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#6B7280",
  },
bottomNav: {
  height: 72,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E8E1DA",

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
  color: "#A5A5A5",
  fontSize: 22,
  lineHeight: 25,
},

bottomNavIconActive: {
  color: "#F45B00",
},

bottomNavText: {
  color: "#999999",
  fontSize: 10,
  fontWeight: "600",
  marginTop: 3,
},

bottomNavTextActive: {
  color: "#F45B00",
},
});