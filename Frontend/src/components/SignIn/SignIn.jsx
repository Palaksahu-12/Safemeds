import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (form.password.length < 6) errs.password = "Password is too short";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // TODO: connect to backend API
    navigate("/");
  };

  return (
    <main className="signin-page">

      {/* ── LEFT PANEL ── */}
      <div className="signin-left">
        <div className="signin-grid-bg" />
        <div className="signin-glow-top" />
        <div className="signin-glow-bottom" />

        <NavLink to="/" className="signin-brand">
          <span className="signin-brand-plus">+</span>
          Safe<span className="signin-brand-accent">Meds</span>
        </NavLink>

        <div className="signin-left-content">
          <div className="signin-tag">
            <div className="signin-tag-dot" />
            <span>Welcome Back</span>
          </div>

          <h1>
            Good to See<br />
            You <span className="accent">Again.</span>
          </h1>

          <p>Sign in to check medicine prices, track your reports, and get AI-powered health guidance.</p>

          <div className="info-cards">
            <div className="info-card">
              <div className="ic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="ic-text">
                <h4>Your reports are safe</h4>
                <p>All your overpricing reports and data are encrypted and secure.</p>
              </div>
            </div>
            <div className="info-card">
              <div className="ic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="ic-text">
                <h4>Continue where you left off</h4>
                <p>Access your saved medicines, alerts, and price comparisons instantly.</p>
              </div>
            </div>
            <div className="info-card">
              <div className="ic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
                </svg>
              </div>
              <div className="ic-text">
                <h4>Live price monitoring</h4>
                <p>Get real-time alerts when medicines in your area are overpriced.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="signin-right">
        <div className="signin-form-header">
          <h2>Sign in to SafeMeds</h2>
          <p>Don't have an account? <NavLink to="/register">Register here</NavLink></p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email" name="email" type="email"
              placeholder="rahul@example.com"
              value={form.email} onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="err-msg">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="pw-wrap">
              <input
                id="password" name="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password} onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="err-msg">{errors.password}</span>}
          </div>

          {/* Remember + Forgot */}
          <div className="signin-row">
            <div className="remember-row">
              <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <label htmlFor="remember">Remember me</label>
            </div>
            <NavLink to="#" className="forgot-link">Forgot password?</NavLink>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-submit">Sign In →</button>

          {/* Divider */}
          <div className="form-divider">
            <div className="divider-line" /><span>or</span><div className="divider-line" />
          </div>

          {/* Google */}
          <button type="button" className="btn-google">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="register-hint">
            New to SafeMeds? <NavLink to="/register">Create a free account</NavLink>
          </p>

        </form>
      </div>

    </main>
  );
}