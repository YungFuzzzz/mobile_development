import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ imageSource, title, price }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textAlign: 'left',
    color: '#000',
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textAlign: 'left',
    color: '#000',
    alignSelf: 'flex-start',
  },
});

export default ProductCard;