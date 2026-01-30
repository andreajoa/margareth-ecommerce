import {useLoaderData, Link} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [
    {title: 'BrinqueTEAndo | Brinquedos para TEA, TDAH e Autismo'},
    {name: 'description', content: 'Brinquedos sensoriais e educativos para TEA, TDAH e Autismo. Frete grátis para Praia Grande, Santos e São Vicente. Atendemos todo o Litoral Paulista.'},
    {name: 'keywords', content: 'brinquedos TEA, brinquedos TDAH, brinquedos para autismo, brinquedos sensoriais, brinquedos educativos, Praia Grande, Santos, São Vicente, Guarujá, Bertioga, Itanhaém, Peruíbe, Mongaguá, Ilhabela, São Sebastião, Ubatuba, Caraguatatuba, Cubatão, Litoral Paulista'},
    {httpEquiv: 'content-language', content: 'pt-BR'},
    {property: 'og:title', content: 'BrinqueTEAndo | Brinquedos Educativos TEA/TDAH'},
    {property: 'og:description', content: 'Brinquedos sensoriais e educativos para TEA, TDAH e Autismo no Litoral Paulista.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: '/'},
    {property: 'og:image', content: '/logo-brinqueteando.png'},
    {property: 'og:site_name', content: 'BrinqueTEAndo'},
    {property: 'og:locale', content: 'pt_BR'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'BrinqueTEAndo'},
    {name: 'twitter:description', content: 'Brinquedos sensoriais e educativos para TEA, TDAH e Autismo.'},
    {name: 'twitter:image', content: '/logo-brinqueteando.png'},
    {name: 'theme-color', content: '#21388D'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTIONS_QUERY);
  const {products} = await storefront.query(FEATURED_PRODUCTS_QUERY);
  const {products: under100Products} = await storefront.query(PRODUCTS_UNDER_100_QUERY);
  return {collections, products, under100Products: under100Products.nodes};
}

export default function Homepage() {
  const {collections, products, under100Products} = useLoaderData();
  
  return (
    <main className="bg-[#8ECAE7] min-h-screen">
      <div className="bg-[#21388D] text-white py-4 text-center">
        <h1 className="text-3xl font-bold">🎈 BrinqueTEAndo 🎁</h1>
        <p>Brinquedos sensoriais e educativos para TEA, TDAH e Autismo</p>
        <p className="text-sm mt-1 opacity-90">Frete grátis para Praia Grande, Santos e São Vicente • Litoral Paulista</p>
      </div>
      
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-[#3292D8] to-[#21388D] rounded-xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Diversão e Aprendizado</h2>
          <Link to="/collections" className="inline-block bg-[#CF111A] px-10 py-3 rounded-full font-bold hover:bg-[#DEC91F] hover:text-[#21388D]">
            Ver Produtos
          </Link>
        </div>
      </section>
      
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#21388D] text-3xl font-bold text-center mb-12">Produtos Destaque</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.nodes.slice(0, 8).map(p => (
              <Link key={p.id} to={`/products/${p.handle}`} className="group">
                <div className="aspect-square mb-3 rounded-xl overflow-hidden bg-[#8ECAE7] shadow">
                  {p.featuredImage && <Image data={p.featuredImage} className="w-full h-full object-cover" alt={p.title} />}
                </div>
                <h3 className="text-[#21388D] font-semibold text-sm text-center">{p.title}</h3>
                <Money data={p.priceRange.minVariantPrice} className="text-[#CF111A] font-bold text-center block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#21388D] text-3xl font-bold text-center mb-12">Produtos até R$100</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {under100Products.slice(0, 8).map((p) => (
              <Link key={p.id} to={`/products/${p.handle}`} className="group">
                <div className="aspect-square mb-3 rounded-xl overflow-hidden bg-[#8ECAE7] shadow">
                  {p.featuredImage && (
                    <Image
                      data={p.featuredImage}
                      className="w-full h-full object-cover"
                      alt={p.featuredImage.altText || p.title}
                    />
                  )}
                </div>
                <h3 className="text-[#21388D] font-semibold text-sm text-center">{p.title}</h3>
                <Money data={p.priceRange.minVariantPrice} className="text-[#CF111A] font-bold text-center block" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const FEATURED_COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection { id title handle image { id url } }
  query FeaturedCollections { collections(first: 4) { nodes { ...Collection } } }
`;

const FEATURED_PRODUCTS_QUERY = `#graphql
  fragment ProductItem on Product {
    id handle title
    featuredImage { id url }
    priceRange { minVariantPrice { amount currencyCode } }
  }
  query FeaturedProducts { products(first: 8) { nodes { ...ProductItem } } }
`;

const PRODUCTS_UNDER_100_QUERY = `#graphql
  fragment ProductUnder100 on Product {
    id handle title
    featuredImage { id url }
    priceRange { minVariantPrice { amount currencyCode } }
  }
  query ProductsUnder100 { products(first: 12, query: "price:<100") { nodes { ...ProductUnder100 } } }
`;

const FOOTER_MENU_QUERY = `#graphql
  query FooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) { id items { id title url } }
  }
`;
