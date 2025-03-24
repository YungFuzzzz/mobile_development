import React, { useContext, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { WishlistContext } from '../context/WishListContext';
import { CartContext } from '../context/CartContext';

const { height, width } = Dimensions.get('window');

const ProductDetails = ({ route }) => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = route?.params?.product || {};
  const sku = product.skus?.[0]?.fieldData || {};
  const productFieldData = product.product?.fieldData || {};

  const sizeOptions =
    product.category === '67dd3e44b7f07384e3ab209f'
      ? ['39', '40', '41', '42', '43', '44', '45', '46']
      : ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...product, size: selectedSize });
      setIsModalVisible(false);
      setSelectedSize(null);
    } else {
      alert('Please select a size before adding to cart.');
    }
  };

  const images = [
    sku['main-image']?.url,
    ...(sku['more-images']?.map((img) => img.url) || []),
  ].filter(Boolean);

  const brand = productFieldData.brand || 'No brand available';
  const name = productFieldData.name || 'No name available';
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
            onScroll={({ nativeEvent }) => {
              const index = Math.round(nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
              </View>
            )}
          />
          {/* Pagination dots */}
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentImageIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{brand}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setIsModalVisible(true)}
          >
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

        {/* Size selection modal */}
        <Modal
  visible={isModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.bottomModal}>
      <Text style={styles.modalTitle}>Select Size</Text>
      <View style={styles.sizeOptionsContainer}>
        {sizeOptions.map((size) => (
          <TouchableOpacity
            key={size}
            style={styles.sizeOptionRow}
            onPress={() => setSelectedSize(size)}
          >
            <View
              style={[
                styles.dot,
                selectedSize === size && styles.selectedDot,
              ]}
            />
            <Text
              style={[
                styles.sizeOptionText,
                selectedSize === size && styles.selectedSizeOptionText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.confirmButtonText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'MetropolisRegular',
    marginBottom: 5,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  name: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    marginBottom: 10,
    textAlign: 'left',
    color: '#555',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'MetropolisBold',
    marginBottom: 20,
  },
  sizeOptionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sizeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  selectedDot: {
    backgroundColor: '#000',
  },
  sizeOptionText: {
    fontSize: 16,
    fontFamily: 'MetropolisRegular',
    color: '#000',
  },
  selectedSizeOptionText: {
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'MetropolisBold',
  },
});

export default ProductDetails;