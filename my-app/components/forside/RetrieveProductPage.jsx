import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Product from "../Product";

// Modify KlikOgHent to accept props for the header text
const KlikOgHent = ({ headerText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>{" "}
      <View style={styles.productContainer}>
        <Product />
        <Product />
        <Product />
        <Product />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    color: "#363636",
    marginBottom: 8,
  },
});

export default KlikOgHent;
