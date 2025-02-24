import { FlatList, View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeHeader from "@/components/forside/HomeHeader";
import SearchBar from "@/components/SearchBar";
import RetrieveProductPage from "@/components/forside/RetrieveProductPage";
import BannerButton from "@/components/forside/BannerButton";

const Home = () => {
  // Define the data for the sections you want to render
  const data = [
    { id: "1", headerText: "Klik og hent", startIndex: 0, endpointType: "available" }, // Set endpointType to "available"
    { id: "3", headerText: "Banner", type: "banner" }, // Add banner section here
    { id: "2", headerText: "Mest Lånte", startIndex: 0, endpointType: "all" }, // Set endpointType to "all"
  ];

  const renderItem = ({ item }) => {
    if (item.type === "banner") {
      // Render BannerButton when item type is 'banner'
      return <BannerButton />;
    }

    return (
      <View style={styles.section}>
        <RetrieveProductPage
          headerText={item.headerText}
          limit={4}
          startIndex={item.startIndex}
          endpointType={item.endpointType} // Pass endpointType to RetrieveProductPage
        />
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <HomeHeader />
          <SearchBar />
        </>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      ListFooterComponent={<View style={styles.footerSpacing} />} // Add additional footer spacing
    />
  );
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: "#fff",
    },
    scrollContent: {
      paddingBottom: 80, // Optional: keeps bottom padding in content area
    },
    footerSpacing: {
      height: 50, // Adjust this value to add extra space at the bottom of the list
    },
  });
export default Home;
