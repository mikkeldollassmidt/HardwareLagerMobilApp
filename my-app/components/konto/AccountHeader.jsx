import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const accountHeader = () => {
  return (
    <View style={styles.accountHeader}>
      <View style={styles.outerBorder}>
        <View style={styles.innerBorder}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
            }}
            style={styles.accountPic}
          />
        </View>
      </View>

      <View style={styles.accountInfo}>
        <Text style={styles.accountFullname}>Mikkel Otte Dollas Smidt</Text>
        <Text style={styles.accountEmail}>mikkeldollaskontakt@gmail.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountHeader: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    marginBottom: 15
  },
  outerBorder: {
    borderWidth: 2,
    borderColor: "#08B6CF",
    borderRadius: 50,
  },
  innerBorder: {
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 50,
  },
  accountPic: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  accountInfo: {
    marginLeft: 10,
  },
  accountFullname: {
    fontWeight: 700,
    fontSize: 18,
    color: "#363636",
  },
  accountEmail: {
    color: "#A1A1A1",
    fontWeight: 450,
    fontSize: 15,
  },
});

export default accountHeader;
