import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Link, useLoaderData, Meta, Links, Outlet, ScrollRestoration, Scripts } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { json } from "@remix-run/node";
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import { useCart } from "react";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Header({ menu }) {
  var _a;
  return /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ jsx("a", { href: "/", className: "brand", "aria-label": "Página inicial", style: { display: "inline-flex", alignItems: "center" }, children: /* @__PURE__ */ jsx("img", { src: "/logo.svg", alt: "BrinqueTEAndo", style: { height: "40px" } }) }),
    /* @__PURE__ */ jsx("nav", { style: { display: "flex", gap: "16px", flexWrap: "wrap" }, children: ((_a = menu == null ? void 0 : menu.items) == null ? void 0 : _a.length) ? menu.items.map((item) => {
      var _a2;
      return ((_a2 = item.url) == null ? void 0 : _a2.startsWith("http")) ? /* @__PURE__ */ jsx("a", { href: item.url, rel: "noopener", style: { color: "var(--brand-blue)" }, children: item.title }, item.id) : /* @__PURE__ */ jsx(Link, { to: item.url || "/", style: { color: "var(--brand-blue)" }, children: item.title }, item.id);
    }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: "Início" }),
      /* @__PURE__ */ jsx(Link, { to: "/collections/sensory-toys", children: "Coleções" }),
      /* @__PURE__ */ jsx(Link, { to: "/collections/by-age", children: "Por Idade" }),
      /* @__PURE__ */ jsx(Link, { to: "/collections/by-skill", children: "Por Habilidade" })
    ] }) })
  ] }) });
}
function Footer({ menu }) {
  return /* @__PURE__ */ jsxs("footer", { children: [
    /* @__PURE__ */ jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: "BrinqueTEAndo" }),
        /* @__PURE__ */ jsx("p", { children: "Brinquedos educativos com foco em TEA/TDAH." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Menu" }),
        /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0 }, children: ((menu == null ? void 0 : menu.items) || []).map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: item.url || "/", children: item.title }) }, item.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Contato" }),
        /* @__PURE__ */ jsx("p", { children: "WhatsApp: (xx) xxxx-xxxx" }),
        /* @__PURE__ */ jsx("p", { children: "Email: contato@brinqueteando.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Newsletter" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Seu e-mail", required: true }),
          /* @__PURE__ */ jsx("button", { className: "btn-primary", type: "submit", children: "Assinar" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container", style: { marginTop: "12px" }, children: /* @__PURE__ */ jsx("small", { children: "© 2026 BrinqueTEAndo. Todos os direitos reservados." }) })
  ] });
}
const STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN || "uxst0j-qe.myshopify.com";
const STOREFRONT_API_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN || "f4519cf3a3a10b4fccca0df4b0a464e1";
const API_VERSION = "2024-10";
async function fetchShopify(query, variables = {}) {
  try {
    const response = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_API_TOKEN
      },
      body: JSON.stringify({ query, variables })
    });
    if (!response.ok) {
      console.error("Shopify API error:", response.status, response.statusText);
      return null;
    }
    const json2 = await response.json();
    if (json2.errors) {
      console.error("GraphQL errors:", json2.errors);
      return null;
    }
    return json2.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
const MENU_QUERY = `
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
const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      vendor
      tags
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
            sku
            selectedOptions {
              name
              value
            }
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
const COLLECTION_QUERY = `
  query Collection($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      seo {
        title
        description
      }
      image {
        id
        url
        altText
      }
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            vendor
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            availableForSale
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;
const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
const PRODUCT_RECOMMENDATIONS_QUERY = `
  query ProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;
const meta$3 = () => [{ title: "BrinqueTEAndo" }];
const links = () => [
  { rel: "stylesheet", href: "/app.css" }
];
async function loader$3() {
  var _a, _b;
  let header = null;
  let footer = null;
  try {
    header = ((_a = await fetchShopify(MENU_QUERY, { handle: "main-menu" })) == null ? void 0 : _a.menu) || null;
    footer = ((_b = await fetchShopify(MENU_QUERY, { handle: "footer-menu" })) == null ? void 0 : _b.menu) || null;
  } catch (_) {
  }
  return json({
    shop: {
      storeDomain: process.env.PUBLIC_STORE_DOMAIN || "",
      storefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN || "",
      apiVersion: "2024-10",
      country: "BR",
      language: "PT_BR"
    },
    menus: { header, footer }
  });
}
function App() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("style", { children: `
          :root {
            --brand-blue-light: #8ECAE7;
            --brand-blue-dark: #21388D;
            --brand-blue: #3292D8;
            --brand-red: #CF111A;
            --brand-yellow: #DEC91F;
            --brand-gray-blue: #7D8FA4;
            --brand-beige: #EAD9B9;
          }
          body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; background: #fff; color: #111; }
          a { color: var(--brand-blue); text-decoration: none; }
          .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
          .btn-primary { background: var(--brand-blue-light); color: var(--brand-blue-dark); padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          .btn-secondary { background: var(--brand-blue); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          header { padding: 12px 16px; border-bottom: 1px solid #eee; }
          header .brand { font-weight: 800; color: var(--brand-blue-dark); }
          footer { margin-top: 48px; padding: 24px 16px; background: #f8fafc; border-top: 1px solid #eee; }
        ` })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(ShopifyProvider, { storefrontApiVersion: data.shop.apiVersion, storeDomain: `https://${data.shop.storeDomain}`, storefrontToken: data.shop.storefrontToken, country: data.shop.country, language: data.shop.language, children: /* @__PURE__ */ jsxs(CartProvider, { children: [
        /* @__PURE__ */ jsx(Header, { menu: data.menus.header }),
        /* @__PURE__ */ jsx("main", { className: "container", children: /* @__PURE__ */ jsx(Outlet, {}) }),
        /* @__PURE__ */ jsx(Footer, { menu: data.menus.footer })
      ] }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = ({ data }) => {
  var _a, _b, _c;
  return [
    { title: `${((_a = data == null ? void 0 : data.collection) == null ? void 0 : _a.title) || "Coleção"} - BrinqueTEAndo` },
    { name: "description", content: ((_c = (_b = data == null ? void 0 : data.collection) == null ? void 0 : _b.seo) == null ? void 0 : _c.description) || "Coleção com filtros por preço, idade, habilidades e tipo de produto." }
  ];
};
async function loader$2({ params }) {
  const { handle } = params;
  const data = await fetchShopify(COLLECTION_QUERY, { handle, first: 12, sortKey: "RELEVANCE", reverse: false });
  return json({ collection: data == null ? void 0 : data.collection });
}
function CollectionPage() {
  var _a, _b;
  const { collection } = useLoaderData();
  const products = ((_b = (_a = collection == null ? void 0 : collection.products) == null ? void 0 : _a.edges) == null ? void 0 : _b.map((e) => e.node)) || [];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { style: { marginTop: 0 }, children: [
      "Coleção: ",
      collection == null ? void 0 : collection.title
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { display: "grid", gridTemplateColumns: "260px 1fr", gap: "24px" }, children: [
      /* @__PURE__ */ jsxs("aside", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "12px" }, children: [
        /* @__PURE__ */ jsx("h3", { children: "Filtros" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
          "Preço: ",
          /* @__PURE__ */ jsx("input", { type: "range", min: 0, max: 500 })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Idade" }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " 3-5 anos"
          ] }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " 6-8 anos"
          ] }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " 9-12 anos"
          ] }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " 13+"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Habilidade" }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " Motora Fina"
          ] }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " Comunicação"
          ] }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " Social"
          ] }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            " Cognitiva"
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox" }),
          " Somente em estoque"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Ordenar por" }),
          /* @__PURE__ */ jsxs("select", { children: [
            /* @__PURE__ */ jsx("option", { children: "Relevância" }),
            /* @__PURE__ */ jsx("option", { children: "Menor Preço" }),
            /* @__PURE__ */ jsx("option", { children: "Maior Preço" }),
            /* @__PURE__ */ jsx("option", { children: "Mais Vendidos" }),
            /* @__PURE__ */ jsx("option", { children: "Novidades" }),
            /* @__PURE__ */ jsx("option", { children: "Melhor Avaliação" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: products.map((p) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h;
        return /* @__PURE__ */ jsxs("div", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "12px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { background: "#f2f2f2", height: 160, borderRadius: "8px" }, children: ((_d = (_c = (_b2 = (_a2 = p == null ? void 0 : p.images) == null ? void 0 : _a2.edges) == null ? void 0 : _b2[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.url) && /* @__PURE__ */ jsx("img", { src: p.images.edges[0].node.url, alt: p.images.edges[0].node.altText || p.title, style: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" } }) }),
          /* @__PURE__ */ jsx("strong", { children: p.title }),
          /* @__PURE__ */ jsxs("div", { children: [
            (_f = (_e = p.priceRange) == null ? void 0 : _e.minVariantPrice) == null ? void 0 : _f.amount,
            " ",
            (_h = (_g = p.priceRange) == null ? void 0 : _g.minVariantPrice) == null ? void 0 : _h.currencyCode
          ] }),
          /* @__PURE__ */ jsx("div", { style: { marginTop: "8px", display: "flex", gap: "8px" }, children: /* @__PURE__ */ jsx(Link, { className: "btn-secondary", to: `/products/${p.handle}`, children: "Ver" }) })
        ] }, p.id);
      }) }) })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CollectionPage,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = ({ data }) => {
  var _a, _b, _c;
  return [
    { title: `${((_a = data == null ? void 0 : data.product) == null ? void 0 : _a.title) || "Produto"} - BrinqueTEAndo` },
    { name: "description", content: ((_c = (_b = data == null ? void 0 : data.product) == null ? void 0 : _b.seo) == null ? void 0 : _c.description) || "Benefícios educacionais para TEA/TDAH, idade recomendada e certificações." }
  ];
};
async function loader$1({ params }) {
  var _a;
  const { handle } = params;
  const product = (_a = await fetchShopify(PRODUCT_QUERY, { handle })) == null ? void 0 : _a.product;
  let recommendations = [];
  if (product == null ? void 0 : product.id) {
    const rec = await fetchShopify(PRODUCT_RECOMMENDATIONS_QUERY, { productId: product.id });
    recommendations = (rec == null ? void 0 : rec.productRecommendations) || [];
  }
  return json({ product, recommendations });
}
function ProductPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const { product, recommendations } = useLoaderData();
  const { linesAdd } = useCart();
  const firstVariantId = (_d = (_c = (_b = (_a = product == null ? void 0 : product.variants) == null ? void 0 : _a.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("nav", { style: { marginBottom: "12px" }, children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: "Início" }),
      " ",
      ">",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/collections/sensory-toys", children: "Coleções" }),
      " ",
      ">",
      " ",
      /* @__PURE__ */ jsx("span", { children: (product == null ? void 0 : product.title) || "Produto" })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }, children: (_g = (_f = (_e = product == null ? void 0 : product.images) == null ? void 0 : _e.edges) == null ? void 0 : _f.slice(0, 4)) == null ? void 0 : _g.map(({ node }, i) => /* @__PURE__ */ jsx("img", { src: node.url, alt: node.altText || (product == null ? void 0 : product.title), style: { height: 180, objectFit: "cover", borderRadius: "8px" } }, node.id || i)) }),
        /* @__PURE__ */ jsx("p", { style: { marginTop: "8px" }, children: "Galeria (min 5 imagens) e 360° (placeholder)." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { style: { marginTop: 0 }, children: product == null ? void 0 : product.title }),
        /* @__PURE__ */ jsxs("div", { style: { fontSize: "24px", fontWeight: 800 }, children: [
          (_i = (_h = product == null ? void 0 : product.priceRange) == null ? void 0 : _h.minVariantPrice) == null ? void 0 : _i.amount,
          " ",
          (_k = (_j = product == null ? void 0 : product.priceRange) == null ? void 0 : _j.minVariantPrice) == null ? void 0 : _k.currencyCode
        ] }),
        /* @__PURE__ */ jsx("div", { style: { color: "#555" }, children: "Em estoque" }),
        /* @__PURE__ */ jsx("div", { style: { marginTop: "12px" }, dangerouslySetInnerHTML: { __html: (product == null ? void 0 : product.descriptionHtml) || "" } }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "12px" }, children: /* @__PURE__ */ jsx("button", { className: "btn-primary", disabled: !firstVariantId, onClick: () => linesAdd([{ merchandiseId: firstVariantId, quantity: 1 }]), children: "ADICIONAR AO CARRINHO" }) }),
        /* @__PURE__ */ jsx("div", { style: { marginTop: "12px", color: "#555" }, children: "Entrega estimada: Litoral de SP em 2-4 dias úteis." }),
        /* @__PURE__ */ jsxs("div", { style: { marginTop: "16px", display: "flex", gap: "12px" }, children: [
          /* @__PURE__ */ jsx("span", { children: "🚚 Frete grátis acima de R$ 250" }),
          /* @__PURE__ */ jsx("span", { children: "🔒 Pagamento seguro" }),
          /* @__PURE__ */ jsx("span", { children: "↩️ Devolução fácil" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { marginTop: "24px" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Relacionados" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }, children: recommendations == null ? void 0 : recommendations.map((p) => {
        var _a2, _b2, _c2, _d2;
        return /* @__PURE__ */ jsxs("div", { style: { border: "1px solid #eee", borderRadius: "8px", padding: "12px" }, children: [
          /* @__PURE__ */ jsx("strong", { children: p.title }),
          /* @__PURE__ */ jsxs("div", { children: [
            (_b2 = (_a2 = p.priceRange) == null ? void 0 : _a2.minVariantPrice) == null ? void 0 : _b2.amount,
            " ",
            (_d2 = (_c2 = p.priceRange) == null ? void 0 : _c2.minVariantPrice) == null ? void 0 : _d2.currencyCode
          ] }),
          /* @__PURE__ */ jsx(Link, { className: "btn-secondary", style: { marginTop: "8px" }, to: `/products/${p.handle}`, children: "Ver" })
        ] }, p.id);
      }) })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductPage,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => [
  { title: "BrinqueTEAndo - Brinquedos Educativos para Autismo, TDAH e TEA | Litoral SP" },
  { name: "description", content: "Brinquedos que transformam o aprendizado. Benefícios para TEA/TDAH. Entrega no litoral de SP." }
];
async function loader() {
  var _a, _b;
  const data = await fetchShopify(COLLECTIONS_QUERY, { first: 4 }).catch(() => null);
  const collections = ((_b = (_a = data == null ? void 0 : data.collections) == null ? void 0 : _a.edges) == null ? void 0 : _b.map((e) => e.node)) || [];
  return json({ collections });
}
function HomePage() {
  const { collections } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { style: {
      padding: "40px",
      background: "var(--brand-blue-light)",
      borderRadius: "16px",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx("h1", { style: { color: "var(--brand-blue-dark)" }, children: "Brinquedos que Transformam o Aprendizado" }),
      /* @__PURE__ */ jsx("p", { children: "Foco nos benefícios para TEA/TDAH e desenvolvimento infantil." }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "12px", marginTop: "16px" }, children: [
        /* @__PURE__ */ jsx(Link, { className: "btn-primary", to: "/collections/sensory-toys", children: "EXPLORAR BRINQUEDOS" }),
        /* @__PURE__ */ jsx(Link, { className: "btn-secondary", to: "/about", children: "SOBRE NÓS" })
      ] }),
      /* @__PURE__ */ jsx("div", { "aria-hidden": true, style: { position: "absolute", right: 20, top: 20, opacity: 0.2, fontSize: "64px" }, children: "🐉" })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Coleções em Destaque" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: collections.map((c) => /* @__PURE__ */ jsxs("div", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "16px" }, children: [
        /* @__PURE__ */ jsx("h3", { children: c.title }),
        /* @__PURE__ */ jsx("p", { children: "Explore produtos recomendados para desenvolvimento." }),
        /* @__PURE__ */ jsx(Link, { className: "btn-secondary", to: `/collections/${c.handle}`, children: "VER COLEÇÃO" })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Mais Amados pelas Famílias" }),
      /* @__PURE__ */ jsx("p", { children: "Carousel/grid de best sellers (placeholder)." })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Nosso Compromisso Educacional" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: ["Desenvolvimento Através da Brincadeira", "Recomendados por Terapeutas", "Segurança e Qualidade", "Entrega Rápida no Litoral de SP"].map((t, i) => /* @__PURE__ */ jsxs("div", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "16px" }, children: [
        /* @__PURE__ */ jsx("strong", { children: t }),
        /* @__PURE__ */ jsx("p", { children: "Conteúdo educativo breve explicando o benefício." })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Aprenda Conosco" }),
      /* @__PURE__ */ jsx("p", { children: "Cards de blog/artigos (placeholder)." })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: { marginTop: "32px", background: "var(--brand-blue-light)", padding: "24px", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsx("h2", { style: { color: "var(--brand-blue-dark)" }, children: "Receba Dicas e Novidades" }),
      /* @__PURE__ */ jsx("p", { children: "Cadastre-se e receba conteúdo exclusivo sobre desenvolvimento infantil" }),
      /* @__PURE__ */ jsxs("form", { style: { display: "flex", gap: "12px", flexWrap: "wrap" }, onSubmit: (e) => e.preventDefault(), children: [
        /* @__PURE__ */ jsx("input", { placeholder: "Nome" }),
        /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email", required: true }),
        /* @__PURE__ */ jsx("input", { placeholder: "WhatsApp" }),
        /* @__PURE__ */ jsx("button", { className: "btn-primary", type: "submit", children: "CADASTRAR" })
      ] })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BkZeBuxB.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DYC9Ya5C.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes/collections.$handle": { "id": "routes/collections.$handle", "parentId": "root", "path": "collections/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/collections._handle-B_gzQrho.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes/products.$handle": { "id": "routes/products.$handle", "parentId": "root", "path": "products/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/products._handle-BSO0ueyC.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes/index": { "id": "routes/index", "parentId": "root", "path": "index", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CWMI_MAs.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] } }, "url": "/assets/manifest-4498b74e.js", "version": "4498b74e" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/collections.$handle": {
    id: "routes/collections.$handle",
    parentId: "root",
    path: "collections/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/products.$handle": {
    id: "routes/products.$handle",
    parentId: "root",
    path: "products/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
