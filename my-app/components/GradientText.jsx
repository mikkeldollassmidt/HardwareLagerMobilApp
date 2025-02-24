import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText = ({ children, style, colors, start, end }) => (
  <MaskedView
    style={style}
    maskElement={<Text style={[style, { opacity: 0 }]}>{children}</Text>}
  >
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[style, { opacity: 1 }]}
    >
      <Text style={[style, { opacity: 0 }]}>{children}</Text>
    </LinearGradient>
  </MaskedView>
);

export default GradientText;
