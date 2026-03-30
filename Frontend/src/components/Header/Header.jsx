import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo */}
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-plus">+</span>
          Safe<span className="logo-accent">Meds</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/medicines" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Medicines
          </NavLink>
          <NavLink to="/awareness" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Awareness
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            About
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? "nav-link nav-chat active" : "nav-link nav-chat"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            AI Chat
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {theme === "dark" ? (
              /* Sun icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <NavLink to="/login" className="btn-signin">Sign In</NavLink>
          <div className="nav-divider" />
          <NavLink to="/register" className="btn-register">Register</NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? "mob-link active" : "mob-link"} onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/medicines" className={({ isActive }) => isActive ? "mob-link active" : "mob-link"} onClick={() => setMenuOpen(false)}>Medicines</NavLink>
        <NavLink to="/awareness" className={({ isActive }) => isActive ? "mob-link active" : "mob-link"} onClick={() => setMenuOpen(false)}>Awareness</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "mob-link active" : "mob-link"} onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/chat" className={({ isActive }) => isActive ? "mob-link mob-chat active" : "mob-link mob-chat"} onClick={() => setMenuOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:"14px",height:"14px"}}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          AI Chat
        </NavLink>
        <div className="mob-theme-row">
          <span>Theme</span>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"}
          </button>
        </div>
        <div className="mob-actions">
          <NavLink to="/login" className="btn-signin" onClick={() => setMenuOpen(false)}>Sign In</NavLink>
          <NavLink to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>Register</NavLink>
        </div>
      </div>
    </header>
  );
}