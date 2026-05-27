import { useState, useRef } from "react";
import { ROOMS, CATEGORIES } from "../data/constants";
import { MuteButton } from "../components/UI";

export default function RoomsPage({ roomsMuted, setRoomsMuted, scrollTo }) {
  const [roomCategory, setRoomCategory] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const roomsVideoRef = useRef(null);

  const filteredRooms =
    roomCategory === "All"
      ? ROOMS
      : ROOMS.filter(
          (r) =>
            r.category === roomCategory ||
            (roomCategory === "Other" &&
              !["Classic","Deluxe","Suite","Villa","Penthouse","Bungalow","Studio","Loft","Treehouse"].includes(r.category))
        );

  return (
    <div id="Rooms" style={{ background: "#0e0e0e" }}>
      {/* Video banner */}
      <div style={{ position: "relative", width: "100%", height: "500px", overflow: "hidden" }}>
        <video
          ref={roomsVideoRef}
          autoPlay muted={roomsMuted} loop playsInline
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          src="room.mp4"
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(14,14,14,1) 100%)" }} />
        <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
          <MuteButton muted={roomsMuted} onToggle={() => setRoomsMuted((m) => !m)} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
          <p style={{ color: "#d4af37", fontSize: "0.72rem", letterSpacing: 6, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 16 }}>Accommodation</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, letterSpacing: 2, marginBottom: 16, color: "#f5f0e8" }}>32 Rooms & Suites</h2>
          <div style={{ width: 60, height: 1, background: "linear-gradient(to right,transparent,#d4af37,transparent)", marginBottom: 20 }} />
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", fontWeight: 300, maxWidth: 480, lineHeight: 1.8 }}>
            From intimate studios to palatial villas — every room is a world of its own.
          </p>
        </div>
      </div>

      <section style={{ padding: "60px 24px 100px", textAlign: "center" }}>
        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", maxWidth: 900, margin: "0 auto 48px" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setRoomCategory(cat)}
              style={{
                background: roomCategory === cat ? "linear-gradient(135deg,#d4af37,#f0c840)" : "rgba(255,255,255,0.06)",
                color: roomCategory === cat ? "#000" : "#888",
                border: `1px solid ${roomCategory === cat ? "transparent" : "rgba(212,175,55,0.2)"}`,
                padding: "8px 18px", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase",
                cursor: "pointer", borderRadius: 3, fontFamily: "'DM Sans'", transition: "all 0.25s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Room cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
          {filteredRooms.map((room, i) => (
            <div key={room.id} className="card fade-in" style={{ animationDelay: `${i * 0.06}s`, borderRadius: 8 }}>
              <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                <img src={room.img} alt={room.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.08)")}
                  onMouseOut={(e)  => (e.target.style.transform = "scale(1)")} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.7))" }} />
                <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", color: "#d4af37", padding: "4px 12px", fontSize: "0.68rem", letterSpacing: 2, border: "1px solid rgba(212,175,55,0.3)", borderRadius: 2 }}>
                  {room.category.toUpperCase()}
                </div>
                <div style={{ position: "absolute", top: 14, right: 14, background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", padding: "5px 12px", fontSize: "0.78rem", fontWeight: 600, borderRadius: 2 }}>
                  FROM ${room.price}
                </div>
                <div style={{ position: "absolute", bottom: 12, left: 16, display: "flex", gap: 8 }}>
                  <span style={{ background: "rgba(0,0,0,0.7)", color: "#ccc", padding: "3px 10px", fontSize: "0.65rem", borderRadius: 2 }}>📐 {room.size}</span>
                  <span style={{ background: "rgba(0,0,0,0.7)", color: "#ccc", padding: "3px 10px", fontSize: "0.65rem", borderRadius: 2 }}>👥 {room.capacity}</span>
                </div>
              </div>
              <div style={{ padding: "20px 20px 22px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 400, color: "#f5f0e8", marginBottom: 8 }}>{room.name}</h3>
                <p style={{ color: "#666", fontSize: "0.78rem", lineHeight: 1.7, marginBottom: 14 }}>{room.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {room.amenities.map((a) => (
                    <span key={a} style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)", color: "#888", padding: "3px 10px", fontSize: "0.65rem", borderRadius: 20 }}>{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setSelectedRoom(room)} className="btn-outline" style={{ flex: 1, padding: "10px", fontSize: "0.68rem", letterSpacing: 2 }}>View Details</button>
                  <button onClick={() => scrollTo("Contact")} className="btn-gold" style={{ flex: 1, padding: "10px", fontSize: "0.68rem", letterSpacing: 2, clipPath: "none", borderRadius: 4 }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Room detail modal */}
      {selectedRoom && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedRoom(null); }}
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
        >
          <div style={{ background: "#111", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 12, maxWidth: 700, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setSelectedRoom(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18, zIndex: 2 }}>✕</button>
            <img src={selectedRoom.img} alt={selectedRoom.name} style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: "12px 12px 0 0" }} />
            <div style={{ padding: "28px 32px 36px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 4 }}>{selectedRoom.name}</h2>
                  <div style={{ display: "flex", gap: 16 }}>
                    <span style={{ color: "#666", fontSize: "0.78rem" }}>📐 {selectedRoom.size}</span>
                    <span style={{ color: "#666", fontSize: "0.78rem" }}>🏢 Floor: {selectedRoom.floor}</span>
                    <span style={{ color: "#666", fontSize: "0.78rem" }}>👥 Up to {selectedRoom.capacity} guests</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", color: "#d4af37", fontWeight: 300 }}>${selectedRoom.price}</div>
                  <div style={{ fontSize: "0.65rem", color: "#555", letterSpacing: 2 }}>PER NIGHT</div>
                </div>
              </div>
              <p style={{ color: "#888", lineHeight: 1.8, marginBottom: 20 }}>{selectedRoom.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {selectedRoom.amenities.map((a) => (
                  <span key={a} style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#ccc", padding: "6px 14px", fontSize: "0.75rem", borderRadius: 20 }}>{a}</span>
                ))}
              </div>
              <button
                onClick={() => { setSelectedRoom(null); scrollTo("Contact"); }}
                className="btn-gold"
                style={{ width: "100%", padding: "15px", fontSize: "0.8rem", letterSpacing: 3, clipPath: "none", borderRadius: 8 }}
              >
                Reserve This Room →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
