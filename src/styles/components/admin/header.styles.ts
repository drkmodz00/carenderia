import { StyleSheet } from "react-native";

export const headerStyle = StyleSheet.create ({

    header: {
        minHeight: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 28,
        paddingVertical: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    pageTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#9CA3AF",
        marginTop: 4,
    },

    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },

    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        position: "relative",
    },

    notificationIcon: {
        fontSize: 18,
        color: "#374151",
    },

    notificationBadge: {
        position: "absolute",
        top: -2,
        right: -2,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#111827",
        justifyContent: "center",
        alignItems: "center",
    },

    notificationBadgeText: {
        color: "#FFFFFF",
        fontSize: 9,
        fontWeight: "700",
    },

    profile: {
        flexDirection: "row",
        alignItems: "center",
    },

    profileAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 9,
    },

    profileAvatarText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#374151",
    },

    profileName: {
        fontSize: 12,
        fontWeight: "600",
        color: "#111827",
    },

    profileRole: {
        fontSize: 10,
        color: "#9CA3AF",
        marginTop: 2,
    },

});