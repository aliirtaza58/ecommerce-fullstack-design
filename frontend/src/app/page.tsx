import HeroSection from "@/components/home/HeroSection";
import DealsSection from "@/components/home/DealsSection";
import CategoryGridSection from "@/components/home/CategoryGridSection";
import RecommendedSection from "@/components/home/RecommendedSection";

export const revalidate = 0;

async function getProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  let safeProducts = products.length > 0 ? products : Array.from({ length: 10 }, (_, i) => ({
    _id: `placeholder-${i}`,
    name: ["Ultra Slim Laptop", "Smartphone Pro Max", "Premium Headphones", "Smart Watch Series 5", "4K Action Camera", "Wireless Earbuds", "Mechanical Keyboard", "Gaming Mouse", "USB-C Hub", "Portable SSD"][i] || "Tech Product",
    price: [1299, 999, 299, 399, 249, 149, 89, 59, 45, 79][i] || 99.99,
    description: "Premium quality tech product with cutting-edge features and sleek modern design.",
  }));

  safeProducts = safeProducts.map((p: any) => {
    let img = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80";
    const n = p.name.toLowerCase();
    if (n.includes("laptop"))                                  img = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80";
    else if (n.includes("smartphone") || n.includes("phone")) img = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80";
    else if (n.includes("headphone") || n.includes("earbud")) img = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80";
    else if (n.includes("watch"))                              img = "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80";
    else if (n.includes("camera"))                             img = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80";
    else if (n.includes("keyboard"))                           img = "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80";
    else if (n.includes("mouse"))                              img = "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80";
    return { ...p, image: img };
  });

  const electronics = safeProducts.slice(0, 8);
  const outdoor = safeProducts.slice(0, 8).reverse();

  return (
    <div style={{ background: "var(--bg-base)", paddingBottom: 40, width: "100%" }}>
      <HeroSection />
      <DealsSection />
      <CategoryGridSection
        title="Home & Outdoor Living"
        imageSrc="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80"
        items={outdoor}
      />
      <CategoryGridSection
        title="Consumer Electronics & Gadgets"
        imageSrc="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80"
        items={electronics}
      />
      <RecommendedSection products={safeProducts} />
    </div>
  );
}