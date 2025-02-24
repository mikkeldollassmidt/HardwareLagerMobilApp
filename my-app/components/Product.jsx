import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Product = ({ imageUrl, title, category }) => {
  return (
    <View style={styles.productBox}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.productImage}
      />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>● </Text>
        <Text style={styles.category}>{category}</Text>
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
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: "row",
  },
  category: {
    fontSize: 12,
  },
  title: {
    fontWeight: "700",
    fontSize: 14, // Adjust as needed
    width: "100%", // Ensures text doesn't overflow its container
  },
});

export default Product;
