import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Modal, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/ProductCard';
import { API_URL, API_KEY } from '@env';

const categoryNames = {
  "": "All categories",
  "67dd422e978d9317d801b906": "Jeans",
  "67dd401c00f7b9e03da182a7": "Pants",
  "67dd3f10978d9317d8fec103": "Hoodies",
  "67dd3e44b7f07384e3ab209f": "Sneakers",
  "67dff6d255e34fe8d33797a0": "T-Shirts",
  "67e06e6acd46156653ff94d0": "Jackets",
};

const ShopScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('');

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
            return {
              ...item,
              id: item.product?.id || 'unknown',
              name: item.product?.fieldData?.name || 'No name available',
              brand: item.product?.fieldData?.brand || 'No brand available',
              price: item.skus?.[0]?.fieldData?.price?.value
                ? item.skus[0].fieldData.price.value / 100
                : null,
              imageUrl: item.skus?.[0]?.fieldData?.['main-image']?.url || '',
              category: item.product?.fieldData?.category?.[0] || '',
            };
          });
          setProducts(formattedProducts);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearchQuery && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price;
    } else if (sortOrder === 'latest') {
      return b.id.localeCompare(a.id);
    } else if (sortOrder === 'aToZ') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      {/* Zoekbalk */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="SEARCH"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          underlineColorAndroid="transparent"
        />
      </View>

      {/* Product List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {sortedProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ProductDetails', { product })}
              style={styles.cardWrapper}
            >
              <Card
                imageSource={product.imageUrl ? { uri: product.imageUrl } : null}
                title={product.brand}
                price={`€${product.price?.toFixed(2) || 'N/A'}`}
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
    fontFamily: 'MetropolisRegular',
    color: '#000',
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