'use client';

import { usePathname } from 'next/navigation';

/** Keep interior refinements isolated from the approved home page. */
export function InteriorPages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className={pathname === '/' ? undefined : 'interior-pages'}>{children}</div>;
}
