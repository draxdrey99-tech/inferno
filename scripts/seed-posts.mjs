/**
 * Loads content/posts/*.md into the posts table as DRAFTS.
 *   node scripts/seed-posts.mjs
 * Reads DATABASE_URL from the environment or .env.local. Existing slugs are
 * left untouched (nothing is overwritten), and nothing is published: review
 * each draft in /admin and publish it from there.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

try {
  const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {}

const CONN = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
if (!CONN) {
  console.error('No DATABASE_URL found. Run: vercel env pull .env.local');
  process.exit(1);
}
const sql = neon(CONN);

const clean = (html) =>
  sanitizeHtml(html, {
    allowedTags: ['h2', 'h3', 'h4', 'p', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'br', 'table', 'thead', 'tbody', 'tr', 'td', 'th'],
    allowedAttributes: { a: ['href', 'title'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: { h1: 'h2' },
  });

const dir = new URL('../content/posts/', import.meta.url);
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const raw = readFileSync(new URL(file, dir), 'utf8');
  const [, front, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = Object.fromEntries(front.split('\n').map((l) => [l.slice(0, l.indexOf(':')).trim(), l.slice(l.indexOf(':') + 1).trim()]));
  const html = clean(marked.parse(body));
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const rows = await sql`
    INSERT INTO posts (slug, title, excerpt, content_html, content_md, source_format,
      meta_title, meta_description, tags, author, status, reading_minutes, faqs)
    VALUES (${meta.slug}, ${meta.title}, ${meta.excerpt}, ${html}, ${body}, 'markdown',
      ${meta.title}, ${meta.meta_description}, ${meta.tags.split(',').map((t) => t.trim())},
      'Inferno Emails', 'draft', ${Math.max(1, Math.round(words / 200))}, '[]'::jsonb)
    ON CONFLICT (slug) DO NOTHING
    RETURNING slug`;
  console.log(rows.length ? `+ draft  ${meta.slug}` : `= exists ${meta.slug}`);
}
