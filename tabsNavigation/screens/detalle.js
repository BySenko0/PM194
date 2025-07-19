import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Detalle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles Usuario</Text>
      <TouchableOpacity>
        <Text style={styles.link}>Usando Navegacion Stack</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#0000EE', // azul tipo enlace
    textDecorationLine: 'underline',
  },
});
