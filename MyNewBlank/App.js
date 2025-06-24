import * as SplashScreen from 'expo-splash-screen';
import { ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppready] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      setAppready(true);
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return(
    <ImageBackground
      source={require('./assets/art3.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>uwu Artemio uwu</Text>
        <Text style={styles.subtitle}>{appReady ? 'Carga completa': 'Esta cargando'}</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  }
});