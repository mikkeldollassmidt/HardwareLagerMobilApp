import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ActiveLoanHeader from "./ActiveLoanHeader";
import getUserData from "../Helpers/getUserInformation";

const Header = () => {
  // State to store the user's fullname
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      const fullname = await getUserData(); // Call the helper to get user data
      setUserFullName(fullname); // Store fullname in state
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>Hvad kan vi hjælpe dig med i dag?</Text>
      <Text style={styles.fullname}>{userFullName}</Text>
      <ActiveLoanHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  headertext: {
    color: "#6D6D6D",
  },
  fullname: {
    fontSize: 35,
    color: "#363636",
    fontWeight: "800",
  },
});

export default Header;
