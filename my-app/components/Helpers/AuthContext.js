import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { View, ActivityIndicator, Alert } from "react-native"; // Make sure to import View and ActivityIndicator

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenCheckCompleted, setTokenCheckCompleted] = useState(false);
  const [loading, setLoading] = useState(true);  // New loading state
  const router = useRouter();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        router.replace("/login");
        return;
      }

      const decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;  // Current time in seconds

      if (decodedToken.exp > currentTime) {
        setTokenCheckCompleted(true);  // Token is valid
      } else {
        await AsyncStorage.multiRemove(["authToken", "userId", "fullname"]);
        Alert.alert("Session Expired", "Your session has expired. Please log in again.");
        router.replace("/login");
      }
    } catch (error) {
      console.error("Token validation error:", error);
      await AsyncStorage.multiRemove(["authToken", "userId", "fullname"]);
      router.replace("/login");
    } finally {
      setLoading(false);
      setTokenCheckCompleted(true);
    }
  };

  useEffect(() => {
    checkToken();  // Perform the token check on component mount
  }, [router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0891DA" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ tokenCheckCompleted, loading }}>
      {tokenCheckCompleted ? children : null}
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