import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ActiveLoanHeader from "./ActiveLoanHeader";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>Hvad kan vi hjælpe dig med i dag?</Text>
      <Text style={styles.fullname}>John Doe</Text>
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
