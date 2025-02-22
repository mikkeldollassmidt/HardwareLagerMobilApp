import { View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"; // Import Easing from reanimated
import TabBarButton from "./TabBarButton";

const TabBar = ({ state, descriptors, navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / state.routes.length;
  const activeIndex = state.index;
  const indicatorWidth = tabWidth * 0.7; // 30% of tab width for better visibility

  // Shared value for animation
  const animatedPosition = useSharedValue(0);

  useEffect(() => {
    // Define static positions for each route
    const staticOffsets = {
      "index": -12,
      "notifikation": tabWidth - 12, // Move to the right by one tabWidth
      "qrscan": tabWidth * 1.82, // Move to the right by two tabWidths
      "konto": tabWidth * 2.85, // You can manually set positions
      "mere": tabWidth * 3.86,
    };

    // Get the position based on the active route
    const currentRouteName = state.routes[activeIndex]?.name;
    const newPosition = staticOffsets[currentRouteName] || 0; // Default to 0 if route not found

    animatedPosition.value = withTiming(newPosition, {
      duration: 600,
      easing: Easing.out(Easing.exp), // Use the Easing from react-native-reanimated
    });
  }, [activeIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: animatedPosition.value + (tabWidth - indicatorWidth) / 2 },
    ],
  }));
//!== "qrscan"
  return (
    <View style={styles.tabbar}>
      {/* Moving Animated Indicator */}  
      {state.routes[activeIndex]?.name && (
        <Animated.View
          style={[styles.animatedGradient, animatedStyle, { width: indicatorWidth }]}
        >
          <LinearGradient
            colors={["#0891DA", "#08D9C4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
          />
        </Animated.View>
      )}

      {/* Tab Buttons */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#363636" : "#BDBDBD"}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
  },
  animatedGradient: {
    position: "absolute",
    top: 0,
    height: 2,
    left: 13,
  },
  gradientBorder: {
    width: "100%",
    height: 2,
    borderRadius: 2,
  },
});

export default TabBar;
