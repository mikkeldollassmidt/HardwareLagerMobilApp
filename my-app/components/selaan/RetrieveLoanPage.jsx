import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter
import Loan from "../Loan";
import { getActiveLoansByUserId } from "../../Api_intergration/userHardwareApi";

const RetrieveLoanPage = ({ headerText, limit, startIndex, userId }) => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Initialize router

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                setLoading(true);
                if (userId) {
                    const data = await getActiveLoansByUserId(userId);
                    const slicedData = data.slice(startIndex, startIndex + limit);
                    setLoans(slicedData);
                }
            } catch (error) {
                console.error("Error fetching loans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, [limit, startIndex, userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{headerText}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#08B6CF" />
            ) : (
                <FlatList
                    style={styles.loanContainer}
                    data={loans}
                    keyExtractor={(item) => `${item.id}`}
                    numColumns={2}
                    columnWrapperStyle={styles.column}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.touchableContainer}
                            onPress={() => {
                                // Pass loan details as params using router.push
                                router.push({
                                    pathname: "/productActionPage",
                                    params: {
                                        id: item.id, // Pass the loan id
                                        title: item.name, // Pass the loan name
                                        imageUrl: item.imageUrl || "https://via.placeholder.com/150", // Pass image URL
                                        category: item.type || "Unknown Type", // Pass category
                                        description: item.description || "No description available", // Pass description
                                    },
                                });
                            }}
                        >
                            <Loan
                                imageUrl={item.imageUrl || "https://via.placeholder.com/150"}
                                title={item.name || "Unknown Loan"}
                                category={item.type || "Unknown Type"}
                            />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        color: "#363636",
        marginBottom: 10,
        fontWeight: "800",
    },
    loanContainer: {
        width: "100%",
    },
    column: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: 10,
        width: "100%",
    },
});

export default RetrieveLoanPage;
