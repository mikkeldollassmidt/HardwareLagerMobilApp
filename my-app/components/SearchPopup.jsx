import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Entypo } from "@expo/vector-icons";
import { getAllCategories } from "../Api_intergration/categoryApi";
import { getAllTypes } from "../Api_intergration/typeApi";
import { getAvailableUserHardware } from "../Api_intergration/userHardwareApi";

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

const Popup = ({ isVisible, selectedOption, searchText, onClose, onReset, onShowResults }) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedTypeIds, setSelectedTypeIds] = useState([]);

    // Get current date/time
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentDay = String(now.getDate()).padStart(2, "0");
    const currentHour = String(now.getHours()).padStart(2, "0");
    const currentMinute = String(now.getMinutes()).padStart(2, "0");

    // Start date defaults to current date/time
    const [startDate, setStartDate] = useState(`${currentYear}-${currentMonth}-${currentDay}-${currentHour}:${currentMinute}`);
    const [selectedWeeks, setSelectedWeeks] = useState("1"); // Default to 1 week

    useEffect(() => {
        if (selectedOption === "Kategori") {
            getAllCategories()
                .then((data) => setCategories(data))
                .catch((error) => console.error("Error fetching categories:", error));
        } else if (selectedOption === "Type") {
            getAllTypes()
                .then((data) => setTypes(data))
                .catch((error) => console.error("Error fetching types:", error));
        }
    }, [selectedOption]);

    const validateDate = (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/; // Format: YYYY-MM-DD-HH:MM
        return regex.test(date);
    };

    const handleShowResults = async () => {
        if (!validateDate(startDate)) {
            alert("Ugyldigt format!\nStart dato: YYYY-MM-DD-HH:MM");
            return;
        }

        // Prepare API parameters
        const params = {
            categoryIds: selectedCategoryIds,
            typeIds: selectedTypeIds,
            weeks: parseInt(selectedWeeks), // Convert selected weeks to a number
            searchString: searchText,
            startDate: startDate,
        };

        try {
            const response = await getAvailableUserHardware(params);
            console.log("Available Hardware:", response);
            alert("Data fetched successfully!");
        } catch (error) {
            console.error("Error fetching hardware:", error);
            alert("Kunne ikke hente tilgængeligt hardware.");
        }

        onClose(); // Close modal after fetching results
    };

    const renderOptions = () => {
        if (selectedOption === "Kategori") {
            return (
                <View style={styles.checkboxOuterContainer}>
                    {categories.map((item) => (
                        <CustomCheckbox
                            key={item.id}
                            label={item.name}
                            isChecked={selectedCategoryIds.includes(item.id)}
                            onChange={() => {
                                setSelectedCategoryIds((prev) =>
                                    prev.includes(item.id)
                                        ? prev.filter((selectedId) => selectedId !== item.id)
                                        : [...prev, item.id]
                                );
                            }}
                        />
                    ))}
                </View>
            );
        } else if (selectedOption === "Type") {
            return (
                <View style={styles.checkboxOuterContainer}>
                    {types.map((item) => (
                        <CustomCheckbox
                            key={item.id}
                            label={item.name}
                            isChecked={selectedTypeIds.includes(item.id)}
                            onChange={() => {
                                setSelectedTypeIds((prev) =>
                                    prev.includes(item.id)
                                        ? prev.filter((selectedId) => selectedId !== item.id)
                                        : [...prev, item.id]
                                );
                            }}
                        />
                    ))}
                </View>
            );
        } else if (selectedOption === "Låne periode") {
            return (
                <View style={styles.dateInputContainer}>
                    <Text style={styles.label}>Startdato (YYYY-MM-DD-HH:MM):</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="YYYY-MM-DD-HH:MM"
                        value={startDate}
                        onChangeText={setStartDate}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Vælg antal uger:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedWeeks}
                            onValueChange={(itemValue) => setSelectedWeeks(itemValue)}
                            style={styles.picker}
                        >
                            {[...Array(8).keys()].map((num) => (
                                <Picker.Item key={num + 1} label={`${num + 1}`} value={`${num + 1}`} />
                            ))}
                        </Picker>
                    </View>
                </View>
            );
        }
        return null;
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.popupContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Entypo style={styles.closeButtonText} name="cross" size={26} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{selectedOption}</Text>
                        <TouchableOpacity onPress={onReset} style={styles.resetButton}>
                            <Text style={styles.resetButtonText}>Nulstil</Text>
                        </TouchableOpacity>
                    </View>

                    {renderOptions()}

                    <TouchableOpacity onPress={handleShowResults} style={styles.showResultsButton}>
                        <Text style={styles.showResultsButtonText}>Vis resultater</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        borderWidth: 2,
        borderColor: "#363636",
        borderRadius: 8,
        marginVertical: 5,
    },
    picker: {
        height: 50,
        width: "100%",
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 5,
        color: "#363636",
    },
    input: {
        borderWidth: 2,
        borderColor: "#363636",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        width: "100%",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
        fontWeight: "700",
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
        flexWrap: "wrap",
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
        backgroundColor: "#363636",
        borderRadius: 50,
    },
    checkboxLabel: {
        fontSize: 15,
        marginVertical: 5,
        color: "#363636",
        fontWeight: "500",
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
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
    },
    title: {
        fontSize: 18,
        flex: 1,
        textAlign: "center",
        color: "#363636",
        fontWeight: "700",
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
    dateInputContainer: {
        marginBottom: 20,
        width: "100%",
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 5,
        color: "#363636",
    },
    input: {
        borderWidth: 2,
        borderColor: "#363636",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        width: "100%",
    },
    showResultsButton: {
        backgroundColor: "#363636",
        paddingVertical: 10,
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
