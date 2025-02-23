import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ColorList from "../components/ColorList";

const Konto = () => {
  return (
    <View style={styles.container}>
      <ColorList color="#00ff51"></ColorList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default Konto;
