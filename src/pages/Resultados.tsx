import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, RotateCcw, CheckCircle, XCircle, MinusCircle, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import type { Seta, Pregunta, RespuestaSeta, RespuestaPregunta, Comestibilidad, Nutricion } from '../types';
import { COMESTIBILIDAD_LABELS, NUTRICION_LABELS } from '../types';
import Badge from '../components/Badge';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

function scoreNombre(correcto: string, respuesta: string): boolean {
  if (!respuesta.trim()) return false;
  return normalize(correcto) === normalize(respuesta);
}

// ---------------------------------------------------------------------------
// Results for image test
// ---------------------------------------------------------------------------
interface ImagenesResultsProps {
  respuestas: RespuestaSeta[];
  setas: Seta[];
}

const ImagenesResults: React.FC<ImagenesResultsProps> = ({ respuestas, setas }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const scored = setas.map((seta) => {
    const resp = respuestas.find((r) => r.setaId === seta.id);
    const nombreOk = resp ? scoreNombre(seta.nombreCientifico, resp.nombreCientifico) : false;
    const comestibilidadOk = resp?.comestibilidad === seta.comestibilidad;
    const nutricionOk = resp?.nutricion === seta.nutricion;
    const puntos = (nombreOk ? 1 : 0) + (comestibilidadOk ? 1 : 0) + (nutricionOk ? 1 : 0);
    return { seta, resp, nombreOk, comestibilidadOk, nutricionOk, puntos };
  });

  const totalPuntos = scored.reduce((acc, s) => acc + s.puntos, 0);
  const maxPuntos = setas.length * 3;
  const porcentaje = Math.round((totalPuntos / maxPuntos) * 100);

  return (
    <div>
      <ScoreHeader puntos={totalPuntos} max={maxPuntos} porcentaje={porcentaje} label="setas" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {scored.map(({ seta, resp, nombreOk, comestibilidadOk, nutricionOk, puntos }, i) => {
          const isOpen = expanded === seta.id;
          const allOk = puntos === 3;
          return (
            <div key={seta.id} style={{
              background: 'white', borderRadius: '0.875rem',
              border: `2px solid ${allOk ? '#bbf7d0' : puntos > 0 ? '#fde68a' : '#fecaca'}`,
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setExpanded(isOpen ? null : seta.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: allOk ? '#dcfce7' : puntos > 0 ? '#fef9c3' : '#fee2e2',
                  color: allOk ? '#16a34a' : puntos > 0 ? '#92400e' : '#dc2626',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.8rem',
                }}>
                  {i + 1}
                </span>
                <span style={{ flex: 1, fontWeight: 600, fontSize: '0.95rem', fontStyle: 'italic', color: '#111827' }}>
                  {seta.nombreCientifico}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif', marginRight: '0.5rem' }}>
                  {puntos}/3
                </span>
                {isOpen ? <ChevronUp size={16} color="#9ca3af" /> : <ChevronDown size={16} color="#9ca3af" />}
              </button>

              {isOpen && (
                <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1rem' }}>
                    {/* Nombre científico */}
                    <ResultRow
                      label="Nombre científico"
                      correcto={seta.nombreCientifico}
                      respondido={resp?.nombreCientifico || '—'}
                      isOk={nombreOk}
                    />
                    {/* Comestibilidad */}
                    <ResultRow
                      label="Comestibilidad"
                      correcto={COMESTIBILIDAD_LABELS[seta.comestibilidad]}
                      respondido={resp?.comestibilidad ? COMESTIBILIDAD_LABELS[resp.comestibilidad as Comestibilidad] : '—'}
                      isOk={comestibilidadOk}
                      correctBadge={<Badge value={seta.comestibilidad} type="comestibilidad" />}
                    />
                    {/* Nutrición */}
                    <ResultRow
                      label="Tipo de nutrición"
                      correcto={NUTRICION_LABELS[seta.nutricion]}
                      respondido={resp?.nutricion ? NUTRICION_LABELS[resp.nutricion as Nutricion] : '—'}
                      isOk={nutricionOk}
                      correctBadge={<Badge value={seta.nutricion} type="nutricion" />}
                    />
                  </div>
                  {seta.descripcion && (
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif', lineHeight: 1.5, borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem' }}>
                      📖 {seta.descripcion}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Results for question test
// ---------------------------------------------------------------------------
interface PreguntasResultsProps {
  respuestas: RespuestaPregunta[];
  preguntas: Pregunta[];
}

const PreguntasResults: React.FC<PreguntasResultsProps> = ({ respuestas, preguntas }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const scored = preguntas.map((p) => {
    const resp = respuestas.find((r) => r.preguntaId === p.id);
    const seleccionada = resp?.respuestaSeleccionada ?? '';
    const isOk = seleccionada === p.respuestaCorrecta;
    return { p, seleccionada, isOk };
  });

  const aciertos = scored.filter((s) => s.isOk).length;
  const porcentaje = Math.round((aciertos / preguntas.length) * 100);

  return (
    <div>
      <ScoreHeader puntos={aciertos} max={preguntas.length} porcentaje={porcentaje} label="preguntas" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {scored.map(({ p, seleccionada, isOk }, i) => {
          const isOpen = expanded === p.id;
          const noResponded = !seleccionada;
          return (
            <div key={p.id} style={{
              background: 'white', borderRadius: '0.875rem',
              border: `2px solid ${isOk ? '#bbf7d0' : noResponded ? '#e5e7eb' : '#fecaca'}`,
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setExpanded(isOpen ? null : p.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ flexShrink: 0 }}>
                  {isOk
                    ? <CheckCircle size={20} color="#16a34a" />
                    : noResponded
                    ? <MinusCircle size={20} color="#9ca3af" />
                    : <XCircle size={20} color="#dc2626" />}
                </span>
                <span style={{ flex: 1, fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#111827' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-moss)' }}>{i + 1}. </span>
                  {p.texto}
                </span>
                {isOpen ? <ChevronUp size={16} color="#9ca3af" /> : <ChevronDown size={16} color="#9ca3af" />}
              </button>

              {isOpen && (
                <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f3f4f6' }}>
                  {p.tema && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: '0.75rem 0 1rem' }}>
                      <Tag size={12} color="#9ca3af" />
                      <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
                        Tema: {p.tema}
                      </span>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {p.opciones.map((op) => {
                      const isCorrect = op.id === p.respuestaCorrecta;
                      const isSelected = op.id === seleccionada;
                      let bg = '#f9fafb', border = '#e5e7eb', color = '#374151';
                      if (isCorrect) { bg = '#dcfce7'; border = '#16a34a'; color = '#065f46'; }
                      else if (isSelected && !isCorrect) { bg = '#fee2e2'; border = '#dc2626'; color = '#991b1b'; }
                      return (
                        <div key={op.id} style={{
                          padding: '0.6rem 1rem', borderRadius: '0.5rem',
                          border: `1.5px solid ${border}`, background: bg, color,
                          fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem',
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                        }}>
                          <span style={{ fontWeight: 700, opacity: 0.7 }}>{op.id.toUpperCase()}.</span>
                          {op.texto}
                          {isCorrect && <CheckCircle size={14} color="#16a34a" style={{ marginLeft: 'auto' }} />}
                          {isSelected && !isCorrect && <XCircle size={14} color="#dc2626" style={{ marginLeft: 'auto' }} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------
interface ScoreHeaderProps {
  puntos: number;
  max: number;
  porcentaje: number;
  label: string;
}

const ScoreHeader: React.FC<ScoreHeaderProps> = ({ puntos, max, porcentaje, label }) => {
  const color = porcentaje >= 70 ? '#16a34a' : porcentaje >= 50 ? '#d97706' : '#dc2626';
  const emoji = porcentaje >= 70 ? '🎉' : porcentaje >= 50 ? '💪' : '📚';
  const msg = porcentaje >= 70 ? '¡Excelente trabajo!' : porcentaje >= 50 ? '¡Buen progreso!' : 'Sigue estudiando';

  return (
    <div style={{
      background: 'white', borderRadius: '1.25rem',
      padding: '2rem', textAlign: 'center', marginBottom: '1.5rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{emoji}</div>
      <h2 style={{ margin: '0 0 0.25rem', color }}>{msg}</h2>
      <p style={{ margin: '0 0 1.25rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>
        {puntos} de {max} puntos en {label}
      </p>
      <div style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#6b7280' }}>
          <span>Puntuación</span>
          <span style={{ fontWeight: 700, color }}>{porcentaje}%</span>
        </div>
        <div className="progress-bar" style={{ height: '10px' }}>
          <div style={{
            height: '100%', borderRadius: '9999px',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            width: `${porcentaje}%`, transition: 'width 0.6s ease',
          }} />
        </div>
      </div>
    </div>
  );
};

interface ResultRowProps {
  label: string;
  correcto: string;
  respondido: string;
  isOk: boolean;
  correctBadge?: React.ReactNode;
}

const ResultRow: React.FC<ResultRowProps> = ({ label, correcto, respondido, isOk, correctBadge }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem', padding: '0.6rem', borderRadius: '0.5rem',
    background: isOk ? '#f0fdf4' : '#fff7f7',
  }}>
    <div>
      <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {isOk
          ? <CheckCircle size={13} color="#16a34a" />
          : <XCircle size={13} color="#dc2626" />}
        <span style={{ color: isOk ? '#065f46' : '#991b1b', fontStyle: label === 'Nombre científico' ? 'italic' : 'normal' }}>
          {respondido}
        </span>
      </div>
    </div>
    <div>
      <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Correcto</div>
      <div style={{ fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif' }}>
        {correctBadge || <span style={{ fontStyle: label === 'Nombre científico' ? 'italic' : 'normal', color: '#065f46' }}>{correcto}</span>}
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
interface LocationState {
  tipo: 'imagenes' | 'preguntas';
  respuestas: RespuestaSeta[] | RespuestaPregunta[];
  setas?: Seta[];
  preguntas?: Pregunta[];
}

const Resultados: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p>No hay resultados disponibles.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)', paddingBottom: '3rem' }}>
      {/* Top bar */}
      <div style={{
        background: 'white', padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Resultados</h2>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            onClick={() => navigate(state.tipo === 'imagenes' ? '/test-imagenes' : '/test-preguntas')}
          >
            <RotateCcw size={14} /> Repetir test
          </button>
          <button
            className="btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            onClick={() => navigate('/')}
          >
            <Home size={14} /> Inicio
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
        {state.tipo === 'imagenes' && state.setas ? (
          <ImagenesResults
            respuestas={state.respuestas as RespuestaSeta[]}
            setas={state.setas}
          />
        ) : state.tipo === 'preguntas' && state.preguntas ? (
          <PreguntasResults
            respuestas={state.respuestas as RespuestaPregunta[]}
            preguntas={state.preguntas}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Resultados;
