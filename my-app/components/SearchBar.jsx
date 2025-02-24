import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons"; // For the search icon
import SearchOption from "./SearchOption";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterFlipped, setIsFilterFlipped] = useState(false); // State for filter flip
  const [isSearchOptionsVisible, setIsSearchOptionsVisible] = useState(false); // State for showing/hiding search options

  const slideAnim = useRef(new Animated.Value(0)).current; // Initial position for sliding

  const handleFilterPress = () => {
    setIsFilterFlipped(!isFilterFlipped); // Flip the filter icon
    const toValue = isSearchOptionsVisible ? 0 : 45; // Animate to 0 or 45 based on visibility
    setIsSearchOptionsVisible(!isSearchOptionsVisible); // Toggle visibility of search options

    // Animate the search options sliding effect
    Animated.timing(slideAnim, {
      toValue: toValue, // Slide up (0) or down (45)
      duration: 300,
      useNativeDriver: false, // we are animating the height, so this cannot be native driver
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]} // Style change on focus
          placeholder="Søg..."
          placeholderTextColor="#888"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Ionicons name="search" size={20} color="#363636" style={styles.icon} />
        <TouchableOpacity onPress={handleFilterPress}>
          <Image
            source={require("../assets/icons/Filter.webp")}
            style={[
              styles.filterIcon,
              { transform: [{ scaleX: isFilterFlipped ? -1 : 1 }] },
            ]} // Flip horizontally
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.searchOptionContainer,
          {
            height: slideAnim, // animated height
            overflow: "hidden", // Hide overflow during animation
          },
        ]}
      >
        {isSearchOptionsVisible && (
          <>
            <SearchOption option="Kategori" />
            <SearchOption option="Type" />
            <SearchOption option="Låne periode" />
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "start",
    alignContent: "start",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#E7E7E7",
    borderRadius: 10,
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
    top: "-12",
  },
  searchOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "-10",
    marginBottom: 10,
  },
});

export default SearchBar;
