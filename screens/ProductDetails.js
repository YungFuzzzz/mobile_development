import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';

const ProductDetails = ({ route }) => {
  const product = route?.params?.product || {};
  const mainImageUrl = product.imageUrl || '';
  const name = product.brand || 'No brand available';
  const price = product.price || 'N/A';

  if (!mainImageUrl) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No image available</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: mainImageUrl }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'MetropolisBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontFamily: 'MetropolisRegular',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ProductDetails;