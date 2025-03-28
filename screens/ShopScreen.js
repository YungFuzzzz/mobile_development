import React, { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Modal, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/ProductCard';
import { API_URL, API_KEY } from '@env';
import { CartContext } from '../context/CartContext';

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
  const { cartItems } = useContext(CartContext);
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
      {/* Cart Text */}
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => navigation.navigate('CartPage')}
      >
        <Text style={styles.cartText}>CART</Text>
        <Text style={styles.cartCount}>{cartItems.length.toString().padStart(2, '0')}</Text>
      </TouchableOpacity>
      {/* Searchbar */}
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

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsFilterVisible(false)}
        >
          <Pressable style={styles.bottomModal}>
            <Text style={styles.modalTitle}>Filter By</Text>
            {Object.entries(categoryNames).map(([key, value]) => (
              <Pressable
                key={key}
                style={styles.categoryOption}
                onPress={() => {
                  setSelectedCategory(key);
                  setIsFilterVisible(false);
                }}
              >
                <Text style={styles.categoryText}>
                  {selectedCategory === key && '● '} {value}
                </Text>
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={isSortVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsSortVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsSortVisible(false)}
        >
          <Pressable style={styles.bottomModal}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <Pressable
              style={styles.categoryOption}
              onPress={() => {
                setSortOrder('lowToHigh');
                setIsSortVisible(false);
              }}
            >
              <Text style={styles.categoryText}>
                {sortOrder === 'lowToHigh' && '● '}Price: Low to High
              </Text>
            </Pressable>
            <Pressable
              style={styles.categoryOption}
              onPress={() => {
                setSortOrder('highToLow');
                setIsSortVisible(false);
              }}
            >
              <Text style={styles.categoryText}>
                {sortOrder === 'highToLow' && '● '}Price: High to Low
              </Text>
            </Pressable>
            <Pressable
              style={styles.categoryOption}
              onPress={() => {
                setSortOrder('latest');
                setIsSortVisible(false);
              }}
            >
              <Text style={styles.categoryText}>
                {sortOrder === 'latest' && '● '}Latest Arrivals
              </Text>
            </Pressable>
            <Pressable
              style={styles.categoryOption}
              onPress={() => {
                setSortOrder('aToZ');
                setIsSortVisible(false);
              }}
            >
              <Text style={styles.categoryText}>
                {sortOrder === 'aToZ' && '● '}A-Z
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Product List */}
      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 100 }]}>
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

      {/* Bottom Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsSortVisible(true)}
        >
          <Text style={styles.floatingButtonText}>SORT BY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <Text style={styles.floatingButtonText}>FILTER</Text>
        </TouchableOpacity>
      </View>
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
  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  cartText: {
    fontSize: 16,
    fontFamily: 'MetropolisBold',
    color: '#000',
    marginRight: 5,
  },
  cartCount: {
    fontSize: 16,
    fontFamily: 'MetropolisBold',
    color: '#000',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 24,
    marginBottom: 16,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  bottomModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#000',
    textAlign: 'left',
    marginBottom: 10,
  },
  categoryOption: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#000',
    textTransform: 'uppercase',
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
  floatingButtons: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
  floatingButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    width: 120,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textTransform: 'uppercase',
  },
});

export default ShopScreen;