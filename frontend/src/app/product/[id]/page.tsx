"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Check, Shield, Truck, RotateCcw, Star, Heart, Share2, ChevronRight, Minus, Plus, ShoppingCart, Zap } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not Found");
        return res.json();
      })
      .then(data => {
        let finalImage = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80";
        const n = (data.name || "").toLowerCase();
        if (n.includes("laptop"))                                  finalImage = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80";
        else if (n.includes("smartphone") || n.includes("phone")) finalImage = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80";
        else if (n.includes("headphone") || n.includes("earbud")) finalImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
        else if (n.includes("watch"))                             finalImage = "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80";
        else if (n.includes("camera"))                            finalImage = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80";
        else if (data.image && data.image.length > 5)             finalImage = data.image;
        setProduct({ ...data, image: finalImage });
        setLoading(false);
      })
      .catch(() => {
        const fallback = {
          _id: params.id,
          name: "Premium Tech Device",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
          description: "A top-of-the-line gadget with cutting-edge specs and premium build quality for daily use.",
        };
        setProduct(fallback);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          border: "3px solid rgba(99,102,241,0.2)",
          borderTopColor: "#6366f1",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 16px",
        }} />
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading product...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const handleAddToCart = () => {
    addToCart({ product: product._id, name: product.name, image: product.image, price: product.price, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const discountedPrice = (product.price * 0.9).toFixed(2);
  const savings = (product.price * 0.1).toFixed(2);

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", padding: "24px 24px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, fontSize: "0.82rem", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >Home</Link>
          <ChevronRight size={13} />
          <span style={{ color: "var(--text-muted)" }}>Electronics</span>
          <ChevronRight size={13} />
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{product.name}</span>
        </nav>

        {/* Main Product Card */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 24,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
        }} className="product-main-grid">

          {/* Image Panel */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            borderRight: "1px solid var(--border-subtle)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            position: "relative",
            minHeight: 420,
          }}>
            {/* Glow */}
            <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

            {/* Badges */}
            <div style={{ position: "absolute", top: 20, left: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", color: "#f43f5e", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase" }}>-10% OFF</div>
              <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                <Check size={11} /> In Stock
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ position: "absolute", top: 20, right: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
                <Heart size={16} />
              </button>
              <button style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
                <Share2 size={16} />
              </button>
            </div>

            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: "100%", maxHeight: 340,
                objectFit: "contain",
                position: "relative", zIndex: 1,
                filter: "drop-shadow(0 20px 50px rgba(99,102,241,0.25))",
                animation: "float 6s ease-in-out infinite",
              }}
            />
          </div>

          {/* Info Panel */}
          <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column" }}>
            {/* SKU */}
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8, fontFamily: "monospace" }}>
              SKU: {product._id?.toString().substring(0, 12).toUpperCase()}
            </p>

            {/* Product Name */}
            <h1 style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.025em", color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 12 }}>
              {product.name}
            </h1>

            {/* Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={15} fill={s<=4?"#f59e0b":"none"} color="#f59e0b" />)}
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>4.0 (248 reviews)</span>
            </div>

            {/* Price Block */}
            <div style={{
              background: "rgba(99,102,241,0.07)",
              border: "1px solid rgba(99,102,241,0.15)",
              borderRadius: 14,
              padding: "18px 20px",
              marginBottom: 24,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                <span style={{ fontWeight: 900, fontSize: "2rem", color: "var(--text-primary)" }}>
                  ${discountedPrice}
                </span>
                <span style={{ fontSize: "1rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                  ${product.price.toFixed(2)}
                </span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10b981" }}>
                  You save ${savings}!
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  1-9 pcs: ${product.price.toFixed(2)}
                </div>
                <div style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", fontSize: "0.75rem", color: "#818cf8", fontWeight: 600 }}>
                  10+ pcs: ${discountedPrice}
                </div>
              </div>
            </div>

            {/* Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[
                ["Condition", "Brand New"],
                ["Shipping", "Free Worldwide"],
                ["Delivery", `By ${new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`],
                ["Warranty", "12 Months"],
              ].map(([key, val]) => (
                <div key={key} style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{key}</p>
                  <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              {/* Qty selector */}
              <div style={{
                display: "flex", alignItems: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-default)",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 46, background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <Minus size={16} />
                </button>
                <span style={{ width: 40, textAlign: "center", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 46, background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button onClick={handleAddToCart} style={{
                flex: 1,
                height: 46,
                borderRadius: 12,
                background: added ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: added ? "1px solid rgba(16,185,129,0.4)" : "none",
                color: added ? "#10b981" : "#fff",
                fontWeight: 700,
                fontSize: "0.925rem",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: added ? "none" : "0 4px 20px rgba(99,102,241,0.4)",
                transition: "all 0.3s ease",
              }}>
                {added ? <><Check size={17} /> Added to Cart!</> : <><ShoppingCart size={17} /> Add to Cart</>}
              </button>

              <button style={{
                height: 46,
                padding: "0 20px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                border: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.925rem",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 4px 20px rgba(6,182,212,0.3)",
                transition: "all 0.2s",
              }}>
                <Zap size={15} fill="#fff" /> Buy Now
              </button>
            </div>

            {/* Trust indicators */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
              {[
                { icon: <Shield size={14} />, label: "Secure Payment" },
                { icon: <Truck size={14} />, label: "Free Shipping" },
                { icon: <RotateCcw size={14} />, label: "30-Day Return" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.78rem" }}>
                  <span style={{ color: "#10b981" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div style={{ marginTop: 24, background: "rgba(255,255,255,0.025)", border: "1px solid var(--border-subtle)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid var(--border-subtle)" }}>
            {["details", "specs", "reviews"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "14px 24px",
                background: "none",
                border: "none",
                color: activeTab === tab ? "#818cf8" : "var(--text-muted)",
                fontWeight: activeTab === tab ? 700 : 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                textTransform: "capitalize",
                borderBottom: activeTab === tab ? "2px solid #6366f1" : "2px solid transparent",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
              }}>
                {tab === "details" ? "Description" : tab === "specs" ? "Specifications" : "Reviews (248)"}
              </button>
            ))}
          </div>
          <div style={{ padding: "24px 28px" }}>
            {activeTab === "details" && (
              <div>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16, fontSize: "0.925rem" }}>
                  {product.description || product.desc}
                </p>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.925rem" }}>
                  Experience the latest in technology with this premium device. Designed precisely to match modern standards for efficiency and reliability. The perfect companion for both professional and personal use, featuring advanced design characteristics perfectly suited to keep you ahead of the curve.
                </p>
              </div>
            )}
            {activeTab === "specs" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Brand", "NexTech"], ["Model Year", "2025"], ["Weight", "1.2 kg"], ["Dimensions", "30 × 20 × 1.5 cm"], ["Connectivity", "USB-C, WiFi 6, Bluetooth 5.3"], ["Battery", "5000mAh"], ["Warranty", "12 Months"], ["Origin", "Made in USA"]].map(([k, v]) => (
                  <div key={k} style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{k}</span>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { name: "Alex M.", rating: 5, comment: "Absolutely love this product! Build quality is superb and performance exceeded my expectations.", date: "Jan 15, 2025" },
                  { name: "Sarah K.", rating: 4, comment: "Great value for money. Setup was a breeze and it works flawlessly. Highly recommend.", date: "Jan 8, 2025" },
                  { name: "Mike R.", rating: 5, comment: "Best purchase I've made this year. The design is stunning and the specs are top-notch.", date: "Dec 28, 2024" },
                ].map((review, i) => (
                  <div key={i} style={{ padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{review.name}</p>
                          <div style={{ display: "flex", gap: 2 }}>
                            {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s<=review.rating?"#f59e0b":"none"} color="#f59e0b" />)}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{review.date}</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .product-main-grid { grid-template-columns: 1fr !important; } }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}