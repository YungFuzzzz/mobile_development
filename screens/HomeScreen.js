import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/ProductCard';
import { API_URL, API_KEY } from '@env';


const apiUrl = API_URL;
const apiKey = API_KEY;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "accept-version": "1.0.0",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.items) {
        const formattedProducts = data.items.map((item) => {
          const sku = item.skus?.[0]?.fieldData || {};
          const productFieldData = item.product?.fieldData || {};
          return {
            id: item.product?.id || 'unknown',
            name: sku.name || productFieldData.name || 'No name available',
            price: sku.price?.value ? `€${(sku.price.value / 100).toFixed(2)}` : 'N/A',
            imageUrl: sku['main-image']?.url || '',
          };
        });
        setProducts(formattedProducts);
      }
    })
    .catch((err) => console.error("Error fetching products:", err));
}, []);

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
                imageSource={product.imageUrl ? { uri: product.imageUrl } : null}
                title={product.name}
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