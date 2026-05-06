import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getRandomPreguntas } from '../data/demo';
import type { Pregunta, RespuestaPregunta } from '../types';

const NUM_PREGUNTAS = 20;

const LETRAS = ['a', 'b', 'c', 'd', 'e'];

const TestPreguntas: React.FC = () => {
  const navigate = useNavigate();
  const { preguntas } = useData();

  const preguntasDelTest: Pregunta[] = useMemo(
    () => getRandomPreguntas(preguntas, NUM_PREGUNTAS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});

  const pregunta = preguntasDelTest[current];
  const progreso = ((current + 1) / preguntasDelTest.length) * 100;
  const respondidas = Object.keys(respuestas).length;

  const selectOpcion = (opcionId: string) => {
    setRespuestas((prev) => ({ ...prev, [pregunta.id]: opcionId }));
  };

  const handleFinish = () => {
    const resultado: RespuestaPregunta[] = preguntasDelTest.map((p) => ({
      preguntaId: p.id,
      respuestaSeleccionada: respuestas[p.id] ?? '',
    }));
    navigate('/resultados', {
      state: {
        tipo: 'preguntas',
        respuestas: resultado,
        preguntas: preguntasDelTest,
      },
    });
  };

  if (preguntasDelTest.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p>No hay suficientes preguntas. Añade preguntas desde el panel de administración.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Volver</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)', paddingBottom: '3rem' }}>
      {/* Top bar */}
      <div style={{
        background: 'white', padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem' }}
        >
          <ArrowLeft size={16} /> Salir
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#6b7280' }}>
            <span>Test de preguntas</span>
            <span>{current + 1} / {preguntasDelTest.length} &nbsp;·&nbsp; {respondidas} respondidas</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          {/* Tema badge */}
          {pregunta.tema && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <Tag size={13} color="#6b7280" />
              <span style={{ fontSize: '0.75rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                Tema: {pregunta.tema}
              </span>
            </div>
          )}

          {/* Pregunta */}
          <h2 style={{ fontSize: '1.15rem', lineHeight: 1.5, marginTop: 0, marginBottom: '1.75rem', color: '#111827' }}>
            <span style={{ color: 'var(--color-moss)', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
              {current + 1}.{' '}
            </span>
            {pregunta.texto}
          </h2>

          {/* Opciones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {pregunta.opciones.map((opcion, idx) => {
              const isSelected = respuestas[pregunta.id] === opcion.id;
              return (
                <button
                  key={opcion.id}
                  className={`option-btn${isSelected ? ' selected' : ''}`}
                  onClick={() => selectOpcion(opcion.id)}
                >
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: isSelected ? 'var(--color-forest)' : '#f3f4f6',
                    color: isSelected ? 'white' : '#374151',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
                    transition: 'all 0.15s',
                  }}>
                    {LETRAS[idx].toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>{opcion.texto}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className="btn-secondary"
              onClick={() => setCurrent((c) => c - 1)}
              disabled={current === 0}
              style={{ opacity: current === 0 ? 0.4 : 1 }}
            >
              <ArrowLeft size={16} /> Anterior
            </button>

            {current < preguntasDelTest.length - 1 ? (
              <button
                className="btn-primary"
                onClick={() => setCurrent((c) => c + 1)}
              >
                Siguiente <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={handleFinish}
                style={{ background: respondidas === preguntasDelTest.length ? '#16a34a' : undefined }}
              >
                <CheckCircle size={16} /> Ver resultados
              </button>
            )}
          </div>

          {/* Dot navigator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {preguntasDelTest.map((p, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  border: 'none', cursor: 'pointer', padding: 0,
                  background: i === current
                    ? '#8b5e3c'
                    : respuestas[p.id] ? 'var(--color-mushroom)' : '#d1d5db',
                }}
                title={`Pregunta ${i + 1}${respuestas[p.id] ? ' (respondida)' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPreguntas;
