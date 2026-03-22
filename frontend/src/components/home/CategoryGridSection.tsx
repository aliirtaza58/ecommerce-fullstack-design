import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryGridSection({ title, imageSrc, items }: { title: string, imageSrc: string, items: any[] }) {
  return (
    <section className="bg-white border rounded-lg max-w-[1440px] mx-auto md:mb-6 flex flex-col md:flex-row overflow-hidden shadow-sm">
      {/* --- DESKTOP LEFT HERO IMAGE --- */}
      <div className="md:w-[280px] p-6 text-gray-800 bg-cover bg-center flex-shrink-0 relative overflow-hidden" style={{ backgroundImage: `url(${imageSrc})` }}>
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative z-10 w-32">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <button className="bg-white text-gray-800 shadow-sm border px-4 py-2 font-medium rounded hover:bg-gray-50 text-sm">
            Source now
          </button>
        </div>
      </div>

      {/* --- MOBILE TITLE (Hidden on Desktop) --- */}
      <div className="md:hidden px-4 py-3 font-bold text-lg border-b bg-white text-gray-800">
        {title}
      </div>

      {/* GRID (Horizontal List Mobile, Flex Row Desktop) */}
      <div className="flex-1 overflow-x-auto no-scrollbar w-full">
        <div className="flex flex-row w-full h-full divide-x divide-gray-200 border-t md:border-t-0">
          {items.slice(0, 4).map((item, index) => (
            <Link href={`/product/${item._id}`} key={index} className="flex-1 flex flex-col p-4 min-w-[160px] md:min-w-[200px] border-b-0 min-h-[160px] md:min-h-[180px] relative overflow-hidden group hover:bg-gray-50 transition">
              <div className="z-10 relative">
                <p className="text-gray-800 font-medium mb-1 line-clamp-2 md:text-base">{item.name}</p>
                <div className="text-gray-500 text-xs md:text-sm mt-1">From <br className="hidden md:block"/>USD {Math.round(item.price)}</div>
              </div>
              <div className="absolute bottom-4 right-4 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain drop-shadow-sm" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- MOBILE "Source now" LINK (Hidden on Desktop) --- */}
      <div className="md:hidden px-4 py-3 border-t bg-white flex items-center gap-2 text-brand-orange font-medium shadow-sm">
        <Link href="#">Source now</Link>
        <ArrowRight size={18} />
      </div>
    </section>
  );
}
