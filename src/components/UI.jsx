import { useState, useEffect } from "react";

// ─── Stars ────────────────────────────────────────────────────────────────────
export function Stars({ n }) {
  return (
    <span style={{ color: "#d4af37", fontSize: 16, letterSpacing: 2 }}>
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function useCountdown(days) {
  const [time, setTime] = useState({ h: 23 - (days % 24), m: 41, s: 58 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export function Countdown({ days }) {
  const { h, m, s } = useCountdown(days);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "14px 0" }}>
      {[["Days", days], ["Hrs", pad(h)], ["Min", pad(m)], ["Sec", pad(s)]].map(([label, val]) => (
        <div
          key={label}
          style={{
            background: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 8, padding: "8px 12px",
            textAlign: "center", minWidth: 52,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, color: "#d4af37", fontVariantNumeric: "tabular-nums" }}>{val}</div>
          <div style={{ fontSize: 9, opacity: 0.6, letterSpacing: 2, marginTop: 2 }}>{label.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

// ─── MuteButton ───────────────────────────────────────────────────────────────
export function MuteButton({ muted, onToggle, style = {} }) {
  return (
    <button
      onClick={onToggle}
      title={muted ? "Unmute" : "Mute"}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(212,175,55,0.4)", borderRadius: 6,
        color: "#d4af37", cursor: "pointer", fontSize: "0.75rem",
        letterSpacing: 1.5, padding: "7px 14px",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
        transition: "background 0.2s, border-color 0.2s",
        ...style,
      }}
      onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.18)"; e.currentTarget.style.borderColor = "#d4af37"; }}
      onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(0,0,0,0.55)";      e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)"; }}
    >
      <span style={{ fontSize: 16 }}>{muted ? "🔇" : "🔊"}</span>
      <span>{muted ? "UNMUTE" : "MUTE"}</span>
    </button>
  );
}
