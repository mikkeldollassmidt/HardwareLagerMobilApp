import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Product from "../Product";
import { getAvailableUserHardware } from "../../Api_intergration/userHardwareApi"; // Import the correct API function

const RetrieveProductPage = ({ headerText, limit, startIndex }) => { // Accept limit and startIndex as props
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableProducts = async () => {
      try {
        const today = new Date();
        const isoDate = today.toISOString(); // Get current date in ISO format

        const data = await getAvailableUserHardware({
          categoryIds: [], // Pass an empty array to include all categories
          typeIds: [], // Pass an empty array to include all types
          weeks: 4, // Search for items available for the next 4 weeks
          searchString: "", // No search filter applied
          startDate: isoDate, // Start from today
        });

        // Use limit and startIndex props to slice the data
        const slicedData = data.slice(startIndex, startIndex + limit);
        setProducts(slicedData); // Set the sliced data
      } catch (error) {
        console.error("Error fetching available products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableProducts();
  }, [limit, startIndex]); // Re-fetch when limit or startIndex changes

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
          numColumns={2} // Display in two columns
          renderItem={({ item }) => (
            <Product 
              imageUrl={item.imageUrl || "https://via.placeholder.com/150"} // Default image if missing
              title={item.name || "Unknown Product"} // Adjust according to API fields
              category={item.type || "Unknown Type"}
            />
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
    fontSize: 20,
    color: "#363636",
    marginBottom: 8,
    fontWeight: "800",
  },
});

export default RetrieveProductPage;
