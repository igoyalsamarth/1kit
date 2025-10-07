import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { BotIcon, ChartLineIcon, CodeIcon, DollarSignIcon, FingerprintIcon, Layers2Icon, MonitorIcon, SparklesIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative pt-28 pb-16 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl leading-[1.1] font-bold tracking-[-0.03em] max-w-[900px] mx-auto text-black">
            Launch Production-Ready
            <br />
            SaaS in Days, Not Months
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-[600px] mx-auto leading-relaxed">
            1Kit provides scalable & secure SaaS starter kits to accelerate your development.
            Save time, money & hassle with our production-grade templates.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="bg-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Explore Starter Kits
            </button>
            <button className="bg-white border border-gray-200 px-7 py-3.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              View Documentation
              <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Everything You Need to Launch Fast
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-[700px] mx-auto">
            Our hyper modular CLI provides a collection of production-ready SaaS components that can be assembled into a complete application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <CodeIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Typescript & Javascript Support</h3>
            <p className="text-gray-600 text-sm mb-3">
              Comprehensive support for Typescript and Javascript both.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Typescript</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Javascript</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <FingerprintIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Authentication & User Management</h3>
            <p className="text-gray-600 text-sm mb-3">
              Authentication and user management tools to help you get started with your application.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Clerk</span>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <ChartLineIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Analytics & Reporting</h3>
            <p className="text-gray-600 text-sm mb-3">
              Analytics and reporting tools to track user engagement, revenue metrics, and product usage.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Mixpanel</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Google Analytics</span>
            </div>
          </div>

          {/* Analytics & Reporting */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <MonitorIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Monitoring & Error Tracking</h3>
            <p className="text-gray-600 text-sm mb-3">
              Monitoring and error tracking tools to help you catch and fix issues quickly.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Sentry</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <Layers2Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Service Layer</h3>
            <p className="text-gray-600 text-sm mb-3">
              A service layer is included to help you get started with your API.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Axios</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">React Query</span>
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <BotIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Git Hooks & Automation</h3>
            <p className="text-gray-600 text-sm mb-3">
              Git hooks and automation to help you get started with your project.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Husky</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Commit Lint</span>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Formatter and Linter</h3>
            <p className="text-gray-600 text-sm mb-3">
              Formatter and linter to help you get started with your project.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Prettier</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Biome</span>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <DollarSignIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Subscription & Billing</h3>
            <p className="text-gray-600 text-sm mb-3">
              Integrated payment processing with Stripe, subscription management, and usage-based billing.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">Stripe</span>
            </div>
          </div>


          {/* Email System */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Email System</h3>
            <p className="text-gray-600 text-sm mb-3">
              Transactional email templates, newsletter management, and email verification workflows.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800">loops</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900 z-0">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-br from-black to-gray-900 p-10 md:p-16 rounded-3xl border border-gray-800 shadow-2xl">
            <div className="text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Ready to Build Your SaaS?
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Get started with 1Kit today and launch your product in record time. Join thousands of developers who have accelerated their path to market.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-xl text-base font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-200">
                  Explore Starter Kits
                </button>
                <button className="bg-black/30 backdrop-blur-sm border border-gray-700 text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-black/40 transition-colors flex items-center justify-center gap-2">
                  <span>View Documentation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hidden md:block relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full filter blur-3xl opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-gray-600 to-gray-900 rounded-full filter blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-black to-gray-900 p-1 rounded-2xl border border-gray-800">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Launch Faster</h3>
                      <p className="text-gray-400 text-sm">Save 200+ development hours</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Production-ready code</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Comprehensive documentation</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Premium support included</span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Starting from</span>
                      <span className="text-white font-bold text-2xl">$99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
