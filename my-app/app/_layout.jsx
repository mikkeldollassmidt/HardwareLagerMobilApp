import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { useFonts } from "expo-font";

const _layout = () => {
  return (
    <View style={styles.container}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Forside",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notifikation"
          options={{
            title: "Notifikation",
          }}
        />
        <Tabs.Screen
          name="qrscan"
          options={{
            title: "QRScan",
          }}
        />
        <Tabs.Screen
          name="konto"
          options={{
            title: "Konto",
          }}
        />
        <Tabs.Screen
          name="mere"
          options={{
            title: "Mere",
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default _layout;
