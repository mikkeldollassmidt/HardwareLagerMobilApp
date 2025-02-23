import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ColorList from "../components/ColorList";

const Notifikation = () => {
  return (
    <View style={styles.container}>
      <ColorList color="#9403fc"></ColorList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default Notifikation;
