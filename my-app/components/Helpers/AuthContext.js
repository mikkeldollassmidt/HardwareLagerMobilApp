import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import JWT from "expo-jwt"; // Import the expo-jwt library
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenCheckCompleted, setTokenCheckCompleted] = useState(false);
  const router = useRouter();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        router.replace("/login");
        return;
      }

      const decodedToken = JWT.decode(
        token,
        "ITDepotHardwareLagerSystemH3ProjektApiOgAndreTingZBC2025Til2027"
      ); // Use the same key as the server's signing key
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        setTokenCheckCompleted(true);
      } else {
        await AsyncStorage.multiRemove(["authToken", "userId", "fullname"]);
        Alert.alert(
          "Session Expired",
          "Your session has expired. Please log in again."
        );
        router.replace("/login");
      }
    } catch (error) {
      console.error("Token validation error:", error);
      await AsyncStorage.multiRemove(["authToken", "userId", "fullname"]);
      router.replace("/login");
    } finally {
      setTokenCheckCompleted(true); // Ensure this is set correctly in case of errors
    }
  };

  useEffect(() => {
    checkToken();
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
