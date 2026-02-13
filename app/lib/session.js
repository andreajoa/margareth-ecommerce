import {createCookieSessionStorage} from 'react-router';

/**
 * Session class that properly tracks mutations via isPending.
 * Uses private class fields so Hydrogen can detect when to send Set-Cookie.
 */
export class AppSession {
  isPending = false;
  #sessionStorage;
  #session;

  constructor(sessionStorage, session) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  static async init(request, secrets) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    let session;
    try {
      session = await storage.getSession(request.headers.get('Cookie'));
    } catch {
      // If the cookie is corrupted, start fresh
      session = await storage.getSession();
    }

    return new AppSession(storage, session);
  }

  get(key) {
    return this.#session.get(key);
  }

  set(key, value) {
    this.#session.set(key, value);
    this.isPending = true;
    console.log('[SESSION DEBUG] set() called, isPending now:', this.isPending, 'key:', key);
  }

  unset(key) {
    this.#session.unset(key);
    this.isPending = true;
    console.log('[SESSION DEBUG] unset() called, isPending now:', this.isPending, 'key:', key);
  }

  commit() {
    return this.#sessionStorage.commitSession(this.#session);
  }
}
