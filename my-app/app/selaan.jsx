import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RetrieveProductPage from "../components/forside/RetrieveProductPage";
import { getActiveLoansByUserId } from "../Api_intergration/userHardwareApi";

const Selaan = () => {
  const navigation = useNavigation();
  const [activeLoanCount, setActiveLoanCount] = useState(0);
  const [userId, setUserId] = useState(null);

  // Hide header
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchActiveLoans = async () => {
        try {
          const activeLoans = await getActiveLoansByUserId(userId);
          setActiveLoanCount(activeLoans.length); // Set the active loan count here
        } catch (error) {
          console.error("Error fetching active loans:", error);
        }
      };

      fetchActiveLoans();
    }
  }, [userId]); // Only fetch active loans when userId is available

  const data = [
    { id: "1", headerText: "", startIndex: 0, endpointType: "history", userId: userId },
  ];

  const renderItem = ({ item }) => {
    if (item.type === "banner") {
      return <BannerButton />;
    }

    return (
      <View style={styles.section}>
        <RetrieveProductPage
          headerText={item.headerText}
          limit={activeLoanCount} // Set the active loan count as the limit here
          startIndex={item.startIndex}
          endpointType={item.endpointType}
          userId={item.userId} // Pass userId here
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="caretleft" size={24} color="black" />
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.text}>Dine aktive lån</Text>

      {/* RetrieveProductPage Sections */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footerSpacing} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 80, // Adjust so the back button does not overlap
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    zIndex: 10, // Ensure it stays on top
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#363636",
    textAlign: "center",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 80,
  },
  footerSpacing: {
    height: 50,
  },
  section: {
    marginBottom: 20,
  },
});

export default Selaan;
