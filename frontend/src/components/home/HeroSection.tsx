import Link from "next/link";
import { User } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-white border rounded-lg p-4 md:p-5 flex flex-col md:flex-row gap-4 max-w-[1440px] mx-auto md:mb-6 shadow-sm">
      {/* --- DESKTOP LEFT CATEGORIES --- */}
      <div className="hidden md:flex flex-col w-64 pr-4">
        <ul className="space-y-2 text-gray-600">
          <li className="bg-blue-50 text-gray-900 rounded font-medium px-3 py-1.5"><Link href="#">Automobiles</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">Clothes and wear</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">Home interiors</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">Computer and tech</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">Tools, equipments</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">Sports and outdoor</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">Animal and pets</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">Machinery tools</Link></li>
          <li className="px-3 hover:text-gray-900 transition"><Link href="#">More category</Link></li>
        </ul>
      </div>

      {/* --- CENTER BANNER --- */}
      <div className="flex-1 rounded-lg relative overflow-hidden flex items-center min-h-[300px] md:min-h-[380px] w-full group">
        <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1000&q=80" alt="Tech Background" className="absolute inset-0 w-full h-full object-cover object-center" />
        {/* Placeholder for background image / graphics overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-100/90 to-teal-50/60"></div>
        
        <div className="relative z-10 max-w-sm p-8">
          <h2 className="text-2xl text-gray-800 mb-1">Latest trending</h2>
          <p className="text-xl md:text-3xl text-gray-900 mb-6 font-bold shadow-sm drop-shadow-md">
            Latest trending <br /> <b className="text-gray-900">Electronic items</b>
          </p>
          <button className="bg-white text-gray-900 px-4 py-2 text-sm md:px-6 md:py-3 md:text-base font-bold rounded shadow-md hover:bg-gray-50 border border-gray-200 transition">
            Learn more
          </button>
        </div>
      </div>

      {/* --- DESKTOP RIGHT CARDS --- */}
      <div className="hidden lg:flex flex-col w-64 gap-3">
        {/* User Card */}
        <div className="bg-[#e3f0ff] p-4 rounded-lg flex flex-col items-start h-[150px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-[#b2d9ff] rounded-full flex items-center justify-center text-[#0d6efd]">
              <User size={20} />
            </div>
            <p className="text-sm font-medium text-gray-800 leading-tight">
              Hi, user<br />let's get started
            </p>
          </div>
          <button className="w-full bg-brand-orange text-white rounded text-sm py-1.5 mb-2 hover:bg-orange-600 transition">Join now</button>
          <button className="w-full bg-white text-brand-orange rounded text-sm py-1.5 hover:bg-gray-50 transition border border-gray-200">Log in</button>
        </div>
        
        {/* Promo Card 1 */}
        <div className="bg-cover bg-center p-4 rounded-md text-white shadow-sm relative overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80')" }}>
          <div className="absolute inset-0 bg-[#f38332]/80 mix-blend-multiply"></div>
          <p className="text-sm font-medium relative z-10">Get US $10 off <br/> with a new <br/> supplier</p>
        </div>

        {/* Promo Card 2 */}
        <div className="bg-cover bg-center p-4 rounded-md text-white shadow-sm relative overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8ed7c15682?w=300&q=80')" }}>
          <div className="absolute inset-0 bg-[#55bdc3]/80 mix-blend-multiply"></div>
          <p className="text-sm font-medium relative z-10">Send quotes with <br/> supplier <br/> preferences</p>
        </div>
      </div>
    </section>
  );
}
