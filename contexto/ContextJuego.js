import React, { createContext, useState } from 'react';

export const ContextJuego = createContext();

export const ProveedorJuego = ({ children }) => {
  const [cartas, setCartas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [bloqueo, setBloqueo] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [partidas, setPartidas] = useState(0);
  const [estado, setEstado] = useState('');

  const crearCartas = () => {
    const letras = ['A', 'B', 'C', 'D'];
    let base = [...letras, ...letras];
    base = base
      .map(valor => ({ valor, id: Math.random().toString(36).slice(2), encontrada: false }))
      .sort(() => Math.random() - 0.5);
    return base;
  };

  const iniciarJuego = () => {
    setCartas(crearCartas());
    setSeleccionadas([]);
    setBloqueo(false);
    setEstado('');
  };

  const seleccionarCarta = (carta) => {
    if (bloqueo || seleccionadas.includes(carta) || carta.encontrada) return;

    const nuevas = [...seleccionadas, carta];
    setSeleccionadas(nuevas);

    if (nuevas.length === 2) {
      setBloqueo(true);
      setTimeout(() => verificarCartas(nuevas), 800);
    }
  };

  const verificarCartas = ([c1, c2]) => {
    if (c1.valor === c2.valor) {
      const actualizadas = cartas.map(c =>
        c.id === c1.id || c.id === c2.id ? { ...c, encontrada: true } : c
      );
      setCartas(actualizadas);

      if (actualizadas.every(c => c.encontrada)) {
        finalizarJuego(true);
      } else {
        setBloqueo(false);
        setSeleccionadas([]);
      }
    } else {
      finalizarJuego(false);
    }
  };

  const finalizarJuego = (gano) => {
    setPartidas(prev => prev + 1);
    setEstado(gano ? 'ganar' : 'perder');
    setHistorial(prev => [
      ...prev,
      { id: prev.length + 1, resultado: gano ? 'Ganó' : 'Perdió', fecha: new Date().toLocaleString() }
    ]);
    setBloqueo(true);
  };

  return (
    <ContextJuego.Provider
      value={{
        cartas,
        seleccionadas,
        historial,
        partidas,
        estado,
        iniciarJuego,
        seleccionarCarta
      }}
    >
      {children}
    </ContextJuego.Provider>
  );
};
