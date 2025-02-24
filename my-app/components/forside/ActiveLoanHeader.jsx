import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { getActiveLoansByUserId } from "../../Api_intergration/userHardwareApi"; // Import the API function

const ActiveLoanHeader = () => {
  const [activeLoanCount, setActiveLoanCount] = useState(0); // State to store the count
  const [userId, setUserId] = useState(null); // State to store the userId

  useEffect(() => {
    // Fetch userId from AsyncStorage
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
      }
    };

    fetchUserId(); // Call the function to fetch userId
  }, []); // This effect runs only once when the component mounts

  useEffect(() => {
    if (userId) {
      const fetchActiveLoans = async () => {
        try {
          const activeLoans = await getActiveLoansByUserId(userId); // Fetch the active loans
          setActiveLoanCount(activeLoans.length); // Set the count of active loans
        } catch (error) {
          console.error("Error fetching active loans:", error);
        }
      };

      fetchActiveLoans(); // Call the function to fetch active loans
    }
  }, [userId]); // Run this effect when userId is available

  return (
    <View style={styles.container}>
      <Text style={styles.activeText}>
        Du har {activeLoanCount} aktive lån
      </Text>
      <Text style={styles.buttonText}>Se mine lån</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "#363636",
    fontWeight: 700,
    fontSize: 16,
  },
  activeText: {
    color: "#08B6CF",
    fontWeight: 500,
    fontSize: 16,
  },
});

export default ActiveLoanHeader;
