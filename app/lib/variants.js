import {useLocation} from 'react-router';
import {useMemo} from 'react';

/**
 * Hook para obter a URL da variante do produto
 * @param {string} handle - Handle do produto
 * @param {SelectedOption[]} [selectedOptions] - Opções selecionadas (tamanho, cor, etc)
 * @returns {string} URL da variante
 */
export function useVariantUrl(handle, selectedOptions) {
  const {pathname} = useLocation();

  return useMemo(() => {
    return getVariantUrl({
      handle,
      pathname,
      searchParams: new URLSearchParams(),
      selectedOptions,
    });
  }, [handle, selectedOptions, pathname]);
}

/**
 * Gera a URL da variante com os parâmetros selecionados
 * @param {{
 *   handle: string;
 *   pathname: string;
 *   searchParams: URLSearchParams;
 *   selectedOptions?: SelectedOption[];
 * }}
 * @returns {string} URL completa da variante
 */
export function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions,
}) {
  // Verifica se o pathname contém locale (ex: /pt-BR/, /en-US/)
  const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
  const isLocalePathname = match && match.length > 0;

  // Constrói o path com ou sem locale
  const path = isLocalePathname
    ? `${match[0]}products/${handle}`
    : `/products/${handle}`;

  // Adiciona as opções selecionadas como query params
  selectedOptions?.forEach((option) => {
    searchParams.set(option.name, option.value);
  });

  const searchString = searchParams.toString();

  // Retorna o path completo com query string se houver parâmetros
  return path + (searchString ? '?' + searchParams.toString() : '');
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */