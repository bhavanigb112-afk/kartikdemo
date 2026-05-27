import { POLICIES, POLICY_COLORS } from "../data/constants";

export default function PoliciesPage() {
  return (
    <section id="Policies" style={{ background: "#0a0a0a" }}>
      <p className="section-sub">Hotel Guidelines</p>
      <h2 className="section-title">Policies</h2>
      <div className="divider" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 20, maxWidth: 1100, margin: "0 auto", textAlign: "left" }}>
        {POLICIES.map((p, i) => {
          const c = POLICY_COLORS[p.type];
          return (
            <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: c.icon, fontWeight: 400 }}>{p.title}</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {p.rules.map((r, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0", borderBottom: j < p.rules.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span style={{ color: c.icon, flexShrink: 0, marginTop: 2 }}>›</span>
                    <span style={{ color: "#888", fontSize: "0.8rem", lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
