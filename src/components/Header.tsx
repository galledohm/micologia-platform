import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => (
  <header
    style={{
      background: 'linear-gradient(135deg, #1a3a16 0%, #2d5a27 60%, #4a7c59 100%)',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
    }}
  >
    <Leaf size={28} strokeWidth={1.5} />
    <div>
      <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.02em' }}>
        MicologíaTest
      </h1>
      <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.75, fontFamily: 'Poppins, sans-serif' }}>
        Plataforma de aprendizaje micológico
      </p>
    </div>
  </header>
);

export default Header;
