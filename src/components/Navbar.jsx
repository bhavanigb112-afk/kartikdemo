import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../data/constants";

export default function Navbar({ currentUser, onAuthOpen, onShowUserBanner }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine active link from URL hash or path
  const activeLink = NAV_LINKS.find((l) => location.hash === `#${l}`) || "Home";

  const handleNav = (link) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${link}`);
    } else {
      const el = document.getElementById(link);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      // update hash without navigation
      window.history.replaceState(null, "", `#${link}`);
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.1)" : "none",
          transition: "all 0.4s", padding: "0 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 70,
        }}
      >
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
          onClick={() => handleNav("Home")}
        >
          <img
            src="bgbomg.jpeg" alt="Anvi"
            style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid #d4af37", boxShadow: "0 0 12px rgba(212,175,55,0.4)", flexShrink: 0 }}
          />
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 400, letterSpacing: 6, color: "#d4af37", textShadow: "0 0 20px rgba(212,175,55,0.4)" }}>
            ANVI
            <span style={{ color: "#fff", fontSize: 12, letterSpacing: 3, marginLeft: 8, verticalAlign: "middle", fontWeight: 300 }}>
              RESORT & SPA
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              style={{
                background: "none", border: "none",
                color: activeLink === link ? "#d4af37" : "#fff",
                cursor: "pointer", fontSize: "0.72rem", letterSpacing: 2.5,
                textTransform: "uppercase", fontFamily: "'DM Sans'", fontWeight: 400,
                transition: "color 0.3s",
                borderBottom: activeLink === link ? "1px solid #d4af37" : "1px solid transparent",
                paddingBottom: 2,
              }}
            >
              {link}
            </button>
          ))}

          {currentUser ? (
            <button
              onClick={onShowUserBanner}
              style={{
                background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.35)",
                color: "#d4af37", cursor: "pointer", fontSize: "0.7rem", letterSpacing: 2,
                textTransform: "uppercase", fontFamily: "'DM Sans'",
                padding: "8px 16px", borderRadius: 20, transition: "all 0.25s",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(212,175,55,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                {currentUser.firstName[0]}
              </span>
              {currentUser.firstName}
            </button>
          ) : (
            <button
              onClick={onAuthOpen}
              style={{
                background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000",
                border: "none", cursor: "pointer", fontSize: "0.7rem", letterSpacing: 2,
                textTransform: "uppercase", fontFamily: "'DM Sans'", fontWeight: 600,
                padding: "9px 20px", borderRadius: 20, transition: "all 0.25s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseOut={(e)  => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Sign In / Join
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", color: "#d4af37", fontSize: 24, cursor: "pointer" }}
          className="hamburger"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", top: 70, left: 0, right: 0, background: "rgba(8,8,8,0.99)",
            zIndex: 999, padding: "28px 0", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 24, borderBottom: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              style={{ background: "none", border: "none", color: activeLink === link ? "#d4af37" : "#fff", cursor: "pointer", fontSize: "0.9rem", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans'" }}
            >
              {link}
            </button>
          ))}
          {!currentUser && (
            <button
              onClick={() => { setMenuOpen(false); onAuthOpen(); }}
              style={{ background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", cursor: "pointer", fontSize: "0.8rem", letterSpacing: 2, padding: "10px 28px", borderRadius: 20, fontFamily: "'DM Sans'", fontWeight: 600 }}
            >
              Sign In / Join
            </button>
          )}
        </div>
      )}
    </>
  );
}
