import {createCookieSessionStorage} from 'react-router';

export class AppSession {
  constructor(storage, session) {
    this.storage = storage;
    this.session = session;
    this.isPending = false;
  }

  static async init(request, secrets) {
    const validSecrets = secrets && secrets.length > 0 && secrets[0] 
      ? secrets 
      : ['default-secret-key-2024'];

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
    } catch (e) {
      session = await storage.getSession();
    }

    return new AppSession(storage, session);
  }

  get(key) {
    return this.session.get(key);
  }

  set(key, value) {
    this.session.set(key, value);
    this.isPending = true;
  }

  unset(key) {
    this.session.unset(key);
    this.isPending = true;
  }

  async commit() {
    this.isPending = false;
    return this.storage.commitSession(this.session);
  }
}
