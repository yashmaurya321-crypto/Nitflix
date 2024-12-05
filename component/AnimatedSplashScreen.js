import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Animated } from 'react-native';

const AnimatedSplashScreen = ({ navigation }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      SplashScreen.hideAsync();
      navigation.replace('Home');
    }, 2500); 
  }, [opacity, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity }]}>
        <Image source={require('./assets/pngwing.png')} style={styles.logo} />
        <Text style={styles.text}>Welcome to Netflix</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default AnimatedSplashScreen;
