import {flatRoutes} from '@react-router/fs-routes';
import {hydrogenRoutes} from '@shopify/hydrogen';

// ✅ FIX: Configuração de rotas padrão para React Router 7 + Hydrogen
// Usando top-level await (suportado em ESM)
console.log('[DEBUG] Loading routes...');
const flatRoutesResult = await flatRoutes();
console.log('[DEBUG] Flat routes loaded:', flatRoutesResult.length, 'routes');

const routes = hydrogenRoutes([
  ...flatRoutesResult,
]);

console.log('[DEBUG] Routes configured successfully');
export default routes;
