import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProveedorJuego } from './contexto/ContextJuego';

import Inicio from './pantallas/Inicio';
import Juego from './pantallas/Juego';
import Historial from './pantallas/Historial';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProveedorJuego>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Juego" component={Juego} />
          <Stack.Screen name="Historial" component={Historial} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProveedorJuego>
  );
}
