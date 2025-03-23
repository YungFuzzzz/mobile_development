import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';
import { WishlistProvider } from './context/WishListContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }} // Verberg de titel bovenaan de Home-pagina
    />
  </Stack.Navigator>
);

const ShopStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Shop"
      component={ShopScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={({ navigation }) => ({
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            <Text style={styles.backButton}>BACK</Text>
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    MetropolisRegular: require('./assets/fonts/metropolis.regular.otf'),
    MetropolisBold: require('./assets/fonts/metropolis.extra-bold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <WishlistProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarLabel: ({ focused }) => (
              <View style={styles.tabContainer}>
                <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
                  {route.name.toUpperCase()}
                </Text>
                {focused && <View style={styles.dot} />}
              </View>
            ),
            tabBarStyle: styles.tabBar,
            tabBarShowLabel: true,
            tabBarIcon: () => null,
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Shop"
            component={ShopStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    height: 86,
    paddingBottom: 10,
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textAlign: 'center',
    color: '#000',
  },
  tabLabelFocused: {
    fontWeight: 'bold',
  },
  dot: {
    marginTop: 4,
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#000',
  },
  backButton: {
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    color: '#000',
  },
});