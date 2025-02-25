import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const LoginPage = () => {
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
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={["#0891DA", "#08D9C4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonContent} // Ensures gradient applies properly
          >
            <Text style={styles.buttonText}>Send mig en kode</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.newUserText}>
          Har du allerede en bruger? <Text style={styles.newUser}>Log ind</Text>
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

export default LoginPage;
