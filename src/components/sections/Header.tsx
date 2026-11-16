'use client';

import { useState, useEffect, useRef } from 'react';
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
  const headerRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (!mobileOpen) return;

    const header = headerRef.current;
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const previousRootOverflow = document.documentElement.style.overflow;
    const updateNavPosition = () => {
      if (header) {
        header.style.setProperty('--mobile-nav-top', `${header.getBoundingClientRect().bottom}px`);
      }
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    updateNavPosition();
    window.addEventListener('resize', updateNavPosition);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      document.documentElement.style.overflow = previousRootOverflow;
      header?.style.removeProperty('--mobile-nav-top');
      window.removeEventListener('resize', updateNavPosition);
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

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

      <header ref={headerRef} className={cn('header', scrolled && 'scrolled', mobileOpen && 'menu-active')} role="banner">
        <div className="wrap header-wrap">
          <Link href="/" className="brand" aria-label="Resilio by IshIra, home" onClick={() => setMobileOpen(false)}>
            <span className="mk" aria-hidden="true"><span></span></span>
            <span><b>Resilio</b><small>by IshIra</small></span>
          </Link>

          <nav className={cn('nav', mobileOpen && 'open')} id="mainnav" aria-label="Main">
            <div className="mobile-nav-inner">
              <ul className="nav-list">
                {navItems.map(item => {
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={active ? 'active' : ''}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{item.label}</span>
                        <svg className="nav-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
                <li className="m-only">
                  <Link href="/contact/" onClick={() => setMobileOpen(false)}>
                    <span>Contact</span>
                    <svg className="nav-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
                <li className="m-only">
                  <Link href="/careers/" onClick={() => setMobileOpen(false)}>
                    <span>Careers</span>
                    <svg className="nav-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
              </ul>

              <div className="mobile-nav-footer">
                <Link className="btn mobile-book-btn" href="/booking/" onClick={() => setMobileOpen(false)}>
                  <span>Book a session</span>
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <div className="mobile-nav-contacts">
                  <a href={`tel:${settings.phone_e164}`} className="mobile-contact-link">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{settings.phone_display}</span>
                  </a>
                  <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="mobile-contact-link">
                    <span>WhatsApp us</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className="header-actions">
            <button
              className="menu"
              id="menuToggle"
              aria-expanded={mobileOpen}
              aria-controls="mainnav"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>Close</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  <span>Menu</span>
                </>
              )}
            </button>

            <Link className="btn header-book-btn" href="/booking/">
              Book a session
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}