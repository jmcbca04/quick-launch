'use client';

import Link from 'next/link';
import { useState } from 'react';
import JSZip from 'jszip';

export default function MainLayout({ children }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Get the current page data from localStorage
      const pageData = JSON.parse(localStorage.getItem('pageData'));
      
      // Generate the HTML content
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${pageData?.hero?.subheading || 'Landing page created with QuickLaunch'}">
    <title>${pageData?.hero?.headline || 'QuickLaunch Landing Page'}</title>
    <style>
        /* Reset and base styles */
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
            color: ${pageData?.styles?.colors?.text || '#171717'};
            background-color: ${pageData?.styles?.colors?.background || '#ffffff'};
            line-height: 1.5;
        }

        /* Container */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Responsive text */
        @media (max-width: 768px) {
            h1 { font-size: 2.5rem !important; }
            h2 { font-size: 2rem !important; }
            h3 { font-size: 1.5rem !important; }
            p { font-size: 1rem !important; }
            .grid { grid-template-columns: 1fr !important; }
            .mobile-full { width: 100% !important; max-width: 20rem !important; }
        }

        /* Grid system */
        .grid {
            display: grid;
            gap: 2rem;
        }

        /* Utility classes */
        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .opacity-80 { opacity: 0.8; }
        .opacity-90 { opacity: 0.9; }
        .max-w-xl { max-width: 36rem; }
        .max-w-2xl { max-width: 42rem; }
        .max-w-4xl { max-width: 56rem; }
    </style>
