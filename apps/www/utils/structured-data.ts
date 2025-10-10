export const getStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '1kit',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      '1kit provides select-and-setup CLI to accelerate your development. Save time, money & hassle with the open-source toolkit.',
    author: {
      '@type': 'Person',
      name: 'Samarth Goyal',
      url: 'https://github.com/igoyalsamarth',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    keywords: [
      'SaaS starter kit',
      'Next.js boilerplate',
      'SaaS template',
      'SaaS app builder',
      'production-ready SaaS',
    ].join(','),
  };
};
