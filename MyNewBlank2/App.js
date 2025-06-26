import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import {StyleSheet,View,Text,TextInput,Switch,Button,Alert,ImageBackground,Platform,} from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      setAppReady(true);
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);


  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(
        title,
        message,
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  const handleRegister = () => {
    console.log('handleRegister fired:', { name, email, termsAccepted });

    if (!name.trim() || !email.trim()) {
      showAlert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }
    if (!termsAccepted) {
      showAlert('Términos no aceptados', 'Debes aceptar los términos y condiciones.');
      return;
    }

    showAlert(
      '¡Registro exitoso!',
      `Nombre: ${name}\nCorreo: ${email}`
    );
  };

  if (!appReady) {
    return null;
  }

  return (
    <ImageBackground
      source={require('./assets/art3.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.subtitle}>Aceptar términos y condiciones</Text>
            <Switch
              value={termsAccepted}
              onValueChange={setTermsAccepted}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Registrarse"
              onPress={handleRegister}
              color="#1E90FF"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
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
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  buttonWrapper: {
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
