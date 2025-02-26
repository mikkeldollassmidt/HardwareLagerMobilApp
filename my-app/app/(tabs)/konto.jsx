import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import AccountHeader from "../../components/konto/AccountHeader";
import Action from "../../components/konto/action";
import * as Icons from "@expo/vector-icons";

const Konto = () => {
  return (
    <View style={styles.container}>
      <AccountHeader />
      <Action iconLibrary={Icons.Feather} iconName="login" title="Aktive lån" isRedirect="true" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default Konto;
