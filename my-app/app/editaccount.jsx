import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getuserbyid, updateUser } from "../Api_intergration/userApi";

const EditAccount = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);

  // Remove header
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Retrieve userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };
    fetchUserId();
  }, []);

  // Fetch user data once userId is available
  useEffect(() => {
    if (!userId) return; // Prevent calling API if userId is not available

    const fetchUserData = async () => {
      try {
        const data = await getuserbyid(userId);
        if (data) {
          setEmail(data.email?.emailAddress || "");
          setFullname(data.fullname || "");
          setUsername(data.username || "");
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, [userId]); // Runs when userId changes

  // Update user data
  const updateUserData = async () => {
    if (!userId) return;
    try {
      const updatedUser = await updateUser(userId, {
        username,
        fullname,
      });
      console.log("User updated:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
    await AsyncStorage.setItem("fullname", fullname);
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <View style={styles.imageBox}>
          <View style={styles.editBox}>
            <Octicons style={styles.icon} name="pencil" size={30} />
          </View>
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
        </View>
      </View>
      <View style={styles.inputOuterContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.inputUneditable}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={false}
          />

          <Text style={styles.inputHeader}>Fulde navn</Text>
          <TextInput
            style={styles.input}
            placeholder="Fulde navn"
            value={fullname}
            onChangeText={setFullname}
            keyboardType="default"
            autoCapitalize="words"
          />

          <Text style={styles.inputHeader}>Brugernavn</Text>
          <TextInput
            style={styles.input}
            placeholder="Brugernavn"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            autoCapitalize="none"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={updateUserData} style={styles.buttonSave}>
          <Text style={styles.buttonTextSave}>Gem ændringer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Annuller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const baseInputStyle = {
  marginBottom: 20,
  padding: 13,
  borderRadius: 6,
  fontSize: 16,
  paddingVertical: 10,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 70 : 0,
    backgroundColor: "white",
    height: "100%",
  },
  outerBorder: {
    borderWidth: 3,
    borderColor: "#08B6CF",
    borderRadius: 200,
  },
  innerBorder: {
    borderWidth: 8,
    borderColor: "white",
    borderRadius: 200,
  },
  accountPic: {
    height: 200,
    width: 200,
    borderRadius: 200,
  },
  imageHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  editBox: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 200,
    borderWidth: 8,
    borderColor: "white",
    position: "absolute",
    zIndex: 999,
    bottom: 0,
    right: 0,
  },
  icon: {
    color: "#363636",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 130,
    padding: 20,
  },
  buttonSave: {
    backgroundColor: "#08B5CF",
    padding: 13,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#D0F6FC",
    padding: 13,
    borderRadius: 10,
    flex: 1,
  },
  buttonTextSave: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#08B5CF",
    textAlign: "center",
  },
  inputOuterContainer: {
    padding: 20,
  },
  input: {
    ...baseInputStyle,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#363636",
    color: "#363636",
  },
  inputUneditable: {
    ...baseInputStyle,
    backgroundColor: "#D0F6FC",
    borderWidth: 2,
    borderColor: "#08B6CF",
    color: "#08B6CF",
  },
  inputHeader: {
    marginBottom: 5,
    fontSize: 17,
    fontWeight: 600,
  },
});

export default EditAccount;
