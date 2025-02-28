import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useNavigation } from "expo-router";
import { createEmail } from "../Api_intergration/emailApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmailSignUp = () => {
    const [email, setEmail] = useState(""); // State to store the email
    const navigation = useNavigation();
    const router = useRouter();

    const GoBackToLogin = () => {
        navigation.goBack();
    };
    const SendEmailCode = async () => {
        if (email.trim() !== "") {
            try {
                // Use the correct key "EmailAddress" for the DTO
                const response = await createEmail({ EmailAddress: email });
    
                // Log the response to verify the data
                console.log("API Response:", response);
    
                // Check if the id is present
                if (response?.email?.id || response?.token) {
                    // Save emailId if present
                    if (response?.email?.id) {
                      const idAsString = String(response.email.id); // Convert id to string
                      await AsyncStorage.setItem("emailId", idAsString); // Save as string
                      console.log("Email ID saved to AsyncStorage:", idAsString);
                    }
                  
                    // Save token if present
                    if (response?.token) {
                      await AsyncStorage.setItem("authToken", response.token); // Save the token
                      console.log("Token saved to AsyncStorage:", response.token);
                    }
                  
                    // Log saved values immediately after saving
                    const savedEmailId = await AsyncStorage.getItem("emailId");
                    const savedAuthToken = await AsyncStorage.getItem("authToken");
                    console.log("Saved emailId in AsyncStorage:", savedEmailId);
                    console.log("Saved authToken in AsyncStorage:", savedAuthToken);
                  
                  } else {
                    console.error("ID or token is missing from the response:", response);
                  }
    
                // Proceed to next page
                console.log(email);
                router.push({ pathname: "/verifyemail", params: { email } });
            } catch (error) {
                console.error("Error sending email code:", error);
                alert("Der opstod en fejl. Prøv venligst igen.");
            }
        } else {
            alert("Indtast venligst en email");
        }
    };
    


    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/itdepot.webp")}
                style={styles.logo}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Velkommen!</Text>
                <Text style={styles.subTitle}>Indtast venligst din email</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail} // Update state when typing
                />

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={SendEmailCode}
                >
                    <LinearGradient
                        colors={["#0891DA", "#08D9C4"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.buttonContent}
                    >
                        <Text style={styles.buttonText}>Send mig en kode</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.newUserText}>
                    Har du allerede en bruger?{" "}
                    <TouchableOpacity onPress={GoBackToLogin}>
                        <Text style={styles.newUser}>Log ind</Text>
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
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#363636",
        textAlign: "center",
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
    button: {
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
    },
    buttonContent: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        width: 200,
        height: 51,
        marginBottom: 20,
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

export default EmailSignUp;
