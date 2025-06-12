// * Zona 1: importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button } from 'react-native';

const Texto=(props) => {
  const {contenido} = props;
  return (
    <Text>{contenido}</Text>
  );
}
// * Zona 2: Zona de Main
export default function App() {
  return (
    <View style={styles.container}>
      <Texto></Texto>
      <Button title="Tlabaja" onPress={() => alert('Tlabaja tines que tlabajar')} />
      <StatusBar style="auto" />
      <Texto contenido="hola"></Texto>
      <Texto contenido="mundo"></Texto>
      <Texto contenido="react native"></Texto>
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