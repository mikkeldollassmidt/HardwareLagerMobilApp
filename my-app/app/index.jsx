import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../Api_intergration/userApi"; // Adjust path if needed

const LoginPage = () => {
  const router = useRouter(); // Navigation hook

  // State for username & password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // LoginPage.js
const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser(username, password);
      if (response?.token) {
        // Save token to AsyncStorage
        await AsyncStorage.setItem("authToken", response.token);
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
          // Provide more details about the 400 error
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
