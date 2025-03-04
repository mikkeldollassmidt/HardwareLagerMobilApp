import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RetrieveLoanPage from "../components/selaan/RetrieveLoanPage";
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
        const storedUserId = await AsyncStorage.getItem("userId");
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
    {
      id: "1",
      headerText: "",
      startIndex: 0,
      endpointType: "history",
      userId: userId,
    },
  ];

  const renderItem = ({ item }) => {
    if (item.type === "banner") {
      return <BannerButton />;
    }

    return (
      <View style={styles.section}>
        <RetrieveLoanPage
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
      <View style={styles.loanHeader}>
        <TouchableOpacity
          style={styles.goBackIconBox}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../assets/icons/Dropdown.webp")}
            style={styles.goBackIcon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Mine lån</Text>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoIcon}>i</Text>
        </View>
      </View>

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
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#363636",
    textAlign: "center",
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
  goBackIcon: {
    height: 15,
    width: 15,
    transform: [{ rotate: "90deg" }],
  },
  goBackIconBox: {
    backgroundColor: "#E7E7E7",
    padding: 10,
    borderRadius: 8,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  loanHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  infoIconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#363636",
  },
  infoIcon: {
    fontSize: 16,
    fontWeight: 900,
    color: "#363636"
  }
});

export default Selaan;
