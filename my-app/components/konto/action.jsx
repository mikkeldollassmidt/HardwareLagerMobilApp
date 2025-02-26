import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import * as Icons from "@expo/vector-icons";

const Action = ({ iconLibrary, iconName, title, isRedirect }) => {
  const checkRedirect = isRedirect === "true";

  const IconComponent = Icons[iconLibrary] || Icons.MaterialCommunityIcons;

  return (
    <View style={styles.actionContainer}>
      <View style={styles.actionBox}>
        <IconComponent style={styles.icon} name={iconName} size={23} />
        <Text style={styles.title}>{title}</Text>

        {checkRedirect && (
          <Image
            source={require("../../assets/icons/Dropdown.webp")}
            style={styles.directIcon}
          />
        )}
      </View>
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
  },
  icon: {
    color: "#08B6CF",
    backgroundColor: "#D0F6FC",
    padding: 5,
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
