import { neon } from '@neondatabase/serverless';

/**
 * Neon serverless Postgres over HTTP — no connection pooling to manage,
 * which is what you want inside Vercel functions.
 */
const CONN =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  '';

let client: ReturnType<typeof neon> | null = null;

export function db() {
  if (!CONN) {
    const e = new Error(
      'Database not configured. Add a Neon integration in Vercel, then run `vercel env pull .env.local`.'
    ) as Error & { status?: number };
    e.status = 503;
    throw e;
  }
  if (!client) client = neon(CONN);
  return client;
}

export const dbConfigured = () => Boolean(CONN);
