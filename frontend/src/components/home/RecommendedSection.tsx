import Link from "next/link";

export default function RecommendedSection({ products }: { products: any[] }) {
  return (
    <section className="max-w-[1440px] mx-auto md:mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 px-4 md:px-0">Recommended items</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-0">
        {products.map((item) => (
          <Link href={`/product/${item._id || item.id}`} key={item._id || item.id} className="bg-white border rounded-lg p-4 flex flex-col hover:shadow-lg transition">
            <div className="w-full h-32 md:h-40 bg-gray-50 rounded mb-4 flex items-center justify-center p-2 mb-3">
              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="mt-auto">
              <p className="font-bold text-gray-900 text-lg md:text-xl">${item.price.toFixed(2)}</p>
              <h3 className="text-gray-500 text-sm md:text-base line-clamp-2 mt-1 pr-2">{item.description || item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
