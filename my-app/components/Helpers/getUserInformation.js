import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserData = async () => {
  const fullname = await AsyncStorage.getItem("fullname");
  return fullname || "Fejl"; // Return a fallback name if fullname doesn't exist
};

export default getUserData;
