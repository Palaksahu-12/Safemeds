import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", city: "", role: "",
    password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.city.trim()) errs.city = "Required";
    if (!form.role) errs.role = "Select a role";
    if (form.password.length < 8) errs.password = "Min. 8 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    if (!agreed) errs.terms = "Please accept the terms";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // TODO: connect to backend API
    alert("Account created successfully! Redirecting to login...");
    navigate("/login");
  };

  return (
    <main className="register-page">

      {/* ── LEFT PANEL ── */}
      <div className="reg-left">
        <div className="reg-grid-bg" />
        <div className="reg-glow-top" />
        <div className="reg-glow-bottom" />

        <NavLink to="/" className="reg-brand">
          <span className="reg-brand-plus">+</span>
          Safe<span className="reg-brand-accent">Meds</span>
        </NavLink>

        <div className="reg-left-content">
          <div className="reg-tag">
            <div className="reg-tag-dot" />
            <span>Join SafeMeds</span>
          </div>

          <h1>
            Your Health,<br />
            <span className="accent">Your Right</span><br />
            to Know.
          </h1>

          <p>Join thousands of citizens using SafeMeds to verify medicine prices, report overcharging, and access AI-powered health guidance.</p>

          <ul className="perks">
            {[
              "Real-time government price comparison",
              "Scan medicine labels with OCR",
              "Report overpricing with evidence",
              "AI chatbot for medicine queries",
              "Black market alerts in your area",
            ].map((perk) => (
              <li key={perk} className="perk">
                <div className="perk-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="reg-right">
        <div className="form-header">
          <h2>Create your account</h2>
          <p>Already have an account? <NavLink to="/login">Sign in here</NavLink></p>
        </div>

        <form className="reg-form" onSubmit={handleSubmit} noValidate>

          {/* Name Row */}
          <div className="form-row">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" placeholder="Rahul" value={form.firstName} onChange={handleChange} className={errors.firstName ? "error" : ""} />
              {errors.firstName && <span className="err-msg">{errors.firstName}</span>}
            </div>
            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" placeholder="Sharma" value={form.lastName} onChange={handleChange} className={errors.lastName ? "error" : ""} />
              {errors.lastName && <span className="err-msg">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="rahul@example.com" value={form.email} onChange={handleChange} className={errors.email ? "error" : ""} />
            {errors.email && <span className="err-msg">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className={errors.phone ? "error" : ""} />
            {errors.phone && <span className="err-msg">{errors.phone}</span>}
          </div>

          {/* City + Role */}
          <div className="form-row">
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" placeholder="Mumbai" value={form.city} onChange={handleChange} className={errors.city ? "error" : ""} />
              {errors.city && <span className="err-msg">{errors.city}</span>}
            </div>
            <div className="field">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={form.role} onChange={handleChange} className={errors.role ? "error" : ""}>
                <option value="" disabled>Select your role</option>
                <option value="patient">Patient / Consumer</option>
                <option value="caregiver">Caregiver</option>
                <option value="store">Medical Store Owner</option>
                <option value="healthcare">Healthcare Worker</option>
                <option value="regulator">Regulator / Official</option>
              </select>
              {errors.role && <span className="err-msg">{errors.role}</span>}
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="pw-wrap">
              <input id="password" name="password" type={showPass ? "text" : "password"} placeholder="Min. 8 characters" value={form.password} onChange={handleChange} className={errors.password ? "error" : ""} />
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

          {/* Confirm Password */}
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="pw-wrap">
              <input id="confirmPassword" name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Repeat your password" value={form.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? "error" : ""} />
              <button type="button" className="pw-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? (
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
            {errors.confirmPassword && <span className="err-msg">{errors.confirmPassword}</span>}
          </div>

          {/* Terms */}
          <div className="terms-row">
            <input type="checkbox" id="terms" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, terms: "" }); }} />
            <label htmlFor="terms">
              I agree to the <NavLink to="#">Terms of Service</NavLink> and <NavLink to="#">Privacy Policy</NavLink>. I understand SafeMeds may use my reports to improve public health data.
            </label>
          </div>
          {errors.terms && <span className="err-msg">{errors.terms}</span>}

          {/* Submit */}
          <button type="submit" className="btn-submit">Create Account →</button>

          {/* Divider */}
          <div className="form-divider">
            <div className="divider-line" />
            <span>or</span>
            <div className="divider-line" />
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

        </form>
      </div>

    </main>
  );
}