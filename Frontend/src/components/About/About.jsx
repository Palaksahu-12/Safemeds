import "./About.css";

export default function About() {
  const values = [
    { num: "01", title: "Transparency", desc: "We make pharmaceutical pricing visible and verifiable for every citizen, not just regulators." },
    { num: "02", title: "Accountability", desc: "Every report, every alert, every data point is evidence-backed and verifiable." },
    { num: "03", title: "Accessibility", desc: "Simple enough for anyone — from rural patients to urban consumers — to use with ease." },
    { num: "04", title: "Innovation", desc: "Combining OCR, NLP, and anomaly detection to build tools that didn't exist before." },
    { num: "05", title: "Integrity", desc: "No ads, no commercial bias. SafeMeds exists purely to protect patients." },
    { num: "06", title: "Community", desc: "Crowdsourced reporting turns every user into a guardian of fair pricing." },
  ];

  return (
    <main className="about">

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-glow" />
        <div className="section-tag">
          <div className="section-tag-dot" />
          <span>Who We Are</span>
        </div>
        <h1>Built to <span className="accent">Protect</span><br />Every Patient</h1>
        <p className="hero-sub">SafeMeds is an AI-powered pharmaceutical price monitoring platform fighting medicine overcharging and black marketing across India.</p>
      </section>

      {/* ── MAIN STATEMENT BANNER ── */}
      <section className="statement-banner">
        <div className="statement-inner">
          <div className="statement-line" />
          <blockquote className="statement-text">
            "When medicine prices are hidden,<br />
            <span className="accent">patients pay the price.</span><br />
            We are here to change that."
          </blockquote>
          <div className="statement-line" />
        </div>
        <p className="statement-sub">
          Across India, millions are overcharged for medicines they cannot afford to question.
          SafeMeds gives them the knowledge, the tools, and the voice to fight back.
        </p>
      </section>

      {/* ── MISSION ── */}
      <section className="mission">
        <div className="mission-left">
          <div className="section-tag" style={{ marginBottom: "18px" }}>
            <div className="section-tag-dot" />
            <span>Our Purpose</span>
          </div>
          <h2>Our <span className="accent">Mission</span><br />& Vision</h2>
          <p>We believe every citizen deserves to know the fair price of their medicine. Regulatory limits exist — but enforcement gaps mean patients overpay every day.</p>
          <p>SafeMeds bridges this gap with real-time price comparison, AI anomaly detection, and a community-powered reporting system.</p>
        </div>
        <div className="mission-right">
          <div className="mission-card">
            <div className="mc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="mc-text">
              <h4>Price Transparency</h4>
              <p>Real-time comparison with NPPA government ceiling prices so no one gets overcharged.</p>
            </div>
          </div>
          <div className="mission-card">
            <div className="mc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div className="mc-text">
              <h4>AI-Driven Detection</h4>
              <p>Anomaly detection flags suspicious pricing patterns and artificial shortages automatically.</p>
            </div>
          </div>
          <div className="mission-card">
            <div className="mc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="mc-text">
              <h4>Community Reporting</h4>
              <p>Citizens can report overpricing with evidence — building a decentralized accountability layer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="values">
        <div className="section-head" style={{ marginBottom: "28px" }}>
          <div className="section-tag" style={{ margin: "0 auto 16px" }}>
            <div className="section-tag-dot" />
            <span>What Drives Us</span>
          </div>
          <h2>Our <span className="accent">Core Values</span></h2>
          <p>The principles that guide every decision we make.</p>
        </div>
        <div className="values-grid">
          {values.map((v) => (
            <div className="val-card" key={v.num}>
              <div className="val-num">{v.num}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}