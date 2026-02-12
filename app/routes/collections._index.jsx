import {redirect} from 'react-router'; // Corrigido: Importando do react-router

// Este arquivo serve como um "Guarda de Trânsito".
// Se alguém tentar acessar "/collections" vazio, ele manda para a coleção principal.
export async function loader() {
  return redirect('/collections/brinquedos-terapeuticos');
}

export default function CollectionsIndex() {
  return null;
}
