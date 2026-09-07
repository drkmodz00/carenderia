import { StyleSheet } from "react-native";

export const saveSuccessModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.42)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  modal: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingHorizontal: 28,
    paddingVertical: 30,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },

  icon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#eaf7ed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  iconText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#198754",
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#111827",
    fontFamily: "serif",
    marginBottom: 8,
  },

  message: {
    fontSize: 15,
    lineHeight: 22,
    color: "#71675f",
    textAlign: "center",
    marginBottom: 22,
  },

  button: {
    minWidth: 100,
    height: 43,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: "#f28a00",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
});