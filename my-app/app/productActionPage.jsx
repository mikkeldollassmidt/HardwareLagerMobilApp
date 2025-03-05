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

const ProductActionPage = () => {
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

export default ProductActionPage;
