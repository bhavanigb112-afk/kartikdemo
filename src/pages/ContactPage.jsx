import { useState } from "react";
import QnA from "../components/QnA";

export default function ContactPage({ currentUser, onAuthOpen }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", checkin: "", checkout: "",
    room: "", guests: "2", requests: "",
  });
  const [formSent, setFormSent] = useState(false);

  const handleFormChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = () => {
    if (formData.name && formData.email && formData.checkin) {
      setFormSent(true);
      setTimeout(() => setFormSent(false), 5000);
    }
  };

  return (
    <section id="Contact" style={{ background: "#0e0e0e" }}>
      <p className="section-sub">Get In Touch</p>
      <h2 className="section-title">Reserve Your Stay</h2>
      <div className="divider" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, maxWidth: 1100, margin: "0 auto 72px", textAlign: "left" }}>
        {/* Form */}
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: "#f5f0e8", marginBottom: 20, fontWeight: 300 }}>Send Us a Message</h3>
          {formSent ? (
            <div style={{ background: "rgba(30,200,160,0.08)", border: "1px solid rgba(30,200,160,0.3)", borderRadius: 8, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: "#1ec8a0", marginBottom: 8 }}>Message Received</h3>
              <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.7 }}>Our concierge will contact you within 2 hours to confirm your reservation.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["name","Your Full Name","text"],["email","Email Address","email"],["phone","Phone Number","tel"]].map(([name, ph, type]) => (
                <div key={name}><input type={type} name={name} placeholder={ph} value={formData[name]} onChange={handleFormChange} style={{ borderRadius: 6 }} /></div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input type="date" name="checkin"  value={formData.checkin}  onChange={handleFormChange} style={{ borderRadius: 6 }} />
                <input type="date" name="checkout" value={formData.checkout} onChange={handleFormChange} style={{ borderRadius: 6 }} />
              </div>
              <select name="room" value={formData.room} onChange={handleFormChange} style={{ borderRadius: 6 }}>
                <option value="">Select a room type</option>
                {["Deluxe","Suite","Villa","Penthouse","Bungalow","Studio","Other"].map((r) => (
                  <option key={r} style={{ background: "#111" }}>{r}</option>
                ))}
              </select>
              <textarea name="requests" placeholder="Special requests or questions…" value={formData.requests} onChange={handleFormChange} rows={4} style={{ resize: "vertical", borderRadius: 6 }} />
              <button onClick={handleFormSubmit} className="btn-gold" style={{ width: "100%", padding: "15px", fontSize: "0.78rem", letterSpacing: 3, clipPath: "none", borderRadius: 8 }}>
                Send Reservation Request →
              </button>
            </div>
          )}
        </div>

        {/* Contact info */}
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: "#f5f0e8", marginBottom: 20, fontWeight: 300 }}>Contact & Location</h3>
          {[
            { icon: "📍", label: "Address",        val: "12, Luxury Lane, Indiranagar, Bengaluru 560038" },
            { icon: "📞", label: "Reservations",   val: "+91 80 4567 8900" },
            { icon: "✉️", label: "Email",           val: "stay@anviresort.com" },
            { icon: "⏰", label: "Concierge Hours", val: "24 hours, 7 days a week" },
            { icon: "🚁", label: "Helipad Arrivals",val: "Advance booking required · Pad H-07" },
            { icon: "🚗", label: "Valet & Transfers",val: "Complimentary for all guests on arrival" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: "0.62rem", letterSpacing: 2, color: "#555", marginBottom: 3 }}>{c.label.toUpperCase()}</div>
                <div style={{ color: "#ccc", fontSize: "0.86rem" }}>{c.val}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24, background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8, padding: "20px 22px" }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: 3, color: "#d4af37", marginBottom: 12 }}>BECOME A MEMBER</div>
            <p style={{ color: "#666", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: 16 }}>
              Join the Anvi Circle and unlock exclusive rates, priority reservations, and bespoke privileges.
            </p>
            <button onClick={onAuthOpen} className="btn-gold" style={{ clipPath: "none", borderRadius: 6, padding: "11px 24px", fontSize: "0.72rem" }}>
              {currentUser ? `Welcome, ${currentUser.firstName} ✨` : "Join Now →"}
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ maxWidth: 1100, margin: "0 auto 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, textAlign: "left" }}>
          <div style={{ width: 40, height: 1, background: "linear-gradient(to right,transparent,#d4af37)" }} />
          <p style={{ color: "#d4af37", fontSize: "0.68rem", letterSpacing: 5, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>Find Us</p>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,#d4af37,transparent)" }} />
        </div>

        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", position: "relative" }}>
          <iframe
            title="Anvi Resort Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9274!2d77.6408!3d12.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1716000000000"
            width="100%" height="420"
            style={{ border: 0, display: "block", filter: "invert(92%) hue-rotate(180deg) brightness(0.85) contrast(0.9)" }}
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ position: "absolute", top: 20, left: 20, background: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 10, padding: "14px 18px", maxWidth: 260 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>📍</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#d4af37", fontWeight: 400 }}>Anvi Resort & Spa</span>
            </div>
            <div style={{ color: "#888", fontSize: "0.72rem", lineHeight: 1.6 }}>12, Luxury Lane, Indiranagar<br/>Bengaluru, Karnataka 560038</div>
            <a href="https://maps.google.com/?q=Indiranagar+Bengaluru" target="_blank" rel="noreferrer"
              style={{ display: "inline-block", marginTop: 10, background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "6px 16px", borderRadius: 4, fontSize: "0.65rem", letterSpacing: 2, textDecoration: "none", fontWeight: 600, fontFamily: "'DM Sans'" }}>
              GET DIRECTIONS →
            </a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginTop: 0, border: "1px solid rgba(212,175,55,0.1)", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
          {[
            { icon: "✈️", how: "By Air",   detail: "Kempegowda Intl Airport · 35 min by car" },
            { icon: "🚇", how: "By Metro", detail: "Indiranagar Station · 5 min walk" },
            { icon: "🚗", how: "By Road",  detail: "100 Feet Road, Indiranagar · Valet available" },
            { icon: "🚁", how: "By Heli",  detail: "Private helipad on-site · Pre-book required" },
          ].map((t, i) => (
            <div key={i} style={{ padding: "18px 20px", background: "rgba(212,175,55,0.03)", borderRight: i < 3 ? "1px solid rgba(212,175,55,0.08)" : "none", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ color: "#d4af37", fontSize: "0.72rem", letterSpacing: 1, marginBottom: 4, fontFamily: "'DM Sans'" }}>{t.how}</div>
              <div style={{ color: "#555", fontSize: "0.68rem", lineHeight: 1.5 }}>{t.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "left" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "#d4af37", fontSize: "0.68rem", letterSpacing: 5, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Guest Questions</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 300, color: "#f5f0e8", marginBottom: 0 }}>Frequently Asked Questions</h3>
        </div>
        <QnA />
      </div>
    </section>
  );
}
