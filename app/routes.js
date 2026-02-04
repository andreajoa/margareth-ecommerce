import {flatRoutes} from '@react-router/fs-routes';
import {hydrogenRoutes} from '@shopify/hydrogen';

export default hydrogenRoutes([
  ...(await flatRoutes()),
]);

/** @typedef {import('@react-router/dev/routes').RouteConfig} RouteConfig */
