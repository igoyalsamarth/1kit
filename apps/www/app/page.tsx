import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HeroContent from '@/components/hero-content';
import { domainCards } from '@/utils/domain-cards';
import DomainCard from '@/components/domain-card';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F9] relative">
      <Navbar />
      <HeroContent />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent bg-[#F9F9F9]">
            Everything You Need, to Launch Fast
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-[700px] mx-auto">
            Our hyper modular CLI provides a collection of production-ready SaaS components that can be assembled into a complete application.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {domainCards.map((card, index) => (
            <DomainCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              tags={card.tags}
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
