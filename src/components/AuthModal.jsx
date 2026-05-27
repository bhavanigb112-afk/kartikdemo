import { useState } from "react";
import { MEMBERSHIP_TIERS } from "../data/constants";
import authStore from "../data/authStore";

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode]           = useState("login");
  const [regStep, setRegStep]     = useState(1);
  const [loading, setLoading]     = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loginData, setLoginData]   = useState({ email: "", password: "", remember: false });
  const [loginErrors, setLoginErrors] = useState({});

  const [regData, setRegData] = useState({
    firstName: "", lastName: "", email: "", phone: "", dob: "",
    nationality: "", idType: "Passport", idNumber: "",
    address: "", city: "", country: "", tier: "Gold",
    password: "", confirm: "", newsletter: true, terms: false,
  });
  const [regErrors, setRegErrors] = useState({});

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const switchMode = (m) => {
    setMode(m); setRegStep(1); setServerError(""); setSuccessMsg("");
    setLoginErrors({}); setRegErrors({}); setForgotError("");
  };

  const inputStyle = (err) => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${err ? "#e85d5d" : "rgba(212,175,55,0.25)"}`,
    color: "#fff", padding: "13px 16px", fontFamily: "'DM Sans',sans-serif",
    fontSize: "0.88rem", width: "100%", outline: "none", borderRadius: 6,
    transition: "border-color 0.25s",
  });
  const labelStyle = { fontSize: "0.68rem", letterSpacing: 2, color: "#777", display: "block", marginBottom: 5, textTransform: "uppercase" };
  const errStyle   = { color: "#e85d5d", fontSize: "0.7rem", marginTop: 4 };

  // ── Login ──────────────────────────────────────────────────────────────────
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setLoginErrors((p) => ({ ...p, [name]: "" }));
  };
  const validateLogin = () => {
    const errs = {};
    if (!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
    if (!loginData.password) errs.password = "Password is required";
    return errs;
  };
  const handleLogin = async () => {
    const errs = validateLogin();
    if (Object.keys(errs).length) { setLoginErrors(errs); return; }
    setLoading(true); setServerError("");
    await new Promise((r) => setTimeout(r, 900));
    try {
      const user = authStore.login(loginData.email, loginData.password);
      setLoading(false);
      onSuccess(user, "login");
    } catch (e) {
      setLoading(false);
      setServerError(e.message);
    }
  };

  // ── Register ───────────────────────────────────────────────────────────────
  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setRegErrors((p) => ({ ...p, [name]: "" }));
  };
  const validateRegStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!regData.firstName.trim()) errs.firstName = "Required";
      if (!regData.lastName.trim())  errs.lastName  = "Required";
      if (!regData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
      if (!regData.phone.trim()) errs.phone = "Required";
      if (!regData.dob)          errs.dob   = "Date of birth required";
    }
    if (step === 2) {
      if (!regData.idNumber.trim()) errs.idNumber = "ID number required";
      if (!regData.address.trim())  errs.address  = "Required";
      if (!regData.city.trim())     errs.city     = "Required";
      if (!regData.country.trim())  errs.country  = "Required";
    }
    if (step === 3) {
      if (!regData.password || regData.password.length < 8) errs.password = "Minimum 8 characters";
      if (regData.password !== regData.confirm)              errs.confirm  = "Passwords do not match";
      if (!regData.terms) errs.terms = "You must accept the terms to continue";
    }
    return errs;
  };
  const handleRegNext = async () => {
    const errs = validateRegStep(regStep);
    if (Object.keys(errs).length) { setRegErrors(errs); return; }
    setRegErrors({});
    if (regStep < 3) { setRegStep((s) => s + 1); return; }
    setLoading(true); setServerError("");
    await new Promise((r) => setTimeout(r, 1100));
    try {
      const user = authStore.register(regData);
      setLoading(false);
      onSuccess(user, "register");
    } catch (e) {
      setLoading(false);
      setServerError(e.message);
    }
  };

  // ── Forgot ─────────────────────────────────────────────────────────────────
  const handleForgot = async () => {
    if (!forgotEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setForgotError("Please enter a valid email address"); return;
    }
    setLoading(true); setForgotError("");
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSuccessMsg(`A password reset link has been sent to ${forgotEmail}`);
  };

  const Spinner = () => (
    <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
  );

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 16px", overflowY: "auto" }}
    >
      <div style={{ background: "linear-gradient(160deg,#111,#0a0a0a)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16, width: "100%", maxWidth: 480, position: "relative", boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.08)", animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div style={{ height: 3, background: "linear-gradient(90deg,transparent,#d4af37,transparent)", borderRadius: "16px 16px 0 0" }} />

        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.06)", border: "none", color: "#888", fontSize: 18, cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.15)"; e.currentTarget.style.color = "#d4af37"; }}
          onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#888"; }}>
          ✕
        </button>

        <div style={{ padding: "32px 36px 36px" }}>
          {/* Brand */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#d4af37", letterSpacing: 5, marginBottom: 4 }}>ANVI</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: 3, color: "#555" }}>RESORT & SPA</div>
          </div>

          {/* Tab toggle */}
          {mode !== "forgot" && (
            <div style={{ display: "flex", gap: 0, marginBottom: 28, border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, overflow: "hidden" }}>
              {["login", "register"].map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  style={{ flex: 1, background: mode === m ? "linear-gradient(135deg,#d4af37,#f0c840)" : "transparent", color: mode === m ? "#000" : "#888", border: "none", padding: "11px 0", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: mode === m ? 600 : 400, transition: "all 0.25s" }}
                >
                  {m === "login" ? "Sign In" : "Join"}
                </button>
              ))}
            </div>
          )}

          {/* Server error / success */}
          {serverError && (
            <div style={{ background: "rgba(232,93,93,0.1)", border: "1px solid rgba(232,93,93,0.3)", borderRadius: 6, padding: "10px 14px", marginBottom: 18, color: "#e85d5d", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚠️</span>{serverError}
            </div>
          )}
          {successMsg && (
            <div style={{ background: "rgba(30,200,160,0.1)", border: "1px solid rgba(30,200,160,0.3)", borderRadius: 6, padding: "10px 14px", marginBottom: 18, color: "#1ec8a0", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 8 }}>
              <span>✅</span>{successMsg}
            </div>
          )}

          {/* ── LOGIN ── */}
          {mode === "login" && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 6 }}>Welcome back</h2>
              <p style={{ color: "#555", fontSize: "0.8rem", marginBottom: 24 }}>Sign in to access your membership benefits and reservations.</p>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email Address</label>
                <input name="email" type="email" value={loginData.email} onChange={handleLoginChange} placeholder="your@email.com" style={inputStyle(loginErrors.email)}
                  onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                  onBlur={(e)  => (e.target.style.borderColor = loginErrors.email ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                {loginErrors.email && <p style={errStyle}>{loginErrors.email}</p>}
              </div>

              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input name="password" type={showPass ? "text" : "password"} value={loginData.password} onChange={handleLoginChange} placeholder="••••••••" style={{ ...inputStyle(loginErrors.password), paddingRight: 44 }}
                    onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                    onBlur={(e)  => (e.target.style.borderColor = loginErrors.password ? "#e85d5d" : "rgba(212,175,55,0.25)")}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                  <button onClick={() => setShowPass((p) => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
                {loginErrors.password && <p style={errStyle}>{loginErrors.password}</p>}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.75rem", color: "#666" }}>
                  <input type="checkbox" name="remember" checked={loginData.remember} onChange={handleLoginChange} style={{ accentColor: "#d4af37", width: 14, height: 14 }} />
                  Remember me
                </label>
                <button onClick={() => switchMode("forgot")} style={{ background: "none", border: "none", color: "#d4af37", fontSize: "0.75rem", cursor: "pointer", letterSpacing: 0.5 }}>
                  Forgot password?
                </button>
              </div>

              <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: loading ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "14px", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><Spinner />Signing in…</> : "Sign In →"}
              </button>

              <div style={{ marginTop: 20, textAlign: "center" }}>
                <span style={{ color: "#555", fontSize: "0.78rem" }}>Don't have an account? </span>
                <button onClick={() => switchMode("register")} style={{ background: "none", border: "none", color: "#d4af37", fontSize: "0.78rem", cursor: "pointer", textDecoration: "underline" }}>
                  Join Anvi
                </button>
              </div>
            </div>
          )}

          {/* ── REGISTER ── */}
          {mode === "register" && (
            <div>
              {/* Step indicators */}
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28, position: "relative" }}>
                {[1, 2, 3].map((s, i) => (
                  <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                    {i < 2 && <div style={{ position: "absolute", top: 14, left: "50%", right: "-50%", height: 1, background: s < regStep ? "#d4af37" : "rgba(212,175,55,0.2)", zIndex: 0 }} />}
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: s < regStep ? "#d4af37" : s === regStep ? "linear-gradient(135deg,#d4af37,#f0c840)" : "rgba(255,255,255,0.06)", border: `2px solid ${s <= regStep ? "#d4af37" : "rgba(212,175,55,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", color: s <= regStep ? "#000" : "#555", fontWeight: 700, zIndex: 1, position: "relative", transition: "all 0.3s" }}>
                      {s < regStep ? "✓" : s}
                    </div>
                    <div style={{ fontSize: "0.6rem", color: s === regStep ? "#d4af37" : "#555", marginTop: 5, letterSpacing: 1, textAlign: "center", textTransform: "uppercase" }}>
                      {["Personal", "Details", "Security"][i]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Step 1 */}
              {regStep === 1 && (
                <>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 20 }}>Personal Information</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input name="firstName" value={regData.firstName} onChange={handleRegChange} placeholder="Arjun" style={inputStyle(regErrors.firstName)}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.firstName ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      {regErrors.firstName && <p style={errStyle}>{regErrors.firstName}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input name="lastName" value={regData.lastName} onChange={handleRegChange} placeholder="Mehta" style={inputStyle(regErrors.lastName)}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.lastName ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      {regErrors.lastName && <p style={errStyle}>{regErrors.lastName}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input name="email" type="email" value={regData.email} onChange={handleRegChange} placeholder="arjun@example.com" style={inputStyle(regErrors.email)}
                      onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                      onBlur={(e)  => (e.target.style.borderColor = regErrors.email ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                    {regErrors.email && <p style={errStyle}>{regErrors.email}</p>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input name="phone" value={regData.phone} onChange={handleRegChange} placeholder="+91 98765 43210" style={inputStyle(regErrors.phone)}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.phone ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      {regErrors.phone && <p style={errStyle}>{regErrors.phone}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Date of Birth</label>
                      <input name="dob" type="date" value={regData.dob} onChange={handleRegChange} style={inputStyle(regErrors.dob)}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.dob ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      {regErrors.dob && <p style={errStyle}>{regErrors.dob}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ ...labelStyle, marginBottom: 10 }}>Membership Tier</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {MEMBERSHIP_TIERS.map((t) => (
                        <button key={t.tier} onClick={() => setRegData((p) => ({ ...p, tier: t.tier }))}
                          style={{ flex: 1, border: `1px solid ${regData.tier === t.tier ? t.color : "rgba(212,175,55,0.15)"}`, background: regData.tier === t.tier ? `${t.color}18` : "rgba(255,255,255,0.02)", borderRadius: 8, padding: "10px 6px", cursor: "pointer", transition: "all 0.25s", textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
                          <div style={{ fontSize: "0.68rem", color: regData.tier === t.tier ? t.color : "#666", letterSpacing: 1, fontWeight: 600 }}>{t.tier}</div>
                          <div style={{ fontSize: "0.6rem", color: "#555", marginTop: 2 }}>{t.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2 */}
              {regStep === 2 && (
                <>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 20 }}>Identity & Address</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>ID Type</label>
                      <select name="idType" value={regData.idType} onChange={handleRegChange} style={{ ...inputStyle(false), cursor: "pointer" }}>
                        {["Passport", "Aadhar Card", "PAN Card", "Driving Licence", "Voter ID"].map((t) => <option key={t} style={{ background: "#111" }}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>ID Number</label>
                      <input name="idNumber" value={regData.idNumber} onChange={handleRegChange} placeholder="AB1234567" style={inputStyle(regErrors.idNumber)}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.idNumber ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      {regErrors.idNumber && <p style={errStyle}>{regErrors.idNumber}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Street Address</label>
                    <input name="address" value={regData.address} onChange={handleRegChange} placeholder="12 MG Road, Indiranagar" style={inputStyle(regErrors.address)}
                      onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                      onBlur={(e)  => (e.target.style.borderColor = regErrors.address ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                    {regErrors.address && <p style={errStyle}>{regErrors.address}</p>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input name="city" value={regData.city} onChange={handleRegChange} placeholder="Bengaluru" style={inputStyle(regErrors.city)}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.city ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      {regErrors.city && <p style={errStyle}>{regErrors.city}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input name="country" value={regData.country} onChange={handleRegChange} placeholder="India" style={inputStyle(regErrors.country)}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.country ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      {regErrors.country && <p style={errStyle}>{regErrors.country}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Nationality</label>
                    <input name="nationality" value={regData.nationality} onChange={handleRegChange} placeholder="Indian" style={inputStyle(false)}
                      onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                      onBlur={(e)  => (e.target.style.borderColor = "rgba(212,175,55,0.25)")} />
                  </div>
                </>
              )}

              {/* Step 3 */}
              {regStep === 3 && (
                <>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 20 }}>Security & Preferences</h2>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Create Password</label>
                    <div style={{ position: "relative" }}>
                      <input name="password" type={showPass ? "text" : "password"} value={regData.password} onChange={handleRegChange} placeholder="Minimum 8 characters" style={{ ...inputStyle(regErrors.password), paddingRight: 44 }}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.password ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      <button onClick={() => setShowPass((p) => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>
                        {showPass ? "🙈" : "👁"}
                      </button>
                    </div>
                    {regData.password && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: "flex", gap: 4, marginBottom: 3 }}>
                          {[1, 2, 3, 4].map((lvl) => {
                            const strength = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(regData.password)).length;
                            return <div key={lvl} style={{ flex: 1, height: 3, borderRadius: 2, background: lvl <= strength ? (strength <= 1 ? "#e85d5d" : strength <= 2 ? "#f0a028" : strength <= 3 ? "#1ec8a0" : "#d4af37") : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />;
                          })}
                        </div>
                        <div style={{ fontSize: "0.65rem", color: "#555" }}>
                          {[/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(regData.password)).length <= 1 ? "Weak" : [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(regData.password)).length <= 2 ? "Fair" : [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(regData.password)).length <= 3 ? "Good" : "Strong"} password
                        </div>
                      </div>
                    )}
                    {regErrors.password && <p style={errStyle}>{regErrors.password}</p>}
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Confirm Password</label>
                    <div style={{ position: "relative" }}>
                      <input name="confirm" type={showConfirm ? "text" : "password"} value={regData.confirm} onChange={handleRegChange} placeholder="Re-enter your password" style={{ ...inputStyle(regErrors.confirm), paddingRight: 44 }}
                        onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                        onBlur={(e)  => (e.target.style.borderColor = regErrors.confirm ? "#e85d5d" : "rgba(212,175,55,0.25)")} />
                      <button onClick={() => setShowConfirm((p) => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>
                        {showConfirm ? "🙈" : "👁"}
                      </button>
                    </div>
                    {regErrors.confirm && <p style={errStyle}>{regErrors.confirm}</p>}
                  </div>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 10 }}>
                    <input type="checkbox" name="newsletter" checked={regData.newsletter} onChange={handleRegChange} style={{ accentColor: "#d4af37", width: 15, height: 15, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.5 }}>Send me exclusive offers, new room launches, and members-only events</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 4 }}>
                    <input type="checkbox" name="terms" checked={regData.terms} onChange={handleRegChange} style={{ accentColor: "#d4af37", width: 15, height: 15, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.5 }}>
                      I agree to the <span style={{ color: "#d4af37", cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "#d4af37", cursor: "pointer" }}>Privacy Policy</span>
                    </span>
                  </label>
                  {regErrors.terms && <p style={errStyle}>{regErrors.terms}</p>}
                </>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {regStep > 1 && (
                  <button onClick={() => { setRegStep((s) => s - 1); setRegErrors({}); }}
                    style={{ flex: 1, background: "rgba(255,255,255,0.04)", color: "#888", border: "1px solid rgba(255,255,255,0.1)", padding: "13px", fontSize: "0.75rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", borderRadius: 8, transition: "all 0.2s" }}>
                    ← Back
                  </button>
                )}
                <button onClick={handleRegNext} disabled={loading}
                  style={{ flex: 2, background: loading ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "13px", fontSize: "0.75rem", letterSpacing: 2, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {loading ? <><Spinner />Creating account…</> : regStep < 3 ? "Continue →" : "Create My Account"}
                </button>
              </div>
            </div>
          )}

          {/* ── FORGOT ── */}
          {mode === "forgot" && (
            <div>
              <button onClick={() => switchMode("login")} style={{ background: "none", border: "none", color: "#d4af37", fontSize: "0.75rem", cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
                ← Back to Sign In
              </button>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 8 }}>Reset Password</h2>
              <p style={{ color: "#555", fontSize: "0.8rem", marginBottom: 24 }}>Enter your registered email and we'll send you a secure reset link.</p>
              {!successMsg ? (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" value={forgotEmail} onChange={(e) => { setForgotEmail(e.target.value); setForgotError(""); }}
                      placeholder="your@email.com" style={inputStyle(forgotError)}
                      onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                      onBlur={(e)  => (e.target.style.borderColor = forgotError ? "#e85d5d" : "rgba(212,175,55,0.25)")}
                      onKeyDown={(e) => e.key === "Enter" && handleForgot()} />
                    {forgotError && <p style={errStyle}>{forgotError}</p>}
                  </div>
                  <button onClick={handleForgot} disabled={loading}
                    style={{ width: "100%", background: loading ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "14px", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    {loading ? <><Spinner />Sending…</> : "Send Reset Link"}
                  </button>
                </>
              ) : (
                <button onClick={() => switchMode("login")}
                  style={{ width: "100%", background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "14px", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, marginTop: 12 }}>
                  Back to Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
