import type { Metadata } from 'next';

// Belt and braces alongside robots.ts — the CMS must never be indexed.
export const metadata: Metadata = {
  title: 'Content admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
