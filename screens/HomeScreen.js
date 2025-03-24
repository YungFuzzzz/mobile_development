import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const HomeScreen = () => {
  const brands = ['BALENCIAGA', 'VETEMENTS', "LU'U DAN", 'MISBHV', 'RAF SIMONS'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* NEW IN Section */}
        <View style={styles.newInSection}>
          <View style={styles.newInHeader}>
            <Text style={styles.newInTitle}>NEW IN</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>SEE MORE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.brandList}>
            {brands.map((brand, index) => (
              <Text key={index} style={styles.brandItem}>
                {brand}
              </Text>
            ))}
          </View>
        </View>

        {/* Blogpost Section */}
        <View style={styles.blogPostSection}>
          <Text style={styles.newsTitle}>NEWS</Text>
          <Image
            source={require('../assets/images/winter25.webp')}
            style={styles.blogPostImage}
            resizeMode="cover"
          />
          <Text style={styles.blogPostTitle}>BALENCIAGA WINTER '25 IS HERE</Text>
          <Text style={styles.blogPostDescription}>
            Demna has done it again. This time, he introduced a collaboration with Puma and brought street style to the runway. 
            The spectacle took place in a huge black maze and the looks reflected on what Demna saw people wear on the streets.
          </Text>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>READ</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Blogposts */}
        <View style={styles.blogPostSection}>
          <Image
            source={require('../assets/images/japan.webp')}
            style={styles.blogPostImage}
            resizeMode="cover"
          />
          <Text style={styles.blogPostTitle}>LOOK WHAT'S TRENDING IN JAPAN RIGHT NOW!</Text>
          <Text style={styles.blogPostDescription}>
            Japan is setting trends once again. From oversized silhouettes to bold patterns, discover what’s making waves in the fashion world.
          </Text>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>READ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.blogPostSection}>
          <Image
            source={require('../assets/images/cleanup.webp')}
            style={styles.blogPostImage}
            resizeMode="cover"
          />
          <Text style={styles.blogPostTitle}>WINTER IS OVER! CLEAN OUT THAT CLOSET NOW!</Text>
          <Text style={styles.blogPostDescription}>
            Spring is here, and it’s time to refresh your wardrobe. Learn how to declutter and make space for the latest trends.
          </Text>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>READ</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>MADE BY VICES</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  newInSection: {
    marginBottom: 30,
  },
  newInHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  newInTitle: {
    fontSize: 24,
    fontFamily: 'MetropolisBold',
    marginTop: 5,
  },
  seeMore: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#000',
    textDecorationLine: 'underline',
  },
  brandItem: {
    fontSize: 24,
    fontFamily: 'MetropolisRegular',
    textTransform: 'uppercase',
    marginBottom: 10,
    color: '#333',
    textDecorationLine: 'underline',
  },
  newsTitle: {
    fontSize: 24,
    fontFamily: 'MetropolisBold',
    marginBottom: 15,
    color: '#000',
    textAlign: 'left',
  },
  blogPostImage: {
    width: '100%',
    height: 600,
    marginBottom: 15,
  },
  blogPostTitle: {
    fontSize: 20,
    fontFamily: 'MetropolisBold',
    marginBottom: 10,
    color: '#000',
  },
  blogPostDescription: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
  },
  readButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  readButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'MetropolisBold',
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'MetropolisRegular',
    color: '#888',
  },
});

export default HomeScreen;