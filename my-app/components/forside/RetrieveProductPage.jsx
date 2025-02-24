import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Product from "../Product";
import { getAvailableUserHardware, getAllUserHardware } from "../../Api_intergration/userHardwareApi"; // Import both API functions

const RetrieveProductPage = ({ headerText, limit, startIndex, endpointType }) => { // Accept endpointType as a prop
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const today = new Date();
        const isoDate = today.toISOString(); // Get current date in ISO format

        let data = [];

        if (endpointType === "available") {
          // Fetch available products using the available endpoint
          data = await getAvailableUserHardware({
            categoryIds: [], // Pass an empty array to include all categories
            typeIds: [], // Pass an empty array to include all types
            weeks: 4, // Search for items available for the next 4 weeks
            searchString: "", // No search filter applied
            startDate: isoDate, // Start from today
          });
        } else {
          // Fetch all user hardware using the getAll endpoint
          data = await getAllUserHardware();
        }

        // Use limit and startIndex props to slice the data
        const slicedData = data.slice(startIndex, startIndex + limit);
        setProducts(slicedData); // Set the sliced data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, startIndex, endpointType]); // Re-fetch when limit, startIndex, or endpointType changes

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
