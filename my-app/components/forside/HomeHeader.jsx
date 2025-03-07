import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ActiveLoanHeader from "./ActiveLoanHeader";
import getUserData from "../Helpers/getUserInformation";

const Header = () => {
  const [displayName, setDisplayName] = useState("");

  const fetchUserData = async () => {
    const fullname = await getUserData();
    const formattedName = formatName(fullname);
    setDisplayName(formattedName);
  };

  // Runs every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  // Function to format the name
  const formatName = (fullname) => {
    if (!fullname) return "";

    const nameParts = fullname.trim().split(/\s+/);
    if (nameParts.length === 1) {
      return nameParts[0];
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    return `${firstName} ${lastName[0]}.`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>Hvad kan vi hjælpe dig med i dag?</Text>
      <Text style={styles.fullname}>{displayName}</Text>
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
