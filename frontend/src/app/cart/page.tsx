"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="bg-[#f7f9fa] min-h-[60vh] py-8 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-8 border rounded-lg shadow-sm text-center">
            <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
            <Link href="/" className="inline-block bg-brand-orange text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product} className="bg-white p-4 border rounded-lg shadow-sm flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-50 rounded flex items-center justify-center p-2">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="font-bold text-lg text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.product)}
                      className="text-red-500 hover:text-red-700 text-sm mt-2 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 border rounded-lg shadow-sm h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm text-gray-600 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 mb-6">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#00b517] text-white py-3 rounded-md font-bold hover:bg-green-600 transition">
                Checkout
              </button>
              <div className="mt-4 text-center">
                <Link href="/" className="text-brand-blue font-medium hover:underline text-sm">
                  Back to shop
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}