import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Styles
import "./styles/global.css";

// Layout components
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import AuthModal    from "./components/AuthModal";
import UserBanner   from "./components/UserBanner";
import FineDiningModal from "./components/FineDiningModal";

// Page sections (all rendered on the single "/" route, identified by anchor IDs)
import HomePage        from "./pages/HomePage";
import RoomsPage       from "./pages/RoomsPage";
import AmenitiesPage   from "./pages/AmenitiesPage";
import GalleryPage     from "./pages/GalleryPage";
import OffersPage      from "./pages/OffersPage";
import PoliciesPage    from "./pages/PoliciesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage     from "./pages/ContactPage";

// Auth store
import authStore from "./data/authStore";

// ─── Newsletter strip (used at the bottom of the main page) ──────────────────
function NewsletterStrip() {
  return (
    <div style={{ background: "linear-gradient(135deg,#0d0900,#080808)", borderTop: "1px solid rgba(212,175,55,0.15)", borderBottom: "1px solid rgba(212,175,55,0.15)", padding: "56px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#d4af37", fontSize: "0.65rem", letterSpacing: 6, marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>STAY IN THE LOOP</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 10 }}>Get Exclusive Offers & New Suite Launches</h3>
        <p style={{ color: "#666", fontSize: "0.82rem", marginBottom: 32 }}>Early access to seasonal offers, new room reveals, and members-only events.</p>
        <div style={{ display: "flex", gap: 0, maxWidth: 480, margin: "0 auto", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 3, overflow: "hidden" }}>
          <input type="email" placeholder="Your email address" style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "none", borderRadius: 0, padding: "14px 20px", color: "#fff", fontSize: "0.88rem", outline: "none" }} />
          <button className="btn-gold" style={{ borderRadius: 0, clipPath: "none", padding: "14px 28px", fontSize: "0.72rem", letterSpacing: 2, whiteSpace: "nowrap" }}>Subscribe</button>
        </div>
        <p style={{ color: "#444", fontSize: "0.7rem", marginTop: 12 }}>🔒 No spam, ever. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}

// ─── The single-page layout rendered at "/" ───────────────────────────────────
function MainLayout({
  authModal, setAuthModal,
  currentUser, setCurrentUser,
  showUserBanner, setShowUserBanner,
  authToast, setAuthToast,
  diningModal, setDiningModal,
  heroMuted, setHeroMuted,
  roomsMuted, setRoomsMuted,
  galleryMuted, setGalleryMuted,
  formData, setFormData,
}) {
  const scrollTo = useCallback((section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${section}`);
  }, []);

  const handleAuthSuccess = (user, type) => {
    setCurrentUser(user);
    setAuthModal(false);
    setShowUserBanner(true);
    const msg = type === "register"
      ? `Welcome to Anvi, ${user.firstName}! Your ${user.tier} membership is active.`
      : `Welcome back, ${user.firstName}!`;
    setAuthToast({ msg, type: "success" });
    setTimeout(() => setAuthToast(null), 4000);
    setTimeout(() => setShowUserBanner(false), 6000);
  };

  const handleLogout = () => {
    authStore.logout();
    setCurrentUser(null);
    setShowUserBanner(false);
    setAuthToast({ msg: "You've been signed out. See you soon.", type: "info" });
    setTimeout(() => setAuthToast(null), 3500);
  };

  const handleDiningReserve = useCallback(() => {
    setDiningModal(false);
    setTimeout(() => scrollTo("Contact"), 100);
  }, [scrollTo, setDiningModal]);

  return (
    <>
      {/* ── Modals ── */}
      {authModal && (
        <AuthModal
          onClose={() => setAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
      {currentUser && showUserBanner && (
        <UserBanner user={currentUser} onLogout={handleLogout} />
      )}
      {diningModal && (
        <FineDiningModal
          onClose={() => setDiningModal(false)}
          onReserve={handleDiningReserve}
        />
      )}

      {/* ── Toast notification ── */}
      {authToast && (
        <div style={{
          position: "fixed", bottom: 28, right: 24, zIndex: 9998,
          background: authToast.type === "success" ? "rgba(30,200,160,0.12)" : "rgba(91,141,238,0.12)",
          border: `1px solid ${authToast.type === "success" ? "rgba(30,200,160,0.4)" : "rgba(91,141,238,0.4)"}`,
          borderRadius: 10, padding: "14px 20px",
          color: authToast.type === "success" ? "#1ec8a0" : "#5b8dee",
          fontSize: "0.82rem", maxWidth: 320,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          animation: "toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          backdropFilter: "blur(10px)",
        }}>
          <span style={{ marginRight: 8 }}>{authToast.type === "success" ? "✅" : "ℹ️"}</span>
          {authToast.msg}
        </div>
      )}

      {/* ── Navbar ── */}
      <Navbar
        currentUser={currentUser}
        onAuthOpen={() => setAuthModal(true)}
        onShowUserBanner={() => setShowUserBanner((p) => !p)}
      />

      {/* ── Page sections (single-page, scroll-based) ── */}
      <HomePage
        heroMuted={heroMuted}
        setHeroMuted={setHeroMuted}
        formData={formData}
        setFormData={setFormData}
        onAuthOpen={() => setAuthModal(true)}
        currentUser={currentUser}
        scrollTo={scrollTo}
      />

      <RoomsPage
        roomsMuted={roomsMuted}
        setRoomsMuted={setRoomsMuted}
        scrollTo={scrollTo}
      />

      <AmenitiesPage onDiningOpen={() => setDiningModal(true)} />

      <GalleryPage
        galleryMuted={galleryMuted}
        setGalleryMuted={setGalleryMuted}
      />

      <OffersPage scrollTo={scrollTo} />

      <PoliciesPage />

      <TestimonialsPage />

      <NewsletterStrip />

      <ContactPage
        currentUser={currentUser}
        onAuthOpen={() => setAuthModal(true)}
      />

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}

// ─── Root App with Router ─────────────────────────────────────────────────────
export default function App() {
  // ── Auth state ──────────────────────────────────────────────────────────────
  const [authModal,      setAuthModal]      = useState(false);
  const [currentUser,    setCurrentUser]    = useState(null);
  const [showUserBanner, setShowUserBanner] = useState(false);
  const [authToast,      setAuthToast]      = useState(null);

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [diningModal, setDiningModal] = useState(false);

  // ── Video mute state ────────────────────────────────────────────────────────
  const [heroMuted,    setHeroMuted]    = useState(true);
  const [roomsMuted,   setRoomsMuted]   = useState(true);
  const [galleryMuted, setGalleryMuted] = useState(true);

  // ── Quick reserve form ──────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    checkin: "", checkout: "",
    room: "", guests: "2", requests: "",
  });

  const sharedState = {
    authModal,      setAuthModal,
    currentUser,    setCurrentUser,
    showUserBanner, setShowUserBanner,
    authToast,      setAuthToast,
    diningModal,    setDiningModal,
    heroMuted,      setHeroMuted,
    roomsMuted,     setRoomsMuted,
    galleryMuted,   setGalleryMuted,
    formData,       setFormData,
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main single-page app */}
        <Route path="/" element={<MainLayout {...sharedState} />} />

        {/* Catch-all → redirect home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
