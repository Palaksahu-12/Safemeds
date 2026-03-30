import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Awarness.css";

const RIGHTS = [
  { num: "01", title: "Right to Know the MRP", desc: "Every medicine must display its Maximum Retail Price (MRP) on the packaging. Retailers cannot charge above this price under any circumstances." },
  { num: "02", title: "Right to Refuse Overcharging", desc: "You have the right to refuse to buy any medicine priced above the government ceiling price set under DPCO regulations." },
  { num: "03", title: "Right to Demand a Receipt", desc: "Always ask for a proper receipt with the medicine name, quantity, and price paid. This is your primary evidence for any complaint." },
  { num: "04", title: "Right to Report Violations", desc: "You can report overpricing to the NPPA, state drug controllers, or directly through SafeMeds anonymously." },
  { num: "05", title: "Right to Generic Alternatives", desc: "Doctors are encouraged to prescribe generics. You can ask for a generic version of any branded medicine at any pharmacy." },
  { num: "06", title: "Right to Jan Aushadhi Stores", desc: "Government-run Pradhan Mantri Bhartiya Janaushadhi Kendras offer medicines at 50–90% lower prices than branded equivalents." },
];

const SIGNS = [
  { title: "Price far above MRP", desc: "More than 10–15% above ceiling price is a red flag worth reporting.", icon: "rupee" },
  { title: '"Out of stock" but available at high price', desc: "Artificial scarcity is a tactic to force panic buying at inflated rates.", icon: "alert" },
  { title: "No printed receipt offered", desc: "Refusing to give a bill is illegal and a common sign of price fraud.", icon: "check" },
  { title: "Pressure to buy specific brands", desc: "Pharmacists pushing only costly brands may be incentivised illegally.", icon: "tag" },
];

const ALERTS = [
  { level: "red", text: "Amoxicillin 500mg — 3 stores overpriced", badge: "High" },
  { level: "yellow", text: "Azithromycin 250mg — price spike detected", badge: "Medium" },
  { level: "yellow", text: "Insulin Glargine — low stock reports", badge: "Watch" },
  { level: "green", text: "Paracetamol 500mg — prices normal", badge: "OK" },
  { level: "green", text: "Metformin 500mg — prices normal", badge: "OK" },
];

const STEPS = [
  { num: "01", title: "Find the Medicine", desc: "Search for the medicine on SafeMeds to see the official NPPA ceiling price instantly.", icon: "search" },
  { num: "02", title: "Collect Evidence", desc: "Take a photo of the bill or medicine packaging clearly showing the price you were charged.", icon: "camera" },
  { num: "03", title: "Submit Report", desc: "Click Report on any medicine card and upload your evidence along with the store details.", icon: "edit" },
  { num: "04", title: "Track Your Report", desc: "Your report is reviewed and forwarded to relevant authorities if validated by our team.", icon: "check" },
];

const FAQS = [
  { q: "What is DPCO?", a: "The Drug Price Control Order (DPCO) is a government regulation that caps the prices of essential medicines. It is enforced by the NPPA." },
  { q: "What is NPPA?", a: "The National Pharmaceutical Pricing Authority sets and monitors the ceiling prices of over 4800 essential medicines in India." },
  { q: "Can a shop charge above MRP?", a: "No. Charging above the printed MRP is illegal under the Legal Metrology Act. You can refuse to pay and report the store immediately." },
  { q: "What is a Jan Aushadhi store?", a: "Pradhan Mantri Bhartiya Janaushadhi Kendras are government-run stores that sell quality generic medicines at 50–90% lower prices." },
  { q: "How do I verify a medicine price?", a: "Search on SafeMeds or visit nppa.gov.in to compare your retail price with the official ceiling price in real time." },
  { q: "Is my report anonymous?", a: "Yes. Your personal details are never shared publicly. Reports are submitted anonymously to protect users from any retaliation." },
];

