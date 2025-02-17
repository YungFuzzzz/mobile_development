import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

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
        <View style={styles.card}>
          <Image 
            source={require('./assets/images/vet-bigshapejeans.png')} 
            style={styles.image} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>VETEMENTS</Text>
          <Text style={styles.price}>€1290</Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('./assets/images/vet-ovallogohoodie.png')} 
            style={styles.image} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>VETEMENTS</Text>
          <Text style={styles.price}>€870</Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('./assets/images/bal-boxinghoodie.png')} 
            style={styles.image} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>BALENCIAGA</Text>
          <Text style={styles.price}>€990</Text>
        </View>
        <View style={styles.card}>
          <Image 
            source={require('./assets/images/bal-10xlsneakers.png')} 
            style={styles.image} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>BALENCIAGA</Text>
          <Text style={styles.price}>€1100</Text>
        </View>
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
  card: {
    width: '30%',
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textAlign: 'left',
    color: '#000',
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 12,
    fontFamily: 'MetropolisRegular',
    textAlign: 'left',
    color: '#000',
    alignSelf: 'flex-start',
  },
});