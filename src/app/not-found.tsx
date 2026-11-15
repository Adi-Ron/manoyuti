import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <section className="pagehead" aria-labelledby="nf-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>Page not found</span>
            <h1 id="nf-h" style={{ '--i': 1 }}>This page has moved</h1>
            <p className="lead" style={{ '--i': 2 }}>The site has a new shape: therapy, research, training and the blog each have their own pages now.</p>
            <div className="acts" style={{ '--i': 3 }}>
              <Link className="btn" href="/">Go to the home page <span className="arr" aria-hidden="true">→</span></Link>
              <Link className="btn line" href="/booking/">Book a session</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}