import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from 'react';
import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';

export const icons = {
  index: (props) => (
    <Octicons name="home" size={26} {...props} />
  ),
  notifikation: (props) => (
    <Octicons name="bell" size={26} {...props} />
  ),
  qrscan: (props) => {
    // Conditionally load ScanFocused or ScanUnFocused based on isFocused prop
    const iconUri = props.isFocused
      ? require('../assets/icons/ScanFocused.svg') // ScanFocused when focused
      : require('../assets/icons/ScanUnFocused.svg'); // ScanUnFocused when not focused

    return <SvgUri uri={Asset.fromModule(iconUri).uri} width={30} height={30} {...props} />;
  },
  konto: (props) => (
    <Feather name="user" size={26} {...props} />
  ),
  mere: (props) => (
    <SimpleLineIcons name="menu" size={26} {...props} />
  ),
};
