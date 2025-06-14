/*Zona 1: Importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';


const Texto=({style}) => {
  const [contenido,setContenido]=useState('Hola Mundo ReactNative')
  const actualizaTexto=()=>{setContenido('Estado actualizado del Text')};
  return(
    <Text style={[styles.text,style]} onPress={actualizaTexto}>{contenido}</Text>
  )
};


/*Zona 2: Main */

export default function App() {
  return (

    <View style={styles.container}>

      <Texto style={styles.red}></Texto>
      <Texto style={styles.green}></Texto>
      <Texto style={styles.blue}></Texto>
      <StatusBar style="auto" />
    </View>
  );
}


/*Zona 3: Estetica del screen */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-',
  },
  text: {
    color: 'white',
    fontSize: 20,
    height: 100,
    width: 100,
  },
  red: {
    backgroundColor: 'red',
  },
  green: {
    backgroundColor: 'green',
  },
  blue: {
    backgroundColor: 'blue',
  },
});