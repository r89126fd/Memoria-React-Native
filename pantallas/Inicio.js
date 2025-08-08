import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ContextJuego } from '../contexto/ContextJuego';

export default function Inicio({ navigation }) {
  const { iniciarJuego, partidas } = useContext(ContextJuego);

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>juego de Memoria</Text>
      <Text style={estilos.subtitulo}>partidas jugadas: {partidas}</Text>
      <Button
        title="Iniciar a jugar"
        onPress={() => {
          iniciarJuego();
          navigation.navigate('Juego');
        }}
      />
      <Button
        title="Ver historial"
        onPress={() => navigation.navigate('Historial')}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20
  }
});
