export default function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-base-content">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-base-content/80 hover:text-primary">Features</a></li>
              <li><a href="#pricing" className="text-base-content/80 hover:text-primary">Pricing</a></li>
              <li><a href="/builder" className="text-base-content/80 hover:text-primary">Builder</a></li>
              <li><a href="#templates" className="text-base-content/80 hover:text-primary">Templates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base-content">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-base-content/80 hover:text-primary">About</a></li>
              <li><a href="/blog" className="text-base-content/80 hover:text-primary">Blog</a></li>
              <li><a href="/careers" className="text-base-content/80 hover:text-primary">Careers</a></li>
              <li><a href="/contact" className="text-base-content/80 hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base-content">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-base-content/80 hover:text-primary">Documentation</a></li>
              <li><a href="/guides" className="text-base-content/80 hover:text-primary">Guides</a></li>
              <li><a href="/support" className="text-base-content/80 hover:text-primary">Support</a></li>
              <li><a href="/api" className="text-base-content/80 hover:text-primary">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base-content">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-base-content/80 hover:text-primary">Privacy Policy</a></li>
              <li><a href="/terms" className="text-base-content/80 hover:text-primary">Terms of Service</a></li>
              <li><a href="/cookies" className="text-base-content/80 hover:text-primary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-xl font-semibold text-base-content">QuickLaunch</span>
            <span className="text-sm text-base-content/70">© 2024 All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="https://twitter.com" className="text-base-content/80 hover:text-primary">Twitter</a>
            <a href="https://github.com" className="text-base-content/80 hover:text-primary">GitHub</a>
            <a href="https://linkedin.com" className="text-base-content/80 hover:text-primary">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 