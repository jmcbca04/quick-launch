import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 border-b">
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
            QuickLaunch
          </Link>
          <nav>
            {/* Add navigation items here if needed */}
          </nav>
        </div>
      </div>
    </header>
  );
} 