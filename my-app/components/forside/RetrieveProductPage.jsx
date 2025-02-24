import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Product from "../Product";

const RetrieveProductPage = ({ headerText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>
      <View style={styles.productContainer}>
        <Product imageUrl="https://applegenbrug.dk/wp-content/uploads/2024/04/macbook-air-1466.webp" title="Title" category="Kategori"/>
        <Product imageUrl="https://applegenbrug.dk/wp-content/uploads/2024/04/macbook-air-1466.webp" title="Title" category="Kategori"/>
        <Product imageUrl="https://applegenbrug.dk/wp-content/uploads/2024/04/macbook-air-1466.webp" title="Title" category="Kategori"/>
        <Product imageUrl="https://applegenbrug.dk/wp-content/uploads/2024/04/macbook-air-1466.webp" title="Neger" category="Kategori"/>
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

export default RetrieveProductPage;
