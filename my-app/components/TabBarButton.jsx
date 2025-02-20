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
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 200 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  return (
    <View style={styles.wrapper}>
      {/* Gradient Border */}
      {isFocused && (
        <LinearGradient
          colors={["#0891DA", "#08D9C4"]} // Change gradient colors here
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        />
      )}
      
      <Pressable {...props} style={styles.container}>
        <Animated.View style={[animatedIconStyle]}>
          {icons[routeName]({ color })}
        </Animated.View>

        <Animated.Text
          style={[
            {
              color,
              fontSize: 11,
            },
            animatedTextStyle,
          ]}
        >
          {label}
        </Animated.Text>
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
    paddingVertical: 12,
  },
});

export default TabBarButton;
