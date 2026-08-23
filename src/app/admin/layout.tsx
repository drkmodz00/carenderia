import { Stack } from "expo-router";
import { StyleSheet, View, useWindowDimensions } from "react-native";

export default function AdminLayout() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.adminApp,
          isTablet && styles.adminAppTablet,
        ]}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EDEDED",
    alignItems: "center",
  },

  adminApp: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF8EF",
  },

  adminAppTablet: {
    maxWidth: 900,
  },
});
