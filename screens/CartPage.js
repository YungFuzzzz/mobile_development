import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
          <Text style={styles.backButton}>BACK</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {/* Product Image */}
                <Image
                  source={{ uri: item.imageUrl || 'https://via.placeholder.com/60' }}
                  style={styles.itemImage}
                  resizeMode="contain"
                />

                {/* Product Details */}
                <View style={styles.itemDetails}>
                  <Text style={styles.itemBrand}>{item.brand}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSize}>Size: {item.size}</Text>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.removeButton}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Total Price and Checkout Button */}
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>€{totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>GO TO CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    color: '#000',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'MetropolisRegular',
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemBrand: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    color: '#000',
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#000',
    marginVertical: 5,
  },
  itemSize: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#000',
  },
  removeButton: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    textDecorationLine: 'underline',
    color: '#000',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
    marginTop: 15,
  },
  totalContainer: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#555',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'MetropolisBold',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkoutButtonText: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default CartPage;