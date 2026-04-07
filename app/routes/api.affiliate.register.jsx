export async function action({ request, context }) {
  const {env} = context;

  // --- SUAS CREDENCIAIS ---
  const SHOP = env?.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com';
  const CLIENT_ID = env?.SHOPIFY_CLIENT_ID || 'bd7e5a3d540811da9aa03dc2cbe5f059';
  const CLIENT_SECRET = env?.SHOPIFY_CLIENT_SECRET || '';

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405,
        headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const data = await request.json();

    // 1. Validação básica
    if (!data.email || !data.name) {
      return new Response(JSON.stringify({ success: false, error: 'Nome e E-mail são obrigatórios.' }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. OBTER TOKEN DE ACESSO
    const tokenResponse = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error('Erro de Autenticação:', tokenData);
      return new Response(JSON.stringify({ success: false, error: 'Erro de configuração na API da Shopify.' }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const ADMIN_TOKEN = tokenData.access_token;

    // 3. Gerar dados do Afiliado
    const tempPassword = Math.random().toString(36).slice(-8);
    const firstName = data.name.split(' ')[0];
    const lastName = data.name.split(' ').slice(1).join(' ') || '.';
    const affiliateCode = `AFF-${firstName.toUpperCase()}-${Date.now().toString().slice(-4)}`;
    
    // 4. Preparar os dados para criar o cliente
    const customerData = {
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.whatsapp,
        tags: `affiliate, affiliate_status_pending, affiliate_code_${affiliateCode}`,
        password: tempPassword,
        password_confirmation: tempPassword,
        send_email_invite: false,
        verified_email: true,
        metafields: [
          { namespace: 'custom', key: 'codigo_de_afiliado', value: affiliateCode, type: 'single_line_text_field' },
          { namespace: 'custom', key: 'cpf_cnpj', value: data.cpf_cnpj, type: 'single_line_text_field' },
          { namespace: 'custom', key: 'tipo_chave_pix', value: data.pix_key_type, type: 'single_line_text_field' },
          { namespace: 'custom', key: 'chave_pix', value: data.pix_key, type: 'single_line_text_field' },
          { namespace: 'custom', key: 'taxa_comissao', value: '15.0', type: 'number_decimal' },
          { namespace: 'custom', key: 'link_referencia', value: `https://brinqueteando.online?ref=${affiliateCode}`, type: 'single_line_text_field' },
          
          // === A CORREÇÃO FOI FEITA AQUI 👇 ===
          { namespace: 'custom', key: 'total_vendas', value: '0.0', type: 'number_decimal' }, 
          // Antes estava 'number_integer', agora está 'number_decimal'
          
          { namespace: 'custom', key: 'total_comissoes', value: '0.00', type: 'number_decimal' },
          { namespace: 'custom', key: 'comissoes_pendentes', value: '0.00', type: 'number_decimal' },
          { namespace: 'custom', key: 'como_conheceu', value: data.how_knew, type: 'single_line_text_field' }
        ]
      }
    };

    // 5. Criar o cliente na Shopify
    const response = await fetch(`https://${SHOP}/admin/api/2024-01/customers.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN
      },
      body: JSON.stringify(customerData)
    });

    const responseJson = await response.json();

    // 6. Verificar Erros
    if (!response.ok || responseJson.errors) {
      console.error('Erro Shopify Admin:', JSON.stringify(responseJson));
      let errorMsg = 'Erro ao criar cadastro.';
      
      if (responseJson.errors) {
        if (typeof responseJson.errors === 'string') {
            errorMsg = responseJson.errors;
        } else if (typeof responseJson.errors === 'object') {
            errorMsg = Object.entries(responseJson.errors)
              .map(([field, msgs]) => {
                  const msgText = Array.isArray(msgs) ? msgs.join(', ') : msgs;
                  return `${field} ${msgText}`;
              })
              .join(' | ');
        }
      }
      return new Response(JSON.stringify({ success: false, error: errorMsg }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 7. SUCESSO!
    return new Response(JSON.stringify({
      success: true,
      email: data.email,
      password: tempPassword,
      affiliateCode: affiliateCode
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error('API Crash:', error);
    return new Response(JSON.stringify({ success: false, error: 'Erro interno: ' + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
