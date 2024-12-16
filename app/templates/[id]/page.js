import Link from 'next/link';

const templates = {
  'full-landing': {
    name: 'Full Landing Page',
    sections: {
      hero: {
        headline: 'Launch Your SaaS in Minutes',
        subheading: 'The fastest way to build and deploy your software as a service. Get started with our intuitive platform today.',
        buttonText: 'Start Free Trial',
        image: {
          data: '/templates/examples/saas-hero.png',
          alt: 'SaaS Platform Dashboard',
          position: 'right'
        }
      },
      problem: {
        title: 'Why Choose Our Platform',
        points: [
          {
            title: 'Save Development Time',
            description: 'Launch your SaaS 10x faster with our pre-built components and infrastructure.'
          },
          {
            title: 'Scale With Confidence',
            description: 'Built on enterprise-grade infrastructure that grows with your business.'
          },
          {
            title: 'Focus on Your Product',
            description: 'We handle the technical details so you can focus on building your business.'
          }
        ]
      },
      features: {
        title: 'Powerful Features',
        items: [
          {
            title: 'Easy Integration',
            description: 'Connect with your favorite tools and services in just a few clicks.'
          },
          {
            title: 'Real-time Analytics',
            description: 'Monitor your business metrics and user engagement in real-time.'
          },
          {
            title: 'Secure by Default',
            description: 'Enterprise-grade security and compliance built into every feature.'
          }
        ]
      },
      cta: {
        headline: 'Ready to Get Started?',
        subheading: 'Join thousands of successful businesses already using our platform.',
        buttonText: 'Start Building Now'
      }
    }
  },
  'signup': {
    name: 'Sign-up Focus',
    headline: 'Join the Waitlist',
    subheading: 'Be the first to experience our revolutionary platform when we launch.',
    buttonText: 'Join Now',
    emailPlaceholder: 'Enter your email address',
    namePlaceholder: 'Your name',
    image: {
      data: '/templates/examples/signup-hero.png',
      alt: 'Platform Preview',
      position: 'right'
    }
  },
  'coming-soon': {
    name: 'Coming Soon',
    headline: 'Coming Soon',
    subheading: 'Something exciting is in the works. Stay tuned for our launch!',
    launchDate: '2024-03-01',
    buttonText: 'Notify Me',
    emailPlaceholder: 'Enter your email to get notified',
    image: {
      data: '/templates/examples/coming-soon.png',
      alt: 'Launch Preview',
      position: 'right'
    }
  }
};

export default function TemplateExample({ params }) {
  const template = templates[params.id];
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Template Not Found</h1>
          <Link href="/templates" className="btn btn-primary">
            Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  if (params.id === 'full-landing') {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className={template.sections.hero.image.position === 'right' ? 'order-1' : 'order-2'}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {template.sections.hero.headline}
              </h1>
              <p className="text-xl md:text-2xl opacity-80 mb-8">
                {template.sections.hero.subheading}
              </p>
              <button className="btn btn-primary btn-lg">
                {template.sections.hero.buttonText}
              </button>
            </div>
            <div className={template.sections.hero.image.position === 'right' ? 'order-2' : 'order-1'}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
                <div className="w-full h-full flex items-center justify-center text-base-content/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {template.sections.problem.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {template.sections.problem.points.map((point, index) => (
                  <div
                    key={index}
                    className="bg-base-100 rounded-lg p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-4">{point.title}</h3>
                    <p className="opacity-80">{point.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {template.sections.features.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {template.sections.features.items.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-base-200 rounded-lg p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="opacity-80">{feature.description}</p>
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
                {template.sections.cta.headline}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {template.sections.cta.subheading}
              </p>
              <button className="btn btn-lg bg-primary-content text-primary hover:bg-primary-content/90">
                {template.sections.cta.buttonText}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (params.id === 'signup') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className={template.image.position === 'right' ? 'order-1' : 'order-2'}>
            <div className={`${template.image.position === 'right' ? 'text-left' : 'text-right'}`}>
              <h1 className="text-4xl font-bold mb-4">
                {template.headline}
              </h1>
              <p className="text-xl opacity-80">
                {template.subheading}
              </p>
            </div>

            <div className="bg-base-200 rounded-lg shadow-lg p-6 mt-8">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={template.namePlaceholder}
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder={template.emailPlaceholder}
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary w-full">
                  {template.buttonText}
                </button>
              </div>
            </div>
          </div>
          <div className={template.image.position === 'right' ? 'order-2' : 'order-1'}>
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
              <div className="w-full h-full flex items-center justify-center text-base-content/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (params.id === 'coming-soon') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className={template.image.position === 'right' ? 'order-1' : 'order-2'}>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {template.headline}
              </h1>
              <p className="text-xl opacity-80 mb-8">
                {template.subheading}
              </p>

              <div className="mb-8">
                <div className="text-sm opacity-60 mb-2">Launching on</div>
                <div className="text-2xl font-semibold">
                  {new Date(template.launchDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className="max-w-md md:mx-0">
                <div className="join w-full">
                  <input
                    type="email"
                    placeholder={template.emailPlaceholder}
                    className="input input-bordered join-item flex-1"
                  />
                  <button className="btn btn-primary join-item">
                    {template.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={template.image.position === 'right' ? 'order-2' : 'order-1'}>
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
              <div className="w-full h-full flex items-center justify-center text-base-content/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
} 