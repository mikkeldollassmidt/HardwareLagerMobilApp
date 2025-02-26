import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Product from "../Product";
import {
    getAvailableUserHardware,
    getAllUserHardware,
    getActiveLoansByUserId,
} from "../../Api_intergration/userHardwareApi";

const RetrieveProductPage = ({
    headerText,
    limit,
    startIndex,
    endpointType,
    userId,
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const today = new Date();
                const isoDate = today.toISOString();
                let data = [];

                if (endpointType === "available") {
                    data = await getAvailableUserHardware({
                        categoryIds: [],
                        typeIds: [],
                        weeks: 4,
                        searchString: "",
                        startDate: isoDate,
                    });
                } else if (endpointType === "all") {
                    data = await getAllUserHardware();
                } else if (endpointType === "history" && userId) {
                    // Only fetch history if userId is provided
                    data = await getActiveLoansByUserId(userId);
                }

                const slicedData = data.slice(startIndex, startIndex + limit);
                setProducts(slicedData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [limit, startIndex, endpointType, userId]); // Re-fetch when any dependency changes

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{headerText}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#08B6CF" />
            ) : (
                <FlatList
                    style={styles.productContainer}
                    data={products}
                    keyExtractor={(item, index) => `${item.id}-${item.userId}-${index}`} // Unique key extractor
                    numColumns={2}
                    columnWrapperStyle={styles.row} // Apply row styling
                    renderItem={({ item }) => (
                        <Product
                            imageUrl={item.imageUrl || "https://via.placeholder.com/150"}
                            title={item.name || "Unknown Product"}
                            category={item.type || "Unknown Type"}
                        />
                    )}
                />
            )}
        </View>
    );
}
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
        productContainer: {
            width: "100%",
        },
        row: {
            flex: 1,
            justifyContent: "space-between", // Ensures proper spacing
            marginBottom: 10, // Adds spacing between rows
        },
    });

    export default RetrieveProductPage;
