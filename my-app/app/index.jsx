import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt"; // Import the expo-jwt library
import { loginUser } from "../Api_intergration/userApi"; // Adjust path if needed

const LoginPage = () => {
    const router = useRouter(); // Navigation hook

    // State for username & password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [tokenCheckCompleted, setTokenCheckCompleted] = useState(false); // New state to track token check

    // Check for valid token when the component mounts
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("authToken");

            if (token) {
                try {
                    // Decode the JWT to check the expiration date
                    const decodedToken = JWT.decode(token, "ITDepotHardwareLagerSystemH3ProjektApiOgAndreTingZBC2025Til2027"); // Use the same key as the server's signing key

                    const currentTime = Date.now() / 1000; // Get current time in seconds
                    if (decodedToken.exp > currentTime) {
                        // Token is valid
                        router.replace("/(tabs)"); // Redirect to the main tabs if token exists
                    } else {
                        // Token has expired, remove from AsyncStorage
                        await AsyncStorage.removeItem("authToken");
                        await AsyncStorage.removeItem("userId");
                        await AsyncStorage.removeItem("fullname");
                        Alert.alert("Session Expired", "Your session has expired. Please log in again.");
                    }
                } catch (error) {
                    // If the token is invalid, just clear it from storage
                    console.error("Invalid token or error decoding", error);
                    await AsyncStorage.removeItem("authToken");
                    await AsyncStorage.removeItem("userId");
                    await AsyncStorage.removeItem("fullname");
                }
            }

            // Mark token check as completed
            setTokenCheckCompleted(true);
        };

        checkToken();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await loginUser(username, password);
            if (response?.token) {
                // Save token, userId, and fullname to AsyncStorage
                await AsyncStorage.setItem("authToken", response.token);
                await AsyncStorage.setItem("userId", response.id.toString()); // Storing userId as string
                await AsyncStorage.setItem("fullname", response.fullname);

                // Navigate to the main tab screen
                router.replace("/(tabs)");
            } else {
                Alert.alert("Login Failed", "Invalid username or password.");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    Alert.alert("Login Failed", "Invalid username or password.");
                } else if (error.response.status === 400) {
                    Alert.alert("Fejl i login", `${error.response.data}`);
                } else {
                    Alert.alert("Error", "An unexpected error occurred. Please try again.");
                }
            } else if (error.request) {
                Alert.alert("Network Error", "No response from the server. Please try again later.");
            } else {
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!tokenCheckCompleted) {
        // Show a loading indicator while checking the token
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
});

export default LoginPage;
