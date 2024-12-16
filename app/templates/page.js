import Link from 'next/link';
import Header from '../../components/landing/Header';
import Footer from '../../components/landing/Footer';

export const metadata = {
  title: 'Templates - QuickLaunch',
  description: 'Choose from our collection of professionally designed landing page templates.',
};

const templates = [
  {
    id: 'full-landing',
    name: 'Full Landing Page',
    description: 'A complete landing page with hero, features, problem statement, and call-to-action sections.',
    image: '/templates/full-landing.png',
  },
  {
    id: 'signup',
    name: 'Sign-up Focus',
    description: 'Optimized for collecting sign-ups with a clean, focused design.',
    image: '/templates/signup.png',
  },
  {
    id: 'coming-soon',
    name: 'Coming Soon',
    description: 'Build anticipation and collect emails before your launch.',
    image: '/templates/coming-soon.png',
  },
];

export default function Templates() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Start with one of our professionally designed templates and customize it to match your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-base-100 rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl"
              >
                <div className="aspect-[16/10] relative bg-base-200">
                  <div className="absolute inset-0 flex items-center justify-center text-base-content/40">
                    {/* Placeholder for template preview image */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-base-content group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-base-content/60 h-[48px] line-clamp-2">
                    {template.description}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex gap-4">
                    <Link
                      href="/builder"
                      className="btn btn-primary flex-1"
                    >
                      Use Template
                    </Link>
                    <Link
                      href={`/templates/${template.id}`}
                      className="btn btn-outline"
                    >
                      See Example
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 