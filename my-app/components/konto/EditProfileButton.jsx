import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const ActionButton = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Rediger konto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#08B6CF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: 600,
  },
  button: {
    backgroundColor: "#D0F6FC",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 25
},
});

export default ActionButton;
