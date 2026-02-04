import {useLoaderData, Link} from 'react-router';
import {useEffect} from 'react'; 
import {useAside} from '~/components/Aside';

// LOADER: Carrega o conteúdo da página da Shopify
export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;
  
  const {page} = await storefront.query(PAGE_QUERY, {
    variables: {handle},
  });

  if (!page) {
    throw new Response('Página não encontrada', {status: 404});
  }

  // Menu do Footer
  const footerMenu = {
    id: 'custom-footer-manual',
    items: [
      {
        id: 'group-1',
        title: '🧸 BrinqueTEAndo',
        items: [
          { id: 'l1', title: 'Quem é Margareth Almeida', url: '/pages/quem-e-margareth-almeida' },
          { id: 'l2', title: 'Leve a BrinqueTEAndo até Você', url: '/pages/leve-a-brinqueteando-ate-voce' },
          { id: 'l3', title: 'Seja Revendedor BrinqueTEAndo', url: '/pages/seja-revendedor-brinqueteando' },
          { id: 'l4', title: 'Guias práticos', url: '/pages/guias-praticos' },
        ]
      },
      {
        id: 'group-2',
        title: '💡 Conteúdos',
        items: [
          { id: 'l5', title: 'Como escolher brinquedos', url: '/pages/como-escolher-brinquedos' },
          { id: 'l6', title: 'Dicas para TDAH e TEA', url: '/pages/dicas-para-tdah-e-tea' },
          { id: 'l7', title: 'FAQ', url: '/pages/faq' },
        ]
      },
      {
        id: 'group-3',
        title: '📦 Ajuda',
        items: [
          { id: 'l8', title: 'Contact', url: '/pages/contact' },
          { id: 'l9', title: 'Política de Envio', url: '/pages/politica-de-envio' },
          { id: 'l10', title: 'Política de Devolução', url: '/pages/politica-de-devolucao' },
        ]
      },
      {
        id: 'group-4',
        title: '🔒 Legal',
        items: [
          { id: 'l11', title: 'Política de Privacidade', url: '/policies/politica-de-privacidade' },
          { id: 'l12', title: 'Política de Cookies', url: '/policies/politica-de-cookies' },
          { id: 'l13', title: 'Aviso Legal', url: '/pages/aviso-legal' },
        ]
      }
    ]
  };

  return {page, footerMenu};
}

export const meta = ({data}) => {
  return [
    {title: `brinqueTEAndo | ${data?.page?.title ?? ''}`},
    {name: 'description', content: data?.page?.seo?.description || 'Brinquedos Educativos'},
  ];
};

export default function Page() {
  const {page, footerMenu} = useLoaderData();
  const {open} = useAside();

  // =========================================================
  // 🧠 O CÉREBRO: SCRIPT QUE FAZ O FORMULÁRIO FUNCIONAR
  // =========================================================
  useEffect(() => {
    // Tenta encontrar o formulário na tela
    const form = document.getElementById('affiliate-form');
    
    // Se não tiver formulário nessa página, para por aqui
    if (!form) return;

    // Função que roda quando clica em enviar
    const handleSubmit = async (e) => {
      e.preventDefault(); // IMPEDE A PÁGINA DE RECARREGAR
      
      const submitButton = document.getElementById('submit-btn');
      const originalText = submitButton?.textContent || 'Enviar';

      // 1. Muda o botão para "Processando..."
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Processando cadastro...';
        submitButton.style.opacity = '0.7';
      }

      // 2. Coleta os dados
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        // 3. Envia para a API (aquela que configuramos)
        const response = await fetch('/api/affiliate/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();

        if (result.success) {
            // ✅ SUCESSO!
            // Esconde o formulário
            form.style.display = 'none';
            
            // Cria a caixa verde com a senha
            const successDiv = document.createElement('div');
            successDiv.style.cssText = 'margin-top: 30px; padding: 30px; background: #d1fae5; border: 2px solid #10b981; border-radius: 12px; text-align: center; font-family: sans-serif;';
            successDiv.innerHTML = `
                <h3 style="color: #065f46; font-size: 24px; margin-bottom: 15px; font-weight: bold;">✅ Cadastro realizado com sucesso!</h3>
                <p style="color: #047857; margin-bottom: 20px;">Aqui estão seus dados de acesso:</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: left; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <p style="margin-bottom: 12px; font-size: 16px;"><strong>📧 E-mail:</strong> ${result.email}</p>
                    <p style="margin-bottom: 12px; font-size: 16px;">
                        <strong>🔑 Senha Temporária:</strong> 
                        <span style="font-family: monospace; background: #f3f4f6; padding: 6px 12px; border-radius: 4px; font-size: 18px; margin-left: 5px; border: 1px solid #ddd; font-weight: bold; letter-spacing: 1px;">${result.password}</span>
                    </p>
                    <p style="font-size: 16px;"><strong>🏷️ Código de Afiliado:</strong> ${result.affiliateCode}</p>
                </div>

                <!-- CORREÇÃO AQUI: Link aponta para /account -->
                <a href="/account" style="display: inline-block; padding: 16px 32px; background: #10b981; color: white; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">
                    FAZER LOGIN AGORA →
                </a>
                <p style="margin-top: 15px; font-size: 13px; color: #666;">Copie sua senha antes de sair desta tela!</p>
            `;
            
            // Coloca a caixa verde onde estava o formulário
            form.parentNode.appendChild(successDiv);
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } else {
            // ❌ ERRO VINDO DA API
            alert('Atenção: ' + (result.error || 'Erro desconhecido.'));
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = originalText;
              submitButton.style.opacity = '1';
            }
        }
      } catch (err) {
          // ❌ ERRO DE REDE
          console.error(err);
          alert('Erro de conexão. Verifique sua internet e tente novamente.');
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
          }
      }
    };

    // "Ouve" quando o formulário é enviado
    form.addEventListener('submit', handleSubmit);
    
    // Limpeza ao sair da página
    return () => form.removeEventListener('submit', handleSubmit);

  }, [page]); 
  // =========================================================

  return (
    <div className="bg-[#FEFDF8] flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* HEADER */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b-4 border-[#3A8ECD]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img 
              src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" 
              alt="brinqueTEAando" 
              className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <Link to="/" className="text-[#3A8ECD] font-bold text-sm hover:underline">
            Voltar para Início
          </Link>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <div className="flex-grow w-full">
        <div className="w-full" dangerouslySetInnerHTML={{__html: page.body}} />
      </div>

      {/* FOOTER */}
      <footer className="bg-[#FEFDF8] pt-20 pb-10 border-t-4 border-[#3A8ECD] w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 text-center">
          {footerMenu.items.map((group) => (
            <div key={group.id} className="flex flex-col items-center">
              <h3 className="font-bold text-[#0A3D2F] text-lg tracking-widest uppercase mb-6 border-b-2 border-transparent hover:border-[#FB8A38] transition-all duration-300 pb-2 inline-block">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-4 text-sm text-gray-500 w-full">
                {group.items.map((link) => (
                  <li key={link.id} className="w-full">
                    <Link 
                      to={link.url} 
                      className="hover:text-[#FB8A38] hover:font-medium transition-all duration-200 block py-1"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
          <div className="flex gap-6 justify-center">
            <span className="cursor-pointer hover:text-[#3A8ECD] transition-colors">Privacidade</span>
            <span className="cursor-pointer hover:text-[#3A8ECD] transition-colors">Termos de Uso</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page($handle: String!) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
