export default function Problem() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-base-content">
            Building Landing Pages Shouldn't Be Hard
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-base-content">Too Much Complexity</h3>
                <p className="text-base-content/80">
                  Most website builders are overkill for a simple landing page. You shouldn't need to learn a complex tool just to create one page.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-base-content">Time-Consuming Process</h3>
                <p className="text-base-content/80">
                  Setting up a landing page from scratch takes hours. You need something that can go live in minutes, not days.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-base-content">Expensive Solutions</h3>
                <p className="text-base-content/80">
                  Why pay monthly for a landing page? Most builders charge recurring fees for features you'll never use.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-base-content">Technical Barriers</h3>
                <p className="text-base-content/80">
                  Not everyone knows how to code. You shouldn't need to be a developer to create a professional landing page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 