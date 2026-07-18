import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexShop — Premium eCommerce Store",
  description: "Discover the latest electronics, gadgets, and lifestyle products at unbeatable prices. Shop smarter with NexShop.",
  keywords: "ecommerce, electronics, gadgets, online shopping, best deals",
  openGraph: {
    title: "NexShop — Premium eCommerce Store",
    description: "Discover the latest electronics, gadgets, and lifestyle products at unbeatable prices.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}