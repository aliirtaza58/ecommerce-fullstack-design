"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to log in");
      login(data);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }} className="auth-grid">

      {/* ── LEFT: Art Panel ── */}
      <div style={{
        position: "relative",
        background: "linear-gradient(135deg, #0d0d25 0%, #1a0a3d 50%, #0a1a35 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
        overflow: "hidden",
      }} className="auth-art">
        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 65%)", top: -150, left: -100 }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 65%)", bottom: -100, right: -80 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(99,102,241,0.5)" }}>
              <Zap size={24} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, background: "linear-gradient(135deg,#818cf8,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NexShop</span>
          </div>

          {/* Floating product image */}
          <div style={{ animation: "float 6s ease-in-out infinite", marginBottom: 36 }}>
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=85"
              alt="Product"
              style={{
                width: 240, height: 240, objectFit: "contain",
                filter: "drop-shadow(0 24px 60px rgba(99,102,241,0.5)) drop-shadow(0 8px 20px rgba(6,182,212,0.3))",
              }}
            />
          </div>

          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", marginBottom: 12 }}>
            Welcome back to{" "}
            <span style={{ background: "linear-gradient(135deg,#818cf8,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              NexShop
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Sign in to access your orders, wishlists, and exclusive member deals.
          </p>

          {/* Features */}
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Exclusive member-only deals",
              "Track orders in real-time",
              "Save your wishlists",
            ].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={10} color="#10b981" />
                </div>
                <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }`}</style>
      </div>

      {/* ── RIGHT: Form Panel ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 40px",
        background: "var(--bg-surface)",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 8 }}>
              Sign In
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Don't have an account?{" "}
              <Link href="/register" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>Create one free</Link>
            </p>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 20,
              background: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.3)",
              color: "#f87171", fontSize: "0.875rem",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.02em" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 12,
                    padding: "12px 14px 12px 42px",
                    color: "var(--text-primary)",
                    fontSize: "0.925rem",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--border-default)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.02em" }}>Password</label>
                <a href="#" style={{ fontSize: "0.8rem", color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 12,
                    padding: "12px 44px 12px 42px",
                    color: "var(--text-primary)",
                    fontSize: "0.925rem",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--border-default)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              padding: "14px",
              borderRadius: 12,
              background: loading ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.4)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(99,102,241,0.55)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)"; }}
            >
              {loading ? (
                <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              ) : (
                <><ArrowRight size={17} /> Sign In</>
              )}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            </div>

            {/* Social Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["🔵 Google", "Continue with Google"], ["⬛ GitHub", "Continue with GitHub"]].map(([, label]) => (
                <button key={label} type="button" style={{
                  padding: "11px 16px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                >{label}</button>
              ))}
            </div>
          </form>

          {/* Security note */}
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            <ShieldCheck size={14} color="#10b981" />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>256-bit SSL encryption · Your data is safe</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .auth-grid { grid-template-columns: 1fr !important; } .auth-art { display: none !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
