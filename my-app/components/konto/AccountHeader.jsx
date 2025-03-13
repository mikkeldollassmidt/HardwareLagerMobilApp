import {
  View,
  Text,
  StyleSheet,
  Image,
  DeviceEventEmitter,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getuserbyid } from "../../Api_intergration/userApi";
import { useFocusEffect } from "@react-navigation/native";

const AccountHeader = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  // Get userdata
  const fetchUserData = async () => {
    try {
      const storedFullname = await AsyncStorage.getItem("fullname");
      if (storedFullname) {
        setFullname(storedFullname);
      }

      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
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

    // Listen after changes on fullname
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

  // Update fullname when the pages is on focus
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

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
        <View style={styles.accountHeaderInfo}>
          <Text style={styles.accountFullname}>{fullname}</Text>
          <Text style={styles.accountUsername}>{username}</Text>
        </View>
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
    maxWidth: "300",
    alignItems: "flex-start",
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
  accountUsername: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    fontSize: 15,
    fontWeight: 500,
    borderRadius: 6,
    color: "white",
    backgroundColor: "#08B6CF",
    marginLeft: 10,
    marginBottom: 5
  },
  accountHeaderInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  }
});

export default AccountHeader;
