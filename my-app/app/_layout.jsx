import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";

const _layout = () => {
  return (
    <>

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
    </>
  );
};

export default _layout;
