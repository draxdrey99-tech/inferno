import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta, breadcrumbLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service',
  description:
    'The terms governing use of the Inferno Emails website and the free email audit offer.',
  path: '/terms',
});

const UPDATED = '30 August 2026';

export default function TermsPage() {
  return (
    <section className="shell inner-page" aria-labelledby="legal-title"><JsonLd data={breadcrumbLd([{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:'Terms of service',path:'/terms'}])}/>
        <nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>Legal</span></nav>
        <h1 id="legal-title" className="display-lg mt-6">Terms of <span className="hud-box">service</span></h1>
        <p className="mono-label mono-label-dot mt-5">
          Last updated {UPDATED}
        </p>

        <div className="prose-inferno mt-12 max-w-[68ch]">
          <p>
            These terms govern your use of this website. Client engagements are
            governed by a separate written agreement. Nothing on this site forms
            a contract for services.
          </p>

          <h2>Use of this site</h2>
          <p>
            You may read, share and link to anything published here. You may not
            copy the site’s design, code or written content for use in a competing
            commercial offering, or scrape it at a volume that degrades service
            for other visitors.
          </p>

          <h2>The free audit</h2>
          <p>
            The free email audit is offered at our discretion and carries no fee
            and no obligation on either side. We may decline to carry one out,
            for example where we do not believe we can help, or where a request is
            outside the kind of work we do. Findings are provided as professional
            opinion for your own use; acting on them is your decision.
          </p>

          <h2>No guarantee of results</h2>
          <p>
            Performance figures shown on this site are drawn from individual
            client accounts over the specific reporting windows stated alongside
            them. They are records of what happened for those brands, not
            averages, projections or promises. Email performance depends on your
            list, offer, category, pricing and sending history, and we make no
            guarantee that your results will resemble anyone else’s.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The {SITE.name} name, wordmark and site content are ours. Client work
            shown in the portfolio remains the property of the respective brands
            and is displayed as a record of work performed.
          </p>

          <h2>Third-party links</h2>
          <p>
            Where we link out to another site, we are not responsible for its
            content, its accuracy or its privacy practices.
          </p>

          <h2>Liability</h2>
          <p>
            This site is provided as-is. To the fullest extent permitted by law we
            exclude liability for any loss arising from reliance on information
            published here. Nothing in these terms limits liability for fraud or
            for anything else that cannot lawfully be limited.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms. The date at the top of the page reflects
            the current version.
          </p>

          <h2>Contact</h2>
          <p>
            Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
    </section>
  );
}
