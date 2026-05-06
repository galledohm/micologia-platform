import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Seta, Pregunta } from '../types';

interface DataContextValue {
  setas: Seta[];
  preguntas: Pregunta[];
  loading: boolean;
  setSetas: React.Dispatch<React.SetStateAction<Seta[]>>;
  setPreguntas: React.Dispatch<React.SetStateAction<Pregunta[]>>;
}

const DataContext = createContext<DataContextValue>({
  setas: [],
  preguntas: [],
  loading: true,
  setSetas: () => {},
  setPreguntas: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [setas, setSetas] = useState<Seta[]>([]);
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/setas.json').then((r) => r.json()),
      fetch('/data/preguntas.json').then((r) => r.json()),
    ])
      .then(([setasData, preguntasData]) => {
        setSetas(setasData.setas ?? []);
        setPreguntas(preguntasData.preguntas ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider value={{ setas, preguntas, loading, setSetas, setPreguntas }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
