'use client';

import Link from 'next/link';
import { useState } from 'react';
import JSZip from 'jszip';

const DEFAULT_STATE = {
  template: 'Full Landing Page',
  styles: {
    colors: {
      primary: '#171717',
      background: '#ffffff',
      text: '#171717',
      accent: '#f5f5f5'
    }
  },
  hero: {
    headline: '',
    subheading: '',
    buttonText: '',
    image: {
      data: null,
      alt: '',
      position: 'right'
    }
  },
  problem: {
    title: '',
    description: '',
    points: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ]
  },
  features: {
    title: '',
    description: '',
    items: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ]
  },
  cta: {
    headline: '',
    subheading: '',
    buttonText: '',
  },
  signup: {
    headline: '',
    subheading: '',
    buttonText: '',
    emailPlaceholder: 'Enter your email',
    namePlaceholder: 'Enter your name',
    successMessage: 'Thanks for signing up!',
  },
  comingSoon: {
    headline: '',
    subheading: '',
    launchDate: '',
    emailPlaceholder: 'Enter your email to get notified',
    buttonText: 'Notify Me',
    successMessage: "Thanks! We'll let you know when we launch.",
  }
};

export default function MainLayout({ children }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Get the current page data from localStorage or use default state
      const rawPageData = localStorage.getItem('pageData');
      const pageData = rawPageData ? JSON.parse(rawPageData) : DEFAULT_STATE;

      // Validate the data
      if (!pageData || typeof pageData !== 'object') {
        throw new Error('Invalid page data');
      }

      if (!pageData.template) {
        throw new Error('No template selected');
      }

      // Function to compress image data further if needed
      const compressImageData = async (imageData) => {
        if (!imageData) return null;
        
        try {
          // Create an image element
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageData;
          });

          // Create a canvas
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions (max 600px for export)
          const maxDimension = 600;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and compress the image
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with higher compression for export
          return canvas.toDataURL('image/jpeg', 0.6);
        } catch (error) {
          console.error('Error compressing image:', error);
          // If compression fails, return the original image data
          return imageData;
        }
      };

      // Compress images in the page data
      const compressedPageData = { ...pageData };
      
      try {
        // Compress hero image if exists
        if (pageData?.hero?.image?.data) {
          const compressedHeroImage = await compressImageData(pageData.hero.image.data);
          if (compressedHeroImage) {
            compressedPageData.hero.image.data = compressedHeroImage;
          }
        }
        
        // Compress signup image if exists
        if (pageData?.signup?.image?.data) {
          const compressedSignupImage = await compressImageData(pageData.signup.image.data);
          if (compressedSignupImage) {
            compressedPageData.signup.image.data = compressedSignupImage;
          }
        }
        
        // Compress coming soon image if exists
        if (pageData?.comingSoon?.image?.data) {
          const compressedComingSoonImage = await compressImageData(pageData.comingSoon.image.data);
          if (compressedComingSoonImage) {
            compressedPageData.comingSoon.image.data = compressedComingSoonImage;
          }
        }
      } catch (error) {
        console.error('Error during image compression:', error);
        // If compression fails, continue with original images
      }

      // For debugging - log the image data
      console.log('Hero image exists:', !!compressedPageData?.hero?.image?.data);
      console.log('Signup image exists:', !!compressedPageData?.signup?.image?.data);
      console.log('Coming soon image exists:', !!compressedPageData?.comingSoon?.image?.data);

      // Generate the HTML content
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${compressedPageData?.hero?.subheading || 'Landing page created with QuickLaunch'}">
    <title>${compressedPageData?.hero?.headline || 'QuickLaunch Landing Page'}</title>
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
            color: ${compressedPageData?.styles?.colors?.text || '#171717'};
            background-color: ${compressedPageData?.styles?.colors?.background || '#ffffff'};
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

        /* Image styles */
        .image-container {
            width: 100%;
            height: 100%;
            position: relative;
            aspect-ratio: 4/3;
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: ${compressedPageData?.styles?.colors?.accent || '#f5f5f5'};
        }
        .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    </style>
