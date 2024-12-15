export default function Hero() {
  return (
    <section className="py-20 md:py-28 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-base-content">
            Create Landing Pages in Minutes
          </h1>
          <p className="text-xl md:text-2xl text-base-content/80 mb-8">
            The fastest way to build and launch beautiful landing pages for your projects. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/builder" className="btn btn-primary btn-lg">
              Start Building Free
            </a>
            <a href="#features" className="btn btn-outline btn-lg">
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
