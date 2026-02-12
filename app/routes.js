import {flatRoutes} from '@react-router/fs-routes';
import {hydrogenRoutes} from '@shopify/hydrogen';

// ✅ FIX: Configuração de rotas padrão para React Router 7 + Hydrogen
const routes = hydrogenRoutes([
  ...(await flatRoutes()),
]);

export default routes;
