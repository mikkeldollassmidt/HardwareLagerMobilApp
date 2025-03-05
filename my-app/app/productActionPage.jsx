import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

// Dummy function to simulate fetching product details
const fetchProductDetails = (id) => {
  const dummyProducts = {
    101: { title: "Produkt A", imageUrl: "https://via.placeholder.com/400", category: "Kategori 1", description: "Beskrivelse af produkt A" },
    102: { title: "Produkt B", imageUrl: "https://via.placeholder.com/400", category: "Kategori 2", description: "Beskrivelse af produkt B" },
  };
  return dummyProducts[id] || { title: "Ukendt produkt", imageUrl: "", category: "Ukendt", description: "Ingen beskrivelse tilgængelig" };
};

const productActionPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const productDetails = fetchProductDetails(id);
      setProduct(productDetails);
    }
  }, [id]);

  if (!product) return <Text>Indlæser produkt...</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackIconBox} onPress={() => router.back()}>
        <Image source={require("../assets/icons/Dropdown.webp")} style={styles.goBackIcon} />
      </TouchableOpacity>

      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{product.title}</Text>
        <Text style={styles.typeText}>{product.category}</Text>
        <Text>{product.description}</Text>
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
  loanButton: {
    backgroundColor: "#08B5CF",
    width: "100%",
    padding: 13,
    borderRadius: 10,
    position: "absolute",
    top: 15,
  },
  loanButtonText: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  deliverButton: {
    backgroundColor: "#D0F6FC",
    width: "100%",
    padding: 13,
    borderRadius: 10,
    position: "absolute",
    top: 15,
  },
  deliverButtonText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#08B6CF",
    textAlign: "center",
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
export default productActionPage;