import {
  FlatList,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "@/components/forside/HomeHeader";
import SearchBar from "@/components/SearchBar";
import RetrieveProductPage from "@/components/forside/RetrieveProductPage";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SearchPage = () => {
  const navigation = useNavigation();

  // States to manage dynamic values for pagination
  const [pageNumber, setPageNumber] = useState(0); // Keep track of current page
  const [loading, setLoading] = useState(false);

  const pageSize = 16; // Fixed page size to 16

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Load more products when the user scrolls to the bottom
  const loadMore = () => {
    setLoading(true);
    setPageNumber((prevPage) => prevPage + 1); // Increment page number when reaching the end
    setLoading(false);
  };

  // Prepare the data for rendering
  const data = [
    {
      headerText: "Nyeste udvalg",
      endpointType: "newest", // You can change the endpoint type as needed
      pageNumber: pageNumber, // Pass the current page number
      pageSize: pageSize, // Pass the fixed page size
    },
  ];
  
  const renderItem = ({ item }) => (
    <View style={styles.section}>
      <RetrieveProductPage
        headerText={item.headerText}
        limit={pageSize} // Limit per page
        startIndex={item.pageNumber * pageSize} // Calculate the start index based on page number
        endpointType={item.endpointType}
        pageNumber={item.pageNumber}
        pageSize={item.pageSize}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          style={styles.goBackIcon}
          name="arrow-back"
          size={20}
          color="black"
        />
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use the index as a key
        ListHeaderComponent={<SearchBar />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListFooterComponent={
          loading ? (
            <Text style={styles.footerText}>Loading...</Text>
          ) : (
            <View style={styles.footerSpacing} />
          )
        }
        onEndReached={loadMore} // Load more products when scrolled to the bottom
        onEndReachedThreshold={0.1} // Trigger `onEndReached` when 10% from the bottom
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 70 : 0,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  footerSpacing: {
    height: 50,
  },
  footerText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: "#888",
  },
  goBackButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackIcon: {
    margin: 0,
    padding: 0,
    color: "#363636",
  },
});

export default SearchPage;
