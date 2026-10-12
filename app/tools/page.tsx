import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Free Email Deliverability Tools',
  description: 'Free tools for ecommerce senders: a DMARC record generator and an SPF record checker that counts DNS lookups. No signup needed.',
  path: '/tools',
  image: '/opengraph-image',
});

const TOOLS = [
  { href: '/tools/dmarc-record-generator', name: 'DMARC record generator', body: 'Choose a policy, a reporting address and alignment, then copy a record that is ready to publish in DNS.' },
  { href: '/tools/spf-record-checker', name: 'SPF record checker', body: 'Look up a domain, read its SPF record and see how many of the ten allowed DNS lookups it uses.' },
];

export default function ToolsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/tools', name: 'Free email deliverability tools', description: 'DMARC and SPF tools for ecommerce senders.' })} />
      <section className="shell inner-page" aria-labelledby="tools-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Tools</span>
        </nav>
        <h1 id="tools-title" className="display-xl max-w-4xl">Free email tools.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          Small, working tools for the authentication records that decide whether your Klaviyo emails reach the inbox. Nothing to sign up for, and nothing you enter is stored.
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.href} className="panel panel-grid p-6 md:p-8">
              <h2 className="display-md">{t.name}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-bone/80">{t.body}</p>
              <Link className="text-link mt-5 inline-block" href={t.href}>Open the tool</Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-[0.95rem] text-bone/75">
          Want someone to check the whole setup, including DKIM and your sending reputation? See{' '}
          <Link className="text-link" href="/services/email-deliverability">email deliverability</Link> or{' '}
          <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
