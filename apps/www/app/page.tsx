import Navbar from '@/components/navbar';
import Image from 'next/image';
import Footer from '@/components/footer';

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

          {/* Featured Kits Showcase */}
          <div className="mt-20">
            {/* Full Stack SAAS Kit - Flagship */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 shadow-md mb-10 relative overflow-hidden border border-gray-100">
              <div className="absolute top-6 right-6 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                Flagship
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex-1">
                  <div className="w-full aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                    <Image
                      src="https://placehold.co/800x500/f3f4f6/d1d5db?text=Full+Stack+SAAS+Kit"
                      alt="Full Stack SAAS Kit Interface"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] leading-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                    Full Stack SAAS Kit
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    Complete end-to-end solution for building production-ready SaaS applications with all essential features included.
                  </p>
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
                    <span className="bg-black text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center">NEXT.JS</span>
                    <span className="bg-black text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center">TYPESCRIPT</span>
                    <span className="bg-black text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center">TAILWIND CSS</span>
                    <span className="bg-black text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center">STRIPE</span>
                    <span className="bg-black text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center">AUTH.JS</span>
                    <span className="bg-black text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center">PRISMA</span>
                  </div>
                  <div className="mt-8">
                    <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                      Explore This Kit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Kits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dashboard Kit */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Dashboard Kit</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    A complete admin dashboard solution with analytics, user management, and customizable components.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">NEXT.JS</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">TYPESCRIPT</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">TAILWIND</span>
                  </div>
                </div>
              </div>

              {/* AI Kit */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">AI Kit</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Build AI-powered applications with pre-built components for chat, image generation, and text analysis.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">OPENAI</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">REACT</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">API</span>
                  </div>
                </div>
              </div>

              {/* Directory Kit */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Directory Kit</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Create powerful directory and listing platforms with search, filters, and booking functionality.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">SEARCH</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">FILTERS</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">MAPS</span>
                  </div>
                </div>
              </div>

              {/* Data Product Kit */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Data Product Kit</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Build data-intensive applications with charts, tables, and advanced visualization components.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">CHARTS</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">TABLES</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">ANALYTICS</span>
                  </div>
                </div>
              </div>
            </div>
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
            Our starter kits come with all the essential features to get your SaaS up and running quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Authentication & User Management - Large Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-black to-gray-800 p-6 rounded-2xl text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Authentication & User Management</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Complete authentication system with social logins, email verification, and user profile management.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs backdrop-blur-sm">OAuth</span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs backdrop-blur-sm">JWT</span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs backdrop-blur-sm">Roles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Subscription & Billing</h3>
            <p className="text-gray-600 text-sm mb-3">
              Integrated payment processing with Stripe, subscription management, and usage-based billing.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Stripe</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Recurring</span>
            </div>
          </div>

          {/* Analytics & Reporting */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Analytics & Reporting</h3>
            <p className="text-gray-600 text-sm mb-3">
              Built-in analytics dashboard to track user engagement, revenue metrics, and product usage.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Charts</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Metrics</span>
            </div>
          </div>

          {/* API & Webhooks */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">API & Webhooks</h3>
            <p className="text-gray-600 text-sm mb-3">
              RESTful API endpoints with authentication, rate limiting, and webhook integration.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">REST</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Webhooks</span>
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Security & Compliance</h3>
            <p className="text-gray-600 text-sm mb-3">
              Enterprise-grade security with GDPR compliance, data encryption, and audit logs.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">GDPR</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Encryption</span>
            </div>
          </div>

          {/* Multi-tenancy - Large Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Multi-tenancy Architecture</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Serve multiple customers from a single instance with isolated data and customizable workspaces.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs backdrop-blur-sm">Isolation</span>
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs backdrop-blur-sm">Workspaces</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email System */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Email System</h3>
            <p className="text-gray-600 text-sm mb-3">
              Transactional email templates, newsletter management, and email verification workflows.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Templates</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">SMTP</span>
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
