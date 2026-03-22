"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, MessageSquare, Heart, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/category/all?search=${searchTerm}`;
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      {/* --- DESKTOP TOP ROW --- */}
      <div className="hidden md:block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-brand-orange">
            <div className="bg-brand-orange text-white p-1 rounded">
              <ShoppingCart size={24} />
            </div>
            eShop
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8 flex border-2 border-brand-orange rounded-md overflow-hidden">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search" 
              className="w-full py-2 px-4 focus:outline-none text-black placeholder:text-gray-500"
            />
            <div className="hidden lg:flex items-center px-4 border-l border-brand-orange text-gray-600 bg-white">
              All category <ChevronDown className="ml-1 h-4 w-4" />
            </div>
            <button type="submit" className="bg-brand-orange text-white px-6 font-medium hover:bg-orange-600 transition">
              Search
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            {user ? (
              <div className="flex items-center gap-4">
                {user.isAdmin && (
                  <Link href="/admin" className="flex flex-col items-center hover:text-brand-blue font-bold text-blue-600">
                    <User size={20} />
                    <span>Admin</span>
                  </Link>
                )}
                <button onClick={logout} className="flex flex-col items-center hover:text-brand-blue">
                  <User size={20} />
                  <span className="truncate w-16 text-center">{user.name.split(' ')[0]}</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex flex-col items-center hover:text-brand-blue">
                <User size={20} />
                <span>Profile</span>
              </Link>
            )}
            <Link href="/messages" className="flex flex-col items-center hover:text-brand-blue">
              <MessageSquare size={20} />
              <span>Message</span>
            </Link>
            <Link href="/orders" className="flex flex-col items-center hover:text-brand-blue">
              <Heart size={20} />
              <span>Orders</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center hover:text-brand-blue relative">
              <ShoppingCart size={20} />
              <span>My cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* --- DESKTOP BOTTOM ROW --- */}
      <div className="hidden md:block border-t">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12 text-gray-700 text-sm font-medium">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 hover:text-brand-blue">
              <Menu size={18} /> All category
            </button>
            <Link href="#" className="hover:text-brand-blue">Hot offers</Link>
            <Link href="#" className="hover:text-brand-blue">Gift boxes</Link>
            <Link href="#" className="hover:text-brand-blue">Projects</Link>
            <Link href="#" className="hover:text-brand-blue">Menu item</Link>
            <button className="flex items-center gap-1 hover:text-brand-blue">
              Help <ChevronDown size={16} />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 hover:text-brand-blue">
              English, USD <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-1 hover:text-brand-blue">
              Ship to 🇩🇪 <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE NAVBAR --- */}
      <div className="md:hidden">
        <div className="px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="text-gray-600"><Menu size={24} /></button>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-blue">
              <div className="bg-brand-orange text-white p-1 rounded">
                <ShoppingCart size={20} />
              </div>
              Brand
            </Link>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            {user && user.isAdmin && <Link href="/admin" className="hover:text-brand-orange text-sm font-bold">Admin</Link>}
            <Link href="/cart" className="hover:text-brand-orange relative">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {user ? (
              <button onClick={logout} className="hover:text-brand-orange"><User size={24} /></button>
            ) : (
              <Link href="/login" className="hover:text-brand-orange"><User size={24} /></Link>
            )}
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search" 
              className="w-full bg-gray-100 border-none rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-brand-orange outline-none text-black placeholder:text-gray-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>
        </div>

        {/* Mobile Category Pills */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {["All category", "Gadgets", "Clothes", "Accessory"].map((cat) => (
            <button key={cat} className="whitespace-nowrap bg-orange-50 text-brand-orange px-4 py-1.5 rounded-md text-sm font-medium hover:bg-orange-100">
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}