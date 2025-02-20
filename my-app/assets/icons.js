import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
  
  export const icons = {
    index: (props) => (
      <Octicons name="home" size={26} {...props} />
    ),
    notifikation: (props) => (
      <Octicons name="bell" size={26} {...props} />
    ),
    qrscan: (props) => (
      <MaterialCommunityIcons name="qrcode-scan" size={26} {...props} />
    ),
    konto: (props) => (
      <Feather name="user" size={26} {...props} />
    ),
    mere: (props) => (
      <SimpleLineIcons name="menu" size={26} {...props} />
    ),
  };