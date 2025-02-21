import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { icons } from "../assets/icons";

const TabBarButton = ({ isFocused, routeName, color, onPress, onLongPress }) => {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          styles.container,
          routeName === "qrscan" ? styles.qrScanButton : null,
        ]}
      >
        {icons[routeName] ? (
          <View>{icons[routeName]({ color, isFocused })}</View> // Pass isFocused here
        ) : (
          <Text style={{ color: "red" }}>?</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
  },
  qrScanButton: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 70,
    height: 70,
    position: "absolute",
    bottom: -20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default TabBarButton;
