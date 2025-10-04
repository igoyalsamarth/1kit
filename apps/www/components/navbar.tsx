import { Circle } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="sticky top-4 z-50 px-4">
      <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md px-6 py-4 rounded-full shadow-sm">
        <div className="flex items-center justify-center gap-10">
          <div className="flex items-center gap-2">
            <Circle className="h-5 w-5 fill-black" />
            <span className="text-lg font-bold text-black">1Kit</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#" className="hover:text-gray-900 transition-colors">FAQ</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Showcase</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Blog</a>
              <a href="#" className="hover:text-gray-900 transition-colors">SaaS ideas</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Tools</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Changelog</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Docs</a>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
