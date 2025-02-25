import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "./colors"; // Import your color map

const Choice = ({ text, color = "default" }) => {
  return (
    <View style={styles.choiceBox}>
      <Text style={[styles.logout, { color: colors[color] || colors.default }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  choiceBox: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  logout: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Choice;
