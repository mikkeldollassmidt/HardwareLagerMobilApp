import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import ColorList from "@/components/ColorList";
import HomeHeader from "@/components/forside/HomeHeader";
import SearchBar from "@/components/SearchBar";
import RetrieveProductPage from "@/components/forside/RetrieveProductPage";
import BannerButton from "@/components/forside/BannerButton";

const Home = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <HomeHeader />
        <SearchBar />
        <RetrieveProductPage
          headerText="Klik og hent"
          limit={4}
          startIndex={0}
        />
        <BannerButton />
        <RetrieveProductPage headerText="Mest Lånte" limit={4} startIndex={4} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 80,
  },
});

export default Home;
