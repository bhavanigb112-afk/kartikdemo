import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MuteButton } from "../components/UI";
import { MEMBERSHIP_TIERS } from "../data/constants";

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://instagram.com", color: "#E1306C", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { name: "Facebook", url: "https://facebook.com", color: "#1877F2", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: "X / Twitter", url: "https://twitter.com", color: "#fff", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { name: "LinkedIn", url: "https://linkedin.com", color: "#0A66C2", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: "YouTube", url: "https://youtube.com", color: "#FF0000", svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { name: "WhatsApp", url: "https://wa.me/", color: "#25D366", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
];

export default function HomePage({ heroMuted, setHeroMuted, formData, setFormData, onAuthOpen, currentUser, scrollTo }) {
  const heroVideoRef = useRef(null);
  const navigate = useNavigate();

  const handleFormChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        id="Home"
        style={{ padding: 0, position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        <video
          ref={heroVideoRef}
          autoPlay loop playsInline muted={heroMuted}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          src="VID-20260524-WA0001_1_.mp4"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.75) 50%,rgba(8,8,8,0.99) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 82, right: 20, zIndex: 10 }}>
          <MuteButton muted={heroMuted} onToggle={() => setHeroMuted((m) => !m)} />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "70px 24px 0", maxWidth: 960, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 className="fade-up" style={{ fontSize: "clamp(3rem,9vw,7rem)", fontWeight: 300, letterSpacing: "0.08em", lineHeight: 1.05, animationDelay: "0.4s", color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.9)", marginBottom: 4 }}>ANVI</h1>
          <p className="fade-up" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "clamp(1.4rem,4vw,2.8rem)", color: "#d4af37", letterSpacing: 4, animationDelay: "0.5s", marginBottom: 20, fontWeight: 300 }}>Resort &amp; Spa</p>

          {/* Owner avatar */}
          <div className="fade-up" style={{ animationDelay: "0.55s", marginBottom: 18 }}>
            <div style={{ width: 108, height: 108, borderRadius: "50%", border: "3px solid #d4af37", boxShadow: "0 0 0 6px rgba(212,175,55,0.18),0 10px 40px rgba(0,0,0,0.8)", overflow: "hidden" }}>
              <img src="bgbomg.jpeg" alt="Anvi Owner" style={{ width: "100%", height: "130%", objectFit: "cover", objectPosition: "center 10%", marginTop: "-8%" }} />
            </div>
          </div>

          {/* Social links */}
          <div className="fade-up" style={{ animationDelay: "0.6s", display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
            {SOCIAL_LINKS.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(212,175,55,0.35)", borderRadius: 20, padding: "7px 16px", textDecoration: "none", transition: "all 0.3s", color: s.color }}
                onMouseOver={(e) => { e.currentTarget.style.background = `${s.color}22`; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                {s.svg}
                <span style={{ fontSize: "0.65rem", color: "#fff", letterSpacing: 1, whiteSpace: "nowrap", fontFamily: "'DM Sans'" }}>{s.name}</span>
              </a>
            ))}
          </div>

          <div className="fade-up" style={{ width: 100, height: 1, background: "linear-gradient(to right,transparent,#d4af37,transparent)", margin: "0 auto 18px", animationDelay: "0.65s" }} />

          <p className="fade-up" style={{ margin: "0 auto 24px", maxWidth: 560, fontSize: "1.05rem", fontWeight: 300, color: "#fff", lineHeight: 1.9, animationDelay: "0.7s", textShadow: "0 1px 10px rgba(0,0,0,0.95)" }}>
            Where timeless luxury meets the art of living. 32 extraordinary suites. One unforgettable world.
          </p>

          <div className="fade-up" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animationDelay: "0.85s", marginBottom: 28 }}>
            <button className="btn-gold" onClick={() => scrollTo("Rooms")}>Explore 32 Suites</button>
            <button className="btn-outline" onClick={onAuthOpen}>Become a Member</button>
            <button className="btn-outline" onClick={() => scrollTo("Contact")}>Reserve Now</button>
          </div>

          {/* Stats bar */}
          <div className="fade-up" style={{ display: "flex", gap: 0, justifyContent: "center", animationDelay: "1s", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 4, overflow: "hidden", maxWidth: 700, width: "100%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)" }}>
            {[["32+","Unique Rooms"],["5","Restaurants"],["12","Awards"],["24/7","Butler"],["3:1","Staff Ratio"]].map(([n, l], i) => (
              <div key={l} style={{ flex: 1, textAlign: "center", padding: "16px 8px", borderRight: i < 4 ? "1px solid rgba(212,175,55,0.12)" : "none" }}>
                <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: "1.6rem", color: "#d4af37", fontWeight: 300, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: "0.56rem", letterSpacing: 2, color: "#ccc", marginTop: 4 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick reserve bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, background: "rgba(8,8,8,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(212,175,55,0.2)", padding: "14px 40px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ color: "#d4af37", fontSize: "0.65rem", letterSpacing: 3, whiteSpace: "nowrap" }}>QUICK RESERVE</span>
          <div style={{ width: 1, height: 28, background: "rgba(212,175,55,0.2)" }} />
          {[["CHECK-IN","checkin","date"],["CHECK-OUT","checkout","date"]].map(([label, name, type]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: "0.58rem", letterSpacing: 2, color: "#555" }}>{label}</span>
              <input type={type} name={name} value={formData[name]} onChange={handleFormChange}
                style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(212,175,55,0.3)", borderRadius: 0, padding: "4px 8px", color: "#ccc", fontSize: "0.82rem", width: 130, outline: "none" }} />
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontSize: "0.58rem", letterSpacing: 2, color: "#555" }}>GUESTS</span>
            <select name="guests" value={formData.guests} onChange={handleFormChange}
              style={{ background: "#111", border: "none", borderBottom: "1px solid rgba(212,175,55,0.3)", borderRadius: 0, padding: "4px 8px", color: "#ccc", fontSize: "0.82rem", width: 110, outline: "none" }}>
              {[1,2,3,4,5,6].map((n) => <option key={n} style={{ background: "#111" }}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
            </select>
          </div>
          <button className="btn-gold" style={{ padding: "10px 28px", fontSize: "0.72rem", letterSpacing: 2 }} onClick={() => scrollTo("Contact")}>
            Check Availability →
          </button>
        </div>
      </section>

      {/* ═══ FEATURE HIGHLIGHTS ═══ */}
      <div style={{ background: "#050505", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
          {[
            { icon: "🏆", title: "Forbes 5-Star",   sub: "Certified luxury since 2012" },
            { icon: "🍽️", title: "Michelin Dining", sub: "Chef-crafted seasonal menus" },
            { icon: "♻️", title: "Eco-Certified",   sub: "Carbon neutral since 2023" },
            { icon: "🛎️", title: "24/7 Butler",     sub: "3 staff members per guest" },
          ].map((f, i) => (
            <div key={i} style={{ padding: "28px 24px", display: "flex", alignItems: "center", gap: 16, borderRight: i < 3 ? "1px solid rgba(212,175,55,0.08)" : "none", transition: "background 0.3s", cursor: "default" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.04)")}
              onMouseOut={(e)  => (e.currentTarget.style.background = "transparent")}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#d4af37", marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: "0.72rem", color: "#555", lineHeight: 1.4 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT ═══ */}
      <section style={{ background: "#0a0a0a", padding: "120px 24px", textAlign: "left" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Image collage */}
          <div style={{ position: "relative", height: 600 }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "75%", height: "68%", overflow: "hidden", borderRadius: 2, border: "1px solid rgba(212,175,55,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=85" alt="Anvi Lobby" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(212,175,55,0.08), transparent)" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "62%", height: "52%", overflow: "hidden", borderRadius: 2, border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
              <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=85" alt="Anvi Pool" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
            </div>
            <div style={{ position: "absolute", top: "42%", right: "18%", background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "18px 22px", borderRadius: 3, textAlign: "center", boxShadow: "0 16px 48px rgba(212,175,55,0.35)", zIndex: 5 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 300, lineHeight: 1 }}>18</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: 3, fontWeight: 600, marginTop: 3 }}>YEARS OF<br/>EXCELLENCE</div>
            </div>
          </div>
          {/* Text */}
          <div>
            <p style={{ color: "#d4af37", fontSize: "0.7rem", letterSpacing: 6, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 20 }}>Our Story</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 300, lineHeight: 1.15, marginBottom: 28, color: "#f5f0e8", letterSpacing: 1 }}>
              A Legacy Forged<br /><em style={{ color: "#d4af37", fontStyle: "italic" }}>in Gold</em>
            </h2>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right,#d4af37,transparent)", marginBottom: 28 }} />
            <p style={{ color: "#888", lineHeight: 1.95, fontSize: "0.92rem", marginBottom: 20 }}>
              Founded in 2008 by visionary hotelier <strong style={{ color: "#ccc" }}>Vikram Nair</strong>, Anvi was conceived as a counter to the era's sterile luxury — a place where every surface, scent, and sound was intentional.
            </p>
            <p style={{ color: "#888", lineHeight: 1.95, fontSize: "0.92rem", marginBottom: 20 }}>
              Nestled in the heart of Bengaluru, our 32 bespoke rooms and suites draw from Indian heritage while embracing global sophistication.
            </p>
            <p style={{ color: "#888", lineHeight: 1.95, fontSize: "0.92rem", marginBottom: 40 }}>
              Today, Anvi holds <strong style={{ color: "#d4af37" }}>12 international awards</strong>, a Michelin recognition for our flagship restaurant, and the loyalty of guests from over 60 countries.
            </p>
            <div style={{ display: "flex", gap: 40, marginBottom: 44 }}>
              {[["Michelin","Recognition"],["Forbes","5-Star Rated"],["Condé Nast","Top 10 India"]].map(([title, sub]) => (
                <div key={title}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: "#d4af37", fontWeight: 400, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: 2, color: "#555" }}>{sub.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-gold" onClick={() => scrollTo("Rooms")}>Explore Our Rooms</button>
              <button className="btn-outline" onClick={onAuthOpen}>Join Membership</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <div style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.07),rgba(212,175,55,0.02))", borderTop: "1px solid rgba(212,175,55,0.12)", borderBottom: "1px solid rgba(212,175,55,0.12)", padding: "52px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 0, textAlign: "center" }}>
          {[["32+","Unique Rooms & Suites"],["60+","Countries Represented"],["98%","Guest Return Rate"],["12","Global Awards"],["5★","Michelin Recognition"]].map(([num, label], i) => (
            <div key={label} style={{ borderRight: i < 4 ? "1px solid rgba(212,175,55,0.1)" : "none", padding: "8px 0" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4vw,3rem)", color: "#d4af37", fontWeight: 300, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: 2.5, color: "#666", marginTop: 8, lineHeight: 1.4 }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ MEMBERSHIP CTA ═══ */}
      <div style={{ background: "linear-gradient(135deg,#0d0900,#080808)", borderTop: "1px solid rgba(212,175,55,0.15)", borderBottom: "1px solid rgba(212,175,55,0.15)", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#d4af37", fontSize: "0.65rem", letterSpacing: 6, marginBottom: 10, fontFamily: "'DM Sans',sans-serif" }}>EXCLUSIVE MEMBERSHIP</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, color: "#f5f0e8", marginBottom: 12 }}>Join the Anvi Circle</h3>
            <p style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 520 }}>Gold, Platinum & Diamond tiers with exclusive perks — from guaranteed suite upgrades to personal butlers and helipad transfers.</p>
            <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
              {MEMBERSHIP_TIERS.map((t) => (
                <div key={t.tier} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: t.color, fontWeight: 600, letterSpacing: 1 }}>{t.tier}</div>
                    <div style={{ fontSize: "0.62rem", color: "#555" }}>{t.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <button className="btn-gold" onClick={onAuthOpen} style={{ whiteSpace: "nowrap" }}>
              {currentUser ? `Welcome, ${currentUser.firstName} ✨` : "Join Now →"}
            </button>
            {!currentUser && (
              <button onClick={onAuthOpen} style={{ background: "none", border: "none", color: "#555", fontSize: "0.72rem", cursor: "pointer", letterSpacing: 1 }}>
                Already a member? Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ═══ AWARDS MARQUEE ═══ */}
      <div style={{ background: "#0a0a0a", borderTop: "1px solid rgba(212,175,55,0.1)", borderBottom: "1px solid rgba(212,175,55,0.1)", padding: "48px 0", overflow: "hidden" }}>
        <p style={{ textAlign: "center", color: "#d4af37", fontSize: "0.65rem", letterSpacing: 6, textTransform: "uppercase", marginBottom: 36, fontFamily: "'DM Sans',sans-serif" }}>Awards & Recognition</p>
        <div style={{ display: "flex", gap: 0, animation: "marqueeScroll 32s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, rep) => (
            <div key={rep} style={{ display: "flex", gap: 0, flexShrink: 0 }}>
              {[
                ["🏆","World's Best Hotels 2024","Travel + Leisure"],
                ["⭐","Michelin Recommended","Guide Michelin 2025"],
                ["🌟","Top 10 Luxury Resorts India","Condé Nast Traveller"],
                ["💎","Forbes 5-Star Certified","Forbes Travel Guide"],
                ["🥇","Best Spa Resort — Asia","Tatler Spa Awards"],
                ["🎖","Sustainable Luxury Award","Green Globe Certified"],
                ["👑","Best Urban Hotel","Luxury Travel Magazine"],
                ["🏅","Readers' Choice Award","Condé Nast 2024"],
              ].map(([icon, award, by]) => (
                <div key={award + rep} style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "0 52px", borderRight: "1px solid rgba(212,175,55,0.1)", flexShrink: 0 }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#f0ede0", fontWeight: 400 }}>{award}</div>
                    <div style={{ fontSize: "0.65rem", letterSpacing: 2.5, color: "#555", marginTop: 2 }}>{by.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ACHIEVEMENTS ═══ */}
      <section style={{ background: "#080808", padding: "110px 24px", textAlign: "center" }}>
        <p style={{ color: "#d4af37", fontSize: "0.7rem", letterSpacing: 6, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 16 }}>Recognition & Milestones</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, letterSpacing: 2, marginBottom: 12, color: "#f5f0e8" }}>Our Achievements</h2>
        <div style={{ width: 60, height: 1, background: "linear-gradient(to right,transparent,#d4af37,transparent)", margin: "0 auto 20px" }} />
        <p style={{ color: "#666", maxWidth: 560, margin: "0 auto 64px", lineHeight: 1.85, fontSize: "0.88rem" }}>
          Built on a foundation of passion, dedication, and an unwavering commitment to excellence.
        </p>

        <div style={{ maxWidth: 1100, margin: "0 auto 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", textAlign: "left" }}>
          {/* Founder photo */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", position: "relative" }}>
              <img src="IMG-20260522-WA0001.jpg" alt="Anvi Resort Founder" style={{ width: "100%", height: 520, objectFit: "cover", objectPosition: "center top", filter: "brightness(0.9)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: "#f5f0e8", fontWeight: 300 }}>Anvi Vikram Nair</div>
                <div style={{ fontSize: "0.68rem", color: "#d4af37", letterSpacing: 3, marginTop: 4 }}>FOUNDER & VISIONARY · ANVI RESORT & SPA</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: -16, right: -16, background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "16px 18px", borderRadius: 8, textAlign: "center", boxShadow: "0 12px 40px rgba(212,175,55,0.4)", zIndex: 5 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, lineHeight: 1 }}>18</div>
              <div style={{ fontSize: "0.55rem", letterSpacing: 2, fontWeight: 700, marginTop: 2 }}>YEARS OF<br/>EXCELLENCE</div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p style={{ color: "#d4af37", fontSize: "0.7rem", letterSpacing: 6, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 16 }}>The Visionary Behind Anvi</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 300, lineHeight: 1.2, marginBottom: 24, color: "#f5f0e8" }}>
              A Dream Built on<br /><em style={{ color: "#d4af37" }}>Gold Standards</em>
            </h3>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right,#d4af37,transparent)", marginBottom: 24 }} />
            <p style={{ color: "#888", lineHeight: 1.95, fontSize: "0.9rem", marginBottom: 32 }}>
              What began as a bold vision in 2008 has become one of India's most celebrated luxury destinations. Every decision reflects an obsession with the extraordinary.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { year: "2008", milestone: "Founded Anvi Resort & Spa in Bengaluru with just 12 rooms" },
                { year: "2012", milestone: "Received Forbes 5-Star certification — first in Karnataka" },
                { year: "2016", milestone: "Expanded to 32 unique suites; launched the Infinity Spa" },
                { year: "2019", milestone: "Michelin Guide recognition for flagship restaurant Prana" },
                { year: "2022", milestone: "Named India's #1 Luxury Resort by Condé Nast Traveller" },
                { year: "2024", milestone: "Celebrated 60,000 guests from 60+ countries worldwide" },
                { year: "2025", milestone: "Carbon neutral certification & 12th international award" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "4px 10px", borderRadius: 4, fontSize: "0.65rem", fontWeight: 700, letterSpacing: 1, flexShrink: 0, marginTop: 2 }}>{a.year}</div>
                  <div style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.6, borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 10, flex: 1 }}>{a.milestone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { icon: "🏆", num: "12",   label: "International Awards", sub: "Across 8 categories globally" },
            { icon: "⭐", num: "4.9",  label: "Average Guest Rating",  sub: "Across all platforms" },
            { icon: "🌍", num: "60+",  label: "Countries Represented", sub: "Guests from every continent" },
            { icon: "🛎️", num: "98%",  label: "Return Guest Rate",     sub: "The highest in India" },
            { icon: "👨‍🍳", num: "5★",   label: "Michelin Recognition",  sub: "Restaurant Prana, since 2019" },
            { icon: "♻️", num: "100%", label: "Carbon Neutral",         sub: "Green Globe Certified 2023" },
          ].map((s, i) => (
            <div key={i}
              style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 10, padding: "28px 20px", textAlign: "center", transition: "all 0.3s", cursor: "default" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.08)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(212,175,55,0.04)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", color: "#d4af37", fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "#f5f0e8", fontSize: "0.78rem", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
              <div style={{ color: "#555", fontSize: "0.65rem", marginTop: 4, lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
