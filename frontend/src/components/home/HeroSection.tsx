"use client";

import Link from "next/link";
import { ArrowRight, Zap, Tag, ShoppingBag } from "lucide-react";

const categories = [
  { label: "Automobiles", emoji: "🚗" },
  { label: "Clothes & Wear", emoji: "👗" },
  { label: "Home Interiors", emoji: "🛋️" },
  { label: "Computer & Tech", emoji: "💻" },
  { label: "Tools & Equipment", emoji: "🔧" },
  { label: "Sports & Outdoor", emoji: "⚽" },
  { label: "Animal & Pets", emoji: "🐾" },
  { label: "Machinery", emoji: "⚙️" },
  { label: "More Categories", emoji: "📦" },
];

export default function HeroSection() {
  return (
    <section style={{ maxWidth: 1440, margin: "0 auto", padding: "24px 24px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 240px", gap: 16, minHeight: 420 }} className="hero-grid">
        {/* ── LEFT: Category Sidebar ── */}
        <aside style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 16,
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }} className="hidden md:flex">
          {categories.map((cat, i) => (
            <Link
              key={cat.label}
              href="#"
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                background: i === 0 ? "rgba(99,102,241,0.12)" : "transparent",
                border: i === 0 ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: i === 0 ? 600 : 400,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                if (i !== 0) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={e => {
                if (i !== 0) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              <span style={{ fontSize: "1.05rem" }}>{cat.emoji}</span>
              <span>{cat.label}</span>
              <ArrowRight size={13} style={{ marginLeft: "auto", opacity: 0.5 }} />
            </Link>
          ))}
        </aside>

        {/* ── CENTER: Hero Banner ── */}
        <div style={{
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          minHeight: 380,
          background: "linear-gradient(135deg, #0d0d2b 0%, #1a0a3d 40%, #0a1a35 100%)",
        }}>
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=85"
            alt="Hero Electronics"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }}
          />

          {/* Mesh glow orbs */}
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 65%)", top: -150, left: -100, pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 65%)", bottom: -100, right: 50, pointerEvents: "none" }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, padding: "40px 48px", maxWidth: 480 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 14px", borderRadius: 999,
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              marginBottom: 20,
            }}>
              <Zap size={13} color="#818cf8" fill="#818cf8" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                New Arrivals 2025
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
              color: "#fff",
            }}>
              Latest Trending{" "}
              <span style={{
                background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Electronics
              </span>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: 28, lineHeight: 1.6 }}>
              Discover cutting-edge gadgets, smart devices, and premium tech accessories — all at unbeatable prices.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/category/all" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.925rem",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(99,102,241,0.5)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(99,102,241,0.6)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(99,102,241,0.5)"; }}
              >
                <ShoppingBag size={16} /> Shop Now
              </Link>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.925rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                View Deals
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 28, marginTop: 32 }}>
              {[["10K+", "Products"], ["98%", "Satisfaction"], ["Fast", "Delivery"]].map(([num, desc]) => (
                <div key={desc}>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>{num}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating product image */}
          <div style={{
            position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)",
            animation: "float 6s ease-in-out infinite",
          }} className="hidden lg:block">
            <div style={{
              width: 220, height: 220,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=85"
                alt="Featured Product"
                style={{ width: 180, height: 180, objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(99,102,241,0.5))" }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Promo Cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="hidden lg:flex">
          {/* User Card */}
          <div style={{
            borderRadius: 16,
            padding: 20,
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
            border: "1px solid rgba(99,102,241,0.2)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.1rem" }}>👋</span>
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Welcome back!</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Sign in to get deals</p>
              </div>
            </div>
            <Link href="/register" style={{ display: "block", textAlign: "center", padding: "9px", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", marginBottom: 8, boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }}>
              Join Now
            </Link>
            <Link href="/login" style={{ display: "block", textAlign: "center", padding: "9px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-default)", color: "var(--text-secondary)", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
              Sign In
            </Link>
          </div>

          {/* Promo Card 1 */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            position: "relative", minHeight: 120,
            display: "flex", alignItems: "flex-end",
            padding: 16,
            flex: 1,
          }}>
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80" alt="Deal" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(99,102,241,0.9) 0%, rgba(99,102,241,0.4) 60%, transparent 100%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Tag size={13} color="#fff" />
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Flash Deal</span>
              </div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Get $10 off with new supplier</p>
            </div>
          </div>

          {/* Promo Card 2 */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            position: "relative", minHeight: 110,
            display: "flex", alignItems: "flex-end",
            padding: 16,
            flex: 1,
          }}>
            <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c15682?w=400&q=80" alt="Promo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,182,212,0.85) 0%, rgba(6,182,212,0.3) 60%, transparent 100%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Send quotes with supplier preferences</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .hero-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 768px) and (max-width: 1023px) { .hero-grid { grid-template-columns: 220px 1fr !important; } }
      `}</style>
    </section>
  );
}
