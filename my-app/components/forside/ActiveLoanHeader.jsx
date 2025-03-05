import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getActiveLoansByUserId } from "../../Api_intergration/userHardwareApi";
import { useRouter } from "expo-router"; // Import useRouter

const ActiveLoanHeader = () => {
    const [activeLoanCount, setActiveLoanCount] = useState(0);
    const [userId, setUserId] = useState(null);
    const router = useRouter(); // Use useRouter for navigation

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                }
            } catch (error) {
                console.error("Error fetching userId from storage:", error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchActiveLoans = async () => {
                try {
                    const activeLoans = await getActiveLoansByUserId(userId);
                    setActiveLoanCount(activeLoans.length);
                } catch (error) {
                    console.error("Error fetching active loans:", error);
                }
            };

            fetchActiveLoans();
        }
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.activeText}>
                Du har {activeLoanCount} aktive lån
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/searchPage")}>
                <Text style={styles.buttonText}>Se mine lån</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonText: {
        color: "#363636",
        fontWeight: "700",
        fontSize: 16,
    },
    activeText: {
        color: "#08B6CF",
        fontWeight: "500",
        fontSize: 16,
    },
});

export default ActiveLoanHeader;
