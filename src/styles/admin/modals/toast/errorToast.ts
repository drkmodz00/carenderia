import { StyleSheet } from "react-native";

export const errorToastStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 16,
    right: 16,

    width: 300,
    minHeight: 82,

    backgroundColor: "#D94A38",
    borderRadius: 18,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 14,

    zIndex: 9999,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 8,
  },

  iconContainer: {
    width: 32,
    height: 32,

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    backgroundColor: "rgba(255,255,255,0.18)",
  },

  icon: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  content: {
    flex: 1,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 3,
  },

  message: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
});
