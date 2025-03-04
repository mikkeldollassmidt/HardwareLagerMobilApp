import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const GetInfiniteProducts = ({ products, loading, loadMore, hasMoreProducts }) => {
    const router = useRouter();

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.touchableContainer}
                onPress={() => {
                    // Pass product details as params using router.push
                    router.push({
                        pathname: "/viewProductPage",
                        params: {
                            id: item.id,
                            title: item.name,
                            imageUrl: item.imageUrl || "https://via.placeholder.com/150",
                            category: item.type || "Unknown Type",
                            description: item.description || "No description available",
                        },
                    });
                }}
            >
                <View style={styles.productBox}>
                    <Image style={styles.productImage} source={{ uri: item.imageUrl }} />
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                        {item.name}
                    </Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>● </Text>
                        <Text style={styles.category}>{item.type}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderLoader = () => {
        return loading && hasMoreProducts ? (
            <View style={styles.loaderStyle}>
                <ActivityIndicator size="large" color="#08B5CF" />
            </View>
        ) : null;
    };

    const handleEndReached = () => {
        // Only load more if there are more products available
        if (hasMoreProducts) {
            loadMore();
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Ensure two columns
                columnWrapperStyle={styles.row} // Add space between columns
                ListFooterComponent={renderLoader}
                onEndReached={handleEndReached} // Check if more products can be loaded
                onEndReachedThreshold={0.1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: '100%',
        flex: 1,
    },
    productBox: {
        width: '170', // Adjust the width for space between items
        marginBottom: 15,
        borderRadius: 8,
    },
    productImage: {
        height: 110,
        width: '100%',
        borderRadius: 8,
        marginBottom: 5,
    },
    categoryContainer: {
        flexDirection: "row",
    },
    category: {
        fontSize: 12,
        color: "#08B6CF",
    },
    title: {
        fontWeight: "700",
        fontSize: 14,
        width: "100%",
        color: "#363636",
    },
    row: {
        flex: 1,
        justifyContent: "space-between", // Add space between the columns
        marginBottom: 10,
    },
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
    },
});

export default GetInfiniteProducts;
