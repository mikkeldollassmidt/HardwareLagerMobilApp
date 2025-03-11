import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Icons from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";  // Import useRouter hook

const Action = ({ iconLibrary, iconName, title, routePath }) => {
    const [showLoginPage, setShowLoginPage] = useState(false); // State to control rendering LoginPage

    const router = useRouter(); // Initialize router

    const IconComponent = Icons[iconLibrary] || Icons.Feather;

    const showImage = title !== "Log ud";

    const route = "/" + routePath;

    // Handle Log Out
    const handleLogout = async () => {
        try {
            // Clear user-related data from AsyncStorage
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("fullname");

            // Reset the app and reroute to login page
            router.replace("/login");  // Redirect to the login page
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <View style={styles.actionContainer}>
            <TouchableOpacity
                onPress={title === "Log ud" ? handleLogout : () => router.push(route)}
                style={styles.actionBox}
            >
                <IconComponent style={styles.icon} name={iconName} size={20} />
                <Text style={styles.title}>{title}</Text>

                {showImage && (
                    <Image
                        source={require("../../assets/icons/Dropdown.webp")}
                        style={styles.directIcon}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    actionBox: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    icon: {
        color: "#08B6CF",
        backgroundColor: "#D0F6FC",
        padding: 8,
        borderRadius: 7,
        marginRight: 15,
    },
    title: {
        fontWeight: "700",
        fontSize: 17,
        color: "#363636",
    },
    directIcon: {
        height: 13,
        width: 13,
        transform: [{ rotate: "-90deg" }],
        position: "absolute",
        right: 0,
    },
    // Styling for the overlay
    overlayContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",  // Optional: Semi-transparent background
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999, // Ensures it sits on top of all other components
    },
});

export default Action;
