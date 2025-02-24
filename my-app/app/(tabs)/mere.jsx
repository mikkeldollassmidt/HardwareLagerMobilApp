import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Choice from "../../components/mere/Choice";

const Mere = () => {
  return (
    <View style={styles.choiceContainer}>
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Andet choice" />
      <Choice text="Log ud" color="danger" />
      <Text style={styles.copyright}>
        © 2025 ITDepot. Alle rettigheder forbeholdes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  choiceContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    height: "100%",
  },
  copyright: {
    color: "#363636",
    fontSize: 13,
  },
});

export default Mere;
