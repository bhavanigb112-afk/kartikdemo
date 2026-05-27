import { AMENITIES } from "../data/constants";

export default function AmenitiesPage({ onDiningOpen }) {
  return (
    <section id="Amenities" style={{ background: "#080808" }}>
      <p className="section-sub">World-Class Facilities</p>
      <h2 className="section-title">Amenities</h2>
      <div className="divider" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {AMENITIES.map((am, i) => (
          <div
            key={i}
            className="card"
            style={{
              padding: "28px 24px", textAlign: "left", borderRadius: 8,
              cursor: am.name === "Fine Dining" ? "pointer" : "default",
              position: "relative",
            }}
            onClick={() => { if (am.name === "Fine Dining") onDiningOpen(); }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(212,175,55,0.04)";
              if (am.name === "Fine Dining") e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.borderColor = "";
            }}
          >
            {am.name === "Fine Dining" && (
              <div style={{ position: "absolute", top: 14, right: 14, background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "3px 10px", borderRadius: 3, fontSize: "0.58rem", fontWeight: 700, letterSpacing: 1.5, fontFamily: "'DM Sans',sans-serif" }}>
                EXPLORE →
              </div>
            )}
            <div style={{ fontSize: 36, marginBottom: 14 }}>{am.icon}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", color: "#d4af37", marginBottom: 8 }}>{am.name}</h3>
            <p style={{ color: "#666", fontSize: "0.8rem", lineHeight: 1.75 }}>{am.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
