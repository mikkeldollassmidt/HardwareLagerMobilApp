import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { createUser, loginUser } from "../Api_intergration/userApi"; 
import { useLocalSearchParams } from "expo-router";

const SignUp = () => {
    const navigation = useNavigation();
    const router = useRouter(); // Get router to navigate programmatically

    // Manage form state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");  // Local state to store the email
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    const params = useLocalSearchParams();
    const emailFromParams = params.email ? decodeURIComponent(params.email) : "";

    // Set email from params if it's passed
    useEffect(() => {
        if (emailFromParams) {
            setEmail(emailFromParams);
        }
    }, [emailFromParams]);
    // Retrieve email from AsyncStorage
    useEffect(() => {
        const getEmailFromStorage = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem("emailId"); // Get emailId from AsyncStorage
                if (storedEmail !== null) {
                    setEmail(storedEmail); // Set the email state with the retrieved email
                }
            } catch (error) {
                console.error("Error retrieving email from AsyncStorage", error);
            }
        };

        getEmailFromStorage();
    }, []); // Empty array to run only once when the component mounts

    // Handle form submission
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Password mismatch", "Passwords do not match.");
            return;
        }

        const hashedPassword = password; // You can hash this password before sending
        const emailId = await AsyncStorage.getItem("emailId");

        setIsLoading(true);

        try {
            // Call the createUser API with the emailId (converted from email)
            console.log(username, hashedPassword, fullname, emailId);
            await createUser(username, hashedPassword, fullname, emailId);
            Alert.alert("Success", "Account created successfully!");

            // After creating the user, log the user in with the loginUser API
            const loginResponse = await loginUser(username, password);
            if (loginResponse) {
                // Successfully logged in, navigate to the main app (tabs screen)
                await AsyncStorage.clear();
                await AsyncStorage.setItem("authToken", loginResponse.token);
                await AsyncStorage.setItem("userId", loginResponse.id.toString()); // Storing userId as string
                await AsyncStorage.setItem("fullname", loginResponse.fullname);
                
                router.replace("/(tabs)");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/itdepot.webp")}
                style={styles.logo}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Velkommen!</Text>
                <Text style={styles.subTitle}>Opret dig herunder</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputNonTypeable}
                    placeholder="Email"
                    value={emailFromParams} // Displaying the email from AsyncStorage
                    editable={false} // Make the input non-typeable
                />

                <TextInput
                    style={styles.input}
                    placeholder="Brugernavn"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Adgangskode"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bekræft adgangskode"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullname}
                    onChangeText={setFullname}
                />

                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    activeOpacity={0.7}
                    onPress={handleSignUp}
                    disabled={isLoading}
                >
                    <LinearGradient
                        colors={["#0891DA", "#08D9C4"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.buttonContent}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? "Oprettes..." : "Opret dig"}
                        </Text>
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
                    Har du allerede en bruger?{" "}
                    <Text style={styles.newUser}>Log ind</Text>
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
        fontWeight: 400,
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
    inputNonTypeable: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#8a8a8a",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: "#8a8a8a",
        fontWeight: 600,
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
        backgroundColor: "#A9A9A9", // Disabled state color
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
        fontWeight: 500,
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
        fontWeight: 600,
        textDecorationLine: "underline",
        color: "#363636",
    },
    newUserText: {
        fontWeight: 700,
        textAlign: "center",
        marginTop: 50,
        color: "#363636",
    },
    newUser: {
        textDecorationLine: "underline",
        color: "#08B6CF",
    },
});

export default SignUp;
