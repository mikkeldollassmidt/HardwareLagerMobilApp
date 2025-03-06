import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useEffect } from "react";
import Notification from "../../components/notifikation/Notification";
import { useNavigation } from "expo-router";

const Notifikation = () => {
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
}, [navigation]);
  return (
    <View style={styles.container}>
      <Notification
        hardware="Macbook 2019"
        type="good"
        endDate="13-03-2025"
        messageDate="14-03-2025 13:27"
      />
      <Notification
        hardware="Macbook 2019"
        type="danger"
        endDate="13-03-2025"
        messageDate="13-03-2025 12:00"
      />
      <Notification
        hardware="Macbook 2019"
        type="warning"
        endDate="13-03-2025"
        messageDate="07-03-2025 16:40"
      />
      <Notification
        hardware="Macbook 2019"
        endDate="13-03-2025"
        messageDate="01-03-2025 12:00"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 0,
  },
});

export default Notifikation;
