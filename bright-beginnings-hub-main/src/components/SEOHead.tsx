import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead = ({
  title = 'Brinquedos Educativos TEA, TDAH e Autismo | Litoral de São Paulo | BrincarEAprender',
  description = 'Loja especializada em brinquedos terapêuticos e educativos para crianças com TEA, TDAH e Autismo. Frete grátis para Praia Grande, Santos e São Vicente. Produtos sensoriais, pedagógicos e de desenvolvimento.',
  keywords = 'brinquedos TEA, brinquedos autismo, brinquedos TDAH, brinquedos sensoriais, brinquedos educativos, praia grande, santos, são vicente, litoral sp, brinquedos terapêuticos, estimulação sensorial, desenvolvimento infantil, material ABA, jogos pedagógicos, autismo, baixada santista',
  image = '/og-image.jpg',
  url = 'https://brincarEAprender.com.br',
}: SEOProps) => {
  const schemaOrgJSON = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BrincarEAprender",
      "url": url,
      "logo": `${url}/logo.png`,
      "description": "Loja especializada em brinquedos terapêuticos e educativos para crianças com TEA, TDAH e Autismo no Litoral de São Paulo.",
      "foundingDate": "2024",
      "areaServed": [
        {"@type": "City", "name": "Praia Grande", "containedIn": {"@type": "State", "name": "São Paulo", "containedIn": {"@type": "Country", "name": "Brasil"}}},
        {"@type": "City", "name": "Santos", "containedIn": {"@type": "State", "name": "São Paulo"}},
        {"@type": "City", "name": "São Vicente", "containedIn": {"@type": "State", "name": "São Paulo"}},
        {"@type": "City", "name": "Guarujá", "containedIn": {"@type": "State", "name": "São Paulo"}},
        {"@type": "City", "name": "Bertioga", "containedIn": {"@type": "State", "name": "São Paulo"}},
        {"@type": "City", "name": "Mongaguá", "containedIn": {"@type": "State", "name": "São Paulo"}},
        {"@type": "City", "name": "Itanhaém", "containedIn": {"@type": "State", "name": "São Paulo"}},
        {"@type": "City", "name": "Peruíbe", "containedIn": {"@type": "State", "name": "São Paulo"}}
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-13-99999-9999",
        "contactType": "Atendimento ao Cliente",
        "areaServed": "BR-SP",
        "availableLanguage": ["Portuguese"]
      },
      "sameAs": [
        "https://www.instagram.com/brincarEAprender/",
        "https://www.facebook.com/brincarEAprender/"
      ]
    },
    // WebSite Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BrincarEAprender",
      "url": url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${url}/busca?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    // Store/LocalBusiness Schema
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "BrincarEAprender - Brinquedos TEA, TDAH e Autismo",
      "image": `${url}/logo.png`,
      "url": url,
      "priceRange": "$$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "Cartão de Crédito, Boleto, PIX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Praia Grande",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-23.9618",
        "longitude": "-46.3322"
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "-23.9618",
          "longitude": "-46.3322"
        },
        "geoRadius": "100000"
      }
    },
    // OfferCatalog Schema
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Catálogo BrincarEAprender",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Brinquedos Sensoriais",
          "itemListElement": [{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Brinquedos Sensoriais para TEA e Autismo",
              "description": "Brinquedos para estimulação tátil, visual e auditiva"
            }
          }]
        },
        {
          "@type": "OfferCatalog",
          "name": "Brinquedos Educativos",
          "itemListElement": [{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Brinquedos Educativos para TDAH",
              "description": "Brinquedos pedagógicos para desenvolvimento cognitivo"
            }
          }]
        },
        {
          "@type": "OfferCatalog",
          "name": "Brinquedos Terapêuticos",
          "itemListElement": [{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Brinquedos Terapêuticos e Material ABA",
              "description": "Produtos para terapias ocupacional, ABA e fonoaudiologia"
            }
          }]
        }
      ]
    },
    // BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": url
      }]
    },
    // FAQPage Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Vocês entregam no litoral de São Paulo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Oferecemos FRETE GRÁTIS para Praia Grande, Santos e São Vicente. Para outras cidades do litoral como Guarujá, Bertioga, Mongaguá, Itanhaém e Peruíbe, temos entrega expressa a partir de R$ 9,90."
          }
        },
        {
          "@type": "Question",
          "name": "Quais tipos de brinquedos vocês vendem?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Somos especializados em brinquedos para crianças com TEA (Transtorno do Espectro Autista), TDAH e Autismo. Temos brinquedos sensoriais, educativos, terapêuticos, jogos pedagógicos e materiais para terapia ABA."
          }
        },
        {
          "@type": "Question",
          "name": "Os brinquedos são indicados por terapeutas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Nossos produtos são selecionados e recomendados por terapeutas ocupacionais, psicólogos e profissionais de ABA que trabalham com desenvolvimento infantil."
          }
        }
      ]
    }
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Geo-Targeting Meta Tags */}
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="Praia Grande;Santos;São Vicente;Guarujá;Bertioga;Mongaguá;Itanhaém;Peruíbe" />
      <meta name="geo.position" content="-23.9618;-46.3322" />
      <meta name="ICBM" content="-23.9618, -46.3322" />
      
      {/* Language */}
      <html lang="pt-BR" />
      <meta httpEquiv="content-language" content="pt-BR" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="BrincarEAprender" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#4A90E2" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSON)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
