import React, { useState, useEffect, useCallback } from "react";
import { Image, Dimensions } from "react-native";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../Api_intergration/userApi";
import { LinearGradient } from "expo-linear-gradient";
import * as ScreenOrientation from "expo-screen-orientation"; 
import { useFocusEffect } from "@react-navigation/native"; // Detect page focus

const LoginPage = () => {
    const router = useRouter(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [orientation, setOrientation] = useState("portrait");

    // Allow free rotation on login page
    useFocusEffect(
        useCallback(() => {
            const allowRotation = async () => {
                await ScreenOrientation.unlockAsync(); // Allow all orientations
            };
            allowRotation();

            return async () => {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP); // Lock to portrait after leaving
            };
        }, [])
    );

    // Detect screen orientation
    useEffect(() => {
        const updateOrientation = () => {
            const { height, width } = Dimensions.get("window");
            setOrientation(height > width ? "portrait" : "landscape");
        };

        updateOrientation();

        const subscription = Dimensions.addEventListener("change", updateOrientation);

        return () => subscription?.remove();
    }, []);

    const handleSignUp = () => {
        router.push("/emailsignup");
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await loginUser(username, password);
            if (response?.token) {
                await AsyncStorage.setItem("authToken", response.token);
                await AsyncStorage.setItem("userId", response.id.toString());
                await AsyncStorage.setItem("fullname", response.fullname);
                router.replace("/(tabs)");
            } else {
                Alert.alert("Login Failed", "Invalid username or password.");
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, orientation === "landscape" && styles.landscapeContainer]}>
            <Image source={require("../assets/images/itdepot.webp")} style={styles.logo} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Velkommen tilbage!</Text>
                <Text style={styles.subTitle}>Log ind herunder</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, orientation === "landscape" && styles.landscapeInput]}
                    placeholder="Brugernavn"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <View style={styles.adgangskodeContainer}>
                    <TextInput
                        style={[styles.input, orientation === "landscape" && styles.landscapeInput]}
                        placeholder="Adgangskode"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Text style={styles.forgottenText}>Glemt adgangskode</Text>
                </View>
                <TouchableOpacity onPress={handleLogin} disabled={loading} style={[styles.button, loading && styles.buttonDisabled]}>
                    <LinearGradient colors={["#0891DA", "#08D9C4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonContent}>
                        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Log ind"}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.noticeContainer}>
                    <Text style={styles.noticeText}>
                        Ved at oprette eller logge ind på en konto, accepterer du vores{" "}
                        <Text style={styles.b}>Vilkår og Betingelser</Text> samt{" "}
                        <Text style={styles.b}>Privatlivspolitik</Text>
                    </Text>
                </View>
                <Text style={styles.newUserText}>
                    Har du ikke en bruger?{" "}
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.newUser}>Opret bruger</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        backgroundColor: "#F8F9FA",
    },
    landscapeContainer: {
        padding: 15,
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#363636",
    },
    subTitle: {
        textAlign: "center",
        color: "#363636",
        fontWeight: "400",
    },
    inputContainer: {
        width: "100%",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    landscapeInput: {
        width: "50%",
        paddingVertical: 8,
    },
    button: {
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
    },
    buttonContent: {
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        paddingVertical: 12,
        width: "100%",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonDisabled: {
        backgroundColor: "#A9A9A9",
    },
    logo: {
        width: 200,
        height: 51,
        marginBottom: 20,
    },
    adgangskodeContainer: {
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "end",
    },
    forgottenText: {
        marginTop: "-10",
        marginBottom: 21,
        width: "100%",
        textAlign: "right",
        textDecorationLine: "underline",
        fontWeight: "500",
    },
    noticeContainer: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    noticeText: {
        textAlign: "center",
        fontSize: 12,
        color: "#939393",
    },
    b: {
        fontWeight: "600",
        textDecorationLine: "underline",
        color: "#363636",
    },
    newUserText: {
        fontWeight: "700",
        textAlign: "center",
        marginTop: 50,
        color: "#363636",
    },
    newUser: {
        textDecorationLine: "underline",
        color: "#08B6CF",
    },
});

export default LoginPage;
