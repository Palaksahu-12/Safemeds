import { NavLink } from "react-router-dom";
import "./Footer.css";
 
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
 
        {/* Top row */}
        <div className="footer-top">
 
          {/* Brand */}
          <div className="footer-brand">
            <NavLink to="/" className="footer-logo">
              <span className="footer-logo-plus">+</span>
              Safe<span className="footer-logo-accent">Meds</span>
            </NavLink>
            <p className="footer-tagline">
              Empowering citizens with real-time pharmaceutical price transparency and AI-driven accountability.
            </p>
            <div className="footer-badges">
              <span className="f-badge">NPPA Compliant</span>
              <span className="f-badge">DPCO Monitored</span>
            </div>
          </div>
 
          {/* Links */}
          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Platform</h4>
              <NavLink to="/medicines">Medicine Search</NavLink>
              <NavLink to="/medicines">Price Comparison</NavLink>
              <NavLink to="/chat">AI Chatbot</NavLink>
              <NavLink to="/awareness">Awareness</NavLink>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/about">Our Mission</NavLink>
              <NavLink to="/about">Research</NavLink>
              <NavLink to="/about">Contact</NavLink>
            </div>
            <div className="footer-col">
              <h4>Account</h4>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Sign In</NavLink>
              <NavLink to="/medicines">Report Overpricing</NavLink>
            </div>
          </div>
        </div>
 
        {/* Divider */}
        <div className="footer-divider" />
 
        {/* Bottom row */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} SafeMeds. Built to protect patients. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Disclaimer</a>
          </div>
        </div>
 
      </div>
    </footer>
  );
}