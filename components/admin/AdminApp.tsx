'use client';

import { useCallback, useEffect, useState } from 'react';
import Editor from './Editor';

/* ------------------------------------------------------------------ *
 * Types & helpers
 * ------------------------------------------------------------------ */

type Faq = { q: string; a: string };

type Draft = {
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string;
  cover_image_alt: string;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
  canonical_url: string;
  custom_jsonld: string;
  faqs: Faq[];
  tags: string[];
  author: string;
  status: 'draft' | 'published';
};

type PostRow = {
  slug: string;
  title: string;
  status: string;
  published_at: string | null;
  updated_at: string;
  reading_minutes: number;
};

const EMPTY: Draft = {
  slug: '',
  title: '',
  excerpt: '',
  content_html: '',
  cover_image_url: '',
  cover_image_alt: '',
  meta_title: '',
  meta_description: '',
  og_image_url: '',
  canonical_url: '',
  custom_jsonld: '',
  faqs: [],
  tags: [],
  author: 'Inferno Emails',
  status: 'draft',
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/['"]/g, '').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 80);

const FIELD =
  'w-full rounded-md border border-white/12 bg-ink px-3.5 py-2.5 text-[0.9375rem] text-bone outline-none transition-colors placeholder:text-mute/50 focus:border-flame';
const LABEL =
  'block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-mute';

/** Green / amber / red against Google's practical truncation limits. */
function Counter({ value, min, max }: { value: number; min: number; max: number }) {
  const tone =
    value === 0 ? 'text-mute/60'
      : value < min ? 'text-amber-400'
      : value > max ? 'text-flame'
      : 'text-emerald-400';
  return (
    <span className={`text-[0.75rem] tabular-nums ${tone}`}>
      {value}/{max}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Login
 * ------------------------------------------------------------------ */

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-[70vh] place-items-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-white/10 bg-ink-raised p-8">
        <p className="eyebrow">Inferno Emails</p>
        <h1 className="display-md mt-4">Content admin</h1>
        <label htmlFor="password" className={`${LABEL} mt-8`}>Password</label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${FIELD} mt-2.5`}
        />
        {error && <p role="alert" className="mt-3 text-[0.8125rem] text-flame">{error}</p>}
        <button type="submit" disabled={busy} className="btn btn-flame mt-6 w-full disabled:opacity-60">
          {busy ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

export default function AdminApp({ authed }: { authed: boolean }) {
  const [isAuthed, setIsAuthed] = useState(authed);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/posts');
      if (res.status === 401) {
        setIsAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load posts');
      setPosts(data.posts || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Starts the authenticated remote query; load owns its async loading state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isAuthed) load();
  }, [isAuthed, load]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  if (!isAuthed) return <Login onDone={() => setIsAuthed(true)} />;

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));

  async function edit(slug: string) {
    setError('');
    const res = await fetch(`/api/admin/posts/${slug}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Could not open post');
      return;
    }
    setDraft({ ...EMPTY, ...data.post, faqs: data.post.faqs || [], tags: data.post.tags || [] });
    window.scrollTo({ top: 0 });
  }

  async function save(status: 'draft' | 'published') {
    if (!draft) return;
    if (!draft.title.trim()) {
      setError('Title is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...draft,
          status,
          slug: draft.slug || slugify(draft.title),
          source_format: 'html',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setNotice(status === 'published' ? 'Published — live now.' : 'Draft saved.');
      await load();
      setDraft((d) => (d ? { ...d, status, slug: data.post?.slug || d.slug } : d));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function remove(slug: string) {
    if (!window.confirm(`Delete “${slug}” permanently? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Delete failed');
      return;
    }
    setNotice('Deleted.');
    if (draft?.slug === slug) setDraft(null);
    load();
  }

  async function uploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Upload failed');
      return;
    }
    set('cover_image_url', data.url);
  }

  return (
    <div className="shell py-10">
      {/* ------------------------------------------------------- header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="eyebrow">Inferno Emails</p>
          <h1 className="display-md mt-3">Content admin</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setDraft({ ...EMPTY })}
            className="btn btn-flame px-5 py-2.5 text-[0.8125rem]"
          >
            New post
          </button>
          <button
            type="button"
            onClick={async () => {
              await fetch('/api/admin/logout', { method: 'POST' });
              setIsAuthed(false);
            }}
            className="btn btn-ghost px-5 py-2.5 text-[0.8125rem]"
          >
            Sign out
          </button>
        </div>
      </div>

      {notice && (
        <p role="status" className="mt-5 rounded-md border border-emerald-500/40 bg-emerald-500/8 px-4 py-3 text-[0.875rem] text-emerald-300">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-5 rounded-md border border-flame/40 bg-flame/8 px-4 py-3 text-[0.875rem] text-flame">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[19rem_minmax(0,1fr)]">
        {/* ------------------------------------------------------ list */}
        <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto">
          <p className={LABEL}>Posts ({posts.length})</p>
          {loading && <p className="mt-4 text-[0.875rem] text-mute">Loading…</p>}
          <ul className="mt-4 space-y-1.5">
            {posts.map((p) => (
              <li key={p.slug}>
                <div
                  className={`group rounded-md border px-3.5 py-3 transition-colors ${
                    draft?.slug === p.slug
                      ? 'border-flame/50 bg-flame/6'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => edit(p.slug)}
                    className="block w-full text-left"
                  >
                    <span className="line-clamp-2 text-[0.875rem] font-medium text-bone">
                      {p.title}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em]">
                      <span className={p.status === 'published' ? 'text-emerald-400' : 'text-amber-400'}>
                        {p.status}
                      </span>
                      <span className="text-mute/60">{p.reading_minutes} min</span>
                    </span>
                  </button>
                  <div className="mt-2 flex gap-3 text-[0.6875rem] uppercase tracking-[0.12em]">
                    <a
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-mute hover:text-bone"
                    >
                      View
                    </a>
                    <button
                      type="button"
                      onClick={() => remove(p.slug)}
                      className="text-mute hover:text-flame"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {!loading && posts.length === 0 && (
            <p className="mt-4 text-[0.875rem] text-mute">
              No posts yet. Hit “New post”.
            </p>
          )}
        </aside>

        {/* ---------------------------------------------------- editor */}
        <div className="min-w-0">
          {!draft ? (
            <div className="rounded-xl border border-white/10 bg-ink-raised p-10">
              <h2 className="display-md">Pick a post, or start a new one.</h2>
              <p className="lede mt-4 text-[0.9375rem]">
                Every field that affects search is on this screen — meta title,
                description, canonical, FAQs and structured data. Publishing
                pushes the page live and updates the sitemap immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* Core */}
              <section className="rounded-xl border border-white/10 bg-ink-raised p-6 md:p-8">
                <h2 className="font-display text-lg tracking-tight">Post</h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="title" className={LABEL}>Title</label>
                    <input
                      id="title"
                      value={draft.title}
                      onChange={(e) => {
                        const t = e.target.value;
                        setDraft((d) =>
                          d
                            ? {
                                ...d,
                                title: t,
                                // Auto-slug only until the post has been saved once.
                                slug: d.status === 'published' ? d.slug : slugify(t),
                              }
                            : d
                        );
                      }}
                      className={`${FIELD} mt-2.5`}
                      placeholder="How to fix a Klaviyo welcome flow that earns nothing"
                    />
                  </div>

                  <div>
                    <label htmlFor="slug" className={LABEL}>URL slug</label>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="shrink-0 text-[0.875rem] text-mute">/blog/</span>
                      <input
                        id="slug"
                        value={draft.slug}
                        onChange={(e) => set('slug', slugify(e.target.value))}
                        className={FIELD}
                      />
                    </div>
                    <p className="mt-2 text-[0.75rem] text-mute/70">
                      Changing this on a live post breaks its existing links. Add a
                      redirect in next.config.ts if you do.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="excerpt" className={LABEL}>Excerpt</label>
                      <Counter value={draft.excerpt.length} min={80} max={160} />
                    </div>
                    <textarea
                      id="excerpt"
                      rows={2}
                      value={draft.excerpt}
                      onChange={(e) => set('excerpt', e.target.value)}
                      className={`${FIELD} mt-2.5 resize-y`}
                      placeholder="Shown on the blog index and used as the meta description if you leave that blank."
                    />
                  </div>
                </div>
              </section>

              {/* Body */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-display text-lg tracking-tight">Content</h2>
                  <p className="text-[0.75rem] text-mute">
                    Use H2 for sections — they become the table of contents.
                  </p>
                </div>
                <Editor
                  value={draft.content_html}
                  onChange={(html) => set('content_html', html)}
                />
              </section>

              {/* SEO */}
              <section className="rounded-xl border border-white/10 bg-ink-raised p-6 md:p-8">
                <h2 className="font-display text-lg tracking-tight">Search</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="meta_title" className={LABEL}>Meta title</label>
                      <Counter value={draft.meta_title.length} min={30} max={60} />
                    </div>
                    <input
                      id="meta_title"
                      value={draft.meta_title}
                      onChange={(e) => set('meta_title', e.target.value)}
                      className={`${FIELD} mt-2.5`}
                      placeholder="Defaults to the post title"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="meta_description" className={LABEL}>Meta description</label>
                      <Counter value={draft.meta_description.length} min={120} max={158} />
                    </div>
                    <textarea
                      id="meta_description"
                      rows={2}
                      value={draft.meta_description}
                      onChange={(e) => set('meta_description', e.target.value)}
                      className={`${FIELD} mt-2.5 resize-y`}
                      placeholder="Defaults to the excerpt"
                    />
                  </div>

                  <div>
                    <label htmlFor="canonical_url" className={LABEL}>Canonical URL</label>
                    <input
                      id="canonical_url"
                      value={draft.canonical_url}
                      onChange={(e) => set('canonical_url', e.target.value)}
                      className={`${FIELD} mt-2.5`}
                      placeholder="Only if this was published elsewhere first"
                    />
                  </div>

                  <div>
                    <label htmlFor="og_image_url" className={LABEL}>Social image URL</label>
                    <input
                      id="og_image_url"
                      value={draft.og_image_url}
                      onChange={(e) => set('og_image_url', e.target.value)}
                      className={`${FIELD} mt-2.5`}
                      placeholder="Blank = auto-generated card"
                    />
                  </div>

                  <div>
                    <label htmlFor="tags" className={LABEL}>Tags (comma separated)</label>
                    <input
                      id="tags"
                      value={draft.tags.join(', ')}
                      onChange={(e) =>
                        set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))
                      }
                      className={`${FIELD} mt-2.5`}
                      placeholder="klaviyo, deliverability"
                    />
                  </div>

                  <div>
                    <label htmlFor="author" className={LABEL}>Author</label>
                    <input
                      id="author"
                      value={draft.author}
                      onChange={(e) => set('author', e.target.value)}
                      className={`${FIELD} mt-2.5`}
                    />
                    <p className="mt-2 text-[0.75rem] text-mute/70">
                      A real person’s name emits Person schema — better for E-E-A-T
                      than the company byline.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cover */}
              <section className="rounded-xl border border-white/10 bg-ink-raised p-6 md:p-8">
                <h2 className="font-display text-lg tracking-tight">Cover image</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="cover_image_url" className={LABEL}>Image URL</label>
                    <input
                      id="cover_image_url"
                      value={draft.cover_image_url}
                      onChange={(e) => set('cover_image_url', e.target.value)}
                      className={`${FIELD} mt-2.5`}
                    />
                    <label className="mt-3 inline-block cursor-pointer text-[0.8125rem] text-flame hover:underline">
                      Upload an image
                      <input type="file" accept="image/*" onChange={uploadCover} className="hidden" />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="cover_image_alt" className={LABEL}>Alt text</label>
                    <input
                      id="cover_image_alt"
                      value={draft.cover_image_alt}
                      onChange={(e) => set('cover_image_alt', e.target.value)}
                      className={`${FIELD} mt-2.5`}
                      placeholder="Describe the image, don't stuff keywords"
                    />
                  </div>
                </div>
                {draft.cover_image_url && (
                  // Blob URLs are arbitrary at edit time; next/image is not worth
                  // the config churn inside the CMS preview.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={draft.cover_image_url}
                    alt=""
                    className="mt-6 aspect-[16/9] w-full max-w-md rounded-lg border border-white/10 object-cover"
                  />
                )}
              </section>

              {/* FAQs */}
              <section className="rounded-xl border border-white/10 bg-ink-raised p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg tracking-tight">FAQs</h2>
                  <button
                    type="button"
                    onClick={() => set('faqs', [...draft.faqs, { q: '', a: '' }])}
                    className="btn btn-ghost px-4 py-2 text-[0.8125rem]"
                  >
                    Add question
                  </button>
                </div>
                <p className="mt-2 text-[0.8125rem] text-mute">
                  Rendered as an accordion and emitted as FAQPage schema — this is
                  what wins the expandable results in Google.
                </p>

                <div className="mt-6 space-y-4">
                  {draft.faqs.map((f, i) => (
                    <div key={i} className="rounded-md border border-white/10 p-4">
                      <input
                        value={f.q}
                        onChange={(e) => {
                          const next = [...draft.faqs];
                          next[i] = { ...next[i], q: e.target.value };
                          set('faqs', next);
                        }}
                        placeholder="Question"
                        className={FIELD}
                      />
                      <textarea
                        rows={2}
                        value={f.a}
                        onChange={(e) => {
                          const next = [...draft.faqs];
                          next[i] = { ...next[i], a: e.target.value };
                          set('faqs', next);
                        }}
                        placeholder="Answer (plain text)"
                        className={`${FIELD} mt-2.5 resize-y`}
                      />
                      <button
                        type="button"
                        onClick={() => set('faqs', draft.faqs.filter((_, j) => j !== i))}
                        className="mt-2.5 text-[0.75rem] uppercase tracking-[0.12em] text-mute hover:text-flame"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {draft.faqs.length === 0 && (
                    <p className="text-[0.875rem] text-mute/70">No FAQs on this post.</p>
                  )}
                </div>
              </section>

              {/* Advanced */}
              <details className="rounded-xl border border-white/10 bg-ink-raised p-6 md:p-8">
                <summary className="cursor-pointer font-display text-lg tracking-tight">
                  Custom structured data
                </summary>
                <p className="mt-3 text-[0.8125rem] text-mute">
                  Optional JSON-LD merged in alongside the automatic BlogPosting,
                  Breadcrumb and FAQ schema. One object, or an array of objects.
                </p>
                <textarea
                  rows={8}
                  value={draft.custom_jsonld}
                  onChange={(e) => set('custom_jsonld', e.target.value)}
                  spellCheck={false}
                  className={`${FIELD} mt-4 resize-y font-mono text-[0.8125rem]`}
                  placeholder='{ "@context": "https://schema.org", "@type": "HowTo", ... }'
                />
              </details>

              {/* Actions */}
              <div className="sticky bottom-0 -mx-5 flex flex-wrap items-center gap-3 border-t border-white/10 bg-ink/95 px-5 py-4 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => save('published')}
                  disabled={saving}
                  className="btn btn-flame disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Publish'}
                </button>
                <button
                  type="button"
                  onClick={() => save('draft')}
                  disabled={saving}
                  className="btn btn-ghost disabled:opacity-60"
                >
                  Save draft
                </button>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="text-[0.8125rem] uppercase tracking-[0.12em] text-mute hover:text-bone"
                >
                  Close
                </button>
                <span className="ml-auto text-[0.75rem] uppercase tracking-[0.12em] text-mute">
                  {draft.status}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
