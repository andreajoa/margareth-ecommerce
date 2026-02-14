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
  let pending = false;

  return {
    get isPending() { return pending; },
    get: (key) => session.get(key),
    set: (key, value) => { session.set(key, value); pending = true; },
    unset: (key) => { session.unset(key); pending = true; },
    commit: () => storage.commitSession(session),
  };
}
