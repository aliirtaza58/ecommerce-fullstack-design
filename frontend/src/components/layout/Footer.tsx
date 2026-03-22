export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-orange mb-1">eShop</h2>
          <p className="text-gray-600 text-sm font-medium">Made by Ali Irtaza</p>
          <p className="text-gray-500 text-xs">
            In association with Developers Hub Corporation as Full Stack Developer Intern
          </p>
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="hover:text-brand-orange cursor-pointer">Support</span>
          <span className="hover:text-brand-orange cursor-pointer">Privacy & Cookies</span>
          <span className="hover:text-brand-orange cursor-pointer">Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
