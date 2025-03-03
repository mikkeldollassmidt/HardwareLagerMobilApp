// RetrieveProductPage.jsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter
import Product from "../Product";
import { getAvailableUserHardware, getAllUserHardware, getActiveLoansByUserId } from "../../Api_intergration/userHardwareApi";

const RetrieveProductPage = ({ headerText, limit, startIndex, endpointType, userId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const isoDate = today.toISOString();
        let data = [];

        if (endpointType === "available") {
          data = await getAvailableUserHardware({
            categoryIds: [],
            typeIds: [],
            weeks: 4,
            searchString: "",
            startDate: isoDate,
          });
        } else if (endpointType === "all") {
          data = await getAllUserHardware();
        } else if (endpointType === "history" && userId) {
          data = await getActiveLoansByUserId(userId);
        }

        const slicedData = data.slice(startIndex, startIndex + limit);
        setProducts(slicedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, startIndex, endpointType, userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#08B6CF" />
      ) : (
        <FlatList
          style={styles.productContainer}
          data={products}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={() => {
                // Pass product details as params using router.push
                router.push({
                  pathname: "/viewProductPage",
                  params: {
                    id: item.id, // Pass the product id
                    title: item.name, // Pass the product name
                    imageUrl: item.imageUrl || "https://via.placeholder.com/150", // Pass image URL
                    category: item.type || "Unknown Type", // Pass category
                    description: item.description || "No description available", // Pass description
                  },
                });
              }}
            >
              <Product
                imageUrl={item.imageUrl || "https://via.placeholder.com/150"}
                title={item.name || "Unknown Product"}
                category={item.type || "Unknown Type"}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    color: "#363636",
    marginBottom: 10,
    fontWeight: "800",
  },
  productContainer: {
    width: "100%",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default RetrieveProductPage;
