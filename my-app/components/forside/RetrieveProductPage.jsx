import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Product from "../Product";

const RetrieveProductPage = ({ headerText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>
      <View style={styles.productContainer}>
        <Product imageUrl="https://applegenbrug.dk/wp-content/uploads/2024/04/macbook-air-1466.webp" title="Macbook 2019 Silver Edition" category="Computer"/>
        <Product imageUrl="https://i.pcmag.com/imagery/reviews/06dHoRASdMFeJVCvXGvBJ7m-1.fit_lim.size_919x518.v1725794842.jpg" title="Dell Laptop Newest Edition" category="Computer"/>
        <Product imageUrl="https://wecoveryou.dk/wp-content/uploads/2023/01/102102791A-4_1000X1000.jpg" title="Airpods Max 2020" category="Høretelefoner"/>
        <Product imageUrl="https://sparepart.dk/media/cache/product_original/product-images/18/67/2/eng_pl_Ugreen-HDMI-micro-HDMI-cable-19-pin-2-0v-4K-60Hz-30AWG-1-5m-black-30102-57401_21640683858.8364.jpg.jpeg?1640683858" title="HDMI, DP, VGA kabler" category="Kabler"/>
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
    fontWeight: "800",
  },
});

export default RetrieveProductPage;
