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

type NavItem = {
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

const navItems: NavItem[] = [
  {
    label: "POS",
    route: "/admin/orders",
    icon: "▣",
  },
  {
    label: "History",
    route: "/admin/history",
    icon: "◷",
  },
  {
    label: "Sales",
    route: "/admin/sales",
    icon: "▥",
  },
  {
    label: "Menu",
    route: "/admin/menu",
    icon: "♜",
  },
  {
    label: "Settings",
    route: "/admin/settings",
    icon: "⚙",
  },
];

export default function AdminBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (
    route: NavItem["route"]
  ) => {
    if (pathname === route) {
      return;
    }

    router.push(route);
  };

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive =
          pathname === item.route;

        return (
          <Pressable
            key={item.label}
            onPress={() =>
              handleNavigation(item.route)
            }
            style={styles.bottomNavItem}
          >
            <Text
              style={[
                styles.bottomNavIcon,
                isActive &&
                  styles.bottomNavIconActive,
              ]}
            >
              {item.icon}
            </Text>

            <Text
              style={[
                styles.bottomNavText,
                isActive &&
                  styles.bottomNavTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}