"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart, TrendingUp } from "lucide-react";

function StarRating({ rating = 4.5 }: { rating?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={12}
          fill={star <= Math.floor(rating) ? "#f59e0b" : star - 0.5 <= rating ? "#f59e0b" : "none"}
          color="#f59e0b"
          style={{ opacity: star > Math.ceil(rating) ? 0.3 : 1 }}
        />
      ))}
      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: 4 }}>({Math.floor(Math.random() * 900) + 100})</span>
    </div>
  );
}

export default function RecommendedSection({ products }: { products: any[] }) {
  return (
    <section style={{ maxWidth: 1440, margin: "32px auto 0", padding: "0 24px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <TrendingUp size={18} color="#818cf8" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.07em" }}>Curated For You</span>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
            Recommended Items
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Electronics", "Fashion", "Home"].map((tab, i) => (
            <button key={tab} style={{
              padding: "6px 16px",
              borderRadius: 999,
              background: i === 0 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.04)",
              border: i === 0 ? "none" : "1px solid var(--border-subtle)",
              color: i === 0 ? "#fff" : "var(--text-muted)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 14,
      }} className="rec-grid">
        {products.slice(0, 10).map((item, i) => {
          const originalPrice = (item.price * 1.25).toFixed(2);
          const rating = 3.5 + (i % 3) * 0.5;
          return (
            <Link
              href={`/product/${item._id || item.id}`}
              key={item._id || item.id || i}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "all 0.25s ease",
                position: "relative",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Wishlist button */}
                <button
                  onClick={e => e.preventDefault()}
                  style={{
                    position: "absolute", top: 10, right: 10, zIndex: 2,
                    width: 30, height: 30, borderRadius: "50%",
                    background: "rgba(7,7,15,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(244,63,94,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(7,7,15,0.7)"; }}
                >
                  <Heart size={13} color="#f43f5e" />
                </button>

                {/* Badge */}
                {i < 3 && (
                  <div style={{
                    position: "absolute", top: 10, left: 10, zIndex: 2,
                    padding: "2px 8px", borderRadius: 999,
                    background: i === 0 ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    fontSize: "0.6rem", fontWeight: 800, color: "#fff",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                  }}>
                    {i === 0 ? "🔥 Hot" : i === 1 ? "⚡ New" : "💫 Pick"}
                  </div>
                )}

                {/* Image */}
                <div style={{
                  height: 150,
                  background: "rgba(255,255,255,0.02)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 16,
                  borderBottom: "1px solid var(--border-subtle)",
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      maxWidth: "100%", maxHeight: "100%",
                      objectFit: "contain",
                      transition: "transform 0.35s ease",
                      filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))",
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <StarRating rating={rating} />
                  <p style={{
                    marginTop: 8, marginBottom: "auto",
                    fontWeight: 500, fontSize: "0.82rem",
                    color: "var(--text-secondary)", lineHeight: 1.4,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {item.description || item.name}
                  </p>

                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>
                        ${item.price.toFixed(2)}
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                        ${originalPrice}
                      </span>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10b981" }}>-20%</span>
                    </div>

                    <button
                      onClick={e => e.preventDefault()}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: 10,
                        background: "rgba(99,102,241,0.12)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        color: "#818cf8",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.25)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.25)";
                      }}
                    >
                      <ShoppingCart size={13} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1280px) { .rec-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 1023px) { .rec-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px) { .rec-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
