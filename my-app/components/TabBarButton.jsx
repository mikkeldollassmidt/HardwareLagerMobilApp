import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { icons } from "../assets/icons";

const TabBarButton = ({ isFocused, routeName, color, onPress, onLongPress }) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    if (routeName === "qrscan") {
      scale.value = withSpring(1.05, { damping: 2, stiffness: 100 }, () => {
        scale.value = withSpring(1, { damping: 5, stiffness: 150 });
      });
    }

    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={handlePress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          styles.container,
          routeName === "qrscan" ? styles.qrScanButton : null,
          pressed ? styles.pressed : null, // Optional: Add feedback when pressed
        ]}
      >
        {icons[routeName] ? (
          <Animated.View style={routeName === "qrscan" ? animatedStyle : null}>
            {icons[routeName]({ color, isFocused })}
          </Animated.View>
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
    paddingHorizontal: 20, 
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
  pressed: {
    opacity: 1,
  },
});

export default TabBarButton;
