import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { getAllCategories } from "../Api_intergration/categoryApi";  // Assuming this path
import { getAllTypes } from "../Api_intergration/typeApi";  // Assuming this path

// Custom Checkbox Component
const CustomCheckbox = ({ label, isChecked, onChange }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const Popup = ({
  isVisible,
  selectedOption,
  onClose,
  onReset,
  onShowResults,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [categories, setCategories] = useState([]); // State to hold categories
  const [types, setTypes] = useState([]); // State to hold types

  useEffect(() => {
    if (selectedOption === "Kategori") {
      getAllCategories()
        .then((data) => {
          console.log("Fetched Categories:", data);  // Log the fetched categories
          setCategories(data);  // Set categories data
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    } else if (selectedOption === "Type") {
      getAllTypes()
        .then((data) => {
          console.log("Fetched Types:", data);  // Log the fetched types
          setTypes(data);  // Set types data
        })
        .catch((error) => {
          console.error("Error fetching types:", error);
        });
    }
  }, [selectedOption]);

  const handleCheckboxChange = (checkbox) => {
    setSelectedOptions((prev) => ({ ...prev, [checkbox]: !prev[checkbox] }));
  };

  const renderOptions = () => {
    const data = selectedOption === "Kategori" ? categories : types;
    return data.map((item) => (
      <CustomCheckbox
        key={item.id}  // Make sure 'id' is correct
        label={item.name}  // Make sure 'name' is correct
        isChecked={selectedOptions[item.id] || false}
        onChange={() => handleCheckboxChange(item.id)}
      />
    ));
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      key={selectedOption}  // Forces re-render when 'selectedOption' changes
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          {/* Header with Close Button, Title, and Nulstil Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Entypo style={styles.closeButtonText} name="cross" size={26} />
            </TouchableOpacity>
            <Text style={styles.title}>{selectedOption}</Text>
            <TouchableOpacity onPress={onReset} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Nulstil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxOuterContainer}>{renderOptions()}</View>

          {/* Show Results Button */}
          <TouchableOpacity
            onPress={onShowResults}
            style={styles.showResultsButton}
          >
            <Text style={styles.showResultsButtonText}>Vis resultater</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Black background with 20% opacity
  },
  popupContainer: {
    width: "87%",
    padding: 20,
    paddingBottom: 150,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    color: "#363636",
  },
  closeButton: {
    backgroundColor: "#F0F0F0",
    padding: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#C2C2C2",
    fontWeight: "bold",
    textAlign: "center",
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    color: "#363636",
    fontWeight: 700,
    marginBottom: 10,
  },
  resetButton: {
    padding: 5,
  },
  resetButtonText: {
    color: "#08B6CF",
    fontSize: 15,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  checkboxOuterContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", // Allows the checkboxes to wrap to the next line if needed
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#363636",
  },
  checkbox: {
    width: 13,
    height: 13,
    borderWidth: 2,
    borderColor: "#363636",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 50,
  },
  checked: {
    backgroundColor: "#363636",
  },
  checkmark: {
    width: 8,
    height: 8,
    backgroundColor: "white",
    borderRadius: 50,
  },
  checkboxLabel: {
    fontSize: 15,
    marginVertical: 5,
    color: "#363636",
    fontWeight: 500,
  },
  showResultsButton: {
    backgroundColor: "#363636",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  showResultsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Popup;
