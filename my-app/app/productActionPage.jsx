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

// Dummy function to simulate fetching product details
const fetchProductDetails = (id) => {
  const dummyProducts = {
    1: {
      title: "Produkt A",
      imageUrl:
        "https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/images-4.fill.size_2000x1125.v1723100793.jpg",
      category: "Kategori 1",
      description: "Beskrivelse af produkt A",
    },
    2: {
      title: "Produkt B",
      imageUrl:
        "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D",
      category: "Kategori 2",
      description: "Beskrivelse af produkt B",
    },
  };
  return (
    dummyProducts[id] || {
      title: "Ukendt produkt",
      imageUrl: "",
      category: "Ukendt",
      description: "Ingen beskrivelse tilgængelig",
    }
  );
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
      const productDetails = fetchProductDetails(id);
      setProduct(productDetails);
    }
  }, [id]);

  if (!product) return <Text>Indlæser produkt...</Text>;

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
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
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
        <View style={styles.categoryOuterContainer}>
          <Text style={styles.categoryHeader}>Kategorier</Text>

          {/* Category: */}
          <View style={styles.categoryContainer}>
            <View style={styles.categoryBox}>
              <Text style={styles.category}>Computer</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.category}>Faldskærmsudspring</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.category}>Køkkentilbehør</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.category}>Fjersny</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.category}>Kabler</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.category}>Andet</Text>
            </View>
            <View style={styles.categoryBox}>
              <Text style={styles.category}>Gamingudstyr</Text>
            </View>
          </View>
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
    top: Platform.OS === "ios" ? 60 : 20,
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
  categoryOuterContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryHeader: {
    fontWeight: 600,
    marginBottom: 5,
    color: "#363636",
  },
  categoryBox: {
    backgroundColor: "#D0F6FC",
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  category: {
    fontWeight: 500,
    color: "#08B5CF",
  },
});
export default productActionPage;
