"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Trash2, Edit, Plus } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
};

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/");
      return;
    }
    fetchProducts();
  }, [user, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {
    if (!confirm("Create a new placeholder product?")) return;
    try {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ name: "New Product", price: 10, category: "General" }),
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="bg-[#f7f9fa] min-h-[60vh] py-8 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={createProduct} className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-orange-600">
            <Plus size={20} /> Add Product
          </button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-4 font-medium text-gray-600">ID</th>
                  <th className="px-6 py-4 font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 font-medium text-gray-600">Price</th>
                  <th className="px-6 py-4 font-medium text-gray-600">Category</th>
                  <th className="px-6 py-4 font-medium text-gray-600 flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500 font-mono text-sm">{p._id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 text-gray-600">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-600">{p.category}</td>
                    <td className="px-6 py-4 flex justify-end gap-3 text-gray-400">
                      <button className="hover:text-brand-orange"><Edit size={18} /></button>
                      <button onClick={() => deleteProduct(p._id)} className="hover:text-red-500"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
