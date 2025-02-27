import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const Notification = ({ hardware, type, endDate, messageDate }) => {
  // Dynamically choose styles based on the `type` prop
  const getStyles = () => {
    switch (type) {
      case "good":
        return {
          iconColor: "#08CF26",
          notificationBackground: "#EBFFEF",
          iconContainerBackground: "#D0FCD3",
        };
      case "danger":
        return {
          iconColor: "#CF0808",
          notificationBackground: "#FFEBEB",
          iconContainerBackground: "#FCD0D0",
        };
      case "warning":
        return {
          iconColor: "#CFCF08",
          notificationBackground: "#FCFFE3",
          iconContainerBackground: "#EFF4C5",
        };
      default: // for "default" or empty
        return {
          iconColor: "#08B6CF",
          notificationBackground: "#E5FCFF",
          iconContainerBackground: "#C5EFF5",
        };
    }
  };

  const { iconColor, notificationBackground, iconContainerBackground } = getStyles();

  // Dynamically choose the icon based on the `type` prop
  const getIcon = () => {
    switch (type) {
      case "good":
        return <Feather style={[styles.icon, { color: iconColor }]} name="thumbs-up" size={25} />;
      case "danger":
        return (
          <MaterialCommunityIcons
            style={[styles.icon, { color: iconColor }]}
            name="exclamation-thick"
            size={25}
          />
        );
      case "warning":
        return (
          <FontAwesome5 style={[styles.icon, { color: iconColor }]} name="bell" size={25} />
        );
      default:
        return (
          <Fontisto style={[styles.icon, { color: iconColor }]} name="plus-a" size={25} />
        );
    }
  };

  // Dynamically change the message text based on the `type`
  const getTextContent = () => {
    switch (type) {
      case "good":
        return {
          header: `Du har afleveret “${hardware}”`,
          subheader: "Tak fordi du afleverede produktet",
        };
      case "danger":
        return {
          header: `Du har overskredet din låne periode på “${hardware}”`,
          subheader: "Aflever venligst produktet hurtigst muligt",
        };
      case "warning":
        return {
          header: `Husk at aflever din “${hardware}”`,
          subheader: `Aflever senest d. ${endDate}`,
        };
      default:
        return {
          header: `Du har nu lånt “${hardware}”`,
          subheader: `Aflever senest d. ${endDate}`,
        };
    }
  };

  const { header, subheader } = getTextContent();

  return (
    <View style={styles.notificationOuterContainer}>
      <Text style={styles.date}>{messageDate}</Text>
      <View
        style={[styles.notificationContainer, { backgroundColor: notificationBackground }]}
      >
        <View
          style={[styles.iconContainer, { backgroundColor: iconContainerBackground }]}
        >
          {getIcon()}
        </View>
        <View style={styles.loanInfoContainer}>
          <Text style={styles.loanInfoHeader}>{header}</Text>
          <Text style={styles.loanInfoSubheader}>{subheader}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationOuterContainer: {
    borderRadius: 10,
  },
  notificationContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "start",
    alignItems: "center"
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  icon: {},
  loanInfoContainer: {
    marginLeft: 15,
    maxWidth: 295,
    justifyContent: "center",
  },
  loanInfoHeader: {
    fontWeight: 700,
    color: "#363636",
    fontSize: 16,
  },
  loanInfoSubheader: {
    fontWeight: 400,
    color: "#363636",
    fontSize: 14,
  },
  date: {
    color: "#ACACAC",
    marginBottom: 3,
  },
});

export default Notification;
