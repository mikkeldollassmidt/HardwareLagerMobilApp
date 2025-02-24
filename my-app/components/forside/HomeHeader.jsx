import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ActiveLoanHeader from "./ActiveLoanHeader";
import getUserData from "../Helpers/getUserInformation";

const Header = () => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const fullname = await getUserData();
      const formattedName = formatName(fullname);
      setDisplayName(formattedName);
    };

    fetchUserData();
  }, []);

  // Function to format the name
  const formatName = (fullname) => {
    if (!fullname) return "";

    const nameParts = fullname.trim().split(/\s+/); // Split name into words and remove extra spaces
    if (nameParts.length === 1) {
      return nameParts[0]; // If only one name, return it as is
    }

    const firstName = nameParts[0]; // First name
    const lastName = nameParts[nameParts.length - 1]; // Last name

    return `${firstName} ${lastName[0]}.`; // First name + first letter of last name + "."
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
