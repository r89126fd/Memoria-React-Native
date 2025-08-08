import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { ContextJuego } from '../contexto/ContextJuego';

export default function Juego({ navigation }) {
  const { cartas, seleccionadas, seleccionarCarta, estado } = useContext(ContextJuego);

  React.useEffect(() => {
    if (estado === 'ganar') {
      Alert.alert('Felicidades', 'Has encontrado todas las cartas');
    } else if (estado === 'perder') {
      Alert.alert('Fin del juego', 'Las cartas no son iguales');
    }
  }, [estado]);

  const renderCarta = ({ item }) => {
    const descubierta = item.encontrada || seleccionadas.includes(item);
    return (
      <TouchableOpacity
        style={[estilos.carta, descubierta && estilos.cartaActiva]}
        onPress={() => seleccionarCarta(item)}
      >
        <Text style={estilos.textoCarta}>{descubierta ? item.valor : '?'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={estilos.contenedor}>
      <FlatList
        data={cartas}
        renderItem={renderCarta}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />
      <TouchableOpacity style={estilos.boton} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBoton}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  carta: {
    flex: 1,
    margin: 5,
    height: 70,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  cartaActiva: {
    backgroundColor: '#4CAF50'
  },
  textoCarta: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },
  boton: {
    marginTop: 20,
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16
  }
});
