/**
 * Creates / updates the database schema.
 *   npm run db:migrate
 * Reads DATABASE_URL from the environment or .env.local.
 */
import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

// Node has --env-file, but this keeps the script runnable everywhere.
try {
  const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch {
  /* no .env.local — rely on the real environment */
}

const CONN =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL;

if (!CONN) {
  console.error(
    '✗ No DATABASE_URL found.\n' +
      '  Add a Neon database in Vercel (Storage → Create → Neon),\n' +
      '  then run: vercel env pull .env.local'
  );
  process.exit(1);
}

const sql = neon(CONN);

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS posts (
     id              BIGSERIAL PRIMARY KEY,
     slug            TEXT UNIQUE NOT NULL,
     title           TEXT NOT NULL,
     excerpt         TEXT DEFAULT '',
     content_html    TEXT NOT NULL DEFAULT '',
     content_md      TEXT DEFAULT '',
     source_format   TEXT DEFAULT 'html',
     cover_image_url TEXT DEFAULT '',
     cover_image_alt TEXT DEFAULT '',
     meta_title      TEXT DEFAULT '',
     meta_description TEXT DEFAULT '',
     og_image_url    TEXT DEFAULT '',
     canonical_url   TEXT DEFAULT '',
     custom_jsonld   TEXT DEFAULT '',
     faqs            JSONB NOT NULL DEFAULT '[]'::jsonb,
     tags            TEXT[] NOT NULL DEFAULT '{}',
     author          TEXT DEFAULT 'Inferno Emails',
     status          TEXT NOT NULL DEFAULT 'draft',
     reading_minutes INT DEFAULT 1,
     published_at    TIMESTAMPTZ,
     created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
     updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS idx_posts_status_pub ON posts (status, published_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug)`,
  `CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN (tags)`,

  // Audit / contact form submissions.
  `CREATE TABLE IF NOT EXISTS leads (
     id         BIGSERIAL PRIMARY KEY,
     name       TEXT NOT NULL DEFAULT '',
     email      TEXT NOT NULL DEFAULT '',
     company    TEXT DEFAULT '',
     website    TEXT DEFAULT '',
     phone      TEXT DEFAULT '',
     message    TEXT DEFAULT '',
     source     TEXT DEFAULT '',
     user_agent TEXT DEFAULT '',
     created_at TIMESTAMPTZ NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC)`,
];

for (const stmt of STATEMENTS) {
  await sql.query(stmt);
  console.log('✓', stmt.split('\n')[0].trim().slice(0, 72));
}

const [{ count }] = await sql`SELECT count(*)::int AS count FROM posts`;
const [{ leads }] = await sql`SELECT count(*)::int AS leads FROM leads`;
console.log(`\n✓ Schema ready. ${count} post(s), ${leads} lead(s).`);
process.exit(0);
