import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section>
      <div className="shell grid min-h-[70dvh] place-items-center py-32">
        <div className="panel panel-grid panel-corners max-w-xl px-8 py-14 text-center md:px-14">
          <p className="mono-label mono-label-dot notfound-index">Error 404</p>
          <h1 className="display-lg mt-6">
            This one <span className="accent">bounced.</span>
          </h1>
          <p className="lede mx-auto mt-6">
            The page you asked for is not here. It may have moved when we
            rebuilt the site.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/" className="btn btn-flame">
              Back to home
            </Link>
            <Link href="/blog" className="btn-line">
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
