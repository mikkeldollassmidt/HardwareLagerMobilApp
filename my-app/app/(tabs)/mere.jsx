import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import Choice from "../../components/mere/Choice";

const Mere = () => {
  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.header}>Mere</Text>
      <View style={styles.hr} />
      <Choice text="Touch Input Testing" route="/touchinputtest" />
      <Choice text="Gyroskop:" />
      <Choice type="gyroscope" />
      <Choice type="sendsms" />
      <Choice type="gps" />
      <Text style={styles.copyright}>
        © 2025 ITDepot. Alle rettigheder forbeholdes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#ebebeb",
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    alignText: "left",
    width: "100%",
    marginBottom: 10,
    color: "#363636",
    fontWeight: 600
  },
  choiceContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    height: "100%",
    paddingTop: Platform.OS === "ios" ? 75 : 0, // IOS - ANDROID 
  },
  copyright: {
    color: "#9f9f9f",
    fontSize: 13,
    marginTop: 20
  },
});

export default Mere;
