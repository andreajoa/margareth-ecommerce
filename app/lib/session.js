import {createCookieSessionStorage} from 'react-router';

export class AppSession {
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

    const session = await storage.getSession(request.headers.get('Cookie'));

    return {
      get: (key) => session.get(key),
      set: (key, value) => session.set(key, value),
      unset: (key) => session.unset(key),
      commit: () => storage.commitSession(session),
      isPending: false,
    };
  }
}
