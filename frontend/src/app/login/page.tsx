"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to log in");
      
      login(data);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 border rounded-lg shadow-sm">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Sign in</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              type="email" required 
              className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-orange text-black placeholder:text-gray-500" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" required 
              className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-orange text-black placeholder:text-gray-500" 
              value={password} onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="w-full bg-brand-orange text-white py-2 px-4 rounded-md font-medium hover:bg-orange-600">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Don't have an account? <Link href="/register" className="text-brand-orange hover:underline">Register now</Link>
        </div>
      </div>
    </div>
  );
}
