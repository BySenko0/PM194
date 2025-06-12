// * Zona 1: importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button } from 'react-native';
import React,{useState} from 'react';

const Texto = () => {
  const [contenido, setContenido] = useState('Hola Mundo react native');
  const actualizarTexto = () => {
    setContenido('estado actualizado del texto');
  }
  return (
    <Text onPress={actualizarTexto}>{contenido}</Text>
  );
}

const Boton = ({ títuloInicial, mensajeAlPresionar }) => {
  const [titulo, setTitulo] = useState(títuloInicial);

  const manejarPress = () => {
    // Cambio de estado local (opcional)
    setTitulo('¡Presionado!');
    // Lógica externa (alert, llamada a API, etc.)
    alert(mensajeAlPresionar);
  };

  return (
    <Button
      title={titulo}
      onPress={manejarPress}
    />
  );
};

// * Zona 2: Zona de Main
export default function App() {
  return (
    <View style={styles.container}>
      <Boton títuloInicial="Tlabaja" mensajeAlPresionar="Tlabaja tines que tlabajar"></Boton>
      <StatusBar style="auto" />
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>
    </View>
  );
}
// * Zona 3: Zona de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});