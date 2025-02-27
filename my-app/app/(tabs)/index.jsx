import { FlatList, View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect } from 'react';
import HomeHeader from '@/components/forside/HomeHeader';
import SearchBar from '@/components/SearchBar';
import RetrieveProductPage from '@/components/forside/RetrieveProductPage';
import BannerButton from '@/components/forside/BannerButton';
import { useAuth } from '../../components/Helpers/AuthContext';

const Home = () => {
  const { tokenCheckCompleted, loading } = useAuth();

  const data = [
    { id: '1', headerText: 'Klik og hent', startIndex: 0, endpointType: 'available' },
    { id: '3', headerText: 'Banner', type: 'banner' },
    { id: '2', headerText: 'Mest Lånte', startIndex: 0, endpointType: 'all' },
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'banner') {
      return <BannerButton />;
    }

    return (
      <View style={styles.section}>
        <RetrieveProductPage
          headerText={item.headerText}
          limit={4}
          startIndex={item.startIndex}
          endpointType={item.endpointType}
        />
      </View>
    );
  };

  if (loading) {  // Show loading spinner until token check is done
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0891DA" />
      </View>
    );
  }

  if (!tokenCheckCompleted) {  // Token check failed
    return null;  // Or you can handle this case better, like showing a message
  }

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <HomeHeader />
          <SearchBar />
        </>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      ListFooterComponent={<View style={styles.footerSpacing} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 70 : 0,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  footerSpacing: {
    height: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Home;
