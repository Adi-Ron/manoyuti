import Link from 'next/link';

export default function PoliciesPage() {
  return (
    <>
      <section className="pagehead" aria-labelledby="po-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>Policies</span>
            <h1 id="po-h" style={{ '--i': 1 }}>Privacy and cancellations</h1>
            <p className="lead" style={{ '--i': 2 }}>How we look after what you share with us, and what happens if you need to change or cancel a session.</p>
          </div>
          <dl className="facts"><div><dt>Last updated</dt><dd>26 October 2026</dd></div><div><dt>Questions</dt><dd><Link href="/contact/">Contact us</Link></dd></div></dl>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="privacy">
        <div className="wrap split side">
          <div className="panelbox" style={{ position: 'sticky', top: 110 }}>
            <h2 style={{ fontSize: 'var(--t-h3)' }}>On this page</h2>
            <ul className="ticks small">
              <li><a href="#privacy">Privacy policy</a></li>
              <li><a href="#cancellation">Cancellation and rescheduling</a></li>
            </ul>
          </div>
          <div className="prose">
            <h2 id="privacy" style={{ marginTop: 0 }}>Privacy policy</h2>
            <p>Manoyuti ("Manoyuti", "we") is a psychotherapy, research and training practice in Bengaluru, Karnataka. This policy explains what personal information we collect, why, and how we protect it. We aim to handle personal data in line with India's Digital Personal Data Protection Act, 2023, and with the ethical standards of our profession.</p>

            <h3>What we collect</h3>
            <ul className="ticks">
              <li><b>When you contact or book with us:</b> your name, email address, the service you're interested in, the times that suit you, and anything you choose to write in your message.</li>
              <li><b>If you become a client:</b> the information in your intake form, notes from your sessions, assessment results and reports, and records of appointments and payments.</li>
              <li><b>If you join a training programme or event:</b> your name, contact details, institution or course, and attendance and certificate records.</li>
            </ul>

            <h3>How this website handles your information</h3>
            <p>This website does not use cookies, analytics or advertising trackers, and it does not store anything in your browser. The booking and contact forms submit your enquiry securely, and we will reply by email within 24 hours.</p>
            <p>The website loads its fonts from Google Fonts, so your browser connects to Google's servers when a page opens.</p>

            <h3>How we use it</h3>
            <ul className="ticks">
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

            <h3>Under 18?</h3>
            <p>If you're under 18, a parent or guardian needs to be involved in arranging sessions.</p>

            <h3>Changes to this policy</h3>
            <p>If we change this policy, we'll update the date at the top of this page.</p>

            <h2 id="cancellation">Cancellation and rescheduling</h2>
            <p>Your session time is held just for you. These rules help us offer times fairly to everyone.</p>
            <ul className="ticks">
              <li><b>Rescheduling or cancelling:</b> let us know at least 24 hours before your session via email or the contact form, and there's no charge.</li>
              <li><b>Less than 24 hours' notice, or a missed session:</b> the full session fee is charged.</li>
              <li><b>Illness and emergencies:</b> life happens. If something unexpected stops you attending, tell us and we'll be understanding.</li>
              <li><b>If we need to cancel:</b> we'll tell you as early as we can and offer another time, or a full refund if you've already paid.</li>
              <li><b>Arriving late:</b> the session still ends at the scheduled time, so you get as much of it as possible.</li>
              <li><b>Online sessions:</b> if a connection problem on our side cuts a session short, we'll make up the time at no cost.</li>
              <li><b>Payment:</b> sessions are paid in advance, by UPI or credit card.</li>
            </ul>
            <p>Questions about a booking? <Link href="/contact/">Contact us</Link> and we'll reply within 24 hours.</p>
          </div>
        </div>
      </section>
    </>
  );
}
