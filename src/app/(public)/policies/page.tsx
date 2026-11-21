import Link from 'next/link';
import '@/styles/policies.css';
import { TermsContent } from './TermsContent';

export default function PoliciesPage() {
  return (
    <div className="policy-page">
      <header className="policy-intro" aria-labelledby="po-h">
        <div className="wrap policy-intro-grid">
          <div className="policy-intro-copy">
            <span className="policy-eyebrow">Policies</span>
            <h1 id="po-h">Privacy, terms &amp; bookings</h1>
            <p className="policy-intro-lead">How we handle your information, how bookings work, and the terms for using Manoyuti’s website and services.</p>
          </div>
          <dl className="policy-meta">
            <div><dt>Last updated</dt><dd><time dateTime="2026-11-22">22 November 2026</time></dd></div>
            <div><dt>Questions</dt><dd><Link href="/contact/">Contact us <span aria-hidden="true">→</span></Link></dd></div>
          </dl>
        </div>
      </header>

      <div className="wrap policy-layout">
        <nav className="policy-nav" aria-labelledby="policy-nav-title">
          <p id="policy-nav-title">On this page</p>
          <ul>
            <li><a href="#privacy">Privacy policy <span aria-hidden="true">↓</span></a></li>
            <li><a href="#terms">Terms &amp; conditions <span aria-hidden="true">↓</span></a></li>
            <li><a href="#cancellation">Cancellation and rescheduling <span aria-hidden="true">↓</span></a></li>
          </ul>
        </nav>
        <article className="policy-content" aria-label="Practice policies">
          <section className="policy-section" aria-labelledby="privacy">
            <h2 id="privacy">Privacy policy</h2>
            <p>Manoyuti ("Manoyuti", "we") is a psychotherapy, research and training practice in Bengaluru, Karnataka. This policy explains what personal information we collect, why, and how we protect it. We aim to handle personal data in line with India's Digital Personal Data Protection Act, 2023, and with the ethical standards of our profession.</p>

            <h3>What we collect</h3>
            <ul className="policy-list">
              <li><b>When you contact or book with us:</b> your name, email address, the service you're interested in, the times that suit you, and anything you choose to write in your message.</li>
              <li><b>If you become a client:</b> the information in your intake form, notes from your sessions, assessment results and reports, and records of appointments and payments.</li>
              <li><b>If you join a training programme or event:</b> your name, contact details, institution or course, and attendance and certificate records.</li>
            </ul>

            <h3>How this website handles your information</h3>
            <p>The public website does not use advertising trackers or visitor analytics. Essential authentication cookies are used when administrators sign in to the private workspace. You can control cookies in your browser; blocking authentication cookies may prevent administrator sign-in.</p>
            <p>Booking and contact forms send the details you provide to the practice so we can respond and arrange services. Please avoid including detailed medical histories or sensitive session information in a website enquiry.</p>
            <p>The website loads its fonts from Google Fonts, so your browser connects to Google's servers when a page opens.</p>

            <h3>Consent and optional information</h3>
            <p>When you send a booking request, you acknowledge that we may contact you about it. Optional fields can be left blank. You can ask us to stop optional communications or withdraw consent by contacting us; we will explain if this affects a service you have requested. Consent for therapy, assessments, or research is discussed separately.</p>

            <h3>Service providers and technical information</h3>
            <p>We use Vercel to host the website and Supabase for database storage and administrator authentication. These providers process information needed to operate and protect those services, which may include network addresses, authentication records, and technical request logs. Their processing is described in the <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel privacy notice</a> and <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase privacy notice</a>.</p>
            <p>If you follow an external link, open a meeting service, or use an email or payment provider, that provider’s own privacy terms apply. We do not collect card details or take payments through this booking form.</p>

            <h3>How we use it</h3>
            <ul className="policy-list">
              <li>To reply to you, arrange sessions and send intake forms, confirmations and invoices.</li>
              <li>To provide therapy, assessments and training, and to keep the records good practice requires.</li>
              <li>We never sell your information, and we don't use it for marketing unless you have said yes.</li>
            </ul>

            <h3>Confidentiality in therapy</h3>
            <p>What you share in sessions stays between you and your therapist. There are a few limits, which we explain in your first session: for example, if there is a serious risk of harm to you or someone else, or if the law requires us to share information. With your written consent, we may share relevant information with another professional involved in your care, such as your psychiatrist or doctor.</p>

            <h3>How long we keep it, and how we protect it</h3>
            <p>We keep client records securely and only for as long as is needed to provide care and meet our professional and legal obligations. Enquiries that don't lead to sessions are deleted within 3 months. Only the people involved in your care can see your records.</p>

            <h3>Research</h3>
            <p>We never use client information in research without your separate, informed consent. Research participants receive their own information sheet and consent form, and findings are reported without anything that could identify you.</p>

            <h3>Your choices</h3>
            <p>You can ask us to show you the information we hold about you, correct it, or delete it where we're not required to keep it. You can withdraw consent at any time. <Link href="/contact/">Contact us</Link> and we'll respond within 24 hours.</p>
            <p>For a privacy request or concern, email <a href="mailto:ishatiwari1706@gmail.com">ishatiwari1706@gmail.com</a>. Include enough information to identify your enquiry, but do not send passwords, payment credentials, or detailed health records. We may need to verify your identity before releasing or changing personal information.</p>

            <h3>Under 18?</h3>
            <p>If you're under 18, a parent or guardian needs to be involved in arranging sessions.</p>

            <h3>Changes to this policy</h3>
            <p>If we change this policy, we'll update the date at the top of this page.</p>

          </section>

          <TermsContent />

          <section className="policy-section" aria-labelledby="cancellation">
            <h2 id="cancellation">Cancellation and rescheduling</h2>
            <p>Your session time is held just for you. These rules help us offer times fairly to everyone.</p>
            <ul className="policy-list">
              <li><b>Rescheduling or cancelling:</b> let us know at least 24 hours before your session via email or the contact form, and there's no charge.</li>
              <li><b>Less than 24 hours' notice, or a missed session:</b> the full session fee is charged.</li>
              <li><b>Illness and emergencies:</b> life happens. If something unexpected stops you attending, tell us and we'll be understanding.</li>
              <li><b>If we need to cancel:</b> we'll tell you as early as we can and offer another time, or a full refund if you've already paid.</li>
              <li><b>Arriving late:</b> the session still ends at the scheduled time, so you get as much of it as possible.</li>
              <li><b>Online sessions:</b> if a connection problem on our side cuts a session short, we'll make up the time at no cost.</li>
              <li><b>Payment:</b> sessions are paid in advance, by UPI or credit card.</li>
            </ul>
            <p>Questions about a booking? <Link href="/contact/">Contact us</Link> and we'll reply within 24 hours.</p>
          </section>
        </article>
      </div>
    </div>
  );
}
