import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ColorList from "../components/ColorList";

const Mere = () => {
  return (
    <View style={styles.container}>
      <ColorList color="#ff00ea"></ColorList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default Mere;
