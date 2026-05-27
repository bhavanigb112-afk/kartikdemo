import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../data/constants";

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (link) => {
    if (window.location.pathname !== "/") {
      navigate(`/#${link}`);
    } else {
      const el = document.getElementById(link);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(212,175,55,0.1)", padding: "60px 40px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#d4af37", letterSpacing: 5, marginBottom: 8 }}>ANVI</div>
            <div style={{ fontSize: "0.62rem", letterSpacing: 3, color: "#555", marginBottom: 18 }}>RESORT & SPA</div>
            <p style={{ color: "#555", fontSize: "0.78rem", lineHeight: 1.9, maxWidth: 280 }}>
              Where timeless luxury meets the art of living. Bengaluru's most celebrated five-star retreat.
            </p>
          </div>

          {/* Nav columns */}
          {[
            { title: "Navigate",    links: NAV_LINKS },
            { title: "Experiences", links: ["Private Dining", "Spa & Wellness", "Water Sports", "Cultural Events", "Wine Tastings", "Art Tours"] },
            { title: "Information", links: ["About Anvi", "Press & Media", "Careers", "Partner With Us", "Privacy Policy", "Terms of Service"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: "0.62rem", letterSpacing: 3, color: "#d4af37", marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}>
                {col.title.toUpperCase()}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {col.links.map((l) => (
                  <li key={l} style={{ marginBottom: 10 }}>
                    <button
                      onClick={() => scrollToSection(l)}
                      style={{ background: "none", border: "none", color: "#555", fontSize: "0.78rem", cursor: "pointer", fontFamily: "'DM Sans'", transition: "color 0.2s", padding: 0 }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#d4af37")}
                      onMouseOut={(e)  => (e.currentTarget.style.color = "#555")}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(212,175,55,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ color: "#444", fontSize: "0.72rem" }}>© 2025 Anvi Resort & Spa. All rights reserved.</div>
          <div style={{ color: "#444", fontSize: "0.72rem", display: "flex", gap: 24 }}>
            <span>Forbes 5-Star Certified</span>
            <span>·</span>
            <span>Michelin Recognised</span>
            <span>·</span>
            <span>Green Globe Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
