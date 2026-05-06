import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Trash2, Upload, RefreshCw, AlertCircle,
  CheckCircle, Download, FileText, Lock,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { Seta, Pregunta, Comestibilidad, Nutricion, OpcionPregunta } from '../../types';
import { COMESTIBILIDAD_LABELS, NUTRICION_LABELS } from '../../types';
import Badge from '../../components/Badge';

type Tab = 'setas' | 'preguntas' | 'subir-txt';

// SHA-256 hash of the admin password (stored in repo — never plain text)
const ADMIN_HASH = '8b64d8f332339899f8978c3ae13ee705ed155f7426d85b8b032a534ca4d896ee';

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ---------------------------------------------------------------------------
// Login gate
// ---------------------------------------------------------------------------
const AdminLogin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError('');
    const hash = await sha256(pwd);
    if (hash === ADMIN_HASH) {
      sessionStorage.setItem('admin_auth', '1');
      onSuccess();
    } else {
      setError('Contraseña incorrecta.');
    }
    setChecking(false);
  }, [pwd, onSuccess]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ padding: '2.5rem 2rem', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div style={{ background: 'var(--color-forest)', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={20} color="white" />
          </div>
        </div>
        <h2 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.2rem' }}>Panel de Administración</h2>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.75rem' }}>
          Acceso restringido. Introduce la contraseña.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            style={{
              width: '100%', padding: '0.65rem 0.875rem', border: '1.5px solid #d1d5db',
              borderRadius: '0.5rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem',
              boxSizing: 'border-box', marginBottom: '0.75rem', outline: 'none',
            }}
          />
          {error && (
            <p style={{ color: '#dc2626', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', marginBottom: '0.75rem' }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={checking || !pwd}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {checking ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#9ca3af' }}
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function downloadJSON(data: object, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { setas, preguntas, setSetas, setPreguntas } = useData();
  const [tab, setTab] = useState<Tab>('setas');
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('admin_auth') === '1');

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
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
          <ArrowLeft size={16} /> Volver
        </button>
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Panel de Administración</h2>
      </div>

      {/* Info banner */}
      <div style={{
        background: '#eff6ff', borderBottom: '1px solid #bfdbfe',
        padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
      }}>
        <AlertCircle size={16} color="#1d4ed8" style={{ flexShrink: 0, marginTop: 2 }} />
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#1e40af', lineHeight: 1.5 }}>
          <strong>Cómo publicar cambios:</strong> Después de editar, descarga el JSON con el botón
          de descarga y reemplaza el archivo en <code>public/data/</code> de tu repositorio.
          Vercel lo publicará automáticamente al hacer push a GitHub.
        </span>
      </div>

      <div style={{ maxWidth: '900px', margin: '1.5rem auto', padding: '0 1rem' }}>
        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
          borderBottom: '2px solid #e5e7eb',
        }}>
          {([
            { key: 'setas', label: `🍄 Setas (${setas.length})` },
            { key: 'preguntas', label: `❓ Preguntas (${preguntas.length})` },
            { key: 'subir-txt', label: '📄 Importar .txt' },
          ] as { key: Tab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: '0.6rem 1.25rem', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem',
                fontWeight: tab === key ? 700 : 400,
                color: tab === key ? 'var(--color-forest)' : '#6b7280',
                borderBottom: tab === key ? '2px solid var(--color-forest)' : '2px solid transparent',
                marginBottom: '-2px', transition: 'color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'setas' && <SetasTab setas={setas} setSetas={setSetas} />}
        {tab === 'preguntas' && <PreguntasTab preguntas={preguntas} setPreguntas={setPreguntas} />}
        {tab === 'subir-txt' && <SubirTxtTab preguntas={preguntas} setPreguntas={setPreguntas} />}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Setas Tab
// ---------------------------------------------------------------------------
const emptySetaForm = (): Omit<Seta, 'id'> => ({
  nombreCientifico: '',
  nombreComun: '',
  imagenUrl: '',
  comestibilidad: 'comestible',
  nutricion: 'saprobia',
  tema: '',
  descripcion: '',
});

const SetasTab: React.FC<{
  setas: Seta[];
  setSetas: React.Dispatch<React.SetStateAction<Seta[]>>;
}> = ({ setas, setSetas }) => {
  const [form, setForm] = useState(emptySetaForm());
  const [msg, setMsg] = useState('');

  const handleAdd = () => {
    if (!form.nombreCientifico.trim()) { setMsg('El nombre científico es obligatorio.'); return; }
    const nueva: Seta = { ...form, id: generateId('seta') };
    setSetas((prev) => [...prev, nueva]);
    setForm(emptySetaForm());
    setMsg('✓ Seta añadida. Descarga el JSON para guardar los cambios.');
  };

  const handleDelete = (id: string) => {
    setSetas((prev) => prev.filter((s) => s.id !== id));
    setMsg('Seta eliminada. Descarga el JSON para guardar los cambios.');
  };

  const handleDownload = () => {
    downloadJSON({ setas }, 'setas.json');
  };

  return (
    <div>
      {/* Add form */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem' }}>Añadir nueva seta</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <InputField label="Nombre científico *" value={form.nombreCientifico} onChange={(v) => setForm({ ...form, nombreCientifico: v })} placeholder="Amanita muscaria" />
          <InputField label="Nombre común" value={form.nombreComun} onChange={(v) => setForm({ ...form, nombreComun: v })} placeholder="Agárico" />
          <InputField label="URL de imagen" value={form.imagenUrl} onChange={(v) => setForm({ ...form, imagenUrl: v })} placeholder="https://..." />
          <InputField label="Tema / Familia" value={form.tema} onChange={(v) => setForm({ ...form, tema: v })} placeholder="Amanitaceae" />
          <SelectField
            label="Comestibilidad"
            value={form.comestibilidad}
            onChange={(v) => setForm({ ...form, comestibilidad: v as Comestibilidad })}
            options={Object.entries(COMESTIBILIDAD_LABELS) as [string, string][]}
          />
          <SelectField
            label="Tipo de nutrición"
            value={form.nutricion}
            onChange={(v) => setForm({ ...form, nutricion: v as Nutricion })}
            options={Object.entries(NUTRICION_LABELS) as [string, string][]}
          />
        </div>
        <InputField
          label="Descripción (opcional)"
          value={form.descripcion || ''}
          onChange={(v) => setForm({ ...form, descripcion: v })}
          placeholder="Breve descripción identificativa..."
          style={{ marginTop: '0.75rem' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={16} /> Añadir seta
          </button>
          <button className="btn-secondary" onClick={handleDownload} style={{ background: '#f0fdf4', borderColor: '#16a34a', color: '#16a34a' }}>
            <Download size={16} /> Descargar setas.json
          </button>
          {msg && (
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.825rem', color: msg.startsWith('✓') ? '#16a34a' : '#dc2626' }}>
              {msg}
            </span>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '0.75rem',
        padding: '1rem 1.25rem', marginBottom: '1.25rem',
        fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#475569', lineHeight: 1.7,
      }}>
        <strong>Flujo de trabajo:</strong><br />
        1. Añade o elimina setas usando los botones<br />
        2. Pulsa <strong>Descargar setas.json</strong><br />
        3. Reemplaza el archivo <code>public/data/setas.json</code> en tu repositorio de GitHub<br />
        4. Vercel publica automáticamente en segundos
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {setas.map((s) => (
          <div key={s.id} style={{
            background: 'white', borderRadius: '0.75rem', padding: '0.875rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            {s.imagenUrl && (
              <img
                src={s.imagenUrl}
                alt={s.nombreComun}
                style={{ width: '48px', height: '48px', borderRadius: '0.5rem', objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontStyle: 'italic', fontSize: '0.9rem', color: '#111827' }}>{s.nombreCientifico}</div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', fontFamily: 'Poppins, sans-serif' }}>{s.nombreComun}{s.tema ? ` · ${s.tema}` : ''}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', flexShrink: 0 }}>
              <Badge value={s.comestibilidad} type="comestibilidad" />
              <Badge value={s.nutricion} type="nutricion" />
            </div>
            <button
              onClick={() => handleDelete(s.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem', flexShrink: 0 }}
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {setas.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>No hay setas.</p>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Preguntas Tab
// ---------------------------------------------------------------------------
const emptyPreguntaForm = (): Omit<Pregunta, 'id'> => ({
  texto: '',
  opciones: [
    { id: 'a', texto: '' },
    { id: 'b', texto: '' },
    { id: 'c', texto: '' },
    { id: 'd', texto: '' },
  ],
  respuestaCorrecta: 'a',
  tema: '',
});

const PreguntasTab: React.FC<{
  preguntas: Pregunta[];
  setPreguntas: React.Dispatch<React.SetStateAction<Pregunta[]>>;
}> = ({ preguntas, setPreguntas }) => {
  const [form, setForm] = useState(emptyPreguntaForm());
  const [msg, setMsg] = useState('');

  const updateOpcion = (id: string, texto: string) => {
    setForm((prev) => ({
      ...prev,
      opciones: prev.opciones.map((o: OpcionPregunta) => o.id === id ? { ...o, texto } : o),
    }));
  };

  const handleAdd = () => {
    if (!form.texto.trim()) { setMsg('La pregunta no puede estar vacía.'); return; }
    if (form.opciones.some((o: OpcionPregunta) => !o.texto.trim())) { setMsg('Completa todas las opciones.'); return; }
    const nueva: Pregunta = { ...form, id: generateId('preg') };
    setPreguntas((prev) => [...prev, nueva]);
    setForm(emptyPreguntaForm());
    setMsg('✓ Pregunta añadida. Descarga el JSON para guardar los cambios.');
  };

  const handleDelete = (id: string) => {
    setPreguntas((prev) => prev.filter((p) => p.id !== id));
    setMsg('Pregunta eliminada. Descarga el JSON para guardar los cambios.');
  };

  const handleDownload = () => {
    downloadJSON({ preguntas }, 'preguntas.json');
  };

  return (
    <div>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem' }}>Añadir nueva pregunta</h3>
        <InputField
          label="Texto de la pregunta *"
          value={form.texto}
          onChange={(v) => setForm({ ...form, texto: v })}
          placeholder="¿Cuál es...?"
        />
        <InputField
          label="Tema"
          value={form.tema}
          onChange={(v) => setForm({ ...form, tema: v })}
          placeholder="Ej: Taxonomía fúngica"
          style={{ marginTop: '0.75rem' }}
        />
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.825rem', marginBottom: '0.5rem', color: '#374151' }}>
            Opciones — selecciona el radio de la correcta
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {form.opciones.map((op: OpcionPregunta) => (
              <div key={op.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="radio"
                  name="correcta"
                  value={op.id}
                  checked={form.respuestaCorrecta === op.id}
                  onChange={() => setForm({ ...form, respuestaCorrecta: op.id })}
                  style={{ accentColor: 'var(--color-forest)', width: '16px', height: '16px' }}
                />
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%', background: '#f3f4f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.75rem', color: '#374151', flexShrink: 0,
                }}>
                  {op.id.toUpperCase()}
                </span>
                <input
                  type="text"
                  value={op.texto}
                  onChange={(e) => updateOpcion(op.id, e.target.value)}
                  placeholder={`Opción ${op.id.toUpperCase()}`}
                  style={{
                    flex: 1, padding: '0.5rem 0.75rem',
                    border: '1.5px solid #e5e7eb', borderRadius: '0.5rem',
                    fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={16} /> Añadir pregunta
          </button>
          <button className="btn-secondary" onClick={handleDownload} style={{ background: '#f0fdf4', borderColor: '#16a34a', color: '#16a34a' }}>
            <Download size={16} /> Descargar preguntas.json
          </button>
          {msg && (
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.825rem', color: msg.startsWith('✓') ? '#16a34a' : '#dc2626' }}>
              {msg}
            </span>
          )}
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {preguntas.map((p, i) => (
          <div key={p.id} style={{
            background: 'white', borderRadius: '0.75rem', padding: '0.875rem 1.25rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <span style={{ fontWeight: 700, color: 'var(--color-moss)', fontFamily: 'Poppins, sans-serif', minWidth: '24px' }}>{i + 1}.</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', color: '#111827', fontFamily: 'Poppins, sans-serif', marginBottom: '0.25rem' }}>{p.texto}</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
                {p.tema && `Tema: ${p.tema} · `}Respuesta: <strong>{p.respuestaCorrecta.toUpperCase()}</strong>
                {p.fuente && p.fuente !== 'demo' ? ` · Fuente: ${p.fuente}` : ''}
              </div>
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem', flexShrink: 0 }}
              title="Eliminar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {preguntas.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>No hay preguntas.</p>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Importar TXT Tab
// ---------------------------------------------------------------------------
interface ParsedQuestion {
  texto: string;
  opciones: OpcionPregunta[];
  respuestaCorrecta: string;
  tema: string;
  selected: boolean;
}

const SubirTxtTab: React.FC<{
  preguntas: Pregunta[];
  setPreguntas: React.Dispatch<React.SetStateAction<Pregunta[]>>;
}> = ({ setPreguntas }) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState<ParsedQuestion[]>([]);
  const [msg, setMsg] = useState('');
  const [rawText, setRawText] = useState('');
  const [showRaw, setShowRaw] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setParsed([]); setMsg(''); setRawText(''); }
  };

  const handleParse = async () => {
    if (!file) return;
    setParsing(true);
    try {
      const text = await file.text();
      setRawText(text);
      const questions = parseQuestionsFromText(text);
      setParsed(questions.map((q) => ({ ...q, selected: true })));
      if (questions.length === 0) {
        setMsg('No se detectaron preguntas. Comprueba el formato e introdúcelas manualmente.');
      } else {
        setMsg(`✓ ${questions.length} preguntas detectadas. Revisa y pulsa "Importar".`);
      }
    } catch {
      setMsg('Error al leer el archivo.');
    } finally {
      setParsing(false);
    }
  };

  const toggleSelect = (i: number) =>
    setParsed((prev) => prev.map((q, idx) => idx === i ? { ...q, selected: !q.selected } : q));

  const updateField = (i: number, field: keyof ParsedQuestion, value: string) =>
    setParsed((prev) => prev.map((q, idx) => idx === i ? { ...q, [field]: value } : q));

  const handleImport = () => {
    const toAdd = parsed.filter((q) => q.selected).map((q): Pregunta => ({
      id: generateId('preg'),
      texto: q.texto,
      opciones: q.opciones,
      respuestaCorrecta: q.respuestaCorrecta,
      tema: q.tema,
      fuente: file?.name,
    }));
    setPreguntas((prev) => [...prev, ...toAdd]);
    setMsg(`✓ ${toAdd.length} preguntas importadas. Ve a la pestaña Preguntas y descarga el JSON.`);
    setParsed([]);
    setFile(null);
  };

  return (
    <div>
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, fontSize: '1rem', marginBottom: '0.5rem' }}>
          <FileText size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
          Importar preguntas desde archivo .txt
        </h3>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6, marginTop: 0 }}>
          Crea un archivo <code>.txt</code> con el siguiente formato:
        </p>
        <pre style={{
          background: '#f8f9fa', padding: '1rem', borderRadius: '0.5rem',
          fontSize: '0.75rem', fontFamily: 'monospace', border: '1px solid #e5e7eb',
          lineHeight: 1.7, overflowX: 'auto',
        }}>
{`TEMA: Taxonomía fúngica

1. ¿A qué división pertenecen las setas con basidios?
a) Ascomycota
b) Zygomycota
*c) Basidiomycota
d) Chytridiomycota

TEMA: Ecología fúngica

2. ¿Qué son las micorrizas?
a) Hongos parásitos
*b) Asociación simbiótica hongo-raíz
c) Esporas de hongos
d) Estructuras de reproducción`}
        </pre>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#6b7280', margin: '0.5rem 0 1.25rem' }}>
          Marca la respuesta correcta con <strong>*</strong> al inicio de la línea.
          Para PDFs: abre el PDF, copia el texto y pégalo en un archivo .txt.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{
            background: 'white', border: '2px dashed #d1d5db', borderRadius: '0.75rem',
            padding: '0.75rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: '0.5rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#374151',
          }}>
            <Upload size={16} />
            {file ? file.name : 'Seleccionar archivo .txt'}
            <input type="file" accept=".txt,.text" onChange={handleFile} style={{ display: 'none' }} />
          </label>
          {file && (
            <button className="btn-primary" onClick={handleParse} disabled={parsing}>
              <RefreshCw size={16} />
              {parsing ? 'Analizando...' : 'Analizar'}
            </button>
          )}
        </div>

        {msg && (
          <div style={{
            marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem',
            background: msg.startsWith('✓') ? '#f0fdf4' : '#fff7ed',
            border: `1px solid ${msg.startsWith('✓') ? '#bbf7d0' : '#fed7aa'}`,
            fontFamily: 'Poppins, sans-serif', fontSize: '0.825rem',
            color: msg.startsWith('✓') ? '#065f46' : '#92400e',
            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
          }}>
            {msg.startsWith('✓')
              ? <CheckCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              : <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />}
            {msg}
          </div>
        )}
      </div>

      {/* Raw text toggle */}
      {rawText && (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setShowRaw((v) => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: '0.825rem', color: 'var(--color-forest)', fontWeight: 600 }}
          >
            {showRaw ? '▲ Ocultar texto' : '▼ Ver texto extraído'}
          </button>
          {showRaw && (
            <pre style={{ marginTop: '0.75rem', background: '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.75rem', maxHeight: '300px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
              {rawText}
            </pre>
          )}
        </div>
      )}

      {/* Parsed questions */}
      {parsed.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>
              {parsed.filter((q) => q.selected).length} / {parsed.length} preguntas seleccionadas
            </h3>
            <button className="btn-primary" onClick={handleImport} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              <CheckCircle size={15} /> Importar seleccionadas
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {parsed.map((q, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '0.875rem', padding: '1.25rem',
                border: `2px solid ${q.selected ? 'var(--color-sage)' : '#e5e7eb'}`,
                opacity: q.selected ? 1 : 0.5,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <input
                    type="checkbox" checked={q.selected} onChange={() => toggleSelect(i)}
                    style={{ marginTop: '0.25rem', accentColor: 'var(--color-forest)', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <div style={{ flex: 1 }}>
                    <input
                      type="text" value={q.texto}
                      onChange={(e) => updateField(i, 'texto', e.target.value)}
                      style={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', border: '1.5px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.4rem 0.6rem', marginBottom: '0.5rem', boxSizing: 'border-box' }}
                    />
                    <input
                      type="text" value={q.tema} placeholder="Tema"
                      onChange={(e) => updateField(i, 'tema', e.target.value)}
                      style={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', border: '1.5px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.35rem 0.6rem', marginBottom: '0.5rem', color: '#6b7280', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {q.opciones.map((op) => (
                        <div key={op.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio" name={`correcta-${i}`}
                            checked={q.respuestaCorrecta === op.id}
                            onChange={() => updateField(i, 'respuestaCorrecta', op.id)}
                            style={{ accentColor: 'var(--color-forest)' }}
                          />
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#374151', minWidth: '16px' }}>{op.id.toUpperCase()}.</span>
                          <span style={{
                            fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem',
                            color: q.respuestaCorrecta === op.id ? '#16a34a' : '#374151',
                            fontWeight: q.respuestaCorrecta === op.id ? 600 : 400,
                          }}>
                            {op.texto}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Shared form components
// ---------------------------------------------------------------------------
const InputField: React.FC<{
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; style?: React.CSSProperties;
}> = ({ label, value, onChange, placeholder, style }) => (
  <div style={style}>
    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.35rem', color: '#374151' }}>{label}</label>
    <input
      type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: '100%', padding: '0.6rem 0.875rem', border: '1.5px solid #e5e7eb', borderRadius: '0.625rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
    />
  </div>
);

const SelectField: React.FC<{
  label: string; value: string; onChange: (v: string) => void; options: [string, string][];
}> = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.35rem', color: '#374151' }}>{label}</label>
    <select
      value={value} onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', padding: '0.6rem 0.875rem', border: '1.5px solid #e5e7eb', borderRadius: '0.625rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', outline: 'none', appearance: 'none', background: 'white', cursor: 'pointer', boxSizing: 'border-box' }}
    >
      {options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
    </select>
  </div>
);

// ---------------------------------------------------------------------------
// Question text parser
// ---------------------------------------------------------------------------
function parseQuestionsFromText(text: string): ParsedQuestion[] {
  const questions: ParsedQuestion[] = [];
  let currentTema = '';
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^TEMA\s*:/i.test(line)) {
      currentTema = line.replace(/^TEMA\s*:\s*/i, '').trim();
      i++;
      continue;
    }

    const qMatch = line.match(/^(\d+)[\.\)]\s+(.+)/);
    if (qMatch) {
      const texto = qMatch[2].trim();
      const opciones: OpcionPregunta[] = [];
      let respuestaCorrecta = 'a';
      i++;

      while (i < lines.length) {
        const optLine = lines[i];
        const optMatch = optLine.match(/^(\*?)([a-eA-E])[\)\.\-]\s*(.+)/);
        if (!optMatch) break;
        const id = optMatch[2].toLowerCase();
        if (optMatch[1] === '*') respuestaCorrecta = id;
        opciones.push({ id, texto: optMatch[3].trim() });
        i++;
      }

      if (opciones.length >= 2) {
        questions.push({ texto, opciones, respuestaCorrecta, tema: currentTema, selected: true });
      }
      continue;
    }
    i++;
  }
  return questions;
}

export default Admin;
