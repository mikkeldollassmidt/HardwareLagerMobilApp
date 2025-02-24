import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  CheckBox,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

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
  const [selectedOptions, setSelectedOptions] = useState({
    Test1: false,
    Test2: false,
    Test3: false,
  });

  const handleCheckboxChange = (checkbox) => {
    setSelectedOptions((prev) => ({ ...prev, [checkbox]: !prev[checkbox] }));
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true} // No overlay background
      animationType="fade"
      onRequestClose={onClose} // Prevent closing when tapping outside
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

          <View style={styles.checkboxOuterContainer}>
            <CustomCheckbox
              label="Test1"
              isChecked={selectedOptions.Test1}
              onChange={() => handleCheckboxChange("Test1")}
              style={styles.checkBoxBox}
            />
            <CustomCheckbox
              label="Test2"
              isChecked={selectedOptions.Test2}
              onChange={() => handleCheckboxChange("Test2")}
              style={styles.checkBoxBox}
            />
            <CustomCheckbox
              label="Test3"
              isChecked={selectedOptions.Test3}
              onChange={() => handleCheckboxChange("Test3")}
              style={styles.checkBoxBox}
            />
          </View>

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
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Black background with 10% opacity
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
  checkBoxBox: {
    borderwidth: 2,
    borderColor: "black",
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
