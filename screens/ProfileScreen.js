import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { API_URL, API_KEY } from '@env';
import { Ionicons } from '@expo/vector-icons';

import avatarImage from '../assets/images/pfp.webp';

const ProfileScreen = () => {
  const profile = {
    name: 'FAISAL',
  };

  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);

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
          const lastFourItems = data.items.slice(-4).map((item) => {
            const sku = item.skus?.[0]?.fieldData || {};
            const productFieldData = item.product?.fieldData || {};
            return {
              id: item.product?.id || 'unknown',
              brand: productFieldData.brand || 'No brand available',
              name: sku.name || 'No name available',
              price: sku.price?.value ? `€${(sku.price.value / 100).toFixed(2)}` : 'N/A',
              imageUrl: sku['main-image']?.url || '',
            };
          });
          setWishlistItems(lastFourItems);

          const firstTwoOrders = data.items.slice(0, 2).map((item, index) => {
            const sku = item.skus?.[0]?.fieldData || {};
            return {
              id: item.product?.id || `order-${index + 1}`,
              name: sku.name || 'No name available',
              imageUrl: sku['main-image']?.url || '',
              status: 'Shipped',
              date: `2024-0${index + 1}-22`,
              price: `€${(sku.price?.value / 100 || 50).toFixed(2)}`,
              orderNumber: `${Math.floor(1000 + Math.random() * 9000000)}`,
            };
          });
          setOrders(firstTwoOrders);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profielfoto en naam */}
        <View style={styles.profileHeader}>
          <Image source={avatarImage} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
        </View>

        {/* Wishlist Sectie */}
        <View style={styles.wishlistSection}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.wishlistTitle}>WISHLIST</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wishlistScroll}>
            {wishlistItems.map((item) => (
              <View key={item.id} style={styles.wishlistItem}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.wishlistImage}
                  resizeMode="contain"
                />
                <Text style={styles.wishlistItemBrand}>{item.brand}</Text>
                <Text style={styles.wishlistItemName}>{item.name}</Text>
                <Text style={styles.wishlistItemPrice}>{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Order History Sectie */}
        <View style={styles.orderHistorySection}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.orderHistoryTitle}>ORDER HISTORY</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderStatus}>Status: {order.status}</Text>
                <Text style={styles.orderDate}>Date: {order.date}</Text>
                <Text style={styles.orderPrice}>Price: {order.price}</Text>
                <Text style={styles.orderNumber}># {order.orderNumber}</Text>
              </View>
              <Image
                source={{ uri: order.imageUrl }}
                style={styles.orderImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </View>

        {/* Settings Sectie */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>SETTINGS</Text>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>ACCOUNT DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>COUNTRY/REGION</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>LOG OUT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>SUPPORT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontFamily: 'MetropolisBold',
    textAlign: 'center',
  },
  wishlistSection: {
    width: '100%',
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  wishlistTitle: {
    fontSize: 20,
    fontFamily: 'MetropolisBold',
  },
  wishlistScroll: {
    flexDirection: 'row',
  },
  wishlistItem: {
    marginRight: 15,
    alignItems: 'left',
  },
  wishlistImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  wishlistItemBrand: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    textAlign: 'left',
    marginTop: 5,
  },
  wishlistItemName: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textAlign: 'left',
    marginTop: 2,
  },
  wishlistItemPrice: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textAlign: 'left',
    marginTop: 2,
    color: '#000',
  },
  orderHistorySection: {
    width: '100%',
    marginTop: 30,
  },
  orderHistoryTitle: {
    fontSize: 20,
    fontFamily: 'MetropolisBold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  orderInfo: {
    flex: 1,
    marginRight: 10,
  },
  orderStatus: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    marginBottom: 5,
  },
  orderPrice: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  settingsSection: {
    width: '100%',
    marginTop: 30,
  },
  settingsTitle: {
    fontSize: 20,
    fontFamily: 'MetropolisBold',
    marginBottom: 10,
  },
  settingsItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingsText: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default ProfileScreen;