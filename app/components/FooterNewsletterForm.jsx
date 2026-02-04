import {useState} from 'react';

export function FooterNewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#3A8ECD] focus:outline-none text-gray-800 placeholder-gray-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-3 bg-[#FB8A38] hover:bg-[#FBA25C] text-white font-semibold rounded-lg transition-all disabled:bg-gray-400 whitespace-nowrap"
        >
          {status === 'loading' ? 'Enviando...' : status === 'success' ? '✓ Inscrito!' : 'Inscrever'}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="mt-3 text-green-600 text-sm text-center">
          ✓ Obrigado! Você foi inscrito com sucesso.
        </p>
      )}
      
      {status === 'error' && (
        <p className="mt-3 text-red-600 text-sm text-center">
          ✗ Erro ao inscrever. Tente novamente.
        </p>
      )}
      
      <p className="mt-3 text-gray-600 text-xs text-center">
        Ao se inscrever, você concorda em receber e-mails promocionais.
      </p>
    </div>
  );
}

