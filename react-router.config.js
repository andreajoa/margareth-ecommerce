import {hydrogenPreset} from '@shopify/hydrogen/react-router-preset';

export default {
  presets: [hydrogenPreset()],
  future: {
    v8_middleware: false,
  },
};
