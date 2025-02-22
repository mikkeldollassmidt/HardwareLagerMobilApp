import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";
import { useFonts } from "expo-font";

const tabs_layout = () => {
    return (
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Forside",
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
    );
  };
  
  export default tabs_layout;