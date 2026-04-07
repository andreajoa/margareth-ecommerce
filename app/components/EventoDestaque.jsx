import {useState, useEffect} from 'react';

// ─────────────────────────────────────────────────────────
// EVENTO DESTAQUE — Componente temporário para homepage
// Para remover: apagar o import e o <EventoDestaque /> no _index.jsx
// ─────────────────────────────────────────────────────────

const EVENT_DATE = new Date('2026-04-25T08:00:00');

export default function EventoDestaque() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{width: '100%', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"}}>

      {/* ═══ PARTE 1: BARRA TOPO ═══ */}
      <div style={{
        background: '#1a3a6b',
        color: '#fff',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '12px',
        letterSpacing: '0.3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#f97316',
          animation: 'eventoPulse 1.5s ease-in-out infinite',
        }} />
        <span>
          EVENTO ESPECIAL — 25/04/2026 — Um menino com diagnósticos raros vai correr seu primeiro campeonato
        </span>
        <style>{`
          @keyframes eventoPulse {
            0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.6); }
            50% { opacity: 0.6; transform: scale(1.4); box-shadow: 0 0 0 6px rgba(249, 115, 22, 0); }
          }
        `}</style>
      </div>

      {/* ═══ PARTE 2: BANNER PRINCIPAL ═══ */}
      <div style={{
        background: 'linear-gradient(135deg, #1a3a6b 0%, #1e5fa8 50%, #f97316 100%)',
        padding: '28px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        {/* LADO ESQUERDO */}
        <div style={{flex: '1 1 300px', maxWidth: '600px'}}>
          {/* Tag Pill */}
          <span style={{
            display: 'inline-block',
            background: '#f97316',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 700,
            padding: '4px 14px',
            borderRadius: '50px',
            letterSpacing: '0.5px',
            marginBottom: '14px',
          }}>
            EVENTO ESPECIAL — 25 de Abril
          </span>

          {/* Título */}
          <h2 style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: 1.3,
            margin: '0 0 10px 0',
          }}>
            Um menino com diagnósticos raros que nunca aceitou como limite
          </h2>

          {/* Subtítulo */}
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '13px',
            lineHeight: 1.6,
            margin: '0 0 20px 0',
            maxWidth: '480px',
          }}>
            Ele vai correr seu primeiro campeonato.
            Não é só sobre corrida — é sobre abrir caminhos
            para muitas outras crianças. 💙
          </p>

          {/* Botão Assistir */}
          <a
            href="https://www.instagram.com/reels/DWwLawfkQB_/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f97316',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '10px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ea6c08';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#f97316';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Assistir ao vídeo
          </a>
        </div>

        {/* LADO DIREITO — Card da data */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: '0 0 auto'}}>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '16px',
            padding: '24px 36px',
            textAlign: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{fontSize: '56px', fontWeight: 800, color: '#fff', lineHeight: 1}}>25</div>
            <div style={{fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '2px'}}>ABR</div>
            <div style={{fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginTop: '4px'}}>2026</div>
          </div>
          <span style={{color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 500}}>
            Primeiro campeonato
          </span>
        </div>
      </div>

      {/* ═══ PARTE 3: CONTAGEM REGRESSIVA ═══ */}
      <div style={{
        background: '#1e5fa8',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        <span style={{color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500}}>
          Faltam:
        </span>

        <CountdownBlock value={timeLeft.days} label="DIAS" />
        <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '20px', fontWeight: 700}}>:</span>
        <CountdownBlock value={timeLeft.hours} label="HORAS" />
        <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '20px', fontWeight: 700}}>:</span>
        <CountdownBlock value={timeLeft.minutes} label="MIN" />
        <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '20px', fontWeight: 700}}>:</span>
        <CountdownBlock value={timeLeft.seconds} label="SEG" />
      </div>
    </div>
  );
}

/* ─── Subcomponente de cada bloco da contagem regressiva ─── */
function CountdownBlock({value, label}) {
  return (
    <div style={{textAlign: 'center', minWidth: '48px'}}>
      <div style={{
        fontSize: '20px',
        fontWeight: 700,
        color: '#fff',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.2,
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontSize: '10px',
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginTop: '2px',
      }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Função pura para calcular tempo restante ─── */
function calcTimeLeft() {
  const diff = EVENT_DATE - new Date();
  if (diff <= 0) return {days: 0, hours: 0, minutes: 0, seconds: 0};
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
