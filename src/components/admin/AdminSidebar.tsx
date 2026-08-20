import React from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";
import {
  usePathname,
  useRouter,
} from "expo-router";

import {
  sidebarStyles as styles,
} from "@/styles/components/admin/sidebar.styles";

type MenuItem = {
  label: string;
  route:
    | "/admin"
    | "/admin/orders"
    | "/admin/history"
    | "/admin/menu"
    | "/admin/sales"
    | "/admin/settings";
  icon: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    route: "/admin",
    icon: "▦",
  },
  {
    label: "New Order",
    route: "/admin/orders",
    icon: "▤",
  },
  {
    label: "Order History",
    route: "/admin/history",
    icon: "◷",
  },
  {
    label: "Menu Management",
    route: "/admin/menu",
    icon: "☰",
  },
  {
    label: "Sales Report",
    route: "/admin/sales",
    icon: "▥",
  },
  {
    label: "Settings",
    route: "/admin/settings",
    icon: "⚙",
  },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const handlelogout = () => {
    router.replace("/login")
  }

  const handleNavigation = (route: MenuItem["route"]) => {
    // Don't navigate if we're already on the page.
    if (pathname === route) {
      return;
    }

    router.push(route);
  };

  return (
    <View style={styles.sidebar}>

      {/* ==========================================
          BRAND
      ========================================== */}

      <View style={styles.brand}>

        <View style={styles.logo}>
          <Text style={styles.logoText}>
            C
          </Text>
        </View>

        <View>
          <Text style={styles.brandName}>
            Carenderia
          </Text>

          <Text style={styles.brandSubtitle}>
            Management System
          </Text>
        </View>

      </View>

      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <View style={styles.navigation}>

        <Text style={styles.menuLabel}>
          MENU
        </Text>

        {menuItems.map((item) => {
          const isActive =
            pathname === item.route;

          return (
            <Pressable
              key={item.label}
              onPress={() =>
                handleNavigation(item.route)
              }
              style={[
                styles.menuItem,
                isActive &&
                  styles.menuItemActive,
              ]}
            >

              <Text
                style={[
                  styles.menuIcon,
                  isActive &&
                    styles.menuIconActive,
                ]}
              >
                {item.icon}
              </Text>

              <Text
                style={[
                  styles.menuText,
                  isActive &&
                    styles.menuTextActive,
                ]}
              >
                {item.label}
              </Text>

            </Pressable>
          );
        })}

      </View>

      {/* ==========================================
          BOTTOM
      ========================================== */}

      <View style={styles.bottomSection}>

        <View style={styles.userContainer}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              A
            </Text>
          </View>

          <View style={styles.userInfo}>

            <Text style={styles.userName}>
              Admin
            </Text>

            <Text style={styles.userRole}>
              Administrator
            </Text>

          </View>

        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={handlelogout}
        >

          <Text style={styles.logoutIcon}>
            ⇥
          </Text>

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </Pressable>

      </View>

    </View>
  );
}