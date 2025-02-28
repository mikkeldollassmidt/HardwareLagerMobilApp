import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

const ViewProductPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackIconBox}
        onPress={() => navigation.goBack()} 
      >
        <Image
          source={require("../assets/icons/Dropdown.webp")}
          style={styles.goBackIcon}
        />
      </TouchableOpacity>
      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri: "https://i.pcmag.com/imagery/roundups/04OtgLS2CSnpQsNfHODkh5S-1..v1569470764.jpg",
          }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Macbook 2019 Black Edition</Text>
          <Text style={styles.typeText}>Computer</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descHeader}>Beskrivelse</Text>
          <Text style={styles.descSubheader}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen..
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>Tjek tilgængelighed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  productImageContainer: {
    maxWidth: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  productImage: {
    height: 400,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    padding: 20,
  },
  button: {
    backgroundColor: "#08B5CF",
    width: "100%",
    textAlign: "center",
    padding: 13,
    borderRadius: 10,
    color: "white",
    position: "absolute",
    top: 15,
    fontSize: 17,
    fontWeight: "500",
  },
  textContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    flexShrink: 1,
    flexWrap: "wrap",
    color: "#363636",
    maxWidth: "75%",
  },
  typeText: {
    fontSize: 15,
    color: "#08B5CF",
    fontWeight: "500",
    paddingHorizontal: 15,
    paddingVertical: 3,
    maxHeight: 25,
    textAlign: "center",
    backgroundColor: "#D0F6FC",
    borderRadius: 8,
  },
  descContainer: {
    marginTop: 10,
  },
  descHeader: {
    fontSize: 14,
    fontWeight: 600,
    color: "#363636",
  },
  descSubheader: {
    fontSize: 13,
    color: "#363636",
  },
  goBackIcon: {
    height: 15,
    width: 15,
    transform: [{ rotate: "90deg" }],
  },
  goBackIconBox: {
    backgroundColor: "white",
    padding: 10,
    position: "absolute",
    zIndex: 999,
    borderRadius: 8,
    left: 20,
    top: 20,
  },
});

export default ViewProductPage;
