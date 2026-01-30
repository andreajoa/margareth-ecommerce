import {useState} from 'react';

export function FooterNewsletterForm({onSubmit}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit({name, email});
      }
      setStatus('ok');
      setName('');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{display:'grid', gridTemplateColumns:'1fr', gap:'10px'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:'8px'}}>
        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Seu nome"
          aria-label="Nome"
          style={{
            padding:'10px 12px',
            borderRadius:'8px',
            border:'1px solid var(--beige)',
            background:'#fff'
          }}
        />
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Seu e-mail"
          aria-label="E-mail"
          required
          style={{
            padding:'10px 12px',
            borderRadius:'8px',
            border:'1px solid var(--beige)',
            background:'#fff'
          }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          background:'var(--yellow)',
          color:'var(--dark-blue)',
          fontWeight:700,
          padding:'10px 16px',
          borderRadius:'8px',
          border:'none',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Enviando...' : 'Assinar newsletter'}
      </button>
      <div aria-live="polite" style={{minHeight:'20px', color: status==='error' ? '#CF111A' : '#21388D'}}>
        {status==='ok' ? 'Inscrição realizada com sucesso!' : status==='error' ? 'Não foi possível enviar. Tente novamente.' : ''}
      </div>
    </form>
  );
}

export default FooterNewsletterForm;
