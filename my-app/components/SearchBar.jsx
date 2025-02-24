import { View, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // For the search icon

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]} // Style change on focus
        placeholder="Søg..."
        placeholderTextColor="#888"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Ionicons name="search" size={20} color="#363636" style={styles.icon} />
      <Image
        source={require("../assets/icons/Filter.webp")}
        style={styles.filterIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#E7E7E7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    flex: 1,
    height: 45,
    paddingRight: 75,
  },
  icon: {
    position: "absolute",
    right: 45,
  },
  filterIcon: {
    position: "absolute",
    right: 10,
    height: 24,
    width: 24,
  },
});

export default SearchBar;
