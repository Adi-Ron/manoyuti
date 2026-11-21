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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lockedScrollYRef = useRef<number | null>(null);
  const restoreFocusRef = useRef(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuHeaderHeight, setMenuHeaderHeight] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled((lockedScrollYRef.current ?? window.scrollY) > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    restoreFocusRef.current = false;
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 1020px)');
    const closeOnDesktop = () => {
      if (!mobile.matches) {
        restoreFocusRef.current = true;
        setMobileOpen(false);
      }
    };
    mobile.addEventListener('change', closeOnDesktop);
    return () => mobile.removeEventListener('change', closeOnDesktop);
  }, []);

  const closeMenu = (restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen || !window.matchMedia('(max-width: 1020px)').matches) return;

    const header = headerRef.current;
    if (!header) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollY = lockedScrollYRef.current ?? window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const previousRootOverflow = document.documentElement.style.overflow;
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer, .skip'))
      .filter(element => !header.contains(element))
      .map(element => ({ element, inert: element.inert }));
    const updateNavPosition = () => {
      const height = header.getBoundingClientRect().height;
      header.style.setProperty('--mobile-nav-top', `${height}px`);
      setMenuHeaderHeight(height);
    };
    const focusable = () => Array.from(header.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter(element => element.getClientRects().length > 0 && !element.inert);
    const focusNavigation = () => (header.querySelector<HTMLElement>('.nav a[href]') ?? menuButtonRef.current)?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        restoreFocusRef.current = true;
        setMobileOpen(false);
      } else if (event.key === 'Tab') {
        const elements = focusable();
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && (document.activeElement === first || !header.contains(document.activeElement))) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !header.contains(document.activeElement))) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const handleFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !header.contains(event.target)) focusNavigation();
    };

    lockedScrollYRef.current = scrollY;
    background.forEach(({ element }) => { element.inert = true; });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    updateNavPosition();
    const headerObserver = new ResizeObserver(updateNavPosition);
    headerObserver.observe(header);
    const focusFrame = window.requestAnimationFrame(focusNavigation);
    window.addEventListener('resize', updateNavPosition);
    window.visualViewport?.addEventListener('resize', updateNavPosition);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocus);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      headerObserver.disconnect();
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus);
      window.visualViewport?.removeEventListener('resize', updateNavPosition);
      background.forEach(({ element, inert }) => { element.inert = inert; });
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      document.documentElement.style.overflow = previousRootOverflow;
      header?.style.removeProperty('--mobile-nav-top');
      window.removeEventListener('resize', updateNavPosition);
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      lockedScrollYRef.current = null;
      if (restoreFocusRef.current) {
        const target = previousFocus?.isConnected && previousFocus.getClientRects().length
          ? previousFocus
          : header.querySelector<HTMLElement>('.brand');
        target?.focus({ preventScroll: true });
      }
    };
  }, [mobileOpen]);

  return (
    <>
      {mobileOpen && <div className="header-menu-placeholder" style={{ height: menuHeaderHeight }} aria-hidden="true" />}
      <header ref={headerRef} className={cn('header', scrolled && 'scrolled', mobileOpen && 'menu-active')} role="banner">
        <div className="wrap header-wrap">
          <Link href="/" className="brand" aria-label="Manoyuti, home" onClick={() => closeMenu(false)}>
            <span className="mk" aria-hidden="true"><span></span></span>
            <span><b>Manoyuti</b><small>Psychology &amp; care</small></span>
          </Link>

          <nav className={cn('nav', mobileOpen && 'open')} id="mainnav" aria-label="Main">
            <div className="mobile-nav-inner">
              <ul className="nav-list">
                {navItems.map(item => {
                  const itemPath = item.href.replace(/\/$/, '');
                  const active = pathname === itemPath || pathname.startsWith(`${itemPath}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={active ? 'active' : ''}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => closeMenu(false)}
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
                  <Link href="/contact/" onClick={() => closeMenu(false)}>
                    <span>Contact</span>
                    <svg className="nav-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
                <li className="m-only">
                  <Link href="/careers/" onClick={() => closeMenu(false)}>
                    <span>Careers</span>
                    <svg className="nav-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
              </ul>

              <div className="mobile-nav-footer">
                <Link className="btn mobile-book-btn" href="/booking/" onClick={() => closeMenu(false)}>
                  <span>Book a session</span>
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </nav>

          <div className="header-actions">
            <button
              ref={menuButtonRef}
              type="button"
              className="menu"
              id="menuToggle"
              aria-expanded={mobileOpen}
              aria-controls="mainnav"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => {
                restoreFocusRef.current = true;
                if (!mobileOpen) {
                  lockedScrollYRef.current = window.scrollY;
                  setMenuHeaderHeight(headerRef.current?.getBoundingClientRect().height ?? 0);
                }
                setMobileOpen(open => !open);
              }}
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
