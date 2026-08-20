import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import { sidebarStyles as styles } from "@/styles/components/admin/sidebar.styles";

const menuItems = [
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

  return (
    <View style={styles.sidebar}>
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
              onPress={() => router.push(item.route as any)}
              style={[
                styles.menuItem,
                isActive && styles.menuItemActive,
              ]}
            >

              <Text
                style={[
                  styles.menuIcon,
                  isActive && styles.menuIconActive,
                ]}
              >
                {item.icon}
              </Text>

              <Text
                style={[
                  styles.menuText,
                  isActive && styles.menuTextActive,
                ]}
              >
                {item.label}
              </Text>

            </Pressable>
          );

        })}

      </View>

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
          onPress={() => {
            // Add logout logic later
            console.log("Logout");
          }}
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


