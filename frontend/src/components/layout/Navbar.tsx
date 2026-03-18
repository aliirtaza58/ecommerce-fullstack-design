"use client";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Icon & Logo */}
          <div className="flex items-center gap-4">
            <Menu className="md:hidden h-6 w-6 text-gray-600" />
            <Link href="/" className="text-2xl font-bold text-blue-600">eShop</Link>
          </div>

          {/* Desktop Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <input 
              type="text" 
              placeholder="Search products, brands and categories..." 
              className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>

          {/* Right Icons (Cart & User) */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative text-gray-600 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <User className="h-6 w-6" />
              <span className="text-sm font-medium">Sign In</span>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar (Only visible on mobile) */}
        <div className="md:hidden pb-4">
            <div className="relative">
                <input 
                type="text" 
                placeholder="Search..." 
                className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-10 bg-gray-50 focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
        </div>
      </div>
    </nav>
  );
}