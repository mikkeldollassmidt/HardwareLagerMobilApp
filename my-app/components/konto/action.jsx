import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as Icons from "@expo/vector-icons";

const Action = ({ iconLibrary, iconName, title, routePath }) => {
  const IconComponent = Icons[iconLibrary] || Icons.Feather;

  const showImage = title !== "Log ud";

  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity onPress={() => {}} style={styles.actionBox}>
        <IconComponent style={styles.icon} name={iconName} size={20} />
        <Text style={styles.title}>{title}</Text>

        {showImage && (
          <Image
            source={require("../../assets/icons/Dropdown.webp")}
            style={styles.directIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  icon: {
    color: "#08B6CF",
    backgroundColor: "#D0F6FC",
    padding: 8,
    borderRadius: 7,
    marginRight: 15,
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
    color: "#363636",
  },
  directIcon: {
    height: 13,
    width: 13,
    transform: [{ rotate: "-90deg" }],
    position: "absolute",
    right: 0,
  },
});

export default Action;
