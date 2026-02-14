import {createCookieSessionStorage} from 'react-router';

/**
 * Session class que rastreia mudanças pendentes
 */
export class AppSession {
  #session;
  #storage;
  #isPending = false;

  constructor(storage, session) {
    this.#storage = storage;
    this.#session = session;
  }

  static async init(request, secrets) {
    const validSecrets = Array.isArray(secrets) && secrets.length > 0 && secrets[0]
      ? secrets
      : ['fallback-secret-key-for-development'];

    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: validSecrets,
        secure: process.env.NODE_ENV === 'production',
      },
    });

    let session;
    try {
      session = await storage.getSession(request.headers.get('Cookie'));
    } catch {
      session = await storage.getSession();
    }

    return new AppSession(storage, session);
  }

  get isPending() {
    return this.#isPending;
  }

  get(key) {
    return this.#session.get(key);
  }

  set(key, value) {
    this.#session.set(key, value);
    this.#isPending = true;  // ✅ Marca como pendente quando algo muda
  }

  unset(key) {
    this.#session.unset(key);
    this.#isPending = true;  // ✅ Marca como pendente quando algo muda
  }

  async commit() {
    this.#isPending = false;
    return this.#storage.commitSession(this.#session);
  }
}
