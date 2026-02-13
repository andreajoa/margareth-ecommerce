import {createCookieSessionStorage} from 'react-router';

export class AppSession {
  static async init(request, secrets) {
    // ✅ FIX: Garantir que secrets seja sempre um array válido
    const validSecrets = Array.isArray(secrets) && secrets.length > 0 && secrets[0] 
      ? secrets 
      : ['s3cr3t-t3mp0r4r10-f4llb4ck']; 

    console.log('[DEBUG] Creating cookie session storage');
    
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: validSecrets,
      },
    });

    console.log('[DEBUG] Getting session from request');
    // Tenta obter a sessão ou cria uma nova se falhar
    let session;
    try {
      session = await storage.getSession(request.headers.get('Cookie'));
      console.log('[DEBUG] Session obtained successfully');
    } catch {
      console.log('[DEBUG] Failed to get session, creating new one');
      session = await storage.getSession();
    }

    return {
      get: (key) => session.get(key),
      set: (key, value) => session.set(key, value),
      unset: (key) => session.unset(key),
      commit: () => storage.commitSession(session),
      isPending: false,
    };
  }
}
