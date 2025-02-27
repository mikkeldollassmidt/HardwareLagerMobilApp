import AsyncStorage from "@react-native-async-storage/async-storage";
const getUserData = async () => {
  const fullname = await AsyncStorage.getItem("fullname");
  return fullname || "Fejl";
};

export default getUserData;