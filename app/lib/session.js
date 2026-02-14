import {createCookieSessionStorage} from 'react-router';

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
      : ['s3cr3t-fallback-key-2024'];

    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: validSecrets,
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
    this.#isPending = true;
  }

  unset(key) {
    this.#session.unset(key);
    this.#isPending = true;
  }

  async commit() {
    this.#isPending = false;
    return this.#storage.commitSession(this.#session);
  }
}
