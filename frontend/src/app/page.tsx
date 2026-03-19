import Link from "next/link";

// Fetch data dynamically from the backend
async function getFeaturedProducts() {
  const res = await fetch("http://localhost:5000/api/products", { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="space-y-8">
      {/* Hero Banner (Same as Week 1) */}
      <div className="bg-blue-600 rounded-xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Latest Tech Deals</h1>
          <p className="mb-6">Get up to 40% off on selected items</p>
          <Link href="/category/all" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold">Shop Now</Link>
        </div>
        <div className="mt-8 md:mt-0 w-full md:w-1/3 h-48 bg-blue-400 rounded-lg"></div>
      </div>

      {/* Dynamic Featured Products Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recommended for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((item: any) => (
            <Link href={`/product/${item._id}`} key={item._id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition flex flex-col">
              {/* Replace the bg-gray-200 block with an actual img tag later */}
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500 overflow-hidden">
                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-sm md:text-md font-medium text-gray-800 line-clamp-2">{item.name}</h3>
              <p className="text-lg font-bold text-blue-600 mt-auto pt-2">${item.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}