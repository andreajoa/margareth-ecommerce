/**
 * Retorna o handle do produto
 * @param {string} handle - O handle do produto
 * @returns {string} - O handle processado
 */
export function getProductHandle(handle) {
  if (!handle) return '';
  return handle;
}

/**
 * Formata preço para exibição
 * @param {number} amount - Valor do preço
 * @param {string} currencyCode - Código da moeda (BRL, USD, etc)
 * @returns {string} - Preço formatado
 */
export function formatPrice(amount, currencyCode = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Trunca texto com ellipsis
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} - Texto truncado
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Verifica se estamos no cliente (browser)
 * @returns {boolean}
 */
export function isClient() {
  return typeof window !== 'undefined';
}

/**
 * Classnames helper - combina classes condicionalmente
 * @param  {...any} classes - Classes para combinar
 * @returns {string} - Classes combinadas
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

