"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, Tag, Truck, ArrowLeft, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 49 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", padding: "32px 24px 64px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <Link href="/" style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-subtle)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-secondary)", textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
          ><ArrowLeft size={16} /></Link>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
              Shopping Cart
            </h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty State */
          <div style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 24,
            padding: "80px 32px",
            textAlign: "center",
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <ShoppingBag size={32} color="#818cf8" />
            </div>
            <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: 8 }}>
              Your cart is empty
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 28 }}>
              Looks like you haven't added any products yet.
            </p>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", fontWeight: 700, fontSize: "0.925rem",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            }}>
              <ShoppingBag size={16} /> Explore Products
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }} className="cart-grid">

            {/* Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Shipping banner */}
              {subtotal < 49 && (
                <div style={{
                  padding: "12px 16px", borderRadius: 12,
                  background: "rgba(6,182,212,0.07)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <Truck size={16} color="#06b6d4" />
                  <span style={{ fontSize: "0.85rem", color: "#38bdf8" }}>
                    Add <strong>${(49 - subtotal).toFixed(2)}</strong> more to unlock free shipping!
                  </span>
                </div>
              )}

              {cartItems.map((item) => (
                <div
                  key={item.product}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 16,
                    padding: "16px",
                    display: "flex",
                    gap: 16,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                >
                  {/* Image */}
                  <div style={{
                    width: 90, height: 90, flexShrink: 0,
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 12, border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 10,
                  }}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: 4 }}>{item.name}</h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 10 }}>Unit price: ${item.price.toFixed(2)}</p>
                    
                    {/* Quantity display */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{
                        padding: "3px 12px", borderRadius: 999,
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        fontSize: "0.78rem", color: "#818cf8", fontWeight: 600,
                      }}>Qty: {item.qty}</span>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product)}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "5px 12px", borderRadius: 8,
                        background: "rgba(244,63,94,0.08)",
                        border: "1px solid rgba(244,63,94,0.2)",
                        color: "#f43f5e", fontSize: "0.78rem", fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(244,63,94,0.16)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,63,94,0.4)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(244,63,94,0.08)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,63,94,0.2)";
                      }}
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Promo Code */}
              <div style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 16,
                padding: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <Tag size={14} color="#818cf8" />
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Promo Code</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Enter code..."
                    style={{
                      flex: 1, background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-default)", borderRadius: 10,
                      padding: "9px 12px", color: "var(--text-primary)", fontSize: "0.85rem", outline: "none",
                    }}
                  />
                  <button style={{
                    padding: "9px 16px", borderRadius: 10,
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    color: "#818cf8", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                  }}>Apply</button>
                </div>
              </div>

              {/* Summary Card */}
              <div style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 16,
                padding: "20px",
              }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 16 }}>
                  Order Summary
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                  {[
                    ["Subtotal", `$${subtotal.toFixed(2)}`],
                    ["Shipping", shipping === 0 ? "FREE 🎉" : `$${shipping.toFixed(2)}`],
                    ["Tax (est.)", `$${(subtotal * 0.08).toFixed(2)}`],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>{k}</span>
                      <span style={{ color: v.includes("FREE") ? "#10b981" : "var(--text-secondary)", fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: 14, marginBottom: 18,
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--text-primary)" }}>
                    ${(total + subtotal * 0.08).toFixed(2)}
                  </span>
                </div>

                <button style={{
                  width: "100%", padding: "14px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  border: "none", color: "#fff",
                  fontWeight: 700, fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(16,185,129,0.4)",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(16,185,129,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(16,185,129,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  🔒 Proceed to Checkout
                </button>

                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <Link href="/" style={{ color: "#818cf8", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
                    ← Continue Shopping
                  </Link>
                </div>

                {/* Trust */}
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "center", gap: 16 }}>
                  {["🔒 Secure", "🚚 Fast Ship", "↩️ Easy Returns"].map(t => (
                    <span key={t} style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) { .cart-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}