</head>
<body>
    ${pageData.template === 'Full Landing Page' ? `
    <!-- Hero Section -->
    <section style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
        <h1 style="font-size: 3.5rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem;">
            ${pageData?.hero?.headline || 'Your Headline Here'}
        </h1>
        <p style="font-size: 1.25rem; opacity: 0.8; max-width: 42rem; text-align: center; margin-bottom: 2rem;">
            ${pageData?.hero?.subheading || 'Your subheading text will appear here. Make it compelling!'}
        </p>
        ${pageData?.hero?.buttonText ? `
        <button style="
            background-color: ${pageData?.styles?.colors?.primary || '#171717'}; 
            color: ${pageData?.styles?.colors?.background || '#ffffff'};
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            font-weight: 500;
            border: none;
            cursor: pointer;
            font-size: 1rem;
        " class="mobile-full">
            ${pageData?.hero?.buttonText}
        </button>
        ` : ''}
    </section>

    <!-- Problem Section -->
    <section style="padding: 5rem 1rem; background-color: ${pageData?.styles?.colors?.accent};">
        <div class="container">
            <div class="max-w-4xl mx-auto">
                <h2 style="font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 3rem;">
                    ${pageData?.problem?.title || 'Why This Matters'}
                </h2>
                
                <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
                    ${pageData?.problem?.points.map((point, index) => `
                    <div style="
                        background-color: ${pageData?.styles?.colors?.background};
                        padding: 1.5rem;
                        border-radius: 0.5rem;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    ">
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
                            ${point?.title || `Problem Point ${index + 1}`}
                        </h3>
                        <p style="opacity: 0.8;">
                            ${point?.description || 'Describe the problem or pain point here.'}
                        </p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section style="padding: 5rem 1rem;">
        <div class="container">
            <div class="max-w-4xl mx-auto">
                <h2 style="font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 3rem;">
                    ${pageData?.features?.title || 'Features'}
                </h2>
                
                <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
                    ${pageData?.features?.items.map((feature, index) => `
                    <div style="
                        background-color: ${pageData?.styles?.colors?.accent};
                        padding: 1.5rem;
                        border-radius: 0.5rem;
                        text-align: center;
                    ">
                        <div style="
                            width: 3rem;
                            height: 3rem;
                            background-color: ${pageData?.styles?.colors?.primary}20;
                            border-radius: 9999px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 1rem auto;
                        ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${pageData?.styles?.colors?.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
                            ${feature?.title || `Feature ${index + 1}`}
                        </h3>
                        <p style="opacity: 0.8;">
                            ${feature?.description || 'Describe the feature and its benefits here.'}
                        </p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section style="
        padding: 5rem 1rem;
        background-color: ${pageData?.styles?.colors?.primary};
        color: ${pageData?.styles?.colors?.background};
    ">
        <div class="container">
            <div class="max-w-4xl mx-auto text-center">
                <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    ${pageData?.cta?.headline || 'Ready to Get Started?'}
                </h2>
                <p style="font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem;">
                    ${pageData?.cta?.subheading || 'Take the next step and join thousands of satisfied customers.'}
                </p>
                ${pageData?.cta?.buttonText ? `
                <button style="
                    background-color: ${pageData?.styles?.colors?.background};
                    color: ${pageData?.styles?.colors?.primary};
                    padding: 0.75rem 2rem;
                    border-radius: 0.5rem;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                " class="mobile-full">
                    ${pageData?.cta?.buttonText}
                </button>
                ` : ''}
            </div>
        </div>
    </section>
    ` : pageData.template === 'Sign-up Focus' ? `
    <!-- Sign-up Focus Template -->
    <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    ">
        <div style="max-width: 28rem; width: 100%;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">
                    ${pageData?.signup?.headline || 'Sign Up Now'}
                </h1>
                <p style="font-size: 1.25rem; opacity: 0.8;">
                    ${pageData?.signup?.subheading || 'Join us today and get started with your journey.'}
                </p>
            </div>
            
            <div style="
                background-color: ${pageData?.styles?.colors?.accent};
                padding: 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            ">
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <input 
                        type="text" 
                        placeholder="${pageData?.signup?.namePlaceholder}"
                        style="
                            width: 100%;
                            padding: 0.75rem 1rem;
                            border-radius: 0.5rem;
                            border: 1px solid ${pageData?.styles?.colors?.primary}20;
                            background-color: ${pageData?.styles?.colors?.background};
                            font-size: 1rem;
                        "
                    />
                    <input 
                        type="email" 
                        placeholder="${pageData?.signup?.emailPlaceholder}"
                        style="
                            width: 100%;
                            padding: 0.75rem 1rem;
                            border-radius: 0.5rem;
                            border: 1px solid ${pageData?.styles?.colors?.primary}20;
                            background-color: ${pageData?.styles?.colors?.background};
                            font-size: 1rem;
                        "
                    />
                    <button style="
                        width: 100%;
                        background-color: ${pageData?.styles?.colors?.primary};
                        color: ${pageData?.styles?.colors?.background};
                        padding: 0.75rem 2rem;
                        border-radius: 0.5rem;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        font-size: 1rem;
                    ">
                        ${pageData?.signup?.buttonText || 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    </div>
    ` : `
    <!-- Coming Soon Template -->
    <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    ">
        <div style="max-width: 32rem; width: 100%; text-align: center;">
            <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">
                ${pageData?.comingSoon?.headline || 'Coming Soon'}
            </h1>
            <p style="font-size: 1.25rem; opacity: 0.8; margin-bottom: 2rem;">
                ${pageData?.comingSoon?.subheading || 'Something exciting is in the works. Stay tuned!'}
            </p>
            
            ${pageData?.comingSoon?.launchDate ? `
            <div style="margin-bottom: 2rem;">
                <div style="font-size: 0.875rem; opacity: 0.6; margin-bottom: 0.5rem;">
                    Launching on
                </div>
                <div style="font-size: 1.5rem; font-weight: 600;">
                    ${new Date(pageData?.comingSoon?.launchDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </div>
            </div>
            ` : ''}
            
            <div style="max-width: 28rem; margin: 0 auto;">
                <div style="display: flex;">
                    <input 
                        type="email" 
                        placeholder="${pageData?.comingSoon?.emailPlaceholder}"
                        style="
                            flex: 1;
                            padding: 0.75rem 1rem;
                            border-top-left-radius: 0.5rem;
                            border-bottom-left-radius: 0.5rem;
                            border: 1px solid ${pageData?.styles?.colors?.primary}20;
                            background-color: ${pageData?.styles?.colors?.background};
                            font-size: 1rem;
                        "
                    />
                    <button style="
                        background-color: ${pageData?.styles?.colors?.primary};
                        color: ${pageData?.styles?.colors?.background};
                        padding: 0.75rem 2rem;
                        border-top-right-radius: 0.5rem;
                        border-bottom-right-radius: 0.5rem;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        font-size: 1rem;
                        white-space: nowrap;
                    ">
                        ${pageData?.comingSoon?.buttonText}
                    </button>
                </div>
            </div>
        </div>
    </div>
    `}
</body>
</html>`.trim();

      // Create a ZIP file
      const zip = new JSZip();
      
      // Add index.html to the ZIP
      zip.file("index.html", htmlContent);
      
      // Generate the ZIP file
      const blob = await zip.generateAsync({type: "blob"});
      
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'landing-page.zip';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Show success message
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background-color: #10B981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 50;
        animation: slideIn 0.3s ease-out;
      `;
      toast.innerHTML = `
        Landing page exported successfully!<br>
        <span style="font-size: 0.875rem; opacity: 0.9">
          Extract the ZIP file to deploy your landing page
        </span>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(toast), 5000);
      }, 5000);
    } catch (error) {
      console.error('Export failed:', error);
      // Show error message
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background-color: #EF4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 50;
        animation: slideIn 0.3s ease-out;
      `;
      toast.textContent = 'Export failed. Please try again.';
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(toast), 3000);
      }, 3000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-semibold hover:opacity-80 transition-opacity">
              QuickLaunch
            </Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <button className="btn btn-sm btn-ghost">Save</button>
            <button className="btn btn-sm btn-ghost">Preview</button>
          </div>
          <button 
            className={`btn btn-primary btn-sm ${isExporting ? 'loading' : ''}`}
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
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

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
} 