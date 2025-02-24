import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from "react-native-svg";

const ActiveLoanHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.activeText}>Du har 0 aktive lån</Text>
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
    fontWeight: 700,
    fontSize: 16,
  }
});

export default ActiveLoanHeader;
