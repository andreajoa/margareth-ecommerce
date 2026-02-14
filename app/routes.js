import {flatRoutes} from '@react-router/fs-routes';

// ✅ FIX: Remover hydrogenRoutes - não é necessário com hydrogenPreset
const routes = await flatRoutes();

export default routes;
