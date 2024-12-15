export default function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-base-content">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-base-content/80 hover:text-primary">Features</a></li>
              <li><a href="#pricing" className="text-base-content/80 hover:text-primary">Pricing</a></li>
              <li><a href="/builder" className="text-base-content/80 hover:text-primary">Builder</a></li>
              <li><a href="#templates" className="text-base-content/80 hover:text-primary">Templates</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xl font-semibold text-base-content">QuickLaunch</span>
            <span className="text-sm text-base-content/70">© 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 