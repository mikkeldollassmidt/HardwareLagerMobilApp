import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Product = () => {
  return (
    <View style={styles.productBox}>
      <Image
        source={{
          uri: "https://applegenbrug.dk/wp-content/uploads/2024/04/macbook-air-1466.webp",
        }}
        style={styles.productImage}
      />
      <Text>Macbook 2029 Black Edition</Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>● </Text>
        <Text style={styles.category}>Computer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productBox: {
    width: "48%",
    marginBottom: 15,
  },
  productImage: {
    height: 110,
    width: "100%",
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: "row",
  },
  category: {
    fontSize: 12,
  },
});

export default Product;
