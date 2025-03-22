import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetails = ({ route }) => {
  const product = route?.params?.product || {};
  const sku = product?.skus?.[0]?.fieldData || {};
  const mainImageUrl = sku['main-image']?.url || '';
  const name = sku.name || 'No name available';
  const price = sku.price?.value ? `€${(sku.price.value / 100).toFixed(2)}` : 'N/A';

  if (!mainImageUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No image available</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: mainImageUrl }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
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
  },
  price: {
    fontSize: 20,
    fontFamily: 'MetropolisRegular',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ProductDetails;