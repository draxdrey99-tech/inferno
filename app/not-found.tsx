import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="">
      <div className="shell grid min-h-[70dvh] place-items-center py-32">
        <div className="max-w-xl text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="display-lg mt-6">
            This one <span className="accent">bounced.</span>
          </h1>
          <p className="lede mx-auto mt-6">
            The page you asked for is not here. It may have moved when we
            rebuilt the site.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-flame">
              Back to home
              <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
            </Link>
            <Link href="/blog" className="btn btn-ghost">
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
