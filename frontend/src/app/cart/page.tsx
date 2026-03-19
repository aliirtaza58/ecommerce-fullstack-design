export default function CartPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Cart Items List */}
      <div className="flex-1 bg-white rounded-lg border p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Shopping Cart</h2>
        
        {[1, 2].map((item) => (
          <div key={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b last:border-0">
            <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Premium Wireless Headphones</h3>
              <p className="text-sm text-gray-500 mt-1">Color: Black</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="border rounded p-1"><option>1</option><option>2</option></select>
              <span className="font-bold w-20 text-right">$299.00</span>
              <button className="text-red-500 text-sm font-medium hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-80 bg-white rounded-lg border p-6 h-fit">
        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
        <div className="space-y-3 text-gray-600 mb-6 border-b pb-6">
          <div className="flex justify-between"><span>Subtotal</span><span>$598.00</span></div>
          <div className="flex justify-between"><span>Tax</span><span>$45.00</span></div>
          <div className="flex justify-between font-bold text-gray-900 text-lg mt-4 pt-4 border-t">
            <span>Total</span><span>$643.00</span>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
          Checkout
        </button>
      </div>
    </div>
  );
}