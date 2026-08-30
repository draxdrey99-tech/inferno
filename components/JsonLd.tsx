import { jsonLdScript } from '@/lib/seo';

/** Emits a JSON-LD block. Server-rendered so crawlers see it in the HTML. */
export default function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
