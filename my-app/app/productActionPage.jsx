import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { scanQrCode } from "../Api_intergration/userHardwareApi";

// Dummy function to simulate fetching product details
const fetchProductDetails = async (id) => {
    try {
        const data = await scanQrCode(id);
        console.log(data); // Check if the data is retrieved correctly
        return {
            title: data.hardwareName || "Ukendt produkt",
            hardwarePicture: data.hardwarePicture, // If API provides imageUrl, replace accordingly
            category: data.hardwareCategory?.[0] || "Ukendt",
            description: data.hardwareDescription || "Ingen beskrivelse tilgængelig",
        };
    } catch (error) {
        console.error("Failed to fetch product details:", error);
        return {
            title: "Ukendt produkt",
            hardwarePicture: "",
            category: "Ukendt",
            description: "Ingen beskrivelse tilgængelig",
        };
    }
};

const productActionPage = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const productDetails = await fetchProductDetails(id);
                setProduct(productDetails); // Update state only after the async data fetch completes
            };
            fetchData();
        }
    }, [id]);

    if (!product) return <Text>Indlæser produkt...</Text>;

    // Check if product.hardwarePicture is valid, otherwise set a fallback
    const imageSource = product.hardwarePicture ? { uri: product.hardwarePicture } : require("../assets/images/test.webp"); // Assuming placeholder image exists

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.goBackIconBox}
                onPress={() => router.back()}
            >
                <Image
                    source={require("../assets/icons/Dropdown.webp")}
                    style={styles.goBackIcon}
                />
            </TouchableOpacity>

            <View style={styles.productImageContainer}>
                <Image source={imageSource} style={styles.productImage} />
            </View>

            <View style={styles.textContainer}>
                <View style={styles.textHeaderContainer}>
                    <Text style={styles.headerText}>{product.title}</Text>
                    <Text style={styles.typeText}>{product.category}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionHeader}>Beskrivelse</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Tjek tilgængelighed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
    },
    productImageContainer: {
        maxWidth: "100%",
        overflow: "hidden",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    productImage: {
        height: 400,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 100,
        padding: 20,
    },
    loanButton: {
        backgroundColor: "#08B5CF",
        width: "100%",
        padding: 13,
        borderRadius: 10,
        position: "absolute",
        top: 15,
    },
    loanButtonText: {
        fontSize: 17,
        fontWeight: "500",
        color: "white",
        textAlign: "center",
    },
    deliverButton: {
        backgroundColor: "#D0F6FC",
        width: "100%",
        padding: 13,
        borderRadius: 10,
        position: "absolute",
        top: 15,
    },
    deliverButtonText: {
        fontSize: 17,
        fontWeight: "500",
        color: "#08B6CF",
        textAlign: "center",
    },
    textContainer: {
        padding: 20,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold",
        flexShrink: 1,
        flexWrap: "wrap",
        color: "#363636",
        maxWidth: "75%",
    },
    typeText: {
        fontSize: 15,
        color: "#08B5CF",
        fontWeight: "500",
        paddingHorizontal: 15,
        paddingVertical: 3,
        maxHeight: 25,
        textAlign: "center",
        backgroundColor: "#D0F6FC",
        borderRadius: 8,
    },
    descContainer: {
        marginTop: 10,
    },
    descHeader: {
        fontSize: 14,
        fontWeight: 600,
        color: "#363636",
    },
    descSubheader: {
        fontSize: 13,
        color: "#363636",
    },
    goBackIcon: {
        height: 15,
        width: 15,
        transform: [{ rotate: "90deg" }],
    },
    goBackIconBox: {
        backgroundColor: "white",
        padding: 10,
        position: "absolute",
        zIndex: 999,
        borderRadius: 8,
        left: 20,
        top: Platform.OS === 'ios' ? 60 : 20,
    },
    textHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    descriptionHeader: {
        fontSize: 15,
        fontWeight: 600,
        color: "#363636",
    },
    description: {
        color: "#363636",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 100,
        padding: 20,
    },
    button: {
        backgroundColor: "#08B5CF",
        width: "100%",
        padding: 13,
        borderRadius: 10,
        position: "absolute",
        top: 15,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "500",
        color: "white",
        textAlign: "center",
    },
});
export default productActionPage;