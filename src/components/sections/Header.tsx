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
      <header ref={headerRef} className={cn('header', scrolled && 'scrolled', mobileOpen && 'menu-active')} role="banner">
        <div className="wrap header-wrap">
          <Link href="/" className="brand" aria-label="Manoyuti, home" onClick={() => setMobileOpen(false)}>
            <span className="mk" aria-hidden="true"><span></span></span>
            <span><b>Manoyuti</b><small>Psychology &amp; care</small></span>
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
