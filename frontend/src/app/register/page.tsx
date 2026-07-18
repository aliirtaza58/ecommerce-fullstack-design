"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Eye, EyeOff, Zap, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
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
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to register");
      login(data);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["transparent", "#f43f5e", "#f59e0b", "#10b981"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }} className="auth-grid">

      {/* ── LEFT: Art Panel ── */}
      <div style={{
        position: "relative",
        background: "linear-gradient(135deg, #0a1a20 0%, #0d2030 40%, #150a30 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
        overflow: "hidden",
      }} className="auth-art">
        <div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 65%)", top: -100, right: -100 }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%)", bottom: -80, left: -60 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 400 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 36 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#06b6d4,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(6,182,212,0.4)" }}>
              <Zap size={24} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, background: "linear-gradient(135deg,#06b6d4,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NexShop</span>
          </div>

          {/* Floating image */}
          <div style={{ animation: "float 6s ease-in-out infinite", marginBottom: 32 }}>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=85"
              alt="Headphones"
              style={{
                width: 200, height: 200, objectFit: "contain",
                filter: "drop-shadow(0 20px 50px rgba(6,182,212,0.5)) drop-shadow(0 8px 20px rgba(99,102,241,0.3))",
              }}
            />
          </div>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", marginBottom: 12 }}>
            Join{" "}
            <span style={{ background: "linear-gradient(135deg,#06b6d4,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              10,000+ shoppers
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 28 }}>
            Create your free account and start saving with exclusive member deals today.
          </p>

          {/* Benefits */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Free membership with no hidden fees",
              "Access to flash sales & early launches",
              "Personalized recommendations",
              "Priority customer support",
            ].map(b => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "left" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={10} color="#10b981" />
                </div>
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>{b}</span>
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
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 8 }}>
              Create Account
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>Sign in instead</Link>
            </p>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 20,
              background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)",
              color: "#f87171", fontSize: "0.875rem",
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
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

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Email Address</label>
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
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
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
              {/* Password Strength */}
              {password.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    {[1, 2, 3].map(level => (
                      <div key={level} style={{
                        flex: 1, height: 3, borderRadius: 999,
                        background: level <= passwordStrength ? strengthColors[passwordStrength] : "rgba(255,255,255,0.08)",
                        transition: "background 0.3s",
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: strengthColors[passwordStrength] || "var(--text-muted)", fontWeight: 600 }}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

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
            }}>
              {loading ? (
                <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              ) : (
                <><ArrowRight size={17} /> Create Account</>
              )}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              By creating an account, you agree to our{" "}
              <a href="#" style={{ color: "#818cf8", textDecoration: "none" }}>Terms of Service</a>{" "}
              and{" "}
              <a href="#" style={{ color: "#818cf8", textDecoration: "none" }}>Privacy Policy</a>.
            </p>
          </form>

          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
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
