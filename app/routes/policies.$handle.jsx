import {useLoaderData, Link, redirect} from 'react-router';

export async function loader({params, context}) {
  const {handle} = params;
  
  // Redireciona policies para pages
  const pageHandle = {
    'politica-de-devolucao': 'politica-de-devolucao',
    'politica-de-envio': 'politica-de-envio', 
    'politica-de-privacidade': 'politica-de-privacidade',
    'refund-policy': 'politica-de-devolucao',
    'shipping-policy': 'politica-de-envio',
    'privacy-policy': 'politica-de-privacidade',
  }[handle];

  if (pageHandle) {
    return redirect(`/pages/${pageHandle}`);
  }

  throw new Response('Não encontrada', {status: 404});
}

export default function Policy() {
  return null;
}
