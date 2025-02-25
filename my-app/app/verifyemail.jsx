import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);

  // Create refs for each TextInput
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (text, index) => {
    const newCode = [...code];

    if (text.length === 1) {
      // Update the corresponding code field when a character is entered
      newCode[index] = text.toUpperCase(); // Convert to uppercase for consistency
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

  const handleSubmit = () => {
    console.log("Submitted Code: ", code.join(""));
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
          onPress={handleSubmit}
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
          <Text style={styles.newUser}>Send igen</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  buttonContent: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
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
