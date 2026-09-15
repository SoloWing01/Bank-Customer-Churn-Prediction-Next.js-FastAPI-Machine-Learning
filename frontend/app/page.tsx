import Link from "next/link";

const SignalIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 19V9m5 10V5m5 14v-7m5 7V3" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3 5 6v5c0 4.4 2.9 8.5 7 10 4.1-1.5 7-5.6 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <main className="landing-shell">
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">C</span>
          <span>ChurnVision</span>
        </Link>
        <Link className="nav-link" href="/predict">Risk assessment <span>→</span></Link>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse-dot" /> Customer intelligence</p>
          <h1>See churn coming.<br /><em>Act with confidence.</em></h1>
          <p className="hero-description">
            Turn everyday customer signals into a clear retention opportunity before it becomes a goodbye.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/predict">Assess a customer <span>→</span></Link>
            <a className="button button-quiet" href="#how-it-works">How it works <span>↓</span></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Customer risk signal illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-card primary-card">
            <div className="card-topline"><span>Customer pulse</span><span className="live-label">Live</span></div>
            <div className="score-row"><strong>87</strong><span>/ 100</span></div>
            <div className="meter"><span /></div>
            <p>Engagement health</p>
          </div>
          <div className="visual-card signal-card">
            <div className="mini-icon"><SignalIcon /></div>
            <div><strong>+12%</strong><span>Retention signal</span></div>
          </div>
          <div className="visual-card safe-card">
            <div className="mini-icon"><ShieldIcon /></div>
            <div><strong>Model ready</strong><span>14 customer signals</span></div>
          </div>
          <div className="glow-dot dot-one" /><div className="glow-dot dot-two" />
        </div>
      </section>

      <section className="value-section" id="how-it-works">
        <div className="section-intro">
          <p className="eyebrow">Clarity, not complexity</p>
          <h2>Built for the moment<br />before a customer leaves.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-number">01</span><div className="feature-icon"><BoltIcon /></div><h3>Fast assessment</h3><p>Capture a customer profile and get an instant risk signal.</p></article>
          <article className="feature-card"><span className="feature-number">02</span><div className="feature-icon"><SignalIcon /></div><h3>Useful inputs</h3><p>Balance, engagement and relationship details tell the fuller story.</p></article>
          <article className="feature-card"><span className="feature-number">03</span><div className="feature-icon"><ShieldIcon /></div><h3>Decisive next step</h3><p>Identify who may need a thoughtful retention conversation.</p></article>
        </div>
      </section>

      <footer className="landing-footer"><span>ChurnVision</span><span>Customer retention intelligence</span></footer>
    </main>
  );
}
