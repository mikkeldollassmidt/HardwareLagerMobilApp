import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteEmail, createEmail, verifyEmail } from "../Api_intergration/emailApi";

const VerifyEmailPage = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const email = params.email ? decodeURIComponent(params.email) : "";
    useEffect(() => {
        console.log("Received email: ", email); // Just log the email
    }, [email]);

    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    // Handle the verification of the code
    const verifyEmailCode = async () => {
        try {
            // Join the code array to create the full verification code (secretKey)
            const verificationCode = code.join("");

            if (verificationCode.length < 5) {
                alert("Please enter the full verification code.");
                return;
            }
            console.log("Verifying email with payload:", {
                emailAddress: email,
                secretKey: verificationCode,
            });
            // Call the verifyEmail API with the email and verification code as secretKey
            const response = await verifyEmail({
                emailAddress: email, // Correct email parameter
                secretKey: verificationCode, // Pass the verification code as secretKey
            });

            console.log(response);
            if (response?.isVerified) {
                router.push({ pathname: "/signup", params: { email: email } });
            } else {
                alert("Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during email verification:", error);
            alert("An error occurred during verification. Please try again later.");
        }
    };


    const SendAgain = async () => {
        try {
            if (!email) {
                alert("Email ikke fundet. Prøv at gå tilbage og indtaste din email igen.");
                return;
            }

            // Fetch emailId from AsyncStorage before calling deleteEmail
            const emailId = await AsyncStorage.getItem("emailId");

            if (emailId) {
                // Call deleteEmail with the emailId
                const idAsInt = parseInt(emailId, 10);  // Convert string to integer
                await deleteEmail(idAsInt);
                // Remove the old email ID from storage
                await AsyncStorage.removeItem("emailId");
            } else {
                alert("Email ID ikke fundet. Prøv venligst igen.");
                return;
            }

            // Call the API to resend the verification code
            const response = await createEmail({ EmailAddress: email });

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

            alert("Kode er blevet sendt igen til din email.");
        } catch (error) {
            console.error("Fejl ved gensendelse af kode:", error);
            alert("Kunne ikke sende koden igen. Prøv venligst senere.");
        }
    };

    const handleChange = (text, index) => {
        const newCode = [...code];
        if (text.length === 1) {
            // Update the corresponding code field when a character is entered
            newCode[index] = text;
            setCode(newCode);
            // Move focus to the next box if the user typed something
            if (index < 4) {
                inputRefs[index + 1].current.focus(); // Focus next TextInput
            }
        } else if (text.length === 0) {
            // If the user deletes the current value, update the code array
            newCode[index] = ""; // Clear the current input field
            setCode(newCode);

            // Move focus to the previous TextInput if the user deletes a letter
            if (index > 0) {
                inputRefs[index - 1].current.focus(); // Focus previous TextInput
            }
        }

        // Ensure the current TextInput allows further typing if the user deleted multiple characters
        if (text.length === 0 && index < 4 && code[index] === "") {
            // Move focus to the next available box if deleting multiple characters
            inputRefs[index + 1].current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/itdepot.webp")}
                style={styles.logo}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Verificer din email</Text>
                <Text style={styles.subTitle}>
                    Indtast venligst den kode, der er sendt til din email
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.codeInputContainer}>
                    {code.map((item, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            value={item}
                            onChangeText={(text) => handleChange(text, index)}
                            maxLength={1}
                            keyboardType="default"
                            textAlign="center"
                            ref={inputRefs[index]} // Assign ref to each TextInput
                        />
                    ))}
                </View>

                <TouchableOpacity
                    onPress={verifyEmailCode} // Updated to call verifyEmailCode function
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <LinearGradient
                        colors={["#0891DA", "#08D9C4"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.buttonContent}
                    >
                        <Text style={styles.buttonText}>Verificer Kode</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.newUserText}>
                    Har du ikke modtaget en kode?{" "}
                    <TouchableOpacity onPress={SendAgain}>
                        <Text style={styles.newUser}>Send igen</Text>
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
        backgroundColor: "#fff",
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
        fontWeight: 400,
    },
    inputContainer: {
        width: "100%",
    },
    codeInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    input: {
        width: 65,
        height: 65,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 18,
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
    logo: {
        width: 200,
        height: 51,
        marginBottom: 20,
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

export default VerifyEmailPage;
