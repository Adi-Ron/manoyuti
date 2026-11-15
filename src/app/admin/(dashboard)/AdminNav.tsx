'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/perception', label: 'Perception' },
  { href: '/admin/settings', label: 'Site settings' },
  { href: '/admin/account', label: 'Account' }
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Admin">
      {ITEMS.map(item => {
        const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
