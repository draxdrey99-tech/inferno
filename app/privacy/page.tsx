import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How Inferno Emails collects, uses and stores personal data submitted through this website.',
  path: '/privacy',
});

const UPDATED = '30 August 2026';

export default function PrivacyPage() {
  return (
    <section className="pt-24">
      <div className="shell pb-24 md:pb-32">
        <p className="eyebrow">Legal</p>
        <h1 className="display-lg mt-6">Privacy policy</h1>
        <p className="mt-5 text-[0.8125rem] uppercase tracking-[0.14em] text-mute">
          Last updated {UPDATED}
        </p>

        <div className="prose-inferno mt-12 max-w-[68ch]">
          <p>
            This policy explains what personal data {SITE.name} collects through
            this website, why we collect it, and what we do with it. It covers
            this site only, not the email programmes we run inside a client’s
            own sending platform, which are governed by that client’s policy.
          </p>

          <h2>What we collect</h2>
          <p>
            We collect only what you type into a form on this site. That means
            your name, business email address, company name, store URL, optional
            phone number and whatever you write in the message field. We also
            store the browser user-agent string attached to the submission, which
            helps us filter automated spam.
          </p>
          <p>
            We do not run advertising trackers, we do not sell or rent data to
            anyone, and we do not enrich your submission against third-party
            databases.
          </p>

          <h2>Why we collect it</h2>
          <p>
            To reply to you and, where you have asked for one, to prepare and send
            your free email audit. The lawful basis is your consent, given when
            you submit the form, and our legitimate interest in responding to
            business enquiries.
          </p>

          <h2>Where it is stored</h2>
          <p>
            Form submissions are stored in a Postgres database hosted by Neon and
            served through Vercel. Both are processors acting on our instructions.
            Data may be processed in the United States and the European Union.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries are kept for up to 24 months so we can pick up a
            conversation where it left off, then deleted. Ask us sooner and we
            will delete it sooner.
          </p>

          <h2>Cookies</h2>
          <p>
            This site sets no advertising or analytics cookies. The only cookie we
            set is a session cookie for the private content management area, which
            is used by our own team and never by site visitors.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us for a copy of the data we hold about you, ask us to
            correct it, or ask us to delete it. Email{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will action it
            within 30 days. If you are in the UK or EU and are unhappy with our
            response, you have the right to complain to your local data protection
            authority.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes we will update the date at the top of this
            page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