</head>
<body>
    ${compressedPageData.template === 'Full Landing Page' ? `
    <!-- Hero Section -->
    <section style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; max-width: 1200px; margin: 0 auto;">
                <div style="text-align: center;">
                    <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                        ${compressedPageData?.hero?.headline || 'Your Headline Here'}
                    </h1>
                    <p style="font-size: 1.25rem; opacity: 0.8; max-width: 42rem; margin: 0 auto 2rem;">
                        ${compressedPageData?.hero?.subheading || 'Your subheading text will appear here. Make it compelling!'}
                    </p>
                    ${compressedPageData?.hero?.buttonText ? `
                    <button style="
                        background-color: ${compressedPageData?.styles?.colors?.primary || '#171717'}; 
                        color: ${compressedPageData?.styles?.colors?.background || '#ffffff'};
                        padding: 0.75rem 2rem;
                        border-radius: 0.5rem;
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                        font-size: 1rem;
                    " class="mobile-full">
                        ${compressedPageData?.hero?.buttonText}
                    </button>
                    ` : ''}
                </div>
                ${compressedPageData?.hero?.image?.data ? `
                <div class="image-container">
                    <img 
                        src="${compressedPageData.hero.image.data}"
                        alt="${compressedPageData.hero.image.alt || ''}"
                    />
                </div>
                ` : ''}
            </div>
        </div>
    </section>

    <!-- Problem Section -->
    <section style="padding: 5rem 1rem; background-color: ${compressedPageData?.styles?.colors?.accent};">
        <div class="container">
            <div class="max-w-4xl mx-auto">
                <h2 style="font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 3rem;">
                    ${compressedPageData?.problem?.title || 'Why This Matters'}
                </h2>
                
                <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
                    ${compressedPageData?.problem?.points.map((point, index) => `
                    <div style="
                        background-color: ${compressedPageData?.styles?.colors?.background};
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
                    ${compressedPageData?.features?.title || 'Features'}
                </h2>
                
                <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
                    ${compressedPageData?.features?.items.map((feature, index) => `
                    <div style="
                        background-color: ${compressedPageData?.styles?.colors?.accent};
                        padding: 1.5rem;
                        border-radius: 0.5rem;
                        text-align: center;
                    ">
                        <div style="
                            width: 3rem;
                            height: 3rem;
                            background-color: ${compressedPageData?.styles?.colors?.primary}20;
                            border-radius: 9999px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 1rem auto;
                        ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${compressedPageData?.styles?.colors?.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        background-color: ${compressedPageData?.styles?.colors?.primary};
        color: ${compressedPageData?.styles?.colors?.background};
    ">
        <div class="container">
            <div class="max-w-4xl mx-auto text-center">
                <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem;">
                    ${compressedPageData?.cta?.headline || 'Ready to Get Started?'}
                </h2>
                <p style="font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem;">
                    ${compressedPageData?.cta?.subheading || 'Take the next step and join thousands of satisfied customers.'}
                </p>
                ${compressedPageData?.cta?.buttonText ? `
                <button style="
                    background-color: ${compressedPageData?.styles?.colors?.background};
                    color: ${compressedPageData?.styles?.colors?.primary};
                    padding: 0.75rem 2rem;
                    border-radius: 0.5rem;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                " class="mobile-full">
                    ${compressedPageData?.cta?.buttonText}
                </button>
                ` : ''}
            </div>
        </div>
    </section>
    ` : compressedPageData.template === 'Sign-up Focus' ? `
    <!-- Sign-up Focus Template -->
    <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
    ">
        <div style="max-width: 1200px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
            <div>
                <div style="text-align: left;">
                    <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">
                        ${compressedPageData?.signup?.headline || 'Sign Up Now'}
                    </h1>
                    <p style="font-size: 1.25rem; opacity: 0.8; margin-bottom: 2rem;">
                        ${compressedPageData?.signup?.subheading || 'Join us today and get started with your journey.'}
                    </p>
                </div>
                
                <div style="
                    background-color: ${compressedPageData?.styles?.colors?.accent};
                    padding: 2rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                ">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <input 
                            type="text" 
                            placeholder="${compressedPageData?.signup?.namePlaceholder}"
                            style="
                                width: 100%;
                                padding: 0.75rem 1rem;
                                border-radius: 0.5rem;
                                border: 1px solid ${compressedPageData?.styles?.colors?.primary}20;
                                background-color: ${compressedPageData?.styles?.colors?.background};
                                font-size: 1rem;
                            "
                        />
                        <input 
                            type="email" 
                            placeholder="${compressedPageData?.signup?.emailPlaceholder}"
                            style="
                                width: 100%;
                                padding: 0.75rem 1rem;
                                border-radius: 0.5rem;
                                border: 1px solid ${compressedPageData?.styles?.colors?.primary}20;
                                background-color: ${compressedPageData?.styles?.colors?.background};
                                font-size: 1rem;
                            "
                        />
                        <button style="
                            width: 100%;
                            background-color: ${compressedPageData?.styles?.colors?.primary};
                            color: ${compressedPageData?.styles?.colors?.background};
                            padding: 0.75rem 2rem;
                            border-radius: 0.5rem;
                            font-weight: 500;
                            border: none;
                            cursor: pointer;
                            font-size: 1rem;
                        ">
                            ${compressedPageData?.signup?.buttonText || 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
            ${compressedPageData?.signup?.image?.data ? `
            <div class="image-container">
                <img 
                    src="${compressedPageData.signup.image.data}"
                    alt="${compressedPageData.signup.image.alt || ''}"
                />
            </div>
            ` : ''}
        </div>
    </div>
    ` : `
    <!-- Coming Soon Template -->
    <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
    ">
        <div style="max-width: 1200px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
            <div>
                <div style="text-align: left;">
                    <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1rem;">
                        ${compressedPageData?.comingSoon?.headline || 'Coming Soon'}
                    </h1>
                    <p style="font-size: 1.25rem; opacity: 0.8; margin-bottom: 2rem;">
                        ${compressedPageData?.comingSoon?.subheading || 'Something exciting is in the works. Stay tuned!'}
                    </p>
                    
                    ${compressedPageData?.comingSoon?.launchDate ? `
                    <div style="margin-bottom: 2rem;">
                        <div style="font-size: 0.875rem; opacity: 0.6; margin-bottom: 0.5rem;">
                            Launching on
                        </div>
                        <div style="font-size: 1.5rem; font-weight: 600;">
                            ${new Date(compressedPageData?.comingSoon?.launchDate).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div style="max-width: 28rem;">
                        <div style="display: flex;">
                            <input 
                                type="email" 
                                placeholder="${compressedPageData?.comingSoon?.emailPlaceholder}"
                                style="
                                    flex: 1;
                                    padding: 0.75rem 1rem;
                                    border-top-left-radius: 0.5rem;
                                    border-bottom-left-radius: 0.5rem;
                                    border: 1px solid ${compressedPageData?.styles?.colors?.primary}20;
                                    background-color: ${compressedPageData?.styles?.colors?.background};
                                    font-size: 1rem;
                                "
                            />
                            <button style="
                                background-color: ${compressedPageData?.styles?.colors?.primary};
                                color: ${compressedPageData?.styles?.colors?.background};
                                padding: 0.75rem 2rem;
                                border-top-right-radius: 0.5rem;
                                border-bottom-right-radius: 0.5rem;
                                font-weight: 500;
                                border: none;
                                cursor: pointer;
                                font-size: 1rem;
                                white-space: nowrap;
                            ">
                                ${compressedPageData?.comingSoon?.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ${compressedPageData?.comingSoon?.image?.data ? `
            <div class="image-container">
                <img 
                    src="${compressedPageData.comingSoon.image.data}"
                    alt="${compressedPageData.comingSoon.image.alt || ''}"
                />
            </div>
            ` : ''}
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
      // Show error message with more details
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
      toast.textContent = `Export failed: ${error.message}`;
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