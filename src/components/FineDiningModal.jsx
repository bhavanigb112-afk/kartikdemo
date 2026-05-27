import { useState } from "react";

const DINING_IMAGES = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85", label: "Restaurant Prana — Main Hall", tag: "Interior" },
  { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=85", label: "Private Dining Room — The Vault", tag: "Interior" },
  { src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=85", label: "Candlelit Terrace Dining", tag: "Interior" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85", label: "Seven-Course Tasting Menu", tag: "Signature Menu" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85", label: "Chef's Aged Duck Breast", tag: "Signature Dish" },
  { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=85", label: "Artisan Indian Spiced Plating", tag: "Signature Dish" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=85", label: "Seared Tenderloin — Chef's Signature", tag: "Signature Dish" },
  { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=85", label: "Pan-Seared Sea Bass", tag: "Signature Dish" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85", label: "The Prana Breakfast Spread", tag: "Luxury Food" },
  { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=85", label: "Farm-to-Table Seasonal Plate", tag: "Luxury Food" },
  { src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=85", label: "Heritage Grain & Truffle Risotto", tag: "Luxury Food" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=85", label: "House-Made Bread & Amuse-Bouche", tag: "Starters" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=85", label: "Garden Herb Salad — Opening Course", tag: "Starters" },
  { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=85", label: "Sommelier's Cocktail Selection", tag: "Beverages" },
  { src: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=800&q=85", label: "Rare Vintage Wine Pairing", tag: "Beverages" },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85", label: "Artisan Dessert — Dark Chocolate Torte", tag: "Desserts" },
  { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85", label: "Mango Saffron Panna Cotta", tag: "Desserts" },
  { src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=85", label: "Petit Fours & Mignardises", tag: "Desserts" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85", label: "Chef's Table — Live Kitchen Counter", tag: "Interior" },
  { src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=85", label: "Rooftop Terrace — Sunset Service", tag: "Interior" },
];

const TAG_COLOR = {
  "Interior":       { bg: "rgba(91,141,238,0.15)",  border: "rgba(91,141,238,0.4)",  text: "#5b8dee" },
  "Signature Menu": { bg: "rgba(212,175,55,0.15)",  border: "rgba(212,175,55,0.4)",  text: "#d4af37" },
  "Signature Dish": { bg: "rgba(232,93,138,0.15)",  border: "rgba(232,93,138,0.4)",  text: "#e85d8a" },
  "Luxury Food":    { bg: "rgba(30,200,160,0.15)",  border: "rgba(30,200,160,0.4)",  text: "#1ec8a0" },
  "Beverages":      { bg: "rgba(166,124,255,0.15)", border: "rgba(166,124,255,0.4)", text: "#a67cff" },
  "Desserts":       { bg: "rgba(240,160,40,0.15)",  border: "rgba(240,160,40,0.4)",  text: "#f0a028" },
  "Starters":       { bg: "rgba(30,200,160,0.15)",  border: "rgba(30,200,160,0.4)",  text: "#1ec8a0" },
};

const DINING_EXPERIENCES = [
  { icon: "🍷", title: "Wine Pairing Dinner",     desc: "7-course menu paired with rare labels by our resident sommelier. Fridays & Saturdays, 7:30 PM.", price: "₹12,500 per person" },
  { icon: "👨‍🍳", title: "Chef's Table Experience", desc: "Intimate 6-seat kitchen counter with live preparation and personalised tasting menu.",          price: "₹18,000 per person" },
  { icon: "🌅", title: "Sunrise Terrace Breakfast", desc: "Curated farm breakfast on the private terrace with views of the city horizon.",                price: "₹3,500 per person"  },
  { icon: "🕯️", title: "Candlelit Private Dining", desc: "Book The Vault for up to 12 guests — ideal for anniversaries and intimate celebrations.",       price: "From ₹45,000"       },
  { icon: "🌿", title: "Farm-to-Table Journey",    desc: "Visit our partner farms at sunrise, then return for a lunch crafted from what you harvested.",   price: "₹8,500 per person"  },
  { icon: "🍫", title: "Artisan Chocolate Masterclass", desc: "2-hour session with our pastry chef followed by a 4-course dessert tasting menu.",          price: "₹5,500 per person"  },
];

export default function FineDiningModal({ onClose, onReserve }) {
  const [activeImg, setActiveImg] = useState(null);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", overflowY: "auto" }}
    >
      <div style={{ background: "#0e0e0e", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16, maxWidth: 900, width: "100%", maxHeight: "92vh", overflowY: "auto", position: "relative", boxShadow: "0 40px 120px rgba(0,0,0,0.9)", animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div style={{ height: 3, background: "linear-gradient(90deg,transparent,#d4af37,transparent)", borderRadius: "16px 16px 0 0" }} />

        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.2)"; e.currentTarget.style.color = "#d4af37"; }}
          onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}>
          ✕
        </button>

        {/* Hero */}
        <div style={{ position: "relative", height: 340, overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90" alt="Restaurant Prana" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,14,14,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 28, left: 36, right: 36 }}>
            <div style={{ color: "#d4af37", fontSize: "0.65rem", letterSpacing: 6, fontFamily: "'DM Sans',sans-serif", marginBottom: 8 }}>MICHELIN RECOGNISED · RESTAURANT PRANA</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 300, color: "#f5f0e8", margin: "0 0 8px", letterSpacing: 1 }}>Fine Dining</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", maxWidth: 520, lineHeight: 1.7, margin: 0 }}>
              Prana is a sensory journey through India's culinary heritage, reimagined through the lens of modern gastronomy. Michelin-recognised since 2019.
            </p>
          </div>
          <div style={{ position: "absolute", top: 24, left: 36, background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "6px 16px", borderRadius: 4, fontSize: "0.68rem", fontWeight: 700, letterSpacing: 2, fontFamily: "'DM Sans',sans-serif" }}>
            ⭐ MICHELIN RECOGNISED
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "32px 36px 40px" }}>
          {/* Info strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8, overflow: "hidden", marginBottom: 32 }}>
            {[
              { icon: "🍽️", label: "Cuisine", value: "Modern Indian & Continental" },
              { icon: "⏰", label: "Hours",   value: "7 AM – 11 PM Daily" },
              { icon: "👨‍🍳", label: "Head Chef", value: "Chef Aryan Kapoor" },
              { icon: "🪑", label: "Capacity", value: "64 Covers + Private Room" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "16px 14px", textAlign: "center", background: "rgba(212,175,55,0.03)", borderRight: i < 3 ? "1px solid rgba(212,175,55,0.1)" : "none" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: "0.6rem", color: "#555", letterSpacing: 2, marginBottom: 4, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: "0.76rem", color: "#ccc", lineHeight: 1.4 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <p style={{ color: "#888", lineHeight: 1.9, fontSize: "0.88rem", marginBottom: 10 }}>
            Our flagship restaurant sources ingredients from <strong style={{ color: "#ccc" }}>18 local farms</strong> and presents a seasonal seven-course tasting menu. The wine programme features <strong style={{ color: "#ccc" }}>over 400 labels</strong> personally curated by our resident sommelier.
          </p>
          <p style={{ color: "#888", lineHeight: 1.9, fontSize: "0.88rem", marginBottom: 32 }}>
            Private dining in <em style={{ color: "#d4af37" }}>The Vault</em> — our intimate underground dining room — accommodates up to 12 guests for bespoke chef's table experiences.
          </p>

          {/* Gallery */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 36, height: 1, background: "linear-gradient(to right, transparent, #d4af37)" }} />
            <p style={{ color: "#d4af37", fontSize: "0.65rem", letterSpacing: 5, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", margin: 0 }}>Gallery</p>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #d4af37, transparent)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 32 }}>
            {DINING_IMAGES.map((img, i) => {
              const tc = TAG_COLOR[img.tag] || TAG_COLOR["Luxury Food"];
              return (
                <div key={i} onClick={() => setActiveImg(img)}
                  style={{ position: "relative", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(212,175,55,0.12)", cursor: "pointer", aspectRatio: "4/3", transition: "border-color 0.3s, transform 0.3s" }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseOut={(e)  => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)"; e.currentTarget.style.transform = "scale(1)"; }}>
                  <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10px 12px" }}>
                    <div style={{ display: "inline-block", background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text, fontSize: "0.58rem", letterSpacing: 1.5, padding: "2px 8px", borderRadius: 3, marginBottom: 5, fontFamily: "'DM Sans',sans-serif", width: "fit-content" }}>{img.tag.toUpperCase()}</div>
                    <div style={{ color: "#f0ede0", fontSize: "0.72rem", lineHeight: 1.4, fontFamily: "'Cormorant Garamond',serif" }}>{img.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Experiences */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 36, height: 1, background: "linear-gradient(to right, transparent, #d4af37)" }} />
            <p style={{ color: "#d4af37", fontSize: "0.65rem", letterSpacing: 5, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", margin: 0 }}>Dining Experiences</p>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #d4af37, transparent)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
            {DINING_EXPERIENCES.map((exp, i) => (
              <div key={i}
                style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 8, padding: "18px 16px", transition: "all 0.3s" }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.08)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)"; }}
                onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(212,175,55,0.04)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.1)"; }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{exp.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#f5f0e8", marginBottom: 6 }}>{exp.title}</div>
                <p style={{ color: "#666", fontSize: "0.74rem", lineHeight: 1.65, marginBottom: 10 }}>{exp.desc}</p>
                <div style={{ color: "#d4af37", fontSize: "0.7rem", letterSpacing: 1, fontFamily: "'DM Sans',sans-serif" }}>{exp.price}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={onReserve}
              style={{ background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "14px 36px", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8 }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e)  => (e.currentTarget.style.opacity = "1")}>
              Reserve a Table →
            </button>
            <button onClick={onClose}
              style={{ background: "transparent", color: "#d4af37", border: "1px solid rgba(212,175,55,0.4)", padding: "14px 28px", fontSize: "0.75rem", letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", borderRadius: 8, transition: "all 0.25s" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.08)")}
              onMouseOut={(e)  => (e.currentTarget.style.background = "transparent")}>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeImg && (
        <div onClick={() => setActiveImg(null)} style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(0,0,0,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <button onClick={() => setActiveImg(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>✕</button>
          <img src={activeImg.src} alt={activeImg.label} style={{ maxWidth: "85vw", maxHeight: "80vh", objectFit: "contain", borderRadius: 8 }} />
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: "#f0ede0" }}>{activeImg.label}</div>
            <div style={{ color: "#d4af37", fontSize: "0.65rem", letterSpacing: 2, marginTop: 4 }}>{activeImg.tag.toUpperCase()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
