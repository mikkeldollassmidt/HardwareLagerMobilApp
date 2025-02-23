import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ColorList from "../components/ColorList";

const QRScan = () => {
  return (
    <View style={styles.container}>
      <ColorList color="#ff7300"></ColorList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default QRScan;
