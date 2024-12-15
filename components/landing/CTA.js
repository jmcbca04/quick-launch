export default function CTA() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-content">
            Ready to Build Your Landing Page?
          </h2>
          <p className="text-xl mb-8 text-primary-content/90">
            Join thousands of makers and entrepreneurs who are already using QuickLaunch to grow their projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/builder" className="btn btn-lg bg-white text-primary hover:bg-gray-100">
              Start Building Now
            </a>
            <a href="#pricing" className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-primary">
              View Pricing
            </a>
          </div>
          <p className="mt-8 text-sm text-primary-content/80">
            No credit card required • Free plan available
          </p>
        </div>
      </div>
    </section>
  );
} 