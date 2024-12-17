'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const TEMPLATES = {
  FULL_LANDING: 'Full Landing Page',
  SIGNUP_FOCUS: 'Sign-up Focus',
  COMING_SOON: 'Coming Soon'
};

function PreviewContent() {
  const searchParams = useSearchParams();
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Get data from localStorage
      const storedData = localStorage.getItem('previewData');
      if (storedData) {
        setPageData(JSON.parse(storedData));
      }
      // Fallback to URL parameters if localStorage is empty
      else if (searchParams.get('data')) {
        const encodedData = searchParams.get('data');
        setPageData(JSON.parse(decodeURIComponent(encodedData)));
      }
    } catch (error) {
      console.error('Error parsing preview data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading preview...</div>;
  }

  if (!pageData) {
    return <div>No preview data available</div>;
  }

  const getPreviewStyle = () => ({
    '--primary': pageData.styles.colors.primary,
    '--background': pageData.styles.colors.background,
    '--text': pageData.styles.colors.text,
    '--accent': pageData.styles.colors.accent,
    color: 'var(--text)',
    backgroundColor: 'var(--background)',
  });

  return (
    <div style={getPreviewStyle()}>
      <style jsx global>{`
        .form-container {
          width: 100%;
          min-height: 400px;
          background: transparent;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .form-container iframe {
          width: 100% !important;
          height: 100% !important;
          min-height: 400px;
          border: none !important;
          background: transparent;
        }
        /* Adjust container padding based on template */
        .form-container-accent {
          background-color: var(--accent);
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
      `}</style>

      {pageData.template === TEMPLATES.FULL_LANDING && (
        <>
          {/* Hero Section */}
          <section className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={pageData?.hero?.image?.position === 'right' ? 'order-1 md:order-1' : 'order-2 md:order-2'}>
                <h1 className="font-bold mb-6 text-3xl md:text-6xl text-center md:text-left">
                  {pageData?.hero?.headline || 'Your Headline Here'}
                </h1>
                <p className="opacity-80 mb-8 text-lg md:text-2xl text-center md:text-left">
                  {pageData?.hero?.subheading || 'Your subheading text will appear here. Make it compelling!'}
                </p>
                {pageData?.hero?.buttonText && (
                  <div className="text-center md:text-left">
                    <button
                      className="px-8 py-3 rounded-lg font-medium w-full md:w-auto"
                      style={{
                        backgroundColor: pageData?.styles?.colors?.primary,
                        color: pageData?.styles?.colors?.background
                      }}
                    >
                      {pageData?.hero?.buttonText}
                    </button>
                  </div>
                )}
              </div>
              {pageData?.hero?.image?.data && (
                <div className={pageData?.hero?.image?.position === 'right' ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
                    <img
                      src={pageData?.hero?.image?.data}
                      alt={pageData?.hero?.image?.alt || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Problem Section */}
          <section className="py-20" style={{ backgroundColor: pageData.styles.colors.accent }}>
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-bold text-center mb-12 text-3xl md:text-4xl">
                  {pageData.problem.title || 'Why This Matters'}
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                  {pageData.problem.points.map((point, index) => (
                    <div
                      key={index}
                      className="rounded-lg shadow-sm p-6"
                      style={{ backgroundColor: pageData.styles.colors.background }}
                    >
                      <h3 className="text-xl font-semibold mb-4">
                        {point.title || `Problem Point ${index + 1}`}
                      </h3>
                      <p className="opacity-80">
                        {point.description || 'Describe the problem or pain point here.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-bold text-center mb-12 text-3xl md:text-4xl">
                  {pageData.features.title || 'Features'}
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                  {pageData.features.items.map((feature, index) => (
                    <div
                      key={index}
                      className="rounded-lg shadow-sm p-6"
                      style={{ backgroundColor: pageData.styles.colors.accent }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
                        style={{
                          backgroundColor: `${pageData.styles.colors.primary}20`,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={pageData.styles.colors.primary}
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-center">
                        {feature.title || `Feature ${index + 1}`}
                      </h3>
                      <p className="opacity-80 text-center">
                        {feature.description || 'Describe the feature and its benefits here.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section
            className="py-20"
            style={{
              backgroundColor: pageData.styles.colors.primary,
              color: pageData.styles.colors.background
            }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-bold mb-6 text-3xl md:text-4xl">
                  {pageData.cta.headline || 'Ready to Get Started?'}
                </h2>
                <p className="mb-8 opacity-90 text-xl">
                  {pageData.cta.subheading || 'Take the next step and join thousands of satisfied customers.'}
                </p>
                <div className="form-container-accent">
                  {pageData.form.enabled && pageData.form.embedCode ? (
                    <div 
                      className="form-container"
                      dangerouslySetInnerHTML={{ __html: pageData.form.embedCode }}
                    />
                  ) : (
                    <div className="text-center p-4 border-2 border-dashed border-base-300 rounded-lg">
                      <p className="text-base-content/60">Enable form settings and add your Google Form embed code to display the form here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {pageData.template === TEMPLATES.SIGNUP_FOCUS && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={pageData?.signup?.image?.position === 'right' ? 'order-1 md:order-1' : 'order-2 md:order-2'}>
              <div className="text-center md:text-left">
                <h1 className="font-bold mb-4 text-4xl">
                  {pageData.signup.headline || 'Sign Up Now'}
                </h1>
                <p className="opacity-80 text-xl">
                  {pageData.signup.subheading || 'Join us today and get started with your journey.'}
                </p>
              </div>

              <div
                className="rounded-lg shadow-lg p-6 mt-8"
                style={{ backgroundColor: pageData.styles.colors.accent }}
              >
                <div className="form-container-accent">
                  {pageData.form.enabled && pageData.form.embedCode ? (
                    <div 
                      className="form-container"
                      dangerouslySetInnerHTML={{ __html: pageData.form.embedCode }}
                    />
                  ) : (
                    <div className="text-center p-4 border-2 border-dashed border-base-300 rounded-lg">
                      <p className="text-base-content/60">Enable form settings and add your Google Form embed code to display the form here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {pageData?.signup?.image?.data && (
              <div className={pageData?.signup?.image?.position === 'right' ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
                  <img
                    src={pageData?.signup?.image?.data}
                    alt={pageData?.signup?.image?.alt || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {pageData.template === TEMPLATES.COMING_SOON && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={pageData?.comingSoon?.image?.position === 'right' ? 'order-1 md:order-1' : 'order-2 md:order-2'}>
              <div className="text-center md:text-left">
                <h1 className="font-bold mb-4 text-4xl md:text-5xl">
                  {pageData.comingSoon.headline || 'Coming Soon'}
                </h1>
                <p className="opacity-80 mb-8 text-xl">
                  {pageData.comingSoon.subheading || 'Something exciting is in the works. Stay tuned!'}
                </p>

                {pageData.comingSoon.launchDate && (
                  <div className="mb-8">
                    <div className="text-sm opacity-60 mb-2">Launching on</div>
                    <div className="text-2xl font-semibold">
                      {new Date(pageData.comingSoon.launchDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                )}

                <div className="max-w-md mx-auto md:mx-0">
                  <div className="form-container-accent">
                    {pageData.form.enabled && pageData.form.embedCode ? (
                      <div 
                        className="form-container"
                        dangerouslySetInnerHTML={{ __html: pageData.form.embedCode }}
                      />
                    ) : (
                      <div className="text-center p-4 border-2 border-dashed border-base-300 rounded-lg">
                        <p className="text-base-content/60">Enable form settings and add your Google Form embed code to display the form here.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {pageData?.comingSoon?.image?.data && (
              <div className={pageData?.comingSoon?.image?.position === 'right' ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
                  <img
                    src={pageData?.comingSoon?.image?.data}
                    alt={pageData?.comingSoon?.image?.alt || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
} 