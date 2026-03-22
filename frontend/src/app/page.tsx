import HeroSection from "@/components/home/HeroSection";
import DealsSection from "@/components/home/DealsSection";
import CategoryGridSection from "@/components/home/CategoryGridSection";
import RecommendedSection from "@/components/home/RecommendedSection";

export const revalidate = 0; // Disable static caching for dynamic data

async function getProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products", { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  
  // Create sample arrays if API is empty for UI testing
  let safeProducts = products.length > 0 ? products : Array(10).fill({
    _id: "placeholder",
    name: "Sample Product",
    price: 19.99,
    description: "Sample description"
  });

  // Assign specific images to products based on their names
  safeProducts = safeProducts.map((p: any) => {
    let img = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80"; // default fallback
    if (p.name.toLowerCase().includes("laptop")) img = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80";
    if (p.name.toLowerCase().includes("smartphone")) img = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80";
    if (p.name.toLowerCase().includes("headphone") || p.name.toLowerCase().includes("earbud")) img = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80";
    if (p.name.toLowerCase().includes("watch")) img = "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=80";
    if (p.name.toLowerCase().includes("camera")) img = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80";
    
    return { ...p, image: img };
  });

  const electronics = safeProducts.slice(0, 8);
  const outdoor = safeProducts.slice(0, 8).reverse();

  return (
    <div className="bg-[#f7f9fa] pt-4 md:pt-6 pb-12 w-full px-0 sm:px-4">
      {/* Container spacing managed mostly inside components or here */}
      <HeroSection />
      
      <DealsSection />
      
      <CategoryGridSection 
        title="Home and outdoor" 
        imageSrc="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80"
        items={outdoor}
      />
      
      <CategoryGridSection 
        title="Consumer electronics and gadgets" 
        imageSrc="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&q=80"
        items={electronics}
      />
      
      <RecommendedSection products={safeProducts} />
    </div>
  );
}