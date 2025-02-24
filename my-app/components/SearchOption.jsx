import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const SearchOption = ({ option, onPress }) => {
  // Conditional image selection based on the option
  const iconSource =
    option === "Låne periode"
      ? require("../assets/icons/Date.webp") // Custom icon for "Låne Periode"
      : require("../assets/icons/Dropdown.webp"); // Default dropdown icon

  // Conditional icon style for "Låne periode"
  const iconStyle =
    option === "Låne periode"
      ? styles.loanPeriodIcon // Different style for "Låne periode"
      : styles.searchOptionIcon; // Default icon style

  return (
    <TouchableOpacity
      style={styles.searchOption}
      onPress={() => onPress(option)}
    >
      <Text style={styles.searchOptionText}>{option}</Text>
      <Image source={iconSource} style={iconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchOption: {
    borderWidth: 2,
    borderColor: "#363636",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchOptionText: {
    fontWeight: "700",
    fontSize: 15,
  },
  searchOptionIcon: {
    height: 12,
    width: 12,
    marginLeft: 10,
  },
  loanPeriodIcon: {
    height: 16,
    width: 16,
    marginLeft: 10,
  },
});

export default SearchOption;
