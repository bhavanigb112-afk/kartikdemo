import { useState, useRef } from "react";
import { GALLERY_IMGS } from "../data/constants";
import { MuteButton } from "../components/UI";

export default function GalleryPage({ galleryMuted, setGalleryMuted }) {
  const [lightbox, setLightbox]       = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const galleryVideoRef               = useRef(null);

  const openLightbox  = (idx) => { setLightboxIdx(idx); setLightbox(true); };
  const lightboxPrev  = () => setLightboxIdx((i) => (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length);
  const lightboxNext  = () => setLightboxIdx((i) => (i + 1) % GALLERY_IMGS.length);

  return (
    <section id="Gallery" style={{ background: "#0a0a0a" }}>
      <p className="section-sub">Visual Journey</p>
      <h2 className="section-title">Gallery</h2>
      <div className="divider" />

      {/* Featured video */}
      <div style={{ maxWidth: 1200, margin: "0 auto 16px", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(212,175,55,0.18)", lineHeight: 0, position: "relative" }}>
        <video
          ref={galleryVideoRef}
          src="VID-20260524-WA0003.mp4"
          autoPlay loop playsInline muted={galleryMuted}
          style={{ width: "100%", maxHeight: "520px", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#d4af37,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#d4af37,transparent)" }} />
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 10 }}>
          <MuteButton muted={galleryMuted} onToggle={() => setGalleryMuted((m) => !m)} />
        </div>
      </div>

      {/* Masonry grid */}
      <div style={{ columns: "3 280px", gap: 12, maxWidth: 1200, margin: "0 auto" }}>
        {GALLERY_IMGS.map((src, i) => (
          <div key={i} className="gallery-item" style={{ marginBottom: 12, breakInside: "avoid" }} onClick={() => openLightbox(i)}>
            <img src={src} alt={`Gallery ${i + 1}`} style={{ display: "block", width: "100%" }} />
            <div className="gallery-overlay">
              <div style={{ color: "#d4af37", fontSize: 24, marginBottom: 6 }}>🔍</div>
              <div style={{ color: "#fff", fontSize: "0.7rem", letterSpacing: 2 }}>VIEW</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={lightboxPrev} style={{ position: "absolute", left: 24, background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", color: "#d4af37", width: 50, height: 50, borderRadius: "50%", cursor: "pointer", fontSize: 20 }}>‹</button>
          <img src={GALLERY_IMGS[lightboxIdx]} alt="" style={{ maxWidth: "85vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 4 }} />
          <button onClick={lightboxNext} style={{ position: "absolute", right: 24, background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", color: "#d4af37", width: 50, height: 50, borderRadius: "50%", cursor: "pointer", fontSize: 20 }}>›</button>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>✕</button>
          <div style={{ position: "absolute", bottom: 24, color: "#555", fontSize: "0.78rem", letterSpacing: 2 }}>
            {lightboxIdx + 1} / {GALLERY_IMGS.length}
          </div>
        </div>
      )}
    </section>
  );
}
