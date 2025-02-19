import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/ProductCard';

const products = [
  {
    imageSource: require('../assets/images/vet-bigshapejeans.png'),
    title: 'VETEMENTS',
    price: '€1290',
  },
  {
    imageSource: require('../assets/images/vet-ovallogohoodie.png'),
    title: 'VETEMENTS',
    price: '€870',
  },
  {
    imageSource: require('../assets/images/bal-boxinghoodie.png'),
    title: 'BALENCIAGA',
    price: '€990',
  },
  {
    imageSource: require('../assets/images/bal-10xlsneakers.png'),
    title: 'BALENCIAGA',
    price: '€1100',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {products.map((product, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ProductDetails', { product })}
              style={styles.cardWrapper}
            >
              <Card
                imageSource={product.imageSource}
                title={product.title}
                price={product.price}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 36,
    fontFamily: 'MetropolisBold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '30%',
    marginBottom: 15,
  },
});