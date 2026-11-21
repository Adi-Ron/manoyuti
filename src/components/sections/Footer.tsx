import Link from 'next/link';
import type { SiteSettings } from '@/lib/site-settings';

const EXPLORE = [
  { href: '/therapy/', label: 'Therapy' },
  { href: '/research/', label: 'Research' },
  { href: '/training/', label: 'Training' },
  { href: '/organisations/', label: 'Organisations' },
  { href: '/blog/', label: 'Blog' }
];

const PRACTICE = [
  { href: '/booking/', label: 'Book a session' },
  { href: '/about/', label: 'About us' },
  { href: '/careers/', label: 'Careers' },
  { href: '/contact/', label: 'Contact' },
  { href: '/policies/', label: 'Policies' }
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Link href="/" className="brand" aria-label="Manoyuti, home">
              <span className="mk" aria-hidden="true"><span></span></span>
              <span><b>Manoyuti</b><small>Psychology &amp; care</small></span>
            </Link>
            <p>Evidence-based psychotherapy, psychology research and training, in Bengaluru and online across India.</p>
          </div>

          <nav aria-label="Explore">
            <h2>Explore</h2>
            <ul>
              {EXPLORE.map(item => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Practice">
            <h2>Practice</h2>
            <ul>
              {PRACTICE.map(item => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

            <nav aria-label="Location">
              <h2>Location</h2>
              <ul>
                <li>{settings.location}</li>
              </ul>
            </nav>
        </div>

        <div className="foot-bottom">
          <p className="foot-crisis">
            Manoyuti is not an emergency service. {settings.crisis_text}{' '}
            <a href={`tel:${settings.crisis_phone}`}>{settings.crisis_phone}</a> (free, 24/7) or go to your nearest hospital.
          </p>
          <div className="legal">
            <span>© 2026 Manoyuti. All rights reserved.</span>
            <span>
              <Link href="/policies/#privacy">Privacy policy</Link> · <Link href="/policies/#cancellation">Cancellation policy</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
