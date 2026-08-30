'use client';

import { usePathname } from 'next/navigation';

/**
 * Keeps the marketing nav and footer off the CMS. Server components are
 * passed straight through as children, so Nav/Footer stay server-rendered
 * for every public route.
 */
export default function HideOnAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
