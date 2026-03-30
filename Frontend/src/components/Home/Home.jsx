import { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImg(url);
    }
  };

  return (
    <main className="home">
      <section className="hero">

        {/* ── LEFT ── */}
        <div className="hero-left">
          <div className="badge">
            <span className="badge-dot" />
            <span className="badge-text">AI-Powered Price Monitor</span>
          </div>

          <h1>
            Check Medicine<br />
            Prices. <span className="accent">Fight</span><br />
            Overcharging.
          </h1>

          <p className="desc">
            SafeMeds compares retail medicine prices against government-approved
            ceiling prices in real time — so you always know if you're being overcharged.
          </p>

          {/* Search Bar */}
          <form className="search-wrap" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              placeholder="Search medicine by name, brand or formula…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          {/* Camera Button */}
          <div className="camera-row">
            <button className="camera-btn" onClick={handleCameraClick} type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Scan Medicine Label
            </button>
            <span className="cam-hint">or take a photo of your bill</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="hero-right">
          <div className="img-glow" />
          <div className="img-card">
            {previewImg ? (
              <img src={previewImg} alt="Scanned medicine" className="scanned-img" />
            ) : (
              <div className="img-placeholder">
                <div className="pill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M10.5 3.5a6 6 0 0 1 6 6v5a6 6 0 0 1-12 0v-5a6 6 0 0 1 6-6z" />
                    <line x1="4.5" y1="11" x2="16.5" y2="11" />
                  </svg>
                </div>
                <span className="img-empty-label">Your medicine image appears here</span>
                <button className="upload-hint-btn" onClick={handleCameraClick} type="button">
                  + Upload or scan label
                </button>
              </div>
            )}

            {/* Floating price tag */}
            <div className="price-tag">
              <div className="price-tag-top">PRICE COMPARISON</div>
              <div className="price-tag-row">
                <span className="price-govt">₹48.50</span>
                <span className="price-retail">₹85.00</span>
                <span className="price-badge">+75% over</span>
              </div>
            </div>

            {/* Verified badge */}
            <div className="verified-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>NPPA Verified</span>
            </div>
          </div>
        </div>

      </section>

      {/* ── AWARENESS OVERVIEW ── */}
      <section className="home-awareness">
        <div className="home-awareness-head">
          <div className="home-aw-tag">
            <span className="home-aw-dot" />
            <span>Patient Awareness</span>
          </div>
          <h2>Everything You Need to<br /><span className="accent">Stay Protected</span></h2>
          <p>Knowledge is your first line of defence against medicine overcharging.</p>
        </div>

        <div className="home-aw-grid">
          {/* Card 1 */}
          <div className="home-aw-card">
            <div className="home-aw-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="home-aw-num">01</div>
            <h3>Know Your Consumer Rights</h3>
            <p>Every medicine must display its MRP. You have the legal right to refuse overcharging and demand a receipt under DPCO regulations.</p>
            <ul className="home-aw-list">
              <li>Right to see the MRP on packaging</li>
              <li>Right to refuse above-ceiling pricing</li>
              <li>Right to generic alternatives</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="home-aw-card">
            <div className="home-aw-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="home-aw-num">02</div>
            <h3>Spot Black Market Warning Signs</h3>
            <p>Artificial shortages and illegal price hikes are widespread. Know what to look for before handing over your money.</p>
            <ul className="home-aw-list">
              <li>Price far above MRP or ceiling</li>
              <li>"Out of stock" but available at higher cost</li>
              <li>No bill or receipt offered</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="home-aw-card">
            <div className="home-aw-icon yellow">
              <svg viewBox="0 0 24 24" fill="none" stroke="#FFB400" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div className="home-aw-num">03</div>
            <h3>How to Report Overpricing</h3>
            <p>Filing a report takes less than a minute. Your evidence helps protect thousands of others from the same overcharging.</p>
            <ul className="home-aw-list">
              <li>Search the medicine on SafeMeds</li>
              <li>Upload your bill or photo</li>
              <li>Submit — we handle the rest</li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="home-aw-card">
            <div className="home-aw-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4A9EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="home-aw-num">04</div>
            <h3>Frequently Asked Questions</h3>
            <p>Get quick answers to common questions about medicine pricing, your legal rights, and how SafeMeds works.</p>
            <ul className="home-aw-list">
              <li>What is NPPA and DPCO?</li>
              <li>Can a store charge above MRP?</li>
              <li>What is a Jan Aushadhi store?</li>
            </ul>
          </div>
        </div>

        <div className="home-aw-cta">
          <a href="/awareness" className="home-aw-btn">Explore Full Awareness Guide →</a>
        </div>
      </section>

      {/* ── FLOATING CHAT BUTTON ── */}
      <NavLink to="/chat" className="float-chat-btn" aria-label="Open AI Chat">
        <div className="float-chat-pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Ask AI</span>
      </NavLink>

    </main>
  );
}