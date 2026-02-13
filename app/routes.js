import {flatRoutes} from '@react-router/fs-routes';
import {hydrogenRoutes} from '@shopify/hydrogen';

// ✅ FIX: Configuração de rotas padrão para React Router 7 + Hydrogen
// Usando top-level await (suportado em ESM)
const flatRoutesResult = await flatRoutes();
const routes = hydrogenRoutes([
  ...flatRoutesResult,
]);

export default routes;
