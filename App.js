import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    MetropolisRegular: require('./assets/fonts/metropolis.regular.otf'),
    MetropolisBold: require('./assets/fonts/metropolis.extra-bold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GARDEROBE" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}