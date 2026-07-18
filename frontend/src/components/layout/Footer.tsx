"use client";

import Link from "next/link";
import { Zap, Twitter, Github, Instagram, Youtube, Mail, MapPin, Phone, Shield, Truck, RotateCcw, HeadphonesIcon } from "lucide-react";

const footerLinks = {
  Shop: ["Electronics", "Fashion", "Home & Garden", "Sports", "Beauty", "Books"],
  Support: ["Help Center", "Track Order", "Returns & Exchanges", "Shipping Info", "Size Guide"],
  Company: ["About Us", "Careers", "Press", "Blog", "Affiliate Program", "Investor Relations"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Sitemap"],
};

const trustBadges = [
  { icon: <Shield size={20} />, label: "Secure Payments" },
  { icon: <Truck size={20} />, label: "Free Shipping $49+" },
  { icon: <RotateCcw size={20} />, label: "30-Day Returns" },
  { icon: <HeadphonesIcon size={20} />, label: "24/7 Support" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)", marginTop: "auto" }}>
      {/* Trust Badges Bar */}
      <div style={{
        borderBottom: "1px solid var(--border-subtle)",
        padding: "20px 24px",
      }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {trustBadges.map(badge => (
            <div key={badge.label} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-subtle)",
            }}>
              <div style={{ color: "var(--brand-primary)", flexShrink: 0 }}>{badge.icon}</div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 24px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
          
          {/* Top: Brand + Newsletter */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            {/* Brand */}
            <div>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                }}>
                  <Zap size={18} color="#fff" fill="#fff" />
                </div>
                <span style={{
                  fontSize: "1.4rem", fontWeight: 800,
                  background: "linear-gradient(135deg, #818cf8, #06b6d4)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>NexShop</span>
              </Link>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 300, marginBottom: 20 }}>
                Your premier destination for electronics, fashion, and lifestyle products. Curated for the modern shopper.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[Twitter, Github, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.15)"; (e.currentTarget as HTMLElement).style.color = "#818cf8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)"; }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 8 }}>Stay in the loop</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 16 }}>
                Get exclusive deals, new arrivals, and insider updates delivered to your inbox.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <Mail size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 10,
                      padding: "10px 12px 10px 36px",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                </div>
                <button style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                }}>Subscribe</button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: 14, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {category}
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" style={{
                        color: "var(--text-muted)", fontSize: "0.875rem",
                        textDecoration: "none", transition: "color 0.2s",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact + Bottom Bar */}
          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <Mail size={14} /> support@nexshop.com
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <Phone size={14} /> +1 (800) 123-4567
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <MapPin size={14} /> San Francisco, CA
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              © {new Date().getFullYear()} NexShop. Made by <strong style={{ color: "var(--text-secondary)" }}>Ali Irtaza</strong> · Developers Hub Corporation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
