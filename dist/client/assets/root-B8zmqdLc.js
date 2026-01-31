import{a as m,p as e,L as l,w as p,q as c,t as g,M as h,v as x,O as u,S as f,x as y}from"./chunk-JZWAC4HX-D_6TzE5X.js";const d="2024-10";function b(n,t,r){return{"content-type":n==="graphql"?"application/graphql":"application/json","X-SDK-Variant":"hydrogen-react","X-SDK-Variant-Source":"react","X-SDK-Version":t,"X-Shopify-Storefront-Access-Token":r}}const j={storeDomain:"test",storefrontToken:"abc123",storefrontApiVersion:d,countryIsoCode:"US",languageIsoCode:"EN",getStorefrontApiUrl(){return""},getPublicTokenHeaders(){return{}},getShopifyDomain(){return""}},w=m.createContext(j);function v(){var n,t,r;if(typeof window>"u")return!1;try{const i=(t=(n=window.performance)==null?void 0:n.getEntriesByType)==null?void 0:t.call(n,"navigation")[0];return!!((r=i==null?void 0:i.serverTiming)!=null&&r.some(a=>a.name==="_sfapi_proxy"))}catch{return!1}}function S({children:n,...t}){if(!t.countryIsoCode||!t.languageIsoCode||!t.storeDomain||!t.storefrontToken||!t.storefrontApiVersion)throw new Error("Please provide the necessary props to '<ShopifyProvider/>'");t.storefrontApiVersion!==d&&console.warn(`<ShopifyProvider/>: This version of Hydrogen React is built for Shopify's Storefront API version ${d}, but it looks like you're using version ${t.storefrontApiVersion}. There may be issues or bugs if you use a mismatched version of Hydrogen React and the Storefront API.`);const r=m.useMemo(()=>{const i=t.sameDomainForStorefrontApi??v();function a(o){const s=(o==null?void 0:o.storeDomain)??t.storeDomain;return s.includes("://")?s:`https://${s}`}return{...t,sameDomainForStorefrontApi:i,getPublicTokenHeaders(o){return b(o.contentType,t.storefrontApiVersion,o.storefrontToken??t.storefrontToken)},getShopifyDomain:a,getStorefrontApiUrl(o){const s=i&&typeof window<"u"?window.location.origin:a({storeDomain:(o==null?void 0:o.storeDomain)??t.storeDomain});return`${s}${s.endsWith("/")?"":"/"}api/${(o==null?void 0:o.storefrontApiVersion)??t.storefrontApiVersion}/graphql.json`}}},[t]);return e.jsx(w.Provider,{value:r,children:n})}function A({menu:n}){var t;return e.jsx("header",{style:{background:"#fff",borderBottom:"1px solid var(--gray-blue)"},children:e.jsxs("div",{className:"container",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0"},children:[e.jsx("a",{href:"/",className:"brand","aria-label":"Página inicial",style:{display:"inline-flex",alignItems:"center"},children:e.jsx("img",{src:"/logo-brinqueteando.png",alt:"BrinqueTEAndo",style:{height:"48px"}})}),e.jsx("nav",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:(t=n==null?void 0:n.items)!=null&&t.length?n.items.map(r=>{var i;return(i=r.url)!=null&&i.startsWith("http")?e.jsx("a",{href:r.url,rel:"noopener",style:{color:"var(--dark-blue)"},children:r.title},r.id):e.jsx(l,{to:r.url||"/",style:{color:"var(--dark-blue)"},children:r.title},r.id)}):e.jsxs(e.Fragment,{children:[e.jsx(l,{to:"/",style:{color:"var(--dark-blue)"},children:"Início"}),e.jsx(l,{to:"/collections/sensory-toys",style:{color:"var(--dark-blue)"},children:"Coleções"}),e.jsx(l,{to:"/collections/by-age",style:{color:"var(--dark-blue)"},children:"Por Idade"}),e.jsx(l,{to:"/collections/by-skill",style:{color:"var(--dark-blue)"},children:"Por Habilidade"})]})})]})})}const T=p(function(){const{shop:t,headerMenu:r,footerMenu:i,env:a,apiVersion:o}=g();return e.jsxs("html",{lang:"pt-BR",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(h,{}),e.jsx(x,{}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
          :root {
            --red: #CF111A;
            --yellow: #DEC91F;
            --bright-blue: #3292D8;
            --dark-blue: #21388D;
            --maroon: #7C3D36;
            --light-blue: #8ECAE7;
            --gray-blue: #7D8FA4;
            --beige: #EAD9B9;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            background: var(--light-blue);
            color: #1f2937;
          }
          a { color: inherit; text-decoration: none; }
          img { max-width: 100%; height: auto; }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

          .max-w-7xl { max-width: 80rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .px-8 { padding-left: 2rem; padding-right: 2rem; }
          .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
          .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          .mb-12 { margin-bottom: 3rem; }
          .mb-16 { margin-bottom: 4rem; }
          .mt-2 { margin-top: .5rem; }
          .mt-4 { margin-top: 1rem; }

          .grid { display: grid; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .gap-2 { gap: .5rem; }
          .gap-3 { gap: .75rem; }
          .gap-4 { gap: 1rem; }
          .gap-6 { gap: 1.5rem; }
          .gap-8 { gap: 2rem; }
          .gap-12 { gap: 3rem; }

          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .justify-center { justify-content: center; }
          .flex-wrap { flex-wrap: wrap; }

          .text-center { text-align: center; }
          .text-xs { font-size: .75rem; line-height: 1rem; }
          .text-sm { font-size: .875rem; line-height: 1.25rem; }
          .text-base { font-size: 1rem; line-height: 1.5rem; }
          .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .font-light { font-weight: 300; }
          .font-medium { font-weight: 500; }
          .font-semibold { font-weight: 600; }
          .font-bold { font-weight: 700; }
          .tracking-wide { letter-spacing: .05em; }
          .tracking-widest { letter-spacing: .2em; }

          .rounded-\\[10px\\] { border-radius: 10px; }
          .rounded-xl { border-radius: .75rem; }
          .rounded-2xl { border-radius: 1rem; }
          .rounded-3xl { border-radius: 1.5rem; }
          .rounded-full { border-radius: 9999px; }

          .relative { position: relative; }
          .absolute { position: absolute; }
          .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
          .w-full { width: 100%; }
          .h-full { height: 100%; }
          .w-5 { width: 1.25rem; }
          .h-5 { height: 1.25rem; }
          .w-11 { width: 2.75rem; }
          .h-11 { height: 2.75rem; }
          .object-cover { object-fit: cover; }
          .z-10 { z-index: 10; }
          .z-20 { z-index: 20; }
          .hidden { display: none; }

          .h-64 { height: 16rem; }

          @media (min-width: 640px) {
            .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .sm\\:text-base { font-size: 1rem; line-height: 1.5rem; }
            .sm\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .sm\\:h-72 { height: 18rem; }
            .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          }

          @media (min-width: 768px) {
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .md\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .md\\:h-80 { height: 20rem; }
            .md\\:px-12 { padding-left: 3rem; padding-right: 3rem; }
          }

          @media (min-width: 1024px) {
            .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .lg\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
            .lg\\:flex { display: flex; }
            .lg\\:col-span-2 { grid-column: span 2 / span 2; }
          }
        `}})]}),e.jsxs("body",{children:[e.jsxs(S,{storeDomain:`https://${a.PUBLIC_STORE_DOMAIN}`,storefrontToken:a.PUBLIC_STOREFRONT_API_TOKEN,storefrontApiVersion:o,countryIsoCode:"BR",languageIsoCode:"PT_BR",children:[e.jsx(A,{menu:r}),e.jsx("main",{style:{minHeight:"60vh"},children:e.jsx(u,{})}),e.jsx(k,{menu:i})]}),e.jsx(f,{}),e.jsx(y,{})]})]})});function k({menu:n}){return e.jsx("footer",{style:{background:"linear-gradient(180deg, var(--bright-blue) 0%, var(--dark-blue) 100%)",padding:"32px 16px",marginTop:"48px",color:"white"},children:e.jsxs("div",{className:"container",style:{display:"grid",gridTemplateColumns:"1fr",gap:"24px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{margin:0,fontWeight:600},children:"Frete grátis para Praia Grande, Santos e São Vicente"}),e.jsx("p",{style:{margin:"4px 0 0",opacity:.9},children:"Atendemos todo o Litoral Paulista"})]}),e.jsx("nav",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:((n==null?void 0:n.items)||[]).map(t=>{var r;return(r=t.url)!=null&&r.startsWith("http")?e.jsx("a",{href:t.url,rel:"noopener",style:{color:"#fff"},children:t.title},t.id):e.jsx("a",{href:t.url||"/",style:{color:"#fff"},children:t.title},t.id)})}),e.jsxs("p",{style:{margin:0,opacity:.8},children:["© ",new Date().getFullYear()," BrinqueTEAndo. Todos os direitos reservados."]})]})})}const E=c(function(){return e.jsxs("html",{lang:"pt-BR",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("title",{children:"Erro"})]}),e.jsx("body",{children:e.jsxs("div",{style:{padding:"40px",textAlign:"center"},children:[e.jsx("h1",{children:"Ops! Algo deu errado"}),e.jsx("p",{children:"Por favor, tente novamente mais tarde."}),e.jsx("a",{href:"/",children:"Voltar para a home"})]})})]})});export{E as ErrorBoundary,T as default};
