import { StyleSheet } from "react-native";

export const successToastStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 16,
    right: 16,

    width: 270,
    minHeight: 78,

    backgroundColor: "#E77D00",
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

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  icon: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "400",
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
  },
});
