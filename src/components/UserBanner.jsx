export default function UserBanner({ user, onLogout }) {
  const tierColor = { Gold: "#d4af37", Platinum: "#a8d8ea", Diamond: "#f0c040" }[user.tier] || "#d4af37";

  return (
    <div
      style={{
        position: "fixed", top: 70, right: 24, zIndex: 998,
        background: "rgba(8,8,8,0.96)", backdropFilter: "blur(16px)",
        border: `1px solid ${tierColor}44`, borderRadius: 12,
        padding: "14px 18px",
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${tierColor}22`,
        animation: "slideIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        minWidth: 220,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${tierColor}22`, border: `1.5px solid ${tierColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: tierColor, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif" }}>
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div>
          <div style={{ fontSize: "0.82rem", color: "#f5f0e8", fontWeight: 500 }}>{user.firstName} {user.lastName}</div>
          <div style={{ fontSize: "0.62rem", color: tierColor, letterSpacing: 1.5 }}>{user.tier.toUpperCase()} MEMBER</div>
        </div>
      </div>

      <button
        onClick={onLogout}
        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", padding: "7px", fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", borderRadius: 6, transition: "all 0.2s" }}
        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(232,93,93,0.1)"; e.currentTarget.style.borderColor = "rgba(232,93,93,0.3)"; e.currentTarget.style.color = "#e85d5d"; }}
        onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#888"; }}
      >
        Sign Out
      </button>
    </div>
  );
}
