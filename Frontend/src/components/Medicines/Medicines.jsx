import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Medicines.css";

// ── MOCK DATA ──
const MEDICINES = [
  {
    id: 1, name: "Paracetamol 500mg", generic: "Acetaminophen",
    form: "Tablet", pack: "Strip of 10", category: "Painkillers",
    govtPrice: 14.30, retailPrice: 14.00, store: "Apollo Pharmacy",
    manufacturer: "GSK Pharma", status: "ok",
    description: "Used for relief of mild to moderate pain and fever. Commonly available over-the-counter.",
    sideEffects: "Nausea, rash (rare), liver damage if overdosed.",
    alternatives: ["Crocin 500mg", "Dolo 650", "Calpol 500mg"],
    reports: 2,
  },
  {
    id: 2, name: "Amoxicillin 500mg", generic: "Amoxicillin",
    form: "Capsule", pack: "Strip of 10", category: "Antibiotics",
    govtPrice: 48.50, retailPrice: 85.00, store: "MedPlus",
    manufacturer: "Cipla Ltd", status: "over",
    description: "Broad-spectrum antibiotic used to treat bacterial infections of the ear, nose, throat, skin, and urinary tract.",
    sideEffects: "Diarrhea, nausea, skin rash, allergic reactions.",
    alternatives: ["Mox 500", "Novamox 500", "Amoxil 500"],
    reports: 18,
  },
  {
    id: 3, name: "Metformin 500mg", generic: "Metformin HCl",
    form: "Tablet", pack: "Strip of 20", category: "Diabetes",
    govtPrice: 22.10, retailPrice: 28.00, store: "1mg",
    manufacturer: "Sun Pharma", status: "warn",
    description: "First-line medication for type 2 diabetes. Helps control blood sugar levels.",
    sideEffects: "Nausea, diarrhea, stomach upset, lactic acidosis (rare).",
    alternatives: ["Glycomet 500", "Glucophage 500", "Obimet 500"],
    reports: 7,
  },
  {
    id: 4, name: "Atorvastatin 10mg", generic: "Atorvastatin Calcium",
    form: "Tablet", pack: "Strip of 15", category: "Cardiac",
    govtPrice: 31.00, retailPrice: 30.50, store: "PharmEasy",
    manufacturer: "Pfizer India", status: "ok",
    description: "Used to lower cholesterol and reduce risk of heart disease and stroke.",
    sideEffects: "Muscle pain, liver enzyme changes, headache.",
    alternatives: ["Lipitor 10mg", "Storvas 10", "Tonact 10"],
    reports: 0,
  },
  {
    id: 5, name: "Azithromycin 250mg", generic: "Azithromycin",
    form: "Tablet", pack: "Strip of 6", category: "Antibiotics",
    govtPrice: 36.80, retailPrice: 62.00, store: "Local Store",
    manufacturer: "Alkem Labs", status: "over",
    description: "Antibiotic used to treat respiratory infections, skin infections, and sexually transmitted diseases.",
    sideEffects: "Nausea, diarrhea, abdominal pain, heart rhythm changes.",
    alternatives: ["Azee 250", "Zithromax 250", "Azithral 250"],
    reports: 24,
  },
  {
    id: 6, name: "Omeprazole 20mg", generic: "Omeprazole",
    form: "Capsule", pack: "Strip of 10", category: "Antacid",
    govtPrice: 19.50, retailPrice: 19.00, store: "Apollo Pharmacy",
    manufacturer: "AstraZeneca", status: "ok",
    description: "Proton pump inhibitor used to treat acid reflux, gastric ulcers, and GERD.",
    sideEffects: "Headache, diarrhea, nausea, vitamin B12 deficiency long-term.",
    alternatives: ["Omez 20", "Prilosec 20", "Ocid 20"],
    reports: 1,
  },
  {
    id: 7, name: "Amlodipine 5mg", generic: "Amlodipine Besylate",
    form: "Tablet", pack: "Strip of 10", category: "Cardiac",
    govtPrice: 27.60, retailPrice: 27.00, store: "MedPlus",
    manufacturer: "Torrent Pharma", status: "ok",
    description: "Calcium channel blocker used to treat high blood pressure and chest pain.",
    sideEffects: "Swelling in ankles, flushing, dizziness, headache.",
    alternatives: ["Amlip 5", "Norvasc 5", "Amlong 5"],
    reports: 0,
  },
  {
    id: 8, name: "Ciprofloxacin 500mg", generic: "Ciprofloxacin HCl",
    form: "Tablet", pack: "Strip of 10", category: "Antibiotics",
    govtPrice: 42.00, retailPrice: 70.00, store: "Local Store",
    manufacturer: "Bayer Pharma", status: "over",
    description: "Fluoroquinolone antibiotic used to treat urinary tract, respiratory, and skin infections.",
    sideEffects: "Nausea, diarrhea, tendon damage, sun sensitivity.",
    alternatives: ["Ciplox 500", "Cifran 500", "Quintor 500"],
    reports: 15,
  },
  {
    id: 9, name: "Vitamin D3 60K IU", generic: "Cholecalciferol",
    form: "Capsule", pack: "Strip of 4", category: "Vitamins",
    govtPrice: 38.00, retailPrice: 40.00, store: "PharmEasy",
    manufacturer: "Mankind Pharma", status: "warn",
    description: "Used to treat and prevent vitamin D deficiency. Important for bone health.",
    sideEffects: "Nausea, weakness, frequent urination if overdosed.",
    alternatives: ["D-Rise 60K", "Uprise D3", "Calcirol 60K"],
    reports: 3,
  },
];

