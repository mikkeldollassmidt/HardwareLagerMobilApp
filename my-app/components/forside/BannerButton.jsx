import { View, Text, StyleSheet } from "react-native";
import React from "react";

const BannerButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Nyeste udstyr</Text>
        <Text style={styles.textSubheader}>
          Klik her for at udforske vores nyeste udstyr, klar til øjeblikkelig
          brug.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>Se mere</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7E7E7",
    height: "fit-content",
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  textContainer: {
    width: "70%",
  },
  buttonContainer: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "100%",
  },
  textHeader: {
    fontSize: 18,
  },
  textSubheader: {
    fontSize: 13,
  },
  button: {
    fontSize: 13,
  },
});

export default BannerButton;
