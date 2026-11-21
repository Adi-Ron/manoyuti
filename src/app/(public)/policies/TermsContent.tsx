import Link from 'next/link';

/** Website terms; clinical consent and programme requirements remain separate. */
export function TermsContent() {
  return (
    <section className="policy-section" aria-labelledby="terms">
      <h2 id="terms">Terms and conditions</h2>
      <p>These terms explain how to use the Manoyuti website and request our services. Please read them alongside our <a href="#privacy">privacy policy</a> and <a href="#cancellation">cancellation and rescheduling policy</a>. If anything is unclear, contact us before booking or making a payment.</p>

      <h3>Our services and your care</h3>
      <p>Manoyuti offers psychotherapy, psychological assessments, research and academic mentoring, and psychology training. The website helps you learn about these services and contact the practice. Reading a page or sending an enquiry does not begin a therapeutic relationship, provide a diagnosis, or replace an individual assessment.</p>
      <p>Manoyuti is not an emergency service. Do not rely on this website or its forms for urgent help. If you need immediate support, contact an appropriate emergency service or your nearest hospital.</p>

      <h3>Who can arrange services</h3>
      <p>Adults may enquire about services for themselves. If you are under 18, a parent or guardian needs to be involved in arranging sessions. We discuss suitability, consent and any relevant requirements before care begins. Clinical consent, research participation and training arrangements are explained separately; these website terms do not replace that process.</p>

      <h3>Booking requests and appointments</h3>
      <p>A booking form records your preferences. Submitting it does not reserve or confirm an appointment. We review availability and contact you to agree on a time and session format. Your appointment is confirmed once that time is agreed. Please provide accurate contact details and tell us if your availability changes.</p>

      <h3>Fees, payment and changes</h3>
      <p>Fees for listed services appear on the relevant pages. Confirm the service, fee and appointment details with the practice before paying. Payment arrangements are shared separately; the enquiry and booking forms do not collect a payment or authorise an automatic charge.</p>
      <p>Our <a href="#cancellation">cancellation policy</a> explains rescheduling, missed sessions and refunds if we cancel. Giving at least 24 hours’ notice allows cancellation or rescheduling without charge. Less than 24 hours’ notice or a missed session carries the full session fee, subject to the circumstances described in that policy.</p>

      <h3>Joining an online session</h3>
      <p>For online sessions, use a private space and a stable internet connection where possible. Keep meeting details private and tell your therapist if privacy or connection problems affect your ability to participate. The cancellation policy explains what happens if a connection problem on our side cuts a session short.</p>

      <h3>Using this website responsibly</h3>
      <ul className="policy-list">
        <li>Provide truthful information and only submit another person’s details when you are authorised to do so.</li>
        <li>Do not impersonate anyone, send harmful or abusive material, submit spam, or interfere with the website or other people’s access.</li>
        <li>Keep enquiries brief; avoid sharing detailed health information through public-facing forms.</li>
      </ul>

      <h3>Information, content and external services</h3>
      <p>Articles and resources offer general information, not personalised clinical advice. Individual needs and experiences vary, and website information does not promise a particular therapeutic or academic outcome.</p>
      <p>Website content belongs to Manoyuti or its respective creators unless stated otherwise. You may read, save or print it for lawful personal use. Contact us about other reuse, except where the law already permits it. External links and service providers have their own terms and privacy practices; review those when using their services.</p>

      <h3>Updates and questions</h3>
      <p>If these terms change, we will update the date shown on this page. For questions about these terms or a service, <Link href="/contact/">contact us</Link> or email <a href="mailto:ishatiwari1706@gmail.com">ishatiwari1706@gmail.com</a>.</p>
    </section>
  );
}
