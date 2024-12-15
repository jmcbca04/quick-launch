'use client';

import { useSearchParams } from 'next/navigation';

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  let pageData;
  
  try {
    pageData = JSON.parse(decodeURIComponent(data)) || {
      hero: {},
      problem: { points: [] },
      features: { items: [] },
      cta: {}
    };
  } catch (e) {
    pageData = {
      hero: {},
      problem: { points: [] },
      features: { items: [] },
      cta: {}
    };
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-bold mb-6 text-4xl md:text-6xl">
          {pageData.hero.headline || 'Your Headline Here'}
        </h1>
        <p className="text-base-content/80 mb-8 max-w-2xl text-xl md:text-2xl">
          {pageData.hero.subheading || 'Your subheading text will appear here. Make it compelling!'}
        </p>
        {pageData.hero.buttonText && (
          <button className="btn btn-primary btn-lg">
            {pageData.hero.buttonText}
          </button>
        )}
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {pageData.problem.title || 'Why This Matters'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pageData.problem.points.map((point, index) => (
                <div key={index} className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title">
                      {point.title || `Problem Point ${index + 1}`}
                    </h3>
                    <p className="text-base-content/80">
                      {point.description || 'Describe the problem or pain point here.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {pageData.features.title || 'Features'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pageData.features.items.map((feature, index) => (
                <div key={index} className="card bg-base-200 shadow-sm">
                  <div className="card-body items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="card-title text-center">
                      {feature.title || `Feature ${index + 1}`}
                    </h3>
                    <p className="text-base-content/80">
                      {feature.description || 'Describe the feature and its benefits here.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {pageData.cta.headline || 'Ready to Get Started?'}
            </h2>
            <p className="text-xl mb-8 text-primary-content/90">
              {pageData.cta.subheading || 'Take the next step and join thousands of satisfied customers.'}
            </p>
            {pageData.cta.buttonText && (
              <button className="btn btn-lg bg-base-100 hover:bg-base-200 text-base-content">
                {pageData.cta.buttonText}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 