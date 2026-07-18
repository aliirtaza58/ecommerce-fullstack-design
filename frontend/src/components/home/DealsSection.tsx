"use client";

import { useState, useEffect } from "react";
import { Zap, ArrowRight } from "lucide-react";

const deals = [
  { name: "Smart Watches", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=80", discount: "-25%", badge: "Hot" },
  { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80", discount: "-15%", badge: "Deal" },
  { name: "GoPro Cameras", image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=300&q=80", discount: "-40%", badge: "Epic" },
  { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", discount: "-25%", badge: "Top" },
  { name: "DSLR Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80", discount: "-30%", badge: "Sale" },
  { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80", discount: "-20%", badge: "New" },
];

function useCountdown(targetSeconds: number) {
  const [time, setTime] = useState(targetSeconds);
  useEffect(() => {
    const t = setInterval(() => setTime(prev => (prev <= 0 ? targetSeconds : prev - 1)), 1000);
    return () => clearInterval(t);
  }, [targetSeconds]);
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  return [h, m, s];
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 10,
      padding: "8px 12px",
      minWidth: 52,
    }}>
      <span style={{ fontWeight: 800, fontSize: "1.2rem", lineHeight: 1, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
        {String(value).padStart(2, "0")}
      </span>
      <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
    </div>
  );
}

export default function DealsSection() {
  const [h, m, s] = useCountdown(4 * 3600 + 13 * 60 + 34);

  return (
    <section style={{ maxWidth: 1440, margin: "24px auto 0", padding: "0 24px" }}>
      <div style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(135deg, #0d0d25 0%, #130d28 50%, #0a1628 100%)",
        border: "1px solid rgba(99,102,241,0.2)",
        display: "flex",
        flexDirection: "row",
      }}>
        {/* ── LEFT: Title + Timer ── */}
        <div style={{
          padding: "28px 24px",
          minWidth: 220,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(99,102,241,0.08)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow */}
          <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", top: -60, left: -60 }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#f43f5e,#e11d48)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={14} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#f43f5e", textTransform: "uppercase", letterSpacing: "0.08em" }}>Flash Sale</span>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Deals &amp; Offers</h2>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>Premium electronics</p>

            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Ends in</p>
            <div style={{ display: "flex", gap: 6 }}>
              <CountdownBox value={h as number} label="hrs" />
              <CountdownBox value={m as number} label="min" />
              <CountdownBox value={s as number} label="sec" />
            </div>

            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20,
              color: "#818cf8", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none",
              transition: "gap 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
              onMouseLeave={e => (e.currentTarget.style.gap = "6px")}
            >
              View all deals <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* ── RIGHT: Product Cards ── */}
        <div style={{ display: "flex", overflowX: "auto", flex: 1 }} className="no-scrollbar">
          {deals.map((deal, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 148,
                padding: "20px 12px",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                cursor: "pointer",
                transition: "background 0.25s, transform 0.25s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Badge */}
              <div style={{
                position: "absolute", top: 10, left: 10,
                padding: "2px 8px", borderRadius: 999,
                background: "rgba(244,63,94,0.15)",
                border: "1px solid rgba(244,63,94,0.3)",
                fontSize: "0.65rem", fontWeight: 700, color: "#f43f5e",
              }}>{deal.badge}</div>

              {/* Image */}
              <div style={{
                width: 100, height: 100,
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12,
                overflow: "hidden",
                padding: 8,
              }}>
                <img src={deal.image} alt={deal.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", mixBlendMode: "luminosity", filter: "brightness(0.9) saturate(0.8)" }} />
              </div>

              {/* Name */}
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", fontWeight: 600, textAlign: "center", marginBottom: 8, lineHeight: 1.3 }}>{deal.name}</p>

              {/* Discount Badge */}
              <div style={{
                padding: "4px 12px",
                borderRadius: 999,
                background: "linear-gradient(135deg, rgba(244,63,94,0.2), rgba(220,38,38,0.15))",
                border: "1px solid rgba(244,63,94,0.35)",
                color: "#f87171",
                fontSize: "0.8rem",
                fontWeight: 800,
              }}>
                {deal.discount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
