import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const LoanPeriodPicker = ({ isVisible, onClose, onConfirm }) => {
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const validateDate = (date) => {
    const regex = /^(\d{2})-(\d{2})-(\d{2}):(\d{2})$/;
    return regex.test(date);
  };

  const handleConfirm = () => {
    if (!validateDate(startDate) || !validateDate(endDate)) {
      alert("Ugyldigt format! Brug: MM-DD-HH:MM");
      return;
    }

    const [startMonth, startDay, startHour, startMinute] = startDate.split(/[-:]/).map(Number);
    const [endMonth, endDay, endHour, endMinute] = endDate.split(/[-:]/).map(Number);

    const startDateTime = new Date(currentYear, startMonth - 1, startDay, startHour, startMinute);
    const endDateTime = new Date(currentYear, endMonth - 1, endDay, endHour, endMinute);

    const timeDiff = endDateTime - startDateTime;
    const maxDiff = 60 * 60 * 24 * 60 * 1000; // Max 2 months difference

    if (timeDiff <= 0 || timeDiff > maxDiff) {
      alert("Slutdatoen skal være højst 2 måneder efter startdatoen!");
      return;
    }

    onConfirm({
      startDate: `${currentYear}-${startDate}`,
      endDate: `${currentYear}-${endDate}`,
    });

    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Entypo name="cross" size={26} color="#C2C2C2" />
            </TouchableOpacity>
            <Text style={styles.title}>Vælg låneperiode</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text>Startdato (MM-DD-HH:MM):</Text>
            <TextInput
              style={styles.input}
              placeholder="MM-DD-HH:MM"
              value={startDate}
              onChangeText={setStartDate}
              keyboardType="numeric"
            />

            <Text>Slutdato (MM-DD-HH:MM):</Text>
            <TextInput
              style={styles.input}
              placeholder="MM-DD-HH:MM"
              value={endDate}
              onChangeText={setEndDate}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Bekræft</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  container: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#F0F0F0",
    padding: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#363636",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoanPeriodPicker;