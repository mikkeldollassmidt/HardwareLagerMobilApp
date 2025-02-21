import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "../assets/icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TabBarButton = (props) => {
  const { isFocused, label, routeName, color, fontFamily } = props; // Add fontFamily prop

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 200 }
    );
  }, [scale, isFocused]);

  return (
    <View style={styles.wrapper}>
      {/* Gradient Border (Exclude for qrscan) */}
      {isFocused && routeName !== "qrscan" && (
        <LinearGradient
          colors={["#0891DA", "#08D9C4"]} // Change gradient colors here
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        />
      )}

      <Pressable
        {...props}
        style={[
          styles.container,
          routeName === "qrscan" ? styles.qrScanButton : null,
        ]}
      >
        {/* Ensure the icon exists before rendering */}
        {icons[routeName] ? (
          <View>{icons[routeName]({ color })}</View>
        ) : (
          <Text style={{ color: "red" }}>?</Text> // Fallback if icon is missing
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
  gradientBorder: {
    position: "absolute",
    top: 0,
    width: "80%",
    height: 2,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
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
