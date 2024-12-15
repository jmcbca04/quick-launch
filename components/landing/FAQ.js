export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-base-content">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse collapse-plus bg-base-100 shadow-sm">
              <input type="radio" name="faq-accordion" defaultChecked /> 
              <div className="collapse-title text-xl font-medium text-base-content">
                How is QuickLaunch different from other website builders?
              </div>
              <div className="collapse-content text-base-content/90">
                <p>QuickLaunch is specifically designed for creating single-page landing pages quickly. Unlike full website builders, we focus on simplicity and speed, offering just the features you need for an effective landing page.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow-sm">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-base-content">
                Can I use my own domain name?
              </div>
              <div className="collapse-content text-base-content/90">
                <p>Yes! You can either export your landing page and host it anywhere, or use our optional hosting service to deploy it to your custom domain.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow-sm">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-base-content">
                Do I need coding knowledge?
              </div>
              <div className="collapse-content text-base-content/90">
                <p>Not at all! QuickLaunch is designed to be completely no-code. Our intuitive interface lets you build professional landing pages without any technical knowledge.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow-sm">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-base-content">
                Can I export my landing page?
              </div>
              <div className="collapse-content text-base-content/90">
                <p>Yes! You can export your landing page as a standalone HTML file that you can host anywhere. We also provide direct deployment options to popular platforms.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 shadow-sm">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-base-content">
                Is my landing page mobile-responsive?
              </div>
              <div className="collapse-content text-base-content/90">
                <p>Absolutely! All landing pages created with QuickLaunch are fully responsive and look great on all devices, from mobile phones to desktop computers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 