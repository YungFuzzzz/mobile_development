import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WishlistContext } from '../context/WishListContext';
import { OrderContext } from '../context/OrderContext';
import avatarImage from '../assets/images/pfp.webp';

const ProfileScreen = () => {
  const profile = {
    name: 'FAISAL',
  };

  const { wishlist } = useContext(WishlistContext);
  const { orders } = useContext(OrderContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profilepicture and name */}
        <View style={styles.profileHeader}>
          <Image source={avatarImage} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
        </View>

        {/* Wishlist section */}
        <View style={styles.wishlistSection}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.wishlistTitle}>WISHLIST</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wishlistScroll}>
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <View key={item.id} style={styles.wishlistItem}>
                  <Image
                    source={{ uri: item.skus?.[0]?.fieldData['main-image']?.url || '' }}
                    style={styles.wishlistImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.wishlistItemBrand}>{item.product?.fieldData?.brand || 'No brand available'}</Text>
                  <Text style={styles.wishlistItemName}>{item.skus?.[0]?.fieldData?.name || 'No name available'}</Text>
                  <Text style={styles.wishlistItemPrice}>
                    {item.skus?.[0]?.fieldData?.price?.value
                      ? `€${(item.skus[0].fieldData.price.value / 100).toFixed(2)}`
                      : 'N/A'}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyWishlistText}>Your wishlist is empty.</Text>
            )}
          </ScrollView>
        </View>

        {/* Order History section */}
        <View style={styles.orderHistorySection}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.orderHistoryTitle}>ORDER HISTORY</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.orderHistoryScroll}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <View key={order.id} style={styles.orderItem}>
                  <Text style={styles.orderDate}>Date: {order.date}</Text>
                  <Text style={styles.orderTotal}>Total: €{order.total.toFixed(2)}</Text>
                  <FlatList
                    data={order.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.orderProduct}>
                        <Image
                          source={{ uri: item.imageUrl || 'https://via.placeholder.com/60' }}
                          style={styles.orderProductImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.orderProductName}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>
              ))
            ) : (
              <Text style={styles.emptyOrderHistoryText}>No orders yet.</Text>
            )}
          </ScrollView>
        </View>

        {/* Settings section */}
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
            <Text style={styles.settingsText}>SUPPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsText}>LOG OUT</Text>
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
    alignItems: 'flex-start',
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
  emptyWishlistText: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  orderHistorySection: {
    width: '100%',
    marginTop: 30,
  },
  orderHistoryTitle: {
    fontSize: 20,
    fontFamily: 'MetropolisBold',
  },
  orderHistoryScroll: {
    flexDirection: 'row',
  },
  orderItem: {
    marginRight: 15,
    alignItems: 'flex-start',
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    marginBottom: 10,
  },
  orderProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderProductImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  orderProductName: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
  },
  emptyOrderHistoryText: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
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