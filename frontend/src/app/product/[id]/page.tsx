async function getProduct(id: string) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="bg-white rounded-xl border p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Image Gallery */}
      <div className="w-full md:w-1/2 space-y-4">
        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Product Information */}
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="text-sm text-gray-500 mb-4">Category: {product.category} | In Stock: {product.stock}</div>
        <div className="text-2xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</div>
        
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mt-auto space-y-4 pt-6 border-t">
          {/* Note: Connecting these buttons to state management for the Cart comes next */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50" disabled={product.stock === 0}>
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}