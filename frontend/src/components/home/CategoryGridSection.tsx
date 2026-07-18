"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryGridSection({ title, imageSrc, items }: { title: string; imageSrc: string; items: any[] }) {
  const displayItems = items.slice(0, 4);

  return (
    <section style={{ maxWidth: 1440, margin: "24px auto 0", padding: "0 24px" }}>
      {/* Section Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{
          fontWeight: 700, fontSize: "1.2rem",
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}>{title}</h2>
        <Link href="#" style={{
          display: "flex", alignItems: "center", gap: 5,
          color: "#818cf8", fontSize: "0.825rem", fontWeight: 600,
          textDecoration: "none", transition: "gap 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = "9px"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = "5px"; }}
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {/* Bento Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "280px repeat(4, 1fr)",
        gap: 12,
        borderRadius: 20,
        overflow: "hidden",
      }} className="cat-grid">
        {/* Hero image tile */}
        <div style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          minHeight: 200,
          display: "flex",
          alignItems: "flex-end",
          padding: 20,
        }}>
          <img
            src={imageSrc}
            alt={title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,7,15,0.85) 0%, rgba(7,7,15,0.3) 50%, transparent 100%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
            <button style={{
              padding: "8px 16px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Product tiles */}
        {displayItems.map((item, i) => (
          <Link
            href={`/product/${item._id}`}
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-subtle)",
              overflow: "hidden",
              textDecoration: "none",
              transition: "all 0.25s ease",
              position: "relative",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Product Image */}
            <div style={{
              height: 120,
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              borderBottom: "1px solid var(--border-subtle)",
              overflow: "hidden",
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Product Info */}
            <div style={{ padding: "12px 14px", flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--text-primary)", lineHeight: 1.4, marginBottom: 4 }} className="line-clamp-2">
                {item.name}
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                from <span style={{ color: "#818cf8", fontWeight: 700 }}>${Math.round(item.price)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 1023px) { .cat-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 640px) { .cat-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
