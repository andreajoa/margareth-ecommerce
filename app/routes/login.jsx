import { useActionData } from 'react-router'; // Removemos o 'Form' daqui

// 1. LOADER: Se já logado, manda pro painel
export async function loader({ context }) {
  const { session } = context;
  if (await session.get('customerAccessToken')) {
    return new Response(null, { status: 302, headers: { Location: '/account/affiliate' } });
  }
  return null;
}

// 2. ACTION: Faz o login no servidor
export async function action({ request, context }) {
  const { session, storefront } = context;
  const formData = await request.formData();
  
  try {
    const { customerAccessTokenCreate } = await storefront.mutate(LOGIN_MUTATION, {
      variables: { input: { email: formData.get('email'), password: formData.get('password') } },
    });

    const { customerAccessToken, customerUserErrors } = customerAccessTokenCreate;

    if (customerUserErrors?.length > 0 || !customerAccessToken) {
      return { error: 'E-mail ou senha incorretos.' };
    }

    session.set('customerAccessToken', customerAccessToken);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/account/affiliate',
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    return { error: 'Erro de conexão.' };
  }
}

// 3. UI (COM CORREÇÃO PARA PULAR ERRO DE JS)
export default function Login() {
  const actionData = useActionData();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEFDF8] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">🔐 Área do Revendedor</h1>
          <p className="text-gray-500 mt-2">Entre para ver suas vendas</p>
        </div>

        {/* 
           MUDANÇA CRÍTICA AQUI: 
           Usamos <form> minúsculo (HTML padrão) em vez de <Form> (React).
           Isso ignora o erro de 'streamController' e força o envio.
        */}
        <form method="post" action="/login" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3292D8]" placeholder="seu@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" name="password" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3292D8]" placeholder="••••••••" />
          </div>
          
          {/* Mostra erro se a senha estiver errada */}
          {actionData?.error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center">
              {actionData.error}
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#3292D8] to-[#21388D] text-white font-bold rounded-lg hover:opacity-90">
            ACESSAR PAINEL
          </button>
        </form>

        <div className="mt-6 text-center">
            <a href="/pages/seja-revendedor-brinqueteando" className="text-[#3292D8] text-sm hover:underline">Não tem conta? Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}

const LOGIN_MUTATION = `#graphql
  mutation login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { message }
    }
  }
`;
