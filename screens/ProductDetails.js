import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { WishlistContext } from '../context/WishListContext';

const { height, width } = Dimensions.get('window');

const ProductDetails = ({ route }) => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const product = route?.params?.product || {};
  const sku = product.skus?.[0]?.fieldData || {};
  const productFieldData = product.product?.fieldData || {};

  const images = [
    sku['main-image']?.url,
    ...(sku['more-images']?.map((img) => img.url) || []),
  ].filter(Boolean);

  const brand = productFieldData.brand || 'No brand available';
  const description = productFieldData.description || 'No description available';
  const price = sku.price?.value ? `$${(sku.price.value / 100).toFixed(2)}` : 'N/A';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image slider */}
        <View style={styles.imageWrapper}>
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
              </View>
            )}
          />
        </View>

        {/* Product details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{brand}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.wishlistButton,
              wishlist.some((item) => item.id === product.id) ? styles.wishlistButtonActive : null,
            ]}
            onPress={() => toggleWishlist(product)}
          >
            <Text
              style={[
                styles.wishlistButtonText,
                wishlist.some((item) => item.id === product.id) ? styles.wishlistButtonTextActive : null,
              ]}
            >
              {wishlist.some((item) => item.id === product.id) ? 'ADDED TO WISHLIST' : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  imageWrapper: {
    height: height * 0.6,
  },
  imageContainer: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'MetropolisRegular',
    marginBottom: 10,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    marginBottom: 24,
    textAlign: 'left',
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontFamily: 'MetropolisBold',
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  wishlistButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  wishlistButtonActive: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    textTransform: 'uppercase',
  },
  wishlistButtonText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    textTransform: 'uppercase',
  },
  wishlistButtonTextActive: {
    color: '#000',
  },
});

export default ProductDetails;