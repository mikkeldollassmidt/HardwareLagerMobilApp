import { StyleSheet, Platform, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AvailableHardwareScreen, AllHardwareScreen } from "../components/ShowProductsFromSearch";
import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";

const SearchPage = () => {
    const navigation = useNavigation();
    const { fromBanner } = useLocalSearchParams();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons
                    style={styles.goBackIcon}
                    name="arrow-back"
                    size={20}
                    color="black"
                />
            </TouchableOpacity>
            <SearchBar />
            {fromBanner === "true" ? <AllHardwareScreen /> : <AvailableHardwareScreen />}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "ios" ? 70 : 0,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    footerSpacing: {
        height: 50,
    },
    footerText: {
        textAlign: "center",
        padding: 10,
        fontSize: 16,
        color: "#888",
    },
    goBackButton: {
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    goBackIcon: {
        margin: 0,
        padding: 0,
        color: "#363636",
    },
});

export default SearchPage;
