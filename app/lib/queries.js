// ✅ FIX: Adicionado tag #graphql e estrutura 'nodes' para compatibilidade
export const CART_FRAGMENT = `#graphql
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            image {
              id
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            product {
              id
              title
              handle
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
  }
`;

export const MENU_QUERY = `#graphql
  query Menu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      handle
      vendor
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        id
        url
        altText
        width
        height
      }
      variants(first: 1) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
`;

// Queries simplificadas para evitar erros de fragmentos ausentes
export const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: 8) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `#graphql
  query Collections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 4) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
        }
      }
    }
  }
`;

export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections($country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts($country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        handle
        title
        vendor
        featuredImage {
          id
          altText
          url
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
