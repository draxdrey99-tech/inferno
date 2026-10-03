import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, faqLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Email Marketing Agency vs In-House: How to Choose',
  description: 'Hiring an email marketing agency or building in-house? A side-by-side comparison of speed, cost structure, skills and control for ecommerce brands.',
  path: '/email-agency-vs-in-house',
  image: '/opengraph-image',
});

const ROWS = [
  ['Speed to start', 'Weeks, because the process and templates already exist', 'Months: hire, onboard, build the tooling'],
  ['Cost structure', 'A scoped monthly fee, quoted after an audit', 'Salary, tools and management time, fixed whether the work is busy or not'],
  ['Skills covered', 'Strategy, design, build and deliverability across many accounts', 'Whatever the hires cover; gaps usually appear in design or deliverability'],
  ['Brand knowledge', 'Learned during onboarding, depends on access to your team', 'Deep and immediate'],
  ['Flexibility', 'Scale scope up or down as the programme changes', 'Slower to change headcount'],
  ['Best when', 'You want the channel running properly without a full team', 'Email is large enough to justify a dedicated team'],
] as const;

const FAQS = [
  { q: 'Is an email agency better than hiring in-house?', a: 'It depends on scale. An agency suits brands that want the full skill set without hiring a team; in-house suits brands where email is large enough to justify dedicated staff. Many brands start with an agency and add in-house later.' },
  { q: 'Can an agency work alongside an in-house team?', a: 'Yes. A common setup is in-house strategy with agency design and build capacity, or the reverse. Scope is agreed up front.' },
  { q: 'How much does an email marketing agency cost?', a: 'It depends on scope, such as flow build only, full management, or design alongside your team. We quote after the free audit rather than guess.' },
] as const;

export default function VsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Agency vs in-house', path: '/email-agency-vs-in-house' }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path: '/email-agency-vs-in-house', name: 'Email marketing agency vs in-house', description: 'A comparison of hiring an email agency and building an in-house team.' })} />
      <JsonLd data={faqLd(FAQS)} />
      <section className="shell inner-page" aria-labelledby="vs-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Agency vs in-house</span>
        </nav>
        <h1 id="vs-title" className="display-xl max-w-4xl">Email marketing agency vs in-house.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          Choose an agency if you want the whole email channel running properly without building a team. Choose in-house if email is already large enough to justify dedicated staff. Many brands start with an agency and add in-house capacity later.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">Agency compared with in-house</caption>
            <thead>
              <tr className="border-b border-white/15 text-mute">
                <th scope="col" className="py-3 pr-6 font-normal">&nbsp;</th>
                <th scope="col" className="py-3 pr-6 font-normal">Agency</th>
                <th scope="col" className="py-3 font-normal">In-house</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, a, h]) => (
                <tr key={k} className="border-b border-white/10 align-top">
                  <th scope="row" className="py-4 pr-6 font-medium">{k}</th>
                  <td className="py-4 pr-6 text-bone/85">{a}</td>
                  <td className="py-4 text-bone/85">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="display-lg mt-20">Questions.</h2>
        <div className="mt-8"><Faq items={FAQS} /></div>
        <p className="lede mt-10">
          See <Link className="text-link" href="/services">what we do</Link> or{' '}
          <Link className="text-link" href="/free-email-audit">book a free audit</Link> and we will tell you which route fits.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
