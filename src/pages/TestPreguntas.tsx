import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getRandomPreguntas } from '../data/demo';
import type { Pregunta, RespuestaPregunta } from '../types';

const DIFICULTADES = [
  {
    id: 'facil',
    titulo: 'Fácil',
    cantidad: 15,
    descripcion: 'Un examen breve para afianzar conceptos básicos.',
    color: '#dcfce7',
    accent: '#166534',
  },
  {
    id: 'medio',
    titulo: 'Medio',
    cantidad: 25,
    descripcion: 'Un recorrido más amplio por el contenido del curso.',
    color: '#fef3c7',
    accent: '#92400e',
  },
  {
    id: 'dificil',
    titulo: 'Difícil',
    cantidad: 40,
    descripcion: 'Formato largo para simular un examen más exigente.',
    color: '#fee2e2',
    accent: '#991b1b',
  },
] as const;

type DificultadExamen = (typeof DIFICULTADES)[number];

const LETRAS = ['a', 'b', 'c', 'd', 'e'];

const TestPreguntas: React.FC = () => {
  const navigate = useNavigate();
  const { preguntas, loading } = useData();

  const temasDisponibles = useMemo(
    () =>
      Array.from(
        new Set(
          preguntas
            .map((p) => p.tema?.trim())
            .filter((tema): tema is string => Boolean(tema))
        )
      ).sort((a, b) => a.localeCompare(b, 'es')),
    [preguntas]
  );

  const [preguntasDelTest, setPreguntasDelTest] = useState<Pregunta[]>([]);
  const [temasSeleccionados, setTemasSeleccionados] = useState<string[]>([]);
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState<DificultadExamen | null>(null);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});

  useEffect(() => {
    setTemasSeleccionados((prev) => {
      if (temasDisponibles.length === 0) return [];
      if (prev.length === 0) return temasDisponibles;

      const temasVigentes = prev.filter((tema) => temasDisponibles.includes(tema));
      return temasVigentes.length > 0 ? temasVigentes : temasDisponibles;
    });
  }, [temasDisponibles]);

  const preguntasFiltradas = useMemo(
    () => preguntas.filter((p) => temasSeleccionados.includes(p.tema?.trim())),
    [preguntas, temasSeleccionados]
  );

  const toggleTema = (tema: string) => {
    setTemasSeleccionados((prev) =>
      prev.includes(tema)
        ? prev.filter((t) => t !== tema)
        : [...prev, tema]
    );
  };

  const iniciarTest = (dificultad: DificultadExamen) => {
    setDificultadSeleccionada(dificultad);
    setCantidadSeleccionada(dificultad.cantidad);
    setPreguntasDelTest(getRandomPreguntas(preguntasFiltradas, dificultad.cantidad));
    setCurrent(0);
    setRespuestas({});
  };

  if (!cantidadSeleccionada) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-cream)', padding: '2rem 1rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280',
              display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Poppins, sans-serif',
              fontSize: '0.875rem', marginBottom: '1.5rem',
            }}
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h1 style={{ margin: '0 0 0.75rem', fontSize: '1.8rem', color: '#111827' }}>Elige la dificultad del examen</h1>
            <p style={{ margin: 0, color: '#6b7280', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
              Selecciona primero los temas y después la dificultad. El test se generará de forma aleatoria con preguntas de los temas marcados.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem 1.75rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>Temas incluidos</h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setTemasSeleccionados(temasDisponibles)}
                  disabled={temasDisponibles.length === 0}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  Seleccionar todos
                </button>
                <button
                  type="button"
                  onClick={() => setTemasSeleccionados([])}
                  disabled={temasSeleccionados.length === 0}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {temasDisponibles.length === 0 ? (
              <p style={{ margin: 0, color: '#6b7280', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>
                No hay temas disponibles en el banco de preguntas.
              </p>
            ) : (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '0.9rem' }}>
                  {temasDisponibles.map((tema) => {
                    const selected = temasSeleccionados.includes(tema);
                    const preguntasTema = preguntas.filter((p) => p.tema?.trim() === tema).length;
                    return (
                      <button
                        key={tema}
                        type="button"
                        onClick={() => toggleTema(tema)}
                        style={{
                          border: `1.5px solid ${selected ? '#4a7c59' : '#d1d5db'}`,
                          background: selected ? '#e8f5e9' : '#ffffff',
                          color: selected ? '#1f4e2f' : '#4b5563',
                          borderRadius: '9999px',
                          padding: '0.4rem 0.7rem',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {selected ? '✓ ' : ''}{tema} ({preguntasTema})
                      </button>
                    );
                  })}
                </div>
                <p style={{ margin: 0, color: '#6b7280', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem' }}>
                  {temasSeleccionados.length > 0
                    ? `${temasSeleccionados.length} temas seleccionados · ${preguntasFiltradas.length} preguntas disponibles`
                    : 'Selecciona al menos un tema para habilitar las dificultades.'}
                </p>
              </>
            )}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}>
            {DIFICULTADES.map((dificultad) => {
              const disponible = preguntasFiltradas.length >= dificultad.cantidad;
              return (
                <button
                  key={dificultad.id}
                  onClick={() => iniciarTest(dificultad)}
                  disabled={!disponible || loading}
                  style={{
                    background: 'white', border: `2px solid ${dificultad.color}`, borderRadius: '1rem',
                    padding: '1.5rem', textAlign: 'left', cursor: disponible && !loading ? 'pointer' : 'not-allowed',
                    opacity: disponible && !loading ? 1 : 0.55, boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    minWidth: '72px', padding: '0.35rem 0.7rem', borderRadius: '9999px',
                    background: dificultad.color, color: dificultad.accent, fontWeight: 700,
                    fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', marginBottom: '1rem',
                  }}>
                    {dificultad.titulo}
                  </div>
                  <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.5rem', color: '#111827' }}>{dificultad.cantidad} preguntas</h2>
                  <p style={{ margin: '0 0 1rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif', lineHeight: 1.55 }}>
                    {dificultad.descripcion}
                  </p>
                  <div style={{ fontSize: '0.82rem', color: disponible ? dificultad.accent : '#6b7280', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {disponible ? 'Disponible' : `Necesitas al menos ${dificultad.cantidad} preguntas en los temas seleccionados`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

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
        examen: dificultadSeleccionada
          ? {
              dificultadId: dificultadSeleccionada.id,
              dificultadTitulo: dificultadSeleccionada.titulo,
              cantidadPreguntas: dificultadSeleccionada.cantidad,
              temas: temasSeleccionados,
            }
          : undefined,
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
            <span>Test de preguntas · {cantidadSeleccionada} preguntas</span>
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
