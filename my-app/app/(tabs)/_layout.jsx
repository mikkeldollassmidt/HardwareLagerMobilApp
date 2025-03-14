import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";
import { AuthProvider } from '../../components/Helpers/AuthContext';

const tabs_layout = () => {
    return (
        <AuthProvider>
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
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="mere"
                    options={{
                        title: "Mere",
                        headerShown: false,
                    }}
                />
            </Tabs>
        </AuthProvider>

    );
};
export default tabs_layout;
