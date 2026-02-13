import {createCookieSessionStorage} from 'react-router';

/**
 * Session class with proper isPending tracking.
 * Hydrogen checks isPending to know when to send Set-Cookie headers.
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
  }

  unset(key) {
    this.#session.unset(key);
    this.isPending = true;
  }

  commit() {
    return this.#sessionStorage.commitSession(this.#session);
  }
}
