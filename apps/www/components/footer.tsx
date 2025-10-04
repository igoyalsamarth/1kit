import { Circle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white pt-20 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section with Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black rounded-xl p-2">
                <Circle className="h-6 w-6 fill-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">1Kit</span>
            </div>
            <p className="text-gray-600 mb-8 text-base max-w-md leading-relaxed">
              Production-grade SaaS starter kits to accelerate your development. Launch faster, scale confidently, and focus on what matters most.
            </p>

            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4 text-base">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 text-sm"
                />
                <button className="bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We&apos;ll send you updates on new kits and features. No spam.
              </p>
            </div>

            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base">Products</h3>
            <ul className="space-y-4 text-base">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">SaaS Dashboard Kit</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">E-commerce Kit</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Marketing Site Kit</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Mobile App Kit</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base">Resources</h3>
            <ul className="space-y-4 text-base">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base">Company</h3>
            <ul className="space-y-4 text-base">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Middle Section with Featured */}
        <div className="border-t border-gray-100 pt-10 pb-12 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-bold text-base mb-3">Getting Started</h4>
              <p className="text-gray-600 text-sm mb-4">New to 1Kit? Learn how to set up your first SaaS project in minutes.</p>
              <a href="#" className="text-black font-medium text-sm flex items-center">
                Read the guide
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-bold text-base mb-3">Developer Hub</h4>
              <p className="text-gray-600 text-sm mb-4">Access code samples, tutorials, and best practices for building with 1Kit.</p>
              <a href="#" className="text-black font-medium text-sm flex items-center">
                Explore resources
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-bold text-base mb-3">Community</h4>
              <p className="text-gray-600 text-sm mb-4">Join our Discord community to connect with other developers and get help.</p>
              <a href="#" className="text-black font-medium text-sm flex items-center">
                Join Discord
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-bold text-base mb-3">Enterprise Solutions</h4>
              <p className="text-gray-600 text-sm mb-4">Custom solutions and dedicated support for large-scale projects.</p>
              <a href="#" className="text-black font-medium text-sm flex items-center">
                Contact sales
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} 1Kit. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">Sitemap</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
