export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">QuickLaunch</h1>
            <div className="h-6 w-px bg-gray-200"></div>
            <button className="btn btn-sm btn-ghost">Save</button>
            <button className="btn btn-sm btn-ghost">Preview</button>
          </div>
          <button className="btn btn-primary btn-sm">Export</button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-sm text-gray-500 flex justify-between items-center">
          <span>QuickLaunch</span>
          <nav className="flex gap-4">
            <button className="hover:text-gray-700">Help</button>
            <button className="hover:text-gray-700">About</button>
          </nav>
        </div>
      </footer>
    </div>
  );
} 