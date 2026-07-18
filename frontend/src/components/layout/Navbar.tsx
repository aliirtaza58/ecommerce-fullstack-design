"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Heart, ChevronDown, X, Zap, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/category/all?search=${searchTerm}`;
    }
  };

  const navLinks = [
    { label: "Hot Deals", href: "#" },
    { label: "Electronics", href: "#" },
    { label: "Fashion", href: "#" },
    { label: "Home & Living", href: "#" },
    { label: "Sports", href: "#" },
  ];

  return (
    <header
      style={{
        background: scrolled
          ? "rgba(7,7,15,0.92)"
          : "rgba(7,7,15,0.75)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
      }}
    >
      {/* ── PROMO BANNER ── */}
      <div style={{
        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
        textAlign: "center",
        padding: "6px 16px",
        fontSize: "0.78rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.03em",
      }}>
        Free shipping on orders over $49 &nbsp;·&nbsp; Use code <strong>NEXSHOP15</strong> for 15% off
      </div>

      {/* ── DESKTOP TOP ROW ── */}
      <div className="hidden md:block" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: 72, gap: 24 }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(99,102,241,0.5)",
            }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #818cf8, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}>NexShop</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 600, display: "flex", position: "relative" }}>
            <div style={{
              display: "flex",
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
              onFocus={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#6366f1";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.2)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, brands, categories..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "0.65rem 1rem 0.65rem 2.75rem",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0 20px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  borderRadius: "0 11px 11px 0",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >Search</button>
            </div>
          </form>

          {/* Right Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            {/* Notifications */}
            <NavIconBtn icon={<Bell size={20} />} label="Alerts" href="#" />

            {/* Wishlist */}
            <NavIconBtn icon={<Heart size={20} />} label="Wishlist" href="/orders" />

            {/* Profile */}
            {user ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={logout}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.8rem", color: "#fff",
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: 2, maxWidth: 56, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name.split(" ")[0]}
                </span>
              </div>
            ) : (
              <NavIconBtn icon={<User size={20} />} label="Sign In" href="/login" />
            )}

            {/* Cart */}
            <Link href="/cart" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textDecoration: "none", padding: "6px 10px", borderRadius: 10, transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ position: "relative" }}>
                <ShoppingCart size={22} color="var(--text-secondary)" />
                {cartItems.length > 0 && (
                  <span style={{
                    position: "absolute", top: -8, right: -8,
                    background: "linear-gradient(135deg, #f43f5e, #e11d48)",
                    color: "#fff", fontSize: "0.65rem", fontWeight: 800,
                    width: 18, height: 18, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 8px rgba(244,63,94,0.5)",
                    animation: "pulse-ring 1.5s ease-out infinite",
                  }}>
                    {cartItems.length > 9 ? "9+" : cartItems.length}
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>My Cart</span>
            </Link>

            {user?.isAdmin && (
              <Link href="/admin" style={{
                padding: "6px 14px", borderRadius: 8,
                background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
                color: "#818cf8", fontSize: "0.78rem", fontWeight: 600,
                textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.15)"; }}
              >Admin</Link>
            )}
          </div>
        </div>
      </div>

      {/* ── DESKTOP NAV LINKS ── */}
      <div className="hidden md:block" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 44 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 8,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-primary)", fontSize: "0.835rem", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            >
              <Menu size={15} /> All Categories
            </button>
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} style={{
                padding: "6px 14px", borderRadius: 8,
                color: "var(--text-secondary)", fontSize: "0.835rem", fontWeight: 500,
                textDecoration: "none", transition: "color 0.2s, background 0.2s",
                display: "flex", alignItems: "center", gap: 5,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {link.badge && <span>{link.badge}</span>}{link.label}
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.8rem" }}>
              English, USD <ChevronDown size={13} />
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Ship to World <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE NAVBAR ── */}
      <div className="md:hidden">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: 4 }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.4)" }}>
              <Zap size={15} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.1rem", background: "linear-gradient(135deg,#818cf8,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NexShop</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user?.isAdmin && <Link href="/admin" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", textDecoration: "none" }}>Admin</Link>}
            <Link href="/cart" style={{ position: "relative", color: "var(--text-secondary)", textDecoration: "none" }}>
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span style={{ position: "absolute", top: -6, right: -6, background: "#f43f5e", color: "#fff", fontSize: "0.6rem", fontWeight: 800, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cartItems.length}
                </span>
              )}
            </Link>
            {user ? (
              <button onClick={logout} style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>
                {user.name.charAt(0).toUpperCase()}
              </button>
            ) : (
              <Link href="/login" style={{ color: "var(--text-secondary)", textDecoration: "none" }}><User size={22} /></Link>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div style={{ padding: "0 16px 12px" }}>
          <form onSubmit={handleSearch} style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "10px 12px 10px 36px",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </form>
        </div>

        {/* Mobile Category Pills */}
        <div style={{ padding: "0 16px 12px", display: "flex", gap: 8, overflowX: "auto" }} className="no-scrollbar">
          {["All", "Gadgets", "Fashion", "Home", "Sports", "Beauty"].map(cat => (
            <button key={cat} style={{
              whiteSpace: "nowrap",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.25)",
              color: "#818cf8",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
            }}>{cat}</button>
          ))}
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(7,7,15,0.97)",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}>
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} style={{
                padding: "10px 14px",
                borderRadius: 10,
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
              }}>
                {link.badge}{link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function NavIconBtn({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link href={href} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
      padding: "6px 10px", borderRadius: 10,
      color: "var(--text-secondary)", textDecoration: "none",
      transition: "background 0.2s, color 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
    >
      {icon}
      <span style={{ fontSize: "0.68rem" }}>{label}</span>
    </Link>
  );
}