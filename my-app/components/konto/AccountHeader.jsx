import {
  View,
  Text,
  StyleSheet,
  Image,
  DeviceEventEmitter,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getuserbyid } from "../../Api_intergration/userApi";
const AccountHeader = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const fetchUserData = async () => {
    try {
      const storedFullname = await AsyncStorage.getItem("fullname");
      if (storedFullname) {
        setFullname(storedFullname);
      }

      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const userData = await getuserbyid(userId);
        setEmail(userData.email.emailAddress);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Listen for name updates
    const listener = DeviceEventEmitter.addListener(
      "fullnameUpdated",
      (newFullname) => {
        setFullname(newFullname);
      }
    );

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.accountHeader}>
      <View style={styles.outerBorder}>
        <View style={styles.innerBorder}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
            }}
            style={styles.accountPic}
          />
        </View>
      </View>

      <View style={styles.accountInfo}>
        <Text style={styles.accountFullname}>{fullname}</Text>
        <Text style={styles.accountEmail}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountHeader: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    marginBottom: 15,
  },
  outerBorder: {
    borderWidth: 2,
    borderColor: "#08B6CF",
    borderRadius: 50,
  },
  innerBorder: {
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 50,
  },
  accountPic: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  accountInfo: {
    marginLeft: 10,
  },
  accountFullname: {
    fontWeight: 700,
    fontSize: 18,
    color: "#363636",
  },
  accountEmail: {
    color: "#A1A1A1",
    fontWeight: 450,
    fontSize: 15,
  },
});

export default AccountHeader;
