export default function ProductDetails() {
  return (
    <div className="bg-white rounded-xl border p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Image Gallery (Top on Mobile, Left on Desktop) */}
      <div className="w-full md:w-1/2 space-y-4">
        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Main Product Image</div>
        <div className="flex gap-4 overflow-x-auto">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Product Information */}
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Premium Wireless Headphones</h1>
        <div className="text-2xl font-bold text-blue-600 mb-6">$299.00</div>
        
        <p className="text-gray-600 mb-6">High-quality wireless headphones with active noise cancellation, 30-hour battery life, and spatial audio support. Perfect for music lovers and professionals alike.</p>
        
        <div className="mt-auto space-y-4 pt-6 border-t">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Add to Cart
          </button>
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
}