import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/ProductCard';
import { API_URL, API_KEY } from '@env';
import { Picker } from '@react-native-picker/picker';

const categoryNames = {
  "": "All categories",
  "67dd422e978d9317d801b906": "Jeans",
  "67dd401c00f7b9e03da182a7": "Pants",
  "67dd3f10978d9317d8fec103": "Hoodies",
  "67dd3e44b7f07384e3ab209f": "Sneakers",
};

const ShopScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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
              brand: productFieldData.brand || 'No brand available',
              price: sku.price?.value ? `€${(sku.price.value / 100).toFixed(2)}` : 'N/A',
              imageUrl: sku['main-image']?.url || '',
              category: productFieldData.category?.[0] || '',
            };
          });
          setProducts(formattedProducts);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <View style={styles.container}>
      {/* Category Picker */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        {Object.entries(categoryNames).map(([key, value]) => (
          <Picker.Item key={key} label={value} value={key} />
        ))}
      </Picker>

      {/* Product List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {filteredProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ProductDetails', { product })}
              style={styles.cardWrapper}
            >
              <Card
                imageSource={product.imageUrl ? { uri: product.imageUrl } : null}
                title={product.brand}
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
      paddingHorizontal: 15,
    },
    picker: {
      height: 50,
      width: '100%',
      marginBottom: 20,
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

export default ShopScreen;