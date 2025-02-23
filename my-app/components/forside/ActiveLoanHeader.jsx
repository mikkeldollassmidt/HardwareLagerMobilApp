import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ActiveLoanHeader = () => {
  return (
    <View style={styles.container}>
      <Text>Du har 0 aktive lån</Text>
      <Text>Se mine lån</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
  },
});

export default ActiveLoanHeader;
