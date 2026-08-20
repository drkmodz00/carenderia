import React from "react";
import { Text, View } from "react-native";

import { successToastStyles as styles } from "@/styles/admin/successToast.styles";

type SuccessToastProps = {
    orderNumber: number;
    visible: boolean;
};

export default function SuccessToast ({
    orderNumber,
    visible,
}: SuccessToastProps) {
    if (!visible) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View  style={styles.iconContainer}>
                <Text style={styles.icon}>
                    ✓
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    Order #(orderNumber) Saved!
                </Text>

                <Text style={styles.message}>
                    Order successfully recorded.
                </Text>
            </View>
        </View>
    )
}