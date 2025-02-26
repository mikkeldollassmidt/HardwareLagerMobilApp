import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import AccountHeader from "../../components/konto/AccountHeader";
import Action from "../../components/konto/action";
import EditProfileButton from "../../components/konto/EditProfileButton";

const Konto = () => {
  return (
    <View style={styles.container}>
      <AccountHeader />
      <EditProfileButton />
      {/* Redirect til aktive lån side */}
      <Action
        iconLibrary="Entypo"
        iconName="laptop"
        title="Aktive lån"
        routePath=""
      />
      {/* Redirect til lånehistroik side */}
      <Action
        iconLibrary="Fontisto"
        iconName="history"
        title="Lånehistorik"
        routePath=""
      />
      {/* Redirect til servicevilkår */}
      <Action
        iconLibrary="Feather"
        iconName="file-text"
        title="Servicevilkår"
        routePath=""
      />
      {/* Redirect til logout */}
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
  },
});

export default Konto;
