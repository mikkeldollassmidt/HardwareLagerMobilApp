import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserData = async () => {
  const fullname = await AsyncStorage.getItem("fullname");
  return fullname || "User"; // Return a fallback name if fullname doesn't exist
};

export default getUserData;
