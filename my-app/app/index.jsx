import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt"; // Import the expo-jwt library
import { loginUser } from "../Api_intergration/userApi"; // Adjust path if needed
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

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
          const decodedToken = JWT.decode(
            token,
            "ITDepotHardwareLagerSystemH3ProjektApiOgAndreTingZBC2025Til2027"
          ); // Use the same key as the server's signing key

          const currentTime = Date.now() / 1000; // Get current time in seconds
          if (decodedToken.exp > currentTime) {
            // Token is valid
            router.replace("/(tabs)"); // Redirect to the main tabs if token exists
          } else {
            // Token has expired, remove from AsyncStorage
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("fullname");
            Alert.alert(
              "Session Expired",
              "Your session has expired. Please log in again."
            );
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
          Alert.alert(
            "Error",
            "An unexpected error occurred. Please try again."
          );
        }
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "No response from the server. Please try again later."
        );
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
      <Image
        source={require("../assets/images/itdepot.webp")}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Velkommen tilbage!</Text>
        <Text style={styles.subTitle}>Log ind herunder</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Brugernavn"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <View style={styles.adgangskodeContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adgangskode"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.forgottenText}>Glemt adgangskode</Text>
        </View>

        <TouchableOpacity
  onPress={handleLogin}
  disabled={loading}
  style={[styles.button, loading && styles.buttonDisabled]} // Ensures the whole button is clickable
>
  <LinearGradient
    colors={["#0891DA", "#08D9C4"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.buttonContent} // This should be just for the gradient
  >
    <Text style={styles.buttonText}>
      {loading ? "Logging in..." : "Log ind"}
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
          Har du ikke en bruger?{" "}
          <Text style={styles.newUser}>Opret bruger</Text>
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
