import { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "../data/constants";
import { Stars } from "../components/UI";

export default function TestimonialsPage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const autoRef = useRef(null);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, []);

  return (
    <section id="Testimonials" style={{ background: "#080808" }}>
      <p className="section-sub">Guest Voices</p>
      <h2 className="section-title">Testimonials</h2>
      <div className="divider" />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Featured carousel */}
        <div style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 12, padding: "44px 48px", position: "relative", minHeight: 220, marginBottom: 16 }}>
          <div style={{ fontSize: 60, color: "rgba(212,175,55,0.15)", position: "absolute", top: 20, left: 32, fontFamily: "serif", lineHeight: 1 }}>"</div>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ display: i === testimonialIdx ? "block" : "none", animation: i === testimonialIdx ? "fadeIn 0.6s ease" : "none" }}>
              <Stars n={t.rating} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", color: "#f0ede0", lineHeight: 1.8, margin: "18px 0 24px", fontStyle: "italic", fontWeight: 300 }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img src={t.img} alt={t.name} style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid rgba(212,175,55,0.4)", objectFit: "cover" }} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ color: "#f5f0e8", fontWeight: 500, fontSize: "0.92rem" }}>{t.name}</div>
                    <div style={{ color: "#888", fontSize: "0.75rem" }}>{t.role}</div>
                    <div style={{ color: "#666", fontSize: "0.7rem", marginTop: 2 }}>{t.country}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.68rem", color: "#d4af37", letterSpacing: 1, border: "1px solid rgba(212,175,55,0.25)", padding: "4px 12px", borderRadius: 20, marginBottom: 4 }}>{t.stay}</div>
                  <div style={{ fontSize: "0.62rem", color: "#555", letterSpacing: 1 }}>{t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 56 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIdx(i)}
              style={{ width: i === testimonialIdx ? 28 : 8, height: 8, borderRadius: 4, background: i === testimonialIdx ? "#d4af37" : "rgba(212,175,55,0.2)", border: "none", cursor: "pointer", transition: "all 0.35s" }}
            />
          ))}
        </div>

        {/* Rating stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 56, maxWidth: 700, margin: "0 auto 56px" }}>
          {[["4.9 / 5","Overall Rating","Based on 2,400+ reviews"],["98%","Would Recommend","To friends & family"],["4.8 / 5","TripAdvisor Score","#1 in Bengaluru"]].map(([num, label, sub]) => (
            <div key={label} style={{ textAlign: "center", background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 8, padding: "20px 12px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: "#d4af37", fontWeight: 300 }}>{num}</div>
              <div style={{ fontSize: "0.72rem", color: "#f5f0e8", marginTop: 4, letterSpacing: 0.5 }}>{label}</div>
              <div style={{ fontSize: "0.62rem", color: "#555", marginTop: 3 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* All testimonials grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 10, padding: "20px", textAlign: "left", transition: "all 0.3s", cursor: "default" }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"; e.currentTarget.style.background = "rgba(212,175,55,0.04)"; }}
              onMouseOut={(e)  => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.1)";  e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <img src={t.img} alt={t.name} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(212,175,55,0.3)" }} />
                <div>
                  <div style={{ color: "#f5f0e8", fontSize: "0.82rem", fontWeight: 500 }}>{t.name}</div>
                  <div style={{ color: "#666", fontSize: "0.68rem" }}>{t.country}</div>
                </div>
              </div>
              <Stars n={t.rating} />
              <p style={{ color: "#888", fontSize: "0.76rem", lineHeight: 1.7, margin: "10px 0 12px", fontStyle: "italic" }}>
                "{t.text.slice(0, 120)}{t.text.length > 120 ? "…" : ""}"
              </p>
              <div style={{ fontSize: "0.62rem", color: "#d4af37", letterSpacing: 0.5 }}>{t.stay} · {t.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
