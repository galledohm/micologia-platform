import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import TestImagenes from './pages/TestImagenes';
import TestPreguntas from './pages/TestPreguntas';
import Resultados from './pages/Resultados';
import Admin from './pages/Admin/index';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-imagenes" element={<TestImagenes />} />
          <Route path="/test-preguntas" element={<TestPreguntas />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
};

export default App;
