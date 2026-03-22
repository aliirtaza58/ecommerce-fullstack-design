export default function DealsSection() {
  const deals = [
    { name: "Smart watches", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=80", discount: "-25%" },
    { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80", discount: "-15%" },
    { name: "GoPro cameras", image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=300&q=80", discount: "-40%" },
    { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", discount: "-25%" },
    { name: "Canon cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80", discount: "-25%" },
  ];

  return (
    <section className="bg-white border rounded-lg max-w-[1440px] mx-auto md:mb-6 shadow-sm overflow-hidden flex flex-col md:flex-row">
      {/* Left Block: Title and Timer */}
      <div className="p-4 md:p-6 md:border-r border-b md:border-b-0 border-gray-200 md:w-[280px] flex-shrink-0 flex md:flex-col items-center justify-between md:items-start md:justify-start">
        <div className="md:mb-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Deals and offers</h3>
          <p className="text-gray-500 text-sm md:text-md">Electronic equipments</p>
        </div>
        
        {/* Timer */}
        <div className="flex space-x-1 mt-2 md:mt-4">
          <div className="bg-gray-800 text-white w-10 h-10 md:w-12 md:h-12 flex flex-col justify-center items-center rounded">
            <span className="font-bold text-sm md:text-base leading-none">04</span>
            <span className="text-[10px] md:text-xs">Days</span>
          </div>
          <div className="bg-gray-800 text-white w-10 h-10 md:w-12 md:h-12 flex flex-col justify-center items-center rounded">
            <span className="font-bold text-sm md:text-base leading-none">13</span>
            <span className="text-[10px] md:text-xs">Hour</span>
          </div>
          <div className="bg-gray-800 text-white w-10 h-10 md:w-12 md:h-12 flex flex-col justify-center items-center rounded">
            <span className="font-bold text-sm md:text-base leading-none">34</span>
            <span className="text-[10px] md:text-xs">Min</span>
          </div>
          <div className="bg-gray-800 text-white w-10 h-10 md:w-12 md:h-12 flex flex-col justify-center items-center rounded">
            <span className="font-bold text-sm md:text-base leading-none">56</span>
            <span className="text-[10px] md:text-xs">Sec</span>
          </div>
        </div>
      </div>

      {/* Right Block: Scrollable Carousel */}
      <div className="flex overflow-x-auto no-scrollbar md:w-full divide-x divide-gray-200">
        {deals.map((deal, index) => (
          <div key={index} className="flex flex-col items-center min-w-[120px] md:min-w-[140px] p-2 md:p-4 border-l cursor-pointer group hover:bg-gray-50">
            <div className="w-20 h-20 md:w-28 md:h-28 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src={deal.image} alt={deal.name} className="max-w-full max-h-full object-contain" />
            </div>
            <p className="text-gray-800 text-xs md:text-sm text-center line-clamp-1 group-hover:text-brand-orange">{deal.name}</p>
            <div className="mt-1 bg-red-100 text-[#eb001b] text-xs font-bold px-3 py-1 rounded-full">
              {deal.discount}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
