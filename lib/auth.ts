import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

/**
 * Single-admin auth: one password in an env var, exchanged for a signed JWT
 * held in an httpOnly cookie. No user table, because there is one author.
 *
 * BLOG_ADMIN_PASSWORD is REQUIRED — there is deliberately no default. A
 * fallback password in source is a published password.
 */
const PASSWORD = process.env.BLOG_ADMIN_PASSWORD || '';
const SECRET = process.env.BLOG_AUTH_SECRET || PASSWORD;
const COOKIE = 'inferno_admin';
const MAX_AGE = 60 * 60 * 12; // 12 hours

function key() {
  if (!SECRET) {
    const e = new Error(
      'BLOG_ADMIN_PASSWORD is not set. Add it in Vercel → Settings → Environment Variables.'
    ) as Error & { status?: number };
    e.status = 503;
    throw e;
  }
  return new TextEncoder().encode(SECRET);
}

export const adminConfigured = () => Boolean(PASSWORD);

/** Length-independent comparison so timing does not leak the password. */
export function passwordOk(input: unknown) {
  if (!PASSWORD) return false;
  const a = Buffer.from(String(input ?? ''));
  const b = Buffer.from(PASSWORD);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function issueToken() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(key());
}

export const COOKIE_NAME = COOKIE;
export const COOKIE_MAX_AGE = MAX_AGE;

export async function setSession(token: string) {
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  (await cookies()).set(COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function isAdmin() {
  if (!SECRET) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key());
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

/** Throws a 401-tagged error when the caller has no valid admin session. */
export async function requireAdmin() {
  if (!(await isAdmin())) {
    const e = new Error('Not authenticated') as Error & { status?: number };
    e.status = 401;
    throw e;
  }
}
