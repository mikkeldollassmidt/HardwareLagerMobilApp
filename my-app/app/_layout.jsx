import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { useFonts } from "expo-font"; // Import the useFonts hook

const _layout = () => {
  // Load the custom fonts
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading until fonts are loaded
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Forside",
          tabBarLabelStyle: { fontFamily: "Inter-Bold" }, // Apply font
        }}
      />
      <Tabs.Screen
        name="notifikation"
        options={{
          title: "Notifikation",
          tabBarLabelStyle: { fontFamily: "Inter-Medium" },
        }}
      />
      <Tabs.Screen
        name="qrscan"
        options={{
          title: "QRScan",
          tabBarLabelStyle: { fontFamily: "Inter-Regular" },
        }}
      />
      <Tabs.Screen
        name="konto"
        options={{
          title: "Konto",
          tabBarLabelStyle: { fontFamily: "Inter-SemiBold" },
        }}
      />
      <Tabs.Screen
        name="mere"
        options={{
          title: "Mere",
          tabBarLabelStyle: { fontFamily: "Inter-Regular" },
        }}
      />
    </Tabs>
  );
};

export default _layout;
