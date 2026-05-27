import { OFFERS } from "../data/constants";
import { Countdown } from "../components/UI";

export default function OffersPage({ scrollTo }) {
  return (
    <section id="Offers" style={{ background: "#060606" }}>
      <p className="section-sub">Limited Time</p>
      <h2 className="section-title">Exclusive Offers</h2>
      <div className="divider" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
        {OFFERS.map((o, i) => (
          <div key={i} className="card" style={{ padding: "28px 24px", textAlign: "left", background: o.gradient, borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{o.emoji}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ background: o.color, color: "#fff", padding: "4px 12px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 1, borderRadius: 3, marginBottom: 4 }}>{o.discount}</div>
                <div style={{ fontSize: "0.62rem", color: "#666", letterSpacing: 1 }}>{o.tag.toUpperCase()}</div>
              </div>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", color: "#f5f0e8", marginBottom: 8 }}>{o.title}</h3>
            <p style={{ color: "#777", fontSize: "0.78rem", lineHeight: 1.7, marginBottom: 16 }}>{o.desc}</p>
            <Countdown days={o.ends} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: "#d4af37", fontWeight: 300 }}>${o.sale}</span>
              <span style={{ color: "#555", fontSize: "0.85rem", textDecoration: "line-through" }}>${o.original}</span>
              <span style={{ color: "#888", fontSize: "0.75rem" }}>/night</span>
            </div>
            <button
              onClick={() => scrollTo("Contact")}
              className="btn-gold"
              style={{ width: "100%", padding: "12px", fontSize: "0.72rem", letterSpacing: 2, clipPath: "none", borderRadius: 6 }}
            >
              Claim Offer →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
