import Link from "next/link";

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string }, 
  searchParams: { search?: string } 
}) {
  // 1. Grab the search term from the URL (e.g., ?search=laptop)
  const searchQuery = searchParams.search ? `?search=${searchParams.search}` : '';
  
  // 2. Fetch the dynamically filtered products from your backend
  const res = await fetch(`http://localhost:5000/api/products${searchQuery}`, { cache: 'no-store' });
  const products = await res.json();

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
        {/* Top Bar: Shows result count and search term if applicable */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg border">
          <span className="text-gray-500">
            Showing {products.length} results {searchParams.search && `for "${searchParams.search}"`}
          </span>
          <select className="border rounded-md px-2 py-1"><option>Sort by Latest</option></select>
        </div>

        {/* Conditional Rendering: If no products match the search, show a message */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item: any) => (
              <div key={item._id} className="bg-white border rounded-lg p-4 flex flex-col">
                
                {/* Image Box - FIXED: No client event handlers here */}
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 overflow-hidden">
                   <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                </div>
                
                <h3 className="font-medium text-gray-800 mb-2">{item.name}</h3>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                  <Link href={`/product/${item._id}`} className="text-blue-600 text-sm font-medium border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                    View Details
                  </Link>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}