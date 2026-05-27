import { useState } from "react";
import { FAQ_DATA } from "../data/constants";

export default function QnA() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen((prev) => (prev === i ? null : i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {FAQ_DATA.map((item, i) => (
        <div
          key={i}
          style={{
            border: `1px solid ${open === i ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.1)"}`,
            borderRadius: 10, overflow: "hidden", transition: "border-color 0.3s",
            background: open === i ? "rgba(212,175,55,0.04)" : "rgba(255,255,255,0.02)",
          }}
        >
          <button
            onClick={() => toggle(i)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", color: open === i ? "#d4af37" : "#e0dbd0", fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
              {item.q}
            </span>
            <span style={{ color: "#d4af37", fontSize: 22, flexShrink: 0, transition: "transform 0.35s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", lineHeight: 1 }}>
              +
            </span>
          </button>

          <div style={{ maxHeight: open === i ? "400px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ padding: "0 22px 20px", color: "#888", fontSize: "0.85rem", lineHeight: 1.85, borderTop: "1px solid rgba(212,175,55,0.08)" }}>
              <div style={{ paddingTop: 14 }}>{item.a}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Still have a question */}
      <div style={{ marginTop: 16, background: "linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 10, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", color: "#f5f0e8", marginBottom: 4 }}>Still have a question?</div>
          <div style={{ color: "#666", fontSize: "0.8rem" }}>Our concierge is available 24/7 — we'd love to help.</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="tel:+918045678900" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "10px 20px", borderRadius: 6, fontSize: "0.72rem", letterSpacing: 2, textDecoration: "none", fontWeight: 600, fontFamily: "'DM Sans'" }}>
            📞 Call Us
          </a>
          <a href="mailto:stay@anviresort.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#d4af37", border: "1px solid rgba(212,175,55,0.4)", padding: "10px 20px", borderRadius: 6, fontSize: "0.72rem", letterSpacing: 2, textDecoration: "none", fontFamily: "'DM Sans'" }}>
            ✉️ Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
