import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ColorList from "@/components/ColorList";
import HomeHeader from "@/components/forside/HomeHeader";
import SearchBar from "@/components/SearchBar";
import RetrieveProductPage from "@/components/forside/RetrieveProductPage";
import BannerButton from "@/components/forside/BannerButton";

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <SearchBar />
      <RetrieveProductPage headerText="Klik og hent" />
      <BannerButton />
      <RetrieveProductPage headerText="Mest lånte" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
});

export default Home;
