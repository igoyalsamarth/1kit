import { ChevronRightIcon, Circle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section with Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black rounded-xl p-2">
                <Circle className="h-6 w-6 fill-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">1kit</span>
            </div>
            <p className="text-gray-600 mb-8 text-base max-w-md leading-relaxed">
              Production-grade select-and-setup open-source CLI to accelerate your development. Launch faster, scale confidently, and focus on what matters most.
            </p>

            <div className="flex space-x-5">
              <Link href="https://github.com/igoyalsamarth/1kit" className="text-gray-400 hover:text-gray-900 transition-colors">
                <span className="sr-only">Github</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          <Link href="https://github.com/igoyalsamarth/1kit/blob/main/README.md" className="bg-gray-100 p-6 rounded-xl group">
            <h4 className="font-bold text-base mb-3 text-gray-800">Getting Started</h4>
            <p className="text-gray-600 text-sm mb-4">New to 1kit? Learn how to set up your first SaaS project in minutes.</p>
            <p className="text-black font-medium text-sm flex items-center">
              Read the guide
              <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          <Link href="https://github.com/igoyalsamarth/1kit" className="bg-gray-100 p-6 rounded-xl group">
            <h4 className="font-bold text-base mb-3 text-gray-800">Contribute</h4>
            <p className="text-gray-600 text-sm mb-4">Contribute to 1kit and help us build the best CLI for development.</p>
            <p className="text-black font-medium text-sm flex items-center">
              View the repo
              <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          <Link href="https://goyalsamarth.com" className="bg-gray-100 p-6 rounded-xl group">
            <h4 className="font-bold text-base mb-3 text-gray-800">Enterprise Solutions</h4>
            <p className="text-gray-600 text-sm mb-4">Custom solutions and dedicated support for large-scale projects.</p>
            <p className="text-black font-medium text-sm flex items-center">
              Contact sales
              <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-8 flex w-full justify-center items-center text-black font-light text-sm">
          <p><Link href="https://github.com/igoyalsamarth/1kit" className=" font-normal text-sm hover:text-gray-900 transition-colors underline">1kit</Link>, a CLI toolkit developed by <Link href="https://goyalsamarth.com" className=" font-normal text-sm hover:text-gray-900 transition-colors underline">goyalsamarth</Link></p>
        </div>
      </div>
    </footer>
  );
}
