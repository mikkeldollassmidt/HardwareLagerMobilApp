import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ColorList from '../components/ColorList'
import HomeHeader from '../components/forside/HomeHeader'

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
});

export default Home