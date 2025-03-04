import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

// <View style={styles.loanBox}>
//   <Image
//     source={{
//       uri: imageUrl,
//     }}
//     style={styles.loanImage}
//   />
// <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
//   {title}
// </Text>
//   <View style={styles.categoryContainer}>
//     <Text style={styles.category}>● </Text>
//     <Text style={styles.category}>{category}</Text>
//   </View>
// </View>

const Loan = ({ imageUrl, title, category, isRented, deliveryDate }) => {
  return (
    <View style={styles.loanBox}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.loanImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryHeader}>Skal afleveres senest om</Text>
            <Text style={styles.deliveryDate}>2 dage</Text>
          </View>
          <Text style={styles.status}>Aktiv</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loanBox: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#D0F6FC",
    flexDirection: "row",
    padding: 8,
    borderRadius: 10,
  },
  loanImage: {
    height: 75,
    width: 70,
    borderRadius: 8,
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
    fontSize: 16,
    width: "100%",
    color: "#08B6CF",
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1, // Makes sure textContainer expands fully
  },
  deliveryContainer: {
    backgroundColor: "#08B6CF",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  deliveryHeader: {
    color: "#D0F6FC",
  },
  deliveryDate: {
    fontWeight: "600",
    color: "#D0F6FC",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 5
  },
  status: {
    color: "#08B6CF",
    marginLeft: "auto",
  },
});



export default Loan;