const CATEGORIES = ["All Medicines", "Antibiotics", "Painkillers", "Diabetes", "Cardiac", "Antacid", "Vitamins"];
const STATUS_FILTERS = ["All", "Fair Price", "Overpriced", "Under Review"];
const statusMap = { ok: "Fair Price", over: "Overpriced", warn: "Under Review" };
const priceDiff = (govt, retail) => (((retail - govt) / govt) * 100).toFixed(0);

// ── REPORT MODAL ──
function ReportModal({ medicine, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Report Overpricing</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <p className="modal-sub">Reporting: <strong>{medicine.name}</strong></p>
        <div className="modal-field"><label>Store Name</label><input type="text" placeholder="e.g. MedPlus, Sector 12" /></div>
        <div className="modal-field"><label>Price Charged (₹)</label><input type="number" placeholder="e.g. 85.00" /></div>
        <div className="modal-field">
          <label>Upload Bill / Photo</label>
          <div className="upload-zone">
            <svg viewBox="0 0 24 24" fill="none" stroke="#334038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Click to upload or drag & drop</span>
          </div>
        </div>
        <div className="modal-field"><label>Additional Notes</label><textarea placeholder="Any extra details…" rows={3} /></div>
        <button className="modal-submit" onClick={() => { alert("Report submitted! Thank you."); onClose(); }}>Submit Report →</button>
      </div>
    </div>
  );
}

