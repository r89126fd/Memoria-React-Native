import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ContextJuego } from '../contexto/ContextJuego';

export default function Historial() {
  const { historial } = useContext(ContextJuego);

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Historial de Partidas</Text>
      {historial.length === 0 ? (
        <Text>No hay partidas registradas</Text>
      ) : (
        <FlatList
          data={historial}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={estilos.item}>
              <Text>#{item.id} - {item.resultado}</Text>
              <Text style={estilos.fecha}>{item.fecha}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  fecha: {
    fontSize: 12,
    color: '#666'
  }
});
