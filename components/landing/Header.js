'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-base-100">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-semibold text-base-content">
              QuickLaunch
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/templates" className="text-base-content/80 hover:text-primary">Templates</Link>
              <a href="#features" className="text-base-content/80 hover:text-primary">Features</a>
              <a href="#pricing" className="text-base-content/80 hover:text-primary">Pricing</a>
              <a href="#faq" className="text-base-content/80 hover:text-primary">FAQ</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/builder" className="btn btn-primary btn-sm">
              Create Landing Page
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 