import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode"
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenCheckCompleted, setTokenCheckCompleted] = useState(false);
  const router = useRouter();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      // If no token, redirect to login
      if (!token) {
        router.replace("/login");
        return;
      }

      // Decode the JWT token
      const decodedToken = jwtDecode(token);  // No need for types in JS

      console.log(decodedToken); // For debugging purposes

      const currentTime = Date.now() / 1000;  // Current time in seconds

      // Check if the token is expired
      if (decodedToken.exp > currentTime) {
        setTokenCheckCompleted(true);  // Token is valid
      } else {
        // Token has expired
        await AsyncStorage.multiRemove(["authToken", "userId", "fullname"]);
        Alert.alert("Session Expired", "Your session has expired. Please log in again.");
        router.replace("/login");
      }
    } catch (error) {
      // Handle any errors (e.g., token is malformed)
      console.error("Token validation error:", error);
      await AsyncStorage.multiRemove(["authToken", "userId", "fullname"]);
      router.replace("/login");
    } finally {
      setTokenCheckCompleted(true);  // Set this to true even if there was an error
    }
  };

  useEffect(() => {
    checkToken();  // Perform the token check on component mount
  }, [router]);

  return (
    <AuthContext.Provider value={{ tokenCheckCompleted }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
