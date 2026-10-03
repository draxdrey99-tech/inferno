import Link from 'next/link';

import AuditForm from '@/components/AuditForm';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Klaviyo Flow Coverage Checklist for Ecommerce Stores',
  description: 'A free checklist of the Klaviyo flows every ecommerce store should have running, what each one does and how to check yours is working.',
  path: '/flow-coverage-checklist',
  image: '/opengraph-image',
});

const FLOWS = [
  { name: 'Welcome flow', does: 'Introduces the brand and guides a new subscriber to a first order.', check: 'Three to five emails, a clear first step, and an exit once they buy.', href: '/glossary/welcome-flow' },
  { name: 'Abandoned cart', does: 'Reminds shoppers what they left and answers their doubts.', check: 'First email within hours, purchase exclusion in place, incentive used sparingly.', href: '/blog/abandoned-cart-email-flow-how-to-build' },
  { name: 'Browse abandonment', does: 'Follows up with people who viewed products but did not add to cart.', check: 'Triggers on product views and does not overlap with the cart flow.' },
  { name: 'Post-purchase', does: 'Confirms, educates and sets up the next order.', check: 'Care or usage guidance, a review request and a cross-sell, not just a receipt.' },
  { name: 'Replenishment', does: 'Reaches repeat-purchase products just before they run out.', check: 'Timed to your real repurchase interval for each product.' },
  { name: 'Winback', does: 'Re-engages customers who have gone quiet.', check: 'Triggers after the usual reorder window and ends with a suppression step.', href: '/glossary/winback-flow' },
  { name: 'Back in stock', does: 'Tells interested shoppers when a sold-out item returns.', check: 'Connected to your inventory events and only sent to people who asked.' },
  { name: 'VIP or loyalty', does: 'Treats your best customers differently.', check: 'A defined segment, with messaging that is more than a bigger discount.' },
  { name: 'Sunset or re-engagement', does: 'Cleans out people who never engage so reputation stays healthy.', check: 'A short series, then suppression, which protects deliverability.', href: '/glossary/email-deliverability' },
] as const;

export default function ChecklistPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Flow coverage checklist', path: '/flow-coverage-checklist' }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path: '/flow-coverage-checklist', name: 'Klaviyo flow coverage checklist', description: 'The flows every ecommerce store should have running.' })} />
      <section className="shell inner-page" aria-labelledby="ck-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Flow coverage checklist</span>
        </nav>
        <h1 id="ck-title" className="display-xl max-w-4xl">Klaviyo flow coverage checklist.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          Most ecommerce stores run two or three of the flows below and leave money on the table. Go through the list, tick off what you have, and look closely at anything that is missing or half-built.
        </p>

        <ol className="mt-14 space-y-8">
          {FLOWS.map((f, i) => (
            <li key={f.name} className="panel panel-grid p-6 md:p-8">
              <p className="section-index" aria-hidden="true">.{String(i + 1).padStart(2, '0')}.</p>
              <h2 className="display-md mt-3">{f.name}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone/85">{f.does}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute"><strong className="font-medium text-bone">Check:</strong> {f.check}</p>
              {'href' in f && <Link href={f.href} className="text-link mt-4 inline-block">Learn more</Link>}
            </li>
          ))}
        </ol>

        <div className="card panel-grid panel-corners mt-20 max-w-2xl p-7 md:p-10">
          <p className="eyebrow">Want a second pair of eyes?</p>
          <h2 className="display-md mt-5">We will check your account against this list.</h2>
          <p className="mt-2 text-[0.875rem] text-mute">
            Send your details and we will review your flows, list health and deliverability, then send the findings in writing. Free, no obligation.
          </p>
          <div className="mt-8"><AuditForm source="flow-checklist" /></div>
          <p className="mt-6 text-[0.875rem] text-mute">
            Or read about our <Link className="text-link" href="/services/email-flows">email flows service</Link> and the <Link className="text-link" href="/free-email-audit">full audit</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
