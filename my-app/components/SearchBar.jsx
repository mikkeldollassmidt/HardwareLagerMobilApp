import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the search icon
import SearchOption from "./SearchOption";
import Popup from "./SearchPopup"; // Import the Popup component

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterFlipped, setIsFilterFlipped] = useState(false); // State for filter flip
  const [isSearchOptionsVisible, setIsSearchOptionsVisible] = useState(false); // State for showing/hiding search options
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedOption, setSelectedOption] = useState(""); // Selected option state

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

  const handleOptionPress = (option) => {
    setSelectedOption(option); // Set selected option
    setIsModalVisible(true); // Show the modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleReset = () => {
    setIsModalVisible(false); // Reset the modal
    // Additional reset logic if necessary
  };

  const handleShowResults = () => {
    // Add your result showing logic here
    console.log("Show results clicked");
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
            <SearchOption option="Kategori" onPress={handleOptionPress} />
            <SearchOption option="Type" onPress={handleOptionPress} />
            <SearchOption option="Låne periode" onPress={handleOptionPress} />
          </>
        )}
      </Animated.View>

      {/* Use the Popup component here */}
      <Popup
        isVisible={isModalVisible}
        selectedOption={selectedOption}
        onClose={handleCloseModal}
        onReset={handleReset}
        onShowResults={handleShowResults}
      />
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
