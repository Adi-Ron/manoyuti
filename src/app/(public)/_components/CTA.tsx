import Link from 'next/link';
import type { SiteSettings } from '@/lib/site-settings';

export function CTA({ settings }: { settings: SiteSettings }) {
  return (
    <section className="section tight cta-section" aria-labelledby="close-h">
      <div className="wrap">
        <div className="band rv">
          <div>
            <h2 id="close-h">{settings.cta_title}</h2>
            <p>{settings.cta_text}</p>
          </div>
          <div className="acts">
            <Link className="btn light" href="/booking/">Book a session <span className="arr" aria-hidden="true">→</span></Link>
            <Link className="btn line" href={`tel:${settings.phone_e164}`}>
              <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg> Call us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
