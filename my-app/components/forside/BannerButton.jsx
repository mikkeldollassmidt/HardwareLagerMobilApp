import { View, Text, StyleSheet, Image } from "react-native";
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
      <Image
        source={require("../../assets/images/NyesteUdstyr.webp")}
        style={styles.backgroundImage}
      />
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
    marginBottom: 20,
    overflow: "hidden",
  },
  textContainer: {
    width: "70%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 1,
  },
  buttonContainer: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 1,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,

  },
  textSubheader: {
    fontSize: 13,
    color: "white",

  },
  button: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
  },
});

export default BannerButton;
