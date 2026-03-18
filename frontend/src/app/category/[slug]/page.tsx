import Link from "next/link";

export default function CategoryPage() {
  const products = Array(8).fill(0); // Mock products

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters - Hidden on mobile, block on desktop */}
      <aside className="hidden md:block w-64 space-y-6">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-bold border-b pb-2 mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><input type="checkbox" className="mr-2"/> Smartphones</li>
            <li><input type="checkbox" className="mr-2"/> Laptops</li>
            <li><input type="checkbox" className="mr-2"/> Accessories</li>
          </ul>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg border">
          <span className="text-gray-500">Showing 8 results</span>
          <select className="border rounded-md px-2 py-1"><option>Sort by Latest</option></select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((_, i) => (
            <div key={i} className="bg-white border rounded-lg p-4 flex flex-col">
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="font-medium text-gray-800 mb-2">Sample Product {i + 1}</h3>
              <div className="mt-auto flex justify-between items-center">
                <span className="font-bold text-lg">$99.99</span>
                <Link href="/product/1" className="text-blue-600 text-sm font-medium border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}