function SignIcon({ type }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "#FF4D4D", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "rupee") return <svg {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
  if (type === "alert") return <svg {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
  if (type === "check") return <svg {...props}><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>;
  return <svg {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>;
}

function StepIcon({ type }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "#00C48C", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "search") return <svg {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
  if (type === "camera") return <svg {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>;
  if (type === "edit") return <svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
  return <svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;
}

export default function Awarness() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="awareness">

      {/* ── HERO ── */}
      <section className="aw-hero">
        <div className="aw-hero-glow" />
        <div className="aw-tag">
          <div className="aw-tag-dot" /><span>Know Your Rights</span>
        </div>
        <h1>Don't Pay More.<br /><span className="accent">Know More.</span></h1>
        <p>Learn about your consumer rights, identify black market activity, and understand how to report overpricing effectively.</p>
      </section>

      {/* ── YOUR RIGHTS ── */}
      <section className="rights-section">
        <div className="aw-section-head">
          <div className="aw-tag" style={{ marginBottom: "14px" }}><div className="aw-tag-dot" /><span>Legal Protections</span></div>
          <h2>Know Your <span className="accent">Consumer Rights</span></h2>
          <p>As a patient in India, you have legally protected rights when purchasing medicines.</p>
        </div>
        <div className="rights-grid">
          {RIGHTS.map((r) => (
            <div className="right-card" key={r.num}>
              <div className="right-num">{r.num}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLACK MARKET SIGNS ── */}
      <section className="blackmkt-section">
        <div className="bm-grid">
          <div className="bm-left">
            <div className="aw-tag" style={{ marginBottom: "16px" }}><div className="aw-tag-dot" style={{ background: "#FF4D4D" }} /><span style={{ color: "#FF4D4D" }}>Warning Signs</span></div>
            <h2>Spot <span className="accent-red">Black Market</span><br />Warning Signs</h2>
            <p>Artificial shortages and illegal price hikes are widespread. Here's what to watch for when buying medicines.</p>
            <div className="bm-signs">
              {SIGNS.map((s) => (
                <div className="bm-sign" key={s.title}>
                  <div className="bm-icon"><SignIcon type={s.icon} /></div>
                  <div className="bm-sign-text"><h5>{s.title}</h5><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bm-right">
            <div className="bm-right-title">⚠ Live Alerts — Your Area</div>
            {ALERTS.map((a) => (
              <div className="alert-item" key={a.text}>
                <div className={`alert-dot dot-${a.level}`} />
                <div className="alert-text">{a.text}</div>
                <div className={`alert-badge badge-${a.level}`}>{a.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO REPORT ── */}
      <section className="report-section">
        <div className="aw-section-head">
          <div className="aw-tag" style={{ marginBottom: "14px" }}><div className="aw-tag-dot" /><span>Step by Step</span></div>
          <h2>How to <span className="accent">Report Overpricing</span></h2>
          <p>Follow these 4 simple steps to file a report and protect others from being overcharged.</p>
        </div>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon"><StepIcon type={s.icon} /></div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              {i < STEPS.length - 1 && <div className="step-connector">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="aw-section-head" style={{ marginBottom: "28px" }}>
          <div className="aw-tag" style={{ marginBottom: "14px" }}><div className="aw-tag-dot" /><span>FAQ</span></div>
          <h2>Frequently Asked <span className="accent">Questions</span></h2>
          <p>Common questions about medicine pricing and your rights as a consumer.</p>
        </div>
        <div className="faq-grid">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="faq-icon">{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="aw-cta">
        <div className="aw-cta-glow" />
        <h2>Ready to <span className="accent">Take Action?</span></h2>
        <p>Check if a medicine in your hand is overpriced — right now.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={() => navigate("/medicines")}>Check Medicine Price →</button>
          <button className="btn-secondary" onClick={() => navigate("/medicines")}>Report Overpricing</button>
        </div>
      </section>

    </main>
  );
}