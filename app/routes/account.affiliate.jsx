import { useLoaderData } from 'react-router';

function addBusinessDays(dateString, days) {
  if (!dateString) return 'Data pendente';
  let date = new Date(dateString);
  let count = 0;
  while (count < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) count++;
  }
  return date.toLocaleDateString('pt-BR');
}

export async function loader({ context }) {
  const { session, storefront } = context;
  
  // 1. Verifica se tem token na sessão
  const token = await session.get('customerAccessToken');
  
  // Se NÃO tem token, manda pro login
  if (!token) {
    return new Response(null, { status: 302, headers: { Location: '/login' } });
  }

  // 2. Tenta buscar o cliente com esse token
  try {
    const { customer } = await storefront.query(GET_CUSTOMER_QUERY, {
      variables: { customerAccessToken: token.accessToken }
    });

    // 🚨 A CORREÇÃO ESTÁ AQUI:
    // Se tem token mas a Shopify não retornou cliente (token expirado/inválido),
    // NÓS LIMPAMOS A SESSÃO antes de redirecionar.
    if (!customer) {
      session.unset('customerAccessToken'); // Apaga o login podre
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/login',
          'Set-Cookie': await session.commit(), // Confirma a limpeza
        },
      });
    }

    // 3. Lógica normal do afiliado...
    let affiliateCode = null;
    if (customer.metafields?.edges) {
      customer.metafields.edges.forEach(({node}) => {
        if (node && node.key === 'codigo_de_afiliado') affiliateCode = node.value;
      });
    }

    if (!affiliateCode) return { customer, affiliateCode: null, orders: [] };

    // 4. Buscar Vendas (Admin API)
    let orders = [];
    const {env} = context;
    const SHOP = env?.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com';
    const CLIENT_ID = env?.SHOPIFY_CLIENT_ID || 'bd7e5a3d540811da9aa03dc2cbe5f059';
    const CLIENT_SECRET = env?.SHOPIFY_CLIENT_SECRET || '';

    const tokenResp = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'client_credentials' })
    });
    
    if (tokenResp.ok) {
        const { access_token } = await tokenResp.json();
        const tagBusca = `affiliate_code_${affiliateCode}`;
        const ordersResp = await fetch(`https://${SHOP}/admin/api/2024-10/orders.json?status=any&tags=${tagBusca}`, {
            headers: { 'X-Shopify-Access-Token': access_token }
        });

        if (ordersResp.ok) {
            const ordersData = await ordersResp.json();
            orders = ordersData.orders || [];
        }
    }

    return { customer, affiliateCode, orders };

  } catch (error) {
    // Se der erro grave, desloga por segurança para não travar
    session.unset('customerAccessToken');
    return new Response(null, {
        status: 302,
        headers: { Location: '/login', 'Set-Cookie': await session.commit() }
    });
  }
}

export default function AffiliateDashboard() {
  const { customer, affiliateCode, orders } = useLoaderData();
  const safeOrders = Array.isArray(orders) ? orders : [];
  const totalVendas = safeOrders.reduce((acc, order) => acc + (parseFloat(order?.total_price) || 0), 0);
  const totalComissao = totalVendas * 0.15;

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-[#1a1a1a]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold">Olá, {customer?.firstName || 'Revendedor'}! 👋</h1>
          <p className="text-gray-500">Painel do Revendedor</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm text-gray-500">Seu Código</p>
          <div className="text-xl font-mono font-bold text-[#3292D8] bg-blue-50 px-4 py-2 rounded-lg">
            {affiliateCode || '...'}
          </div>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card icon="💰" title="Total Vendido" value={`R$ ${totalVendas.toFixed(2).replace('.',',')}`} color="text-gray-900" />
        <Card icon="🤑" title="Sua Comissão (15%)" value={`R$ ${totalComissao.toFixed(2).replace('.',',')}`} color="text-green-600" />
        <Card icon="📅" title="Vendas Realizadas" value={safeOrders.length} color="text-blue-600" />
      </div>

      {/* Tabela de Vendas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🛒 Histórico de Vendas
          </h2>
        </div>

        {safeOrders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <p>Nenhuma venda registrada com seu código ainda.</p>
            <p className="text-sm mt-2">Compartilhe seu link para começar!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Data</th>
                  <th className="p-4">Produto</th>
                  <th className="p-4">Valor Venda</th>
                  <th className="p-4">Comissão (15%)</th>
                  <th className="p-4">Pagamento (15 dias úteis)</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {safeOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      {order.line_items?.map(item => (
                        <div key={item.id} className="mb-1 font-medium text-gray-900">
                          {item.quantity}x {item.title}
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-medium">R$ {order.total_price}</td>
                    <td className="p-4 font-bold text-green-600">
                      R$ {(parseFloat(order.total_price) * 0.15).toFixed(2).replace('.',',')}
                    </td>
                    <td className="p-4 text-[#3292D8] font-medium">
                      📅 {addBusinessDays(order.created_at, 15)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.financial_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.financial_status === 'paid' ? 'Pago' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}

const GET_CUSTOMER_QUERY = `#graphql
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      metafields(first: 10, namespace: "custom") {
        edges {
          node { key value }
        }
      }
    }
  }
`;
