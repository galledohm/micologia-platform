import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getRandomSetas } from '../data/demo';
import type { Seta, Comestibilidad, Nutricion, RespuestaSeta } from '../types';
import { COMESTIBILIDAD_LABELS, NUTRICION_LABELS } from '../types';

const NUM_SETAS = 15;

interface Respuesta {
  setaId: string;
  nombreCientifico: string;
  comestibilidad: Comestibilidad | '';
  nutricion: Nutricion | '';
}

const TestImagenes: React.FC = () => {
  const navigate = useNavigate();
  const { setas } = useData();

  const setasDelTest: Seta[] = useMemo(
    () => getRandomSetas(setas, NUM_SETAS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuesta[]>(
    setasDelTest.map((s) => ({ setaId: s.id, nombreCientifico: '', comestibilidad: '', nutricion: '' }))
  );
  const [imgError, setImgError] = useState(false);

  const seta = setasDelTest[current];
  const respuesta = respuestas[current];
  const progreso = ((current + 1) / setasDelTest.length) * 100;

  const updateRespuesta = (field: keyof Respuesta, value: string) => {
    setRespuestas((prev) =>
      prev.map((r, i) => (i === current ? { ...r, [field]: value } : r))
    );
  };

  const handleFinish = () => {
    const resultado: RespuestaSeta[] = respuestas.map((r) => ({
      setaId: r.setaId,
      nombreCientifico: r.nombreCientifico,
      comestibilidad: r.comestibilidad as Comestibilidad | '',
      nutricion: r.nutricion as Nutricion | '',
    }));
    navigate('/resultados', {
      state: {
        tipo: 'imagenes',
        respuestas: resultado,
        setas: setasDelTest,
      },
    });
  };

  const allAnswered = respuestas.every(
    (r) => r.nombreCientifico.trim() !== '' && r.comestibilidad !== '' && r.nutricion !== ''
  );

  if (setasDelTest.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p>No hay suficientes setas. Añade setas desde el panel de administración.</p>
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
            <span>Test de imágenes</span>
            <span>{current + 1} / {setasDelTest.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
        <div className="card">
          {/* Image */}
          <div style={{ position: 'relative', background: '#1a3a16', height: '280px', overflow: 'hidden' }}>
            {!imgError ? (
              <img
                key={seta.id}
                src={seta.imagenUrl}
                alt="Seta a identificar"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.5)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem' }}>🍄</div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>Imagen no disponible</p>
                </div>
              </div>
            )}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
              padding: '1.5rem 1.25rem 0.75rem',
              color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem',
            }}>
              Identifica esta seta
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '1.5rem' }}>
            {/* Nombre científico */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', color: '#374151' }}>
                Nombre científico
              </label>
              <input
                type="text"
                value={respuesta.nombreCientifico}
                onChange={(e) => updateRespuesta('nombreCientifico', e.target.value)}
                placeholder="Género especie"
                style={{
                  width: '100%', padding: '0.75rem 1rem',
                  border: '2px solid #e5e7eb', borderRadius: '0.75rem',
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem',
                  outline: 'none', transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-moss)')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>

            {/* Comestibilidad */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', color: '#374151' }}>
                Comestibilidad
              </label>
              <select
                value={respuesta.comestibilidad}
                onChange={(e) => updateRespuesta('comestibilidad', e.target.value)}
                style={{
                  width: '100%', padding: '0.75rem 1rem',
                  border: '2px solid #e5e7eb', borderRadius: '0.75rem',
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem',
                  outline: 'none', appearance: 'none', background: 'white',
                  cursor: 'pointer', boxSizing: 'border-box',
                  color: respuesta.comestibilidad === '' ? '#9ca3af' : '#111827',
                }}
              >
                <option value="">Selecciona una opción...</option>
                {(Object.entries(COMESTIBILIDAD_LABELS) as [Comestibilidad, string][]).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            {/* Nutrición */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem', color: '#374151' }}>
                Tipo de nutrición
              </label>
              <select
                value={respuesta.nutricion}
                onChange={(e) => updateRespuesta('nutricion', e.target.value)}
                style={{
                  width: '100%', padding: '0.75rem 1rem',
                  border: '2px solid #e5e7eb', borderRadius: '0.75rem',
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem',
                  outline: 'none', appearance: 'none', background: 'white',
                  cursor: 'pointer', boxSizing: 'border-box',
                  color: respuesta.nutricion === '' ? '#9ca3af' : '#111827',
                }}
              >
                <option value="">Selecciona una opción...</option>
                {(Object.entries(NUTRICION_LABELS) as [Nutricion, string][]).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn-secondary"
                onClick={() => { setCurrent((c) => c - 1); setImgError(false); }}
                disabled={current === 0}
                style={{ opacity: current === 0 ? 0.4 : 1 }}
              >
                <ArrowLeft size={16} /> Anterior
              </button>

              {current < setasDelTest.length - 1 ? (
                <button
                  className="btn-primary"
                  onClick={() => { setCurrent((c) => c + 1); setImgError(false); }}
                >
                  Siguiente <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={handleFinish}
                  style={{ background: allAnswered ? '#16a34a' : undefined }}
                >
                  <CheckCircle size={16} /> Ver resultados
                </button>
              )}
            </div>

            {/* Dot navigator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {setasDelTest.map((_, i) => {
                const answered = respuestas[i].nombreCientifico !== '' && respuestas[i].comestibilidad !== '' && respuestas[i].nutricion !== '';
                return (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setImgError(false); }}
                    style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      border: 'none', cursor: 'pointer', padding: 0,
                      background: i === current
                        ? 'var(--color-forest)'
                        : answered ? 'var(--color-sage)' : '#d1d5db',
                    }}
                    title={`Seta ${i + 1}${answered ? ' (respondida)' : ''}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestImagenes;
