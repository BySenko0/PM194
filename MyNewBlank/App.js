import { View, Text, ActivityIndicator, Button, StyleSheet } from "react-native-web";
import React, { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const simularCarga = () => {
    setLoading(true);
    setMessage("");
    setTimeout(() => {
      setLoading(false);
      setMessage("Carga completada");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carga</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.texto}>Cargando...</Text>
      )}
      <Button title="Simular carga" onPress={simularCarga} />
      {message !== '' && <Text style={styles.exito}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20,
  },
  texto: {
    fontSize: 15,
    color: 'gray'
  },
  exito: {
    fontSize: 15,
    color: 'green',
    marginTop: 20,
  }
});
