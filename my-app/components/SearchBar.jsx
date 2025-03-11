import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchOption from "./SearchOption";
import Popup from "./SearchPopup";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterFlipped, setIsFilterFlipped] = useState(false);
  const [isSearchOptionsVisible, setIsSearchOptionsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleFilterPress = () => {
    setIsFilterFlipped(!isFilterFlipped);
    const toValue = isSearchOptionsVisible ? 0 : 45;
    setIsSearchOptionsVisible(!isSearchOptionsVisible);

    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleReset = () => {
    setIsModalVisible(false);
  };

  const handleShowResults = () => {
    console.log("Show results clicked with search:", searchText);
    setIsModalVisible(true); // Open modal when Enter is pressed
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          placeholder="Søg..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleShowResults} // 🔹 Call handleShowResults on Enter key press
          returnKeyType="search" // Changes keyboard button to "Search"
        />
        <Ionicons name="search" size={20} color="#363636" style={styles.icon} />
        <TouchableOpacity onPress={handleFilterPress}>
          <Image
            source={require("../assets/icons/Filter.webp")}
            style={[
              styles.filterIcon,
              { transform: [{ scaleX: isFilterFlipped ? -1 : 1 }] },
            ]}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.searchOptionContainer,
          {
            height: slideAnim,
            overflow: "hidden",
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

      {/* Pass searchText as a prop to Popup */}
      <Popup
        isVisible={isModalVisible}
        selectedOption={selectedOption}
        searchText={searchText}
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
    backgroundColor: "#f2f2f2",
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
