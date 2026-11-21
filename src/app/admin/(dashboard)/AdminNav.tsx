'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/admin', label: 'Overview', icon: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z' },
  { href: '/admin/bookings', label: 'Bookings', icon: 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M7 3v4 M17 3v4 M3 11h18 M8 15h2 M14 15h2' },
  { href: '/admin/messages', label: 'Messages', icon: 'M4 4h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8l-5 3V5a1 1 0 0 1 1-1z M7 9h10 M7 13h6' },
  { href: '/admin/account', label: 'Account', icon: 'M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M4 21v-2a8 8 0 0 1 16 0v2' }
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Admin">
      {ITEMS.map(item => {
        const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>
            <svg className="admin-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon} /></svg><span>{item.label}</span>{active && <span className="admin-nav-dot" aria-hidden="true" />}
          </Link>
        );
      })}
    </nav>
  );
}
