import {createCookieSessionStorage} from 'react-router';

export async function createAppSession(request, secrets) {
  const storage = createCookieSessionStorage({
    cookie: {
      name: 'session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: secrets || ['fallback-secret'],
    },
  });

  const session = await storage.getSession(request.headers.get('Cookie'));
  let isPending = false;

  return {
    get isPending() {
      return isPending;
    },
    get: (key) => session.get(key),
    set: (key, value) => {
      session.set(key, value);
      isPending = true;
    },
    unset: (key) => {
      session.unset(key);
      isPending = true;
    },
    commit: async () => {
      isPending = false;
      return storage.commitSession(session);
    },
  };
}
