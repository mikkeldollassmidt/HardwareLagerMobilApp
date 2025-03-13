import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "./colors";
import { Gyroscope } from "expo-sensors";
import { useRouter } from "expo-router";


const Choice = ({ text, color = "default", type, route }) => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  const phoneNumber = '+4523479188';
  const message = 'Hej, jeg er blevet sendt fra ITDepot :)';

  const router = useRouter();

  const sendMessage = () => {
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl).catch(err => console.error('Error opening SMS app', err));
  };

  useEffect(() => {
    const subscribe = () => {
      Gyroscope.setUpdateInterval(500); // Update every 500ms
      return Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      });
    };

    const subscription = subscribe();

    return () => subscription && subscription.remove();
  }, []);

  if (type == null) {
    return (
      <TouchableOpacity style={styles.choiceBox} onPress={() => route && router.push(route)}>
        <Text
          style={[styles.logout, { color: colors[color] || colors.default }]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  } else if (type == "gyroscope") {
    return (
      <View style={styles.choiceBox}>
        <Text
          style={[styles.logout, { color: colors[color] || colors.default }]}
        >
          X: {data.x.toFixed(2)} Y: {data.y.toFixed(2)} Z {data.z.toFixed(2)}
        </Text>
      </View>
    );
  } else if (type == "sendsms") {
    return (
            <TouchableOpacity style={styles.choiceBox} onPress={sendMessage}>
            <Text
              style={[styles.logout, { color: colors[color] || colors.default }]}
            >
              Send en sms
            </Text>
          </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  choiceBox: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  logout: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Choice;
