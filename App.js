import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Card from './components/ProductCard';

export default function App() {
  const [fontsLoaded] = useFonts({
    MetropolisRegular: require('./assets/fonts/metropolis.regular.otf'),
    MetropolisBold: require('./assets/fonts/metropolis.extra-bold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Garderobe</Text>
      <View style={styles.cardContainer}>
        <Card 
          imageSource={require('./assets/images/vet-bigshapejeans.png')} 
          title="VETEMENTS" 
          price="€1290" 
        />
        <Card 
          imageSource={require('./assets/images/vet-ovallogohoodie.png')} 
          title="VETEMENTS" 
          price="€870" 
        />
        <Card 
          imageSource={require('./assets/images/bal-boxinghoodie.png')} 
          title="BALENCIAGA" 
          price="€990" 
        />
        <Card 
          imageSource={require('./assets/images/bal-10xlsneakers.png')} 
          title="BALENCIAGA" 
          price="€1100" 
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontFamily: 'MetropolisBold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});