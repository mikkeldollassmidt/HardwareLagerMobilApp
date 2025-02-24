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
    width: 170,
    marginBottom: 15,
    marginRight: 32,
  },
  productImage: {
    height: 110,
    width: 170,
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: "row",
  },
  category: {
    fontSize: 12,
    color: "#08B6CF",
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    width: "100%",
    color: "#363636",
  },
});

export default Product;
