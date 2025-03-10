import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const BannerButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => router.push({ pathname: "./searchPage", params: { fromBanner: "true" }})}
    >
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Nyeste udstyr</Text>
        <Text style={styles.textSubheader}>
          Klik her for at udforske vores nyeste udstyr, klar til øjeblikkelig brug.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>Se mere</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#08B5CF",
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
