import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Card from '../components/ProductCard';

// Data array voor producten
const products = [
  {
    imageSource: require('../assets/images/vet-bigshapejeans.png'),
    title: 'VETEMENTS',
    price: '€1290',
  },
  {
    imageSource: require('../assets/images/vet-ovallogohoodie.png'),
    title: 'VETEMENTS',
    price: '€870',
  },
  {
    imageSource: require('../assets/images/bal-boxinghoodie.png'),
    title: 'BALENCIAGA',
    price: '€990',
  },
  {
    imageSource: require('../assets/images/bal-10xlsneakers.png'),
    title: 'BALENCIAGA',
    price: '€1100',
  },
];

// HomeScreen component
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {products.map((product, index) => (
            <Card
              key={index}
              imageSource={product.imageSource}
              title={product.title}
              price={product.price}
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});