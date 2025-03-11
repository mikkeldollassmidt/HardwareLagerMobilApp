import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React from "react";
import AccountHeader from "../../components/konto/AccountHeader";
import Action from "../../components/konto/action";
import EditProfileButton from "../../components/konto/EditProfileButton";

const Konto = () => {
  return (
    <View style={styles.container}>
      <AccountHeader />
      <EditProfileButton />
      <Action
        iconLibrary="Entypo"
        iconName="laptop"
        title="Aktive lån"
        routePath="selaan"
      />
      <Action
        iconLibrary="Fontisto"
        iconName="history"
        title="Lånehistorik"
        routePath="selaan"
      />
      <Action
        iconLibrary="Feather"
        iconName="file-text"
        title="Servicevilkår"
        routePath=""
      />
      <Action
        iconLibrary="Entypo"
        iconName="log-out"
        title="Log ud"
        routePath=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: "100%",
    paddingTop: Platform.OS === 'ios' ? 70 : 0,
  
  },
});

export default Konto;