// ── DETAIL VIEW (Search Result) ──
function MedicineDetail({ medicine, onBack, onReport }) {
  const diff = priceDiff(medicine.govtPrice, medicine.retailPrice);
  const isOver = medicine.retailPrice > medicine.govtPrice;
  const overAmount = (medicine.retailPrice - medicine.govtPrice).toFixed(2);

  return (
    <div className="detail-view">
      <button className="back-btn" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to search
      </button>

      <div className="detail-grid">
        {/* LEFT - Main Info */}
        <div className="detail-left">
          <div className="detail-card">
            <div className="detail-card-top">
              <div className="detail-med-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M10.5 3.5a6 6 0 0 1 6 6v5a6 6 0 0 1-12 0v-5a6 6 0 0 1 6-6z" />
                  <line x1="4.5" y1="11" x2="16.5" y2="11" />
                </svg>
              </div>
              <span className={`status-badge status-${medicine.status}`}>
                {medicine.status === "ok" ? "✓ Fair Price" : medicine.status === "over" ? "⚠ Overpriced" : "~ Under Review"}
              </span>
            </div>

            <h1 className="detail-name">{medicine.name}</h1>
            <div className="detail-meta-row">
              <span className="detail-meta">{medicine.generic}</span>
              <span className="detail-sep">·</span>
              <span className="detail-meta">{medicine.form}</span>
              <span className="detail-sep">·</span>
              <span className="detail-meta">{medicine.pack}</span>
            </div>
            <div className="detail-manufacturer">{medicine.manufacturer}</div>

            <p className="detail-desc">{medicine.description}</p>

            {/* Price Comparison Box */}
            <div className={`price-box ${isOver ? "price-box-over" : "price-box-ok"}`}>
              <div className="price-box-row">
                <div className="price-box-item">
                  <div className="price-box-label">Govt Ceiling Price (NPPA)</div>
                  <div className="price-box-value green">₹{medicine.govtPrice.toFixed(2)}</div>
                </div>
                <div className="price-box-divider" />
                <div className="price-box-item">
                  <div className="price-box-label">Retail Price Charged</div>
                  <div className={`price-box-value ${isOver ? "red" : "green"}`}>₹{medicine.retailPrice.toFixed(2)}</div>
                </div>
                <div className="price-box-divider" />
                <div className="price-box-item">
                  <div className="price-box-label">{isOver ? "Overcharged By" : "Status"}</div>
                  <div className={`price-box-value ${isOver ? "red" : "green"}`}>
                    {isOver ? `₹${overAmount} (+${diff}%)` : "Within Limit ✓"}
                  </div>
                </div>
              </div>
              {isOver && (
                <div className="price-warning">
                  ⚠ This medicine is being sold above the NPPA government ceiling price. You have the right to refuse and report.
                </div>
              )}
            </div>

            <div className="detail-actions">
              <button className="btn-report" onClick={onReport}>Report Overpricing</button>
              <button className="btn-share">Share Price Info</button>
            </div>
          </div>

          {/* Side Effects */}
          <div className="detail-section-card">
            <h3>Side Effects</h3>
            <p>{medicine.sideEffects}</p>
            <div className="disclaimer">⚕ Consult a doctor before taking any medication. This is for informational purposes only.</div>
          </div>
        </div>

        {/* RIGHT - Extra Info */}
        <div className="detail-right">
          {/* Store Info */}
          <div className="detail-info-card">
            <h4>Store Information</h4>
            <div className="info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>{medicine.store}</span>
            </div>
            <div className="info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span>Reported Location</span>
            </div>
            <div className="info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Last updated today</span>
            </div>
          </div>

          {/* Reports */}
          <div className="detail-info-card">
            <h4>Community Reports</h4>
            <div className="reports-count">
              <span className={`reports-num ${medicine.reports > 5 ? "red" : "green"}`}>{medicine.reports}</span>
              <span className="reports-label">overpricing reports filed</span>
            </div>
            {medicine.reports > 5 && (
              <div className="reports-alert">High report count — likely black market activity in this area.</div>
            )}
          </div>

          {/* Alternatives */}
          <div className="detail-info-card">
            <h4>Cheaper Alternatives</h4>
            <p className="alts-sub">Same composition, lower price</p>
            {medicine.alternatives.map((alt) => (
              <div className="alt-row" key={alt}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{alt}</span>
              </div>
            ))}
          </div>

          {/* NPPA Info */}
          <div className="detail-info-card nppa-card">
            <h4>NPPA Regulation</h4>
            <p>This medicine is under the Drug Price Control Order (DPCO). The ceiling price is set by the National Pharmaceutical Pricing Authority.</p>
            <a href="https://www.nppa.gov.in" target="_blank" rel="noreferrer" className="nppa-link">View on NPPA Website →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BROWSE VIEW (Grid) ──
function BrowseView({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [category, setCategory] = useState("All Medicines");
  const [statusFilter, setStatusFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("Relevance");
  const [reportMed, setReportMed] = useState(null);
  const fileRef = useRef(null);

  const filtered = MEDICINES.filter((m) => {
    const matchQ = m.name.toLowerCase().includes(query.toLowerCase()) || m.generic.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === "All Medicines" || m.category === category;
    const matchStatus = statusFilter === "All" || statusMap[m.status] === statusFilter;
    const matchPrice = m.govtPrice <= maxPrice;
    return matchQ && matchCat && matchStatus && matchPrice;
  }).sort((a, b) => {
    if (sort === "Price: Low to High") return a.govtPrice - b.govtPrice;
    if (sort === "Price: High to Low") return b.govtPrice - a.govtPrice;
    if (sort === "Most Reported") return b.reports - a.reports;
    return 0;
  });

  return (
    <>
      {/* HERO */}
      <section className="med-hero">
        <div className="med-hero-glow" />
        <div className="med-hero-inner">
          <div className="med-tag"><div className="med-tag-dot" /><span>Price Database</span></div>
          <h1>Search & Compare<br /><span className="accent">Medicine Prices</span></h1>
          <p>Compare retail prices with NPPA government ceiling prices instantly.</p>
          <div className="med-search-bar">
            <div className="med-search-wrap">
              <input className="med-search-input" type="text" placeholder="Search by medicine name, brand, or formula…" value={query} onChange={(e) => setQuery(e.target.value)} />
              <button className="med-search-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </button>
            </div>
            <button className="med-scan-btn" onClick={() => fileRef.current.click()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
              Scan Label
            </button>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} />
          </div>
        </div>
      </section>

      {/* LAYOUT */}
      <div className="med-layout">
        {/* SIDEBAR */}
        <aside className="med-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Category</div>
            {CATEGORIES.map((cat) => (
              <div key={cat} className={`filter-chip ${category === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
                <div className="filter-dot" /><span>{cat}</span>
                <span className="filter-count">{cat === "All Medicines" ? MEDICINES.length : MEDICINES.filter((m) => m.category === cat).length}</span>
              </div>
            ))}
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">Price Status</div>
            {STATUS_FILTERS.map((s) => (
              <div key={s} className={`filter-chip ${statusFilter === s ? "active" : ""}`} onClick={() => setStatusFilter(s)}>
                <div className="filter-dot" /><span>{s}</span>
              </div>
            ))}
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">Max Price (₹{maxPrice})</div>
            <div className="price-range-wrap">
              <input type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
              <div className="price-labels"><span>₹0</span><span>₹1000</span></div>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="med-content">
          <div className="content-header">
            <div className="result-count"><span>{filtered.length}</span> medicines found</div>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Reported</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#334038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></div>
              <p>No medicines found.</p><span>Try a different name or adjust filters.</span>
            </div>
          ) : (
            <div className="med-grid">
              {filtered.map((m) => {
                const diff = priceDiff(m.govtPrice, m.retailPrice);
                const isOver = m.retailPrice > m.govtPrice;
                return (
                  <div className="med-card" key={m.id}>
                    <div className="med-card-top">
                      <div className="med-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.6" strokeLinecap="round"><path d="M10.5 3.5a6 6 0 0 1 6 6v5a6 6 0 0 1-12 0v-5a6 6 0 0 1 6-6z" /><line x1="4.5" y1="11" x2="16.5" y2="11" /></svg>
                      </div>
                      <span className={`status-badge status-${m.status}`}>
                        {m.status === "ok" ? "✓ Fair Price" : m.status === "over" ? "⚠ Overpriced" : "~ Under Review"}
                      </span>
                    </div>
                    <div className="med-name">{m.name}</div>
                    <div className="med-generic">{m.generic} · {m.pack}</div>
                    <div className="price-govt-label">Govt Ceiling Price</div>
                    <div className="price-row">
                      <span className="price-govt-val">₹{m.govtPrice.toFixed(2)}</span>
                      {m.retailPrice !== m.govtPrice && <span className="price-retail-val">₹{m.retailPrice.toFixed(2)}</span>}
                      <span className={`price-diff ${isOver ? "diff-over" : "diff-ok"}`}>{isOver ? `+${diff}% over` : "Within limit"}</span>
                    </div>
                    <div className="med-card-footer">
                      <div className="med-store">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                        {m.store}
                      </div>
                      <button className="report-btn" onClick={() => setReportMed(m)}>Report</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {reportMed && <ReportModal medicine={reportMed} onClose={() => setReportMed(null)} />}
    </>
  );
}

// ── MAIN COMPONENT ──
export default function Medicines() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedMed, setSelectedMed] = useState(null);
  const [reportMed, setReportMed] = useState(null);

  // Auto-select medicine if came from home page search
  useEffect(() => {
    if (searchQuery) {
      const found = MEDICINES.find((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.generic.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (found) setSelectedMed(found);
    }
  }, [searchQuery]);

  return (
    <main className="medicines">
      {selectedMed ? (
        <MedicineDetail
          medicine={selectedMed}
          onBack={() => setSelectedMed(null)}
          onReport={() => setReportMed(selectedMed)}
        />
      ) : (
        <BrowseView initialQuery={searchQuery} />
      )}
      {reportMed && <ReportModal medicine={reportMed} onClose={() => setReportMed(null)} />}
    </main>
  );
}