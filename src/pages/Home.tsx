import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, FileQuestion, Shield, BookOpen } from 'lucide-react';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setas, preguntas, loading } = useData();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)' }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a3a16 0%, #2d5a27 60%, #4a7c59 100%)',
          color: 'white',
          padding: '4rem 2rem 3rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px',
          width: '150px', height: '150px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍄</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '0 0 1rem', color: 'white' }}>
          MicologíaTest
        </h1>
        <p style={{
          fontSize: '1.1rem', opacity: 0.85, maxWidth: '550px',
          margin: '0 auto', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6,
        }}>
          Pon a prueba tus conocimientos sobre hongos y setas. Identifica especies,
          aprende sobre su comestibilidad y ecología.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{
        background: 'white', padding: '1.25rem 2rem',
        display: 'flex', justifyContent: 'center', gap: '3rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        flexWrap: 'wrap',
      }}>
        {[
          { icon: '🍄', label: 'Setas disponibles', value: loading ? '...' : setas.length },
          { icon: '❓', label: 'Preguntas en banco', value: loading ? '...' : preguntas.length },
          { icon: '🎯', label: 'Preguntas por test', value: 20 },
          { icon: '🖼️', label: 'Imágenes por test', value: 15 },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
            <div style={{
              fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-forest)',
              fontFamily: 'Playfair Display, serif',
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Test cards */}
      <div style={{
        maxWidth: '900px', margin: '3rem auto', padding: '0 1.5rem',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {/* Test de imágenes */}
        <button
          onClick={() => navigate('/test-imagenes')}
          disabled={loading || setas.length === 0}
          style={{
            background: 'white', border: 'none', borderRadius: '1.25rem',
            padding: '2rem', cursor: loading || setas.length === 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textAlign: 'left', opacity: loading || setas.length === 0 ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading && setas.length > 0) {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.14)';
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
        >
          <div style={{
            width: '56px', height: '56px', borderRadius: '1rem',
            background: 'linear-gradient(135deg, #2d5a27, #4a7c59)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.25rem',
          }}>
            <Camera size={28} color="white" strokeWidth={1.5} />
          </div>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', color: '#1a1a1a' }}>
            Test de Imágenes
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Identifica 15 setas a partir de fotografías. Indica su nombre científico, comestibilidad y tipo de nutrición.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['15 setas', 'Identificación visual', 'Con corrección'].map((tag) => (
              <span key={tag} style={{
                background: '#e8f5e9', color: '#2d5a27',
                padding: '0.25rem 0.6rem', borderRadius: '9999px',
                fontSize: '0.7rem', fontWeight: 600,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </button>

        {/* Test de preguntas */}
        <button
          onClick={() => navigate('/test-preguntas')}
          disabled={loading || preguntas.length === 0}
          style={{
            background: 'white', border: 'none', borderRadius: '1.25rem',
            padding: '2rem', cursor: loading || preguntas.length === 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textAlign: 'left', opacity: loading || preguntas.length === 0 ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading && preguntas.length > 0) {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.14)';
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
        >
          <div style={{
            width: '56px', height: '56px', borderRadius: '1rem',
            background: 'linear-gradient(135deg, #8b5e3c, #c4956a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.25rem',
          }}>
            <FileQuestion size={28} color="white" strokeWidth={1.5} />
          </div>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', color: '#1a1a1a' }}>
            Test de Preguntas
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Responde 20 preguntas tipo test extraídas del material del curso. Cada pregunta indica el tema al que corresponde.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['20 preguntas', 'Aleatorias', 'Con corrección'].map((tag) => (
              <span key={tag} style={{
                background: '#fef3c7', color: '#92400e',
                padding: '0.25rem 0.6rem', borderRadius: '9999px',
                fontSize: '0.7rem', fontWeight: 600,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </button>
      </div>

      {/* Info / admin links */}
      <div style={{
        maxWidth: '900px', margin: '0 auto 3rem', padding: '0 1.5rem',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
      }}>
        <div style={{
          background: 'white', borderRadius: '1rem', padding: '1.5rem',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <BookOpen size={22} color="var(--color-forest)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>Material de estudio</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif' }}>
              Los tests incluyen preguntas de todos los temas del curso con indicación del tema al que pertenecen.
            </p>
          </div>
        </div>
        <div style={{
          background: 'white', borderRadius: '1rem', padding: '1.5rem',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          cursor: 'pointer',
        }}
          onClick={() => navigate('/admin')}
        >
          <Shield size={22} color="var(--color-earth)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>Panel de administración</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif' }}>
              Añade nuevas setas, sube PDFs con preguntas y gestiona el contenido del curso.
            </p>
          </div>
        </div>
      </div>

      <p style={{
        margin: '0 auto 3rem',
        maxWidth: '900px',
        padding: '0 1.5rem',
        textAlign: 'center',
        color: '#4b5563',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.92rem',
        lineHeight: 1.6,
      }}>
        Gracias a Javier Marcos y a todos los compañeros del curso de Orientador Micológico 2026 por compartir su conocimiento y pasión por la micología.
      </p>
    </div>
  );
};

export default Home;
