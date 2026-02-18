import {HydratedRouter} from 'react-router/dom';
import {startTransition} from 'react';
import {hydrateRoot} from 'react-dom/client';

startTransition(() => {
  hydrateRoot(
    document,
    <HydratedRouter />,
    {
      onRecoverableError(error, errorInfo) {
        // Log apenas erros reais, não warnings de hydration esperados
        if (
          error?.message?.includes('Minified React error') ||
          error?.message?.includes('hydrat')
        ) {
          return; // Ignora hydration mismatches esperados (SSR vs client)
        }
        console.error('[App Error]', error);
      },
    }
  );
});
