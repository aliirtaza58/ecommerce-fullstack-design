"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Check, Shield, TrendingDown } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from API, otherwise generate fallback based on ID
    fetch(`http://localhost:5000/api/products/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not Found");
        return res.json();
      })
      .then(data => {
        // Force map image based on product name regardless of database fallback
        let finalImage = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"; // default
        const prodName = (data.name || "").toLowerCase();
        
        if (prodName.includes("laptop")) finalImage = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80";
        else if (prodName.includes("smartphone") || prodName.includes("phone")) finalImage = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80";
        else if (prodName.includes("headphone") || prodName.includes("earbud")) finalImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
        else if (prodName.includes("watch")) finalImage = "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80";
        else if (prodName.includes("camera")) finalImage = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80";
        else if (data.image && data.image.length > 5) finalImage = data.image; // fallback to DB if valid length

        setProduct({ ...data, image: finalImage });
        setLoading(false);
      })
      .catch((err) => {
        // Fallback for UI testing
        const fallbacks: Record<string, any> = {
          "Ultra Slim Laptop": { name: "Ultra Slim Laptop", price: 1300, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", desc: "High performance slim laptop perfect for on-the-go professionals." },
          "Smartphone Pro Max": { name: "Smartphone Pro Max", price: 999, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", desc: "The ultimate smartphone experience with a massive display and stellar battery life." },
          "Premium Wireless Headphones": { name: "Premium Wireless Headphones", price: 300, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", desc: "Noise-cancelling over-ear headphones with superior sound quality." },
        };
        const defaultFallback = { name: "Premium Tech Device", price: 199.99, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80", desc: "A top-of-the-line gadget for daily use." };
        
        // Very basic mock logic to extract name from string if it matched a known mock id.
        let fallback = defaultFallback;
        if (params.id) {
            // Find by mock object assumption, normally we would just use the ID
            Object.values(fallbacks).forEach(f => {
                if(f.name.replace(/\s+/g, '-').toLowerCase() === (params.id as string).toLowerCase() || (params.id as string).includes(f.name)) fallback = f;
            })
        }
        
        setProduct({ _id: params.id, ...fallback });
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;

  const handleAddToCart = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1
    });
    alert("Added to cart!");
  };

  return (
    <div className="bg-[#f7f9fa] min-h-screen py-8 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-brand-orange">Home</Link> &gt; <span>{product.name}</span>
        </div>
        
        <div className="bg-white border rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex justify-center items-center bg-gray-50 rounded-lg p-6 border">
            <img src={product.image} alt={product.name} className="max-w-full max-h-[400px] object-cover rounded shadow-md" />
          </div>
          
          <div className="md:w-1/2 flex flex-col justify-start">
            <div className="flex text-green-600 items-center text-sm font-medium mb-2">
              <Check size={16} className="mr-1" /> In stock
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">SKU: {product._id.toString().substring(0, 8)}</p>
            
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-md mb-6">
              <div className="flex gap-4">
                <div>
                  <p className="text-red-500 text-3xl font-bold">${product.price.toFixed(2)}</p>
                  <span className="text-gray-500 text-sm">Retail Price</span>
                </div>
                <div className="border-l border-orange-200 px-4">
                  <p className="text-gray-900 text-xl font-bold">${(product.price * 0.9).toFixed(2)}</p>
                  <span className="text-gray-500 text-sm">10-99 pcs</span>
                </div>
              </div>
            </div>
            
            <table className="w-full text-sm text-left mb-6">
              <tbody>
                <tr className="border-b"><th className="py-2 text-gray-500 font-medium">Condition:</th><td className="py-2 text-gray-900 font-medium">Brand New</td></tr>
                <tr className="border-b"><th className="py-2 text-gray-500 font-medium">Shipping:</th><td className="py-2 text-gray-900 font-medium">Free worldwide shipping</td></tr>
                <tr className="border-b"><th className="py-2 text-gray-500 font-medium">Delivery:</th><td className="py-2 text-gray-900 font-medium">Expected by {new Date(Date.now() + 7 * 24*60*60*1000).toLocaleDateString()}</td></tr>
              </tbody>
            </table>
            
            <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={handleAddToCart} className="flex-1 bg-brand-orange text-white py-3 rounded-md font-bold text-lg hover:bg-orange-600 shadow-sm transition">
                Add to Cart
              </button>
              <button className="flex-1 bg-white text-brand-orange border-2 border-brand-orange py-3 rounded-md font-bold text-lg hover:bg-orange-50 transition">
                Buy Now
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
              <span className="flex items-center"><Shield size={16} className="mr-1" /> Secure payments</span>
              <span className="flex items-center"><TrendingDown size={16} className="mr-1" /> Best price match</span>
            </div>
          </div>
        </div>
        
        {/* Describe items details */}
        <div className="mt-8 bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Product Details</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {product.description || product.desc}
          </p>
          <p className="text-gray-700 leading-relaxed">
            Experience the latest in technology with this premium device. Designed precisely to match modern standards for efficiency and reliability. The perfect companion for both professional and personal use, it features advanced design characteristics perfectly suited to keep you ahead of the curve.
          </p>
        </div>
      </div>
    </div>
  );
}