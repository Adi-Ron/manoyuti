'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { SiteSettings } from '@/lib/site-settings';

const navItems = [
  { href: '/therapy/', label: 'Therapy' },
  { href: '/research/', label: 'Research' },
  { href: '/training/', label: 'Training' },
  { href: '/organisations/', label: 'Organisations' },
  { href: '/blog/', label: 'Blog' },
  { href: '/about/', label: 'About' },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="topbar" role="region" aria-label="Crisis helpline and direct contact">
        <div className="wrap topbar-inner">
          <div className="topbar-crisis">
            <span className="topbar-pulse" aria-hidden="true">
              <span className="topbar-dot" />
            </span>
            <span className="topbar-label">{settings.crisis_text}</span>
            <a href={`tel:${settings.crisis_phone}`} className="topbar-pill" aria-label={`Call Tele-MANAS helpline on ${settings.crisis_phone}`}>
              <svg className="topbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <strong>{settings.crisis_phone}</strong>
            </a>
            <span className="topbar-sub">Toll-free · 24/7 across India</span>
          </div>

          <div className="topbar-contacts">
            <a href={`tel:${settings.phone_e164}`} className="topbar-contact-item">
              <svg className="topbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{settings.phone_display}</span>
            </a>
            <span className="topbar-divider" aria-hidden="true">·</span>
            <a href={`mailto:${settings.email}`} className="topbar-contact-item">
              <svg className="topbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{settings.email}</span>
            </a>
          </div>
        </div>
      </div>

      <header className={cn('header', scrolled && 'scrolled')} role="banner">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Resilio by IshIra, home">
            <span className="mk" aria-hidden="true"><span></span></span>
            <span><b>Resilio</b><small>by IshIra</small></span>
          </Link>

          <nav className={cn('nav', mobileOpen && 'open')} id="mainnav" aria-label="Main">
            <ul>
              {navItems.map(item => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="m-only"><Link href="/contact/">Contact</Link></li>
              <li className="m-only"><Link href="/careers/">Careers</Link></li>
            </ul>
          </nav>

          <button className="menu" id="menuToggle" aria-expanded={mobileOpen} aria-controls="mainnav" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? 'Close' : 'Menu'}
          </button>

          <Link className="btn" href="/booking/">Book a session</Link>
        </div>
      </header>
    </>
  );
}