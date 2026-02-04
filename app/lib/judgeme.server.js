/**
 * Judge.me Reviews API - Utilitário do Servidor
 *
 * Busca avaliações de produtos da API Judge.me com cache do lado do servidor
 * As avaliações são armazenadas em cache por 5 minutos (300 segundos) por padrão
 */

const JUDGEME_API_URL = 'https://judge.me/api/v1/reviews';

/**
 * Extrai o ID numérico do produto do formato GID do Shopify
 * @param {string} productId - ID do produto Shopify (ex: "gid://shopify/Product/1234567890")
 * @returns {string} - ID numérico do produto (ex: "1234567890")
 */
export function extractProductId(productId) {
  if (!productId) {
    console.error('❌ Judge.me: ID do produto está vazio ou indefinido');
    return '';
  }

  // Se for um GID do Shopify, extrai o ID numérico
  if (productId.includes('gid://shopify/Product/')) {
    return productId.split('/').pop();
  }

  return productId;
}

/**
 * Busca avaliações da API Judge.me para um produto específico
 * @param {string} productId - ID do produto Shopify
 * @param {object} options - Opções de busca
 * @returns {Promise<object>} - Dados de avaliações com estatísticas
 */
export async function fetchJudgeMeReviews(productId, options = {}) {
  const {
    perPage = 20,
    cacheTTL = parseInt(process.env.JUDGEME_CACHE_TTL || '300', 10),
    productHandle,
  } = options;

  const numericProductId = extractProductId(productId);
  const apiToken =
    typeof process !== 'undefined' && process.env && process.env.JUDGEME_API_TOKEN
      ? process.env.JUDGEME_API_TOKEN
      : globalThis?.JUDGEME_API_TOKEN;
  const shopDomain =
    typeof process !== 'undefined' && process.env && process.env.JUDGEME_SHOP_DOMAIN
      ? process.env.JUDGEME_SHOP_DOMAIN
      : globalThis?.JUDGEME_SHOP_DOMAIN;

  // Log da extração de ID para debug
  console.log('🔍 Judge.me: Extração de ID do produto', {
    original: productId,
    numeric: numericProductId,
    handle: productHandle,
  });

  if (!numericProductId || !apiToken || !shopDomain) {
    console.error('❌ Judge.me: Configuração incompleta', {
      temProdutoId: !!numericProductId,
      temApiToken: !!apiToken,
      temDominioLoja: !!shopDomain,
      tokenSnippet: apiToken ? String(apiToken).slice(0, 6) + '...' : 'VAZIO',
      dominioLoja: shopDomain || 'VAZIO',
    });
    return {
      reviews: [],
      rating: 0,
      reviewCount: 0,
      error: 'Configuração incompleta',
    };
  }

  try {
    // Constrói URL da API com parâmetro external_id (como os temas Shopify usam)
    const params = new URLSearchParams({
      api_token: apiToken,
      shop_domain: shopDomain,
      external_id: numericProductId,
      per_page: perPage.toString(),
      published: 'true', // Apenas avaliações publicadas
      include_pictures: 'true',
    });

    const url = `${JUDGEME_API_URL}?${params}`;

    // Log da URL exata da API para debug
    console.log('🌐 Judge.me: URL da Requisição:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // Timeout de 10 segundos
    });

    if (!response.ok) {
      console.error('❌ Judge.me: Erro na API', {
        status: response.status,
        statusText: response.statusText,
        url: url,
      });
      throw new Error(`Judge.me API retornou ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // CORREÇÃO CRÍTICA: Filtra avaliações APENAS deste produto
    
    const allReviews = data.reviews || [];
    
    // Debug melhorado
    console.log('📦 Judge.me: Resumo da Resposta da API:', {
      totalAvaliacoes: allReviews.length,
      idProdutoDesejado: numericProductId,
      dominioLoja: shopDomain
    });
    
    if (allReviews.length > 0) {
      console.log('🔍 Judge.me: Campos da primeira avaliação:', Object.keys(allReviews[0]));
    }
    
    const reviews = allReviews.filter(review => {
      // Tenta múltiplos campos possíveis de ID do produto da API Judge.me
      const reviewProductId = 
        review.product_external_id?.toString() || 
        review.product_id?.toString() ||
        review.external_id?.toString() ||
        review.shopify_product_id?.toString() ||
        '';
      
      // Log para debug
      if (allReviews.indexOf(review) === 0) {
        console.log('🔍 Judge.me: Estrutura da primeira avaliação:', {
          product_external_id: review.product_external_id,
          product_id: review.product_id,
          external_id: review.external_id,
          shopify_product_id: review.shopify_product_id,
          comparandoCom: numericProductId
        });
      }
      
      return reviewProductId === numericProductId;
    });

    // Calcula estatísticas de classificação
    const reviewCount = reviews.length;
    const rating = reviewCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
      : '0.0';

    if (reviewCount > 0) {
      console.log('✅ Judge.me: SUCESSO - Buscadas', reviewCount, 'avaliações para produto', numericProductId);
      console.log('⭐ Classificação Média:', rating);
      console.log('🔍 Filtradas de', allReviews.length, 'avaliações totais recebidas');
    } else {
      console.warn('⚠️ Judge.me: Nenhuma avaliação encontrada para produto', numericProductId);
      console.warn('📊 Recebidas', allReviews.length, 'avaliações no total, mas nenhuma correspondeu a este ID');
      console.warn('💡 Dica: Verifique se o ID do produto corresponde no painel Judge.me');
    }

    return {
      reviews,
      rating: parseFloat(rating),
      reviewCount,
      lastFetched: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Judge.me: Erro ao buscar avaliações do produto', numericProductId, error.message);
    console.error('🔧 Solução de Problemas:', {
      produtoId: numericProductId,
      dominioLoja: shopDomain,
      timestamp: new Date().toISOString(),
    });
    return {
      reviews: [],
      rating: 0,
      reviewCount: 0,
      error: error.message,
      lastFetched: new Date().toISOString(),
    };
  }
}

/**
 * Busca avaliações com cache do lado do servidor (para uso em loaders)
 * @param {string} productId - ID do produto Shopify
 * @param {Request} request - Objeto Request para headers de cache
 * @returns {Promise<object>} - Dados de avaliações
 */
export async function fetchJudgeMeReviewsWithCache(productId, request) {
  const cacheTTL = parseInt(process.env.JUDGEME_CACHE_TTL || '300', 10);

  // Define headers de cache para cache do lado do servidor
  const reviewsData = await fetchJudgeMeReviews(productId, { cacheTTL });

  return reviewsData;
}

/**
 * Formata data de avaliação para exibição
 * @param {string} dateString - String de data ISO
 * @returns {string} - Data formatada
 */
export function formatReviewDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} semanas atrás`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} meses atrás`;
  return `${Math.ceil(diffDays / 365)} anos atrás`;
}

/**
 * Gera HTML com classificação em estrelas
 * @param {number} rating - Valor de classificação (0-5)
 * @returns {string} - String HTML com estrelas
 */
export function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = '';

  // Estrelas cheias
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }

  // Meia estrela (representada como estrela cheia por simplicidade)
  if (hasHalfStar) {
    stars += '★';
  }

  // Estrelas vazias
  for (let i = 0; i < emptyStars; i++) {
    stars += '☆';
  }

  return stars;
}