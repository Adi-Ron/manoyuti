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
            <Link href="/" className="brand" aria-label="Resilio by IshIra, home">
              <span className="mk" aria-hidden="true"><span></span></span>
              <span><b>Resilio</b><small>by IshIra</small></span>
            </Link>
            <p>Evidence-based psychotherapy, psychology research and training, in Bengaluru and online across India.</p>
            <Link className="btn light" href="/booking/">
              Book a session <span className="arr" aria-hidden="true">→</span>
            </Link>
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

          <nav aria-label="Contact">
            <h2>Contact</h2>
            <ul>
              <li><a href={`tel:${settings.phone_e164}`}>{settings.phone_display}</a></li>
              <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
              <li><a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>{settings.location}</li>
            </ul>
          </nav>
        </div>

        <div className="foot-bottom">
          <p className="foot-crisis">
            Resilio is not an emergency service. {settings.crisis_text}{' '}
            <a href={`tel:${settings.crisis_phone}`}>{settings.crisis_phone}</a> (free, 24/7) or go to your nearest hospital.
          </p>
          <div className="legal">
            <span>© 2026 Resilio by IshIra. All rights reserved.</span>
            <span>
              <Link href="/policies/#privacy">Privacy policy</Link> · <Link href="/policies/#cancellation">Cancellation policy</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
