'use client';

import { useState, useEffect } from 'react';

const TEMPLATES = {
  FULL_LANDING: 'Full Landing Page',
  SIGNUP_FOCUS: 'Sign-up Focus',
  COMING_SOON: 'Coming Soon'
};

const DEFAULT_STATE = {
  template: TEMPLATES.FULL_LANDING,
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

export default function Workspace() {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [pageData, setPageData] = useState(DEFAULT_STATE);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('pageData');
    if (savedData) {
      setPageData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (section, field, value) => {
    setPageData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleTemplateChange = (template) => {
    setPageData(prev => {
      const newData = {
        ...prev,
        template
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
  };

  const handlePointChange = (section, index, field, value) => {
    setPageData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          points: prev[section].points.map((point, i) =>
            i === index ? { ...point, [field]: value } : point
          )
        }
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleFeatureChange = (index, field, value) => {
    setPageData(prev => {
      const newData = {
        ...prev,
        features: {
          ...prev.features,
          items: prev.features.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        }
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
  };

  const handlePreviewClick = () => {
    localStorage.setItem('previewData', JSON.stringify(pageData));
    window.open(`/preview?timestamp=${Date.now()}`, '_blank');
  };

  const handleColorChange = (colorKey, value) => {
    setPageData(prev => {
      const newData = {
        ...prev,
        styles: {
          ...prev.styles,
          colors: {
            ...prev.styles.colors,
            [colorKey]: value
          }
        }
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
  };

  const getPreviewStyle = () => ({
    '--primary': pageData.styles.colors.primary,
    '--background': pageData.styles.colors.background,
    '--text': pageData.styles.colors.text,
    '--accent': pageData.styles.colors.accent,
    color: 'var(--text)',
    backgroundColor: 'var(--background)',
  });

  const handleImageUpload = async (e, section = 'hero') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageError('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setImageError('Image must be smaller than 2MB');
      return;
    }

    try {
      // Create an image object
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result;
      };

      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions (max 800px width/height)
        const maxDimension = 800;
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

        // Convert to base64 with compression
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);

        setPageData(prev => {
          const newData = {
            ...prev,
            [section]: {
              ...prev[section],
              image: {
                ...prev[section].image,
                data: compressedBase64
              }
            }
          };
          // Save to localStorage after updating state
          localStorage.setItem('pageData', JSON.stringify(newData));
          return newData;
        });

        // Show warning for large files
        if (file.size > 1024 * 1024) {
          setImageError('Warning: Large images may affect performance');
        } else {
          setImageError('');
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setImageError('Error processing image');
      console.error('Image upload error:', error);
    }
  };

  const handleImagePositionChange = (position, section = 'hero') => {
    setPageData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          image: {
            ...prev[section].image,
            position
          }
        }
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleImageAltChange = (alt, section = 'hero') => {
    setPageData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          image: {
            ...prev[section].image,
            alt
          }
        }
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
  };

  const removeImage = (section = 'hero') => {
    setPageData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          image: {
            data: null,
            alt: '',
            position: 'right'
          }
        }
      };
      localStorage.setItem('pageData', JSON.stringify(newData));
      return newData;
    });
    setImageError('');
  };

  return (
    <div className="grid grid-cols-2 gap-0 h-[calc(100vh-4rem)]">
      {/* Editor Panel */}
      <div className="bg-base-100 border-r overflow-hidden flex flex-col">
        <div className="border-b px-4 h-14 flex items-center justify-between">
          <h2 className="font-medium text-base-content">Editor</h2>
          <button className="btn btn-sm">
            Save
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          <div className="max-w-lg mx-auto space-y-12">
            {/* Template Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-base-content">Choose Template</h3>
              <select
                className="select select-bordered w-full text-base-content bg-base-100"
                value={pageData.template}
                onChange={(e) => handleTemplateChange(e.target.value)}
              >
                <option value={TEMPLATES.FULL_LANDING}>Full Landing Page</option>
                <option value={TEMPLATES.SIGNUP_FOCUS}>Sign-up Focus</option>
                <option value={TEMPLATES.COMING_SOON}>Coming Soon</option>
              </select>
            </div>

            {/* Style Options */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-base-content">Style Options</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Primary Color</span>
                  </label>
                  <div className="join">
                    <input
                      type="color"
                      value={pageData.styles.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="input input-bordered w-14 h-14 p-1 join-item bg-base-100"
                    />
                    <input
                      type="text"
                      value={pageData.styles.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="input input-bordered join-item flex-1 text-base-content bg-base-100"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Background Color</span>
                  </label>
                  <div className="join">
                    <input
                      type="color"
                      value={pageData.styles.colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="input input-bordered w-14 h-14 p-1 join-item bg-base-100"
                    />
                    <input
                      type="text"
                      value={pageData.styles.colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="input input-bordered join-item flex-1 text-base-content bg-base-100"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Text Color</span>
                  </label>
                  <div className="join">
                    <input
                      type="color"
                      value={pageData.styles.colors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="input input-bordered w-14 h-14 p-1 join-item bg-base-100"
                    />
                    <input
                      type="text"
                      value={pageData.styles.colors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="input input-bordered join-item flex-1 text-base-content bg-base-100"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Accent Color</span>
                  </label>
                  <div className="join">
                    <input
                      type="color"
                      value={pageData.styles.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="input input-bordered w-14 h-14 p-1 join-item bg-base-100"
                    />
                    <input
                      type="text"
                      value={pageData.styles.colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="input input-bordered join-item flex-1 text-base-content bg-base-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Template-specific sections */}
            {pageData.template === TEMPLATES.FULL_LANDING && (
              <>
                {/* Hero Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-base-content">Hero Section</h3>
                    <div className="badge badge-neutral">Required</div>
                  </div>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Headline</span>
                      </label>
                      <input
                        type="text"
                        value={pageData.hero.headline}
                        onChange={(e) => handleInputChange('hero', 'headline', e.target.value)}
                        placeholder="Enter your headline"
                        className="input input-bordered text-base-content bg-base-100"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Subheading</span>
                      </label>
                      <textarea
                        value={pageData.hero.subheading}
                        onChange={(e) => handleInputChange('hero', 'subheading', e.target.value)}
                        placeholder="Enter your subheading"
                        className="textarea textarea-bordered h-24 text-base-content bg-base-100"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Button Text</span>
                      </label>
                      <input
                        type="text"
                        value={pageData.hero.buttonText}
                        onChange={(e) => handleInputChange('hero', 'buttonText', e.target.value)}
                        placeholder="Enter button text"
                        className="input input-bordered text-base-content bg-base-100"
                      />
                    </div>

                    {/* Hero Image Upload */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Hero Image</span>
                      </label>
                      <div className="space-y-4">
                        {pageData?.hero?.image?.data ? (
                          <div className="space-y-4">
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-base-200">
                              <img
                                src={pageData?.hero?.image?.data}
                                alt="Preview"
                                className="object-contain w-full h-full"
                              />
                              <button
                                onClick={() => removeImage('hero')}
                                className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                            <div className="space-y-2">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Alt Text</span>
                                </label>
                                <input
                                  type="text"
                                  value={pageData?.hero?.image?.alt || ''}
                                  onChange={(e) => handleImageAltChange(e.target.value, 'hero')}
                                  placeholder="Describe the image for accessibility"
                                  className="input input-bordered"
                                />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Position</span>
                                </label>
                                <div className="join">
                                  <button
                                    className={`join-item btn btn-sm ${pageData?.hero?.image?.position === 'left' ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => handleImagePositionChange('left', 'hero')}
                                  >
                                    Left
                                  </button>
                                  <button
                                    className={`join-item btn btn-sm ${pageData?.hero?.image?.position === 'right' ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => handleImagePositionChange('right', 'hero')}
                                  >
                                    Right
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <label className="w-full">
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => handleImageUpload(e, 'hero')}
                                className="hidden"
                              />
                              <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:border-primary cursor-pointer transition-colors">
                                <div className="mb-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <p className="text-sm opacity-50">
                                  Click to upload image<br />
                                  <span className="text-xs">JPG, PNG, WebP (max 2MB)</span>
                                </p>
                              </div>
                            </label>
                          </div>
                        )}
                        {imageError && (
                          <div className={`text-sm ${imageError.startsWith('Warning') ? 'text-warning' : 'text-error'}`}>
                            {imageError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problem Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-base-content">Problem Section</h3>
                    <button className="btn btn-sm btn-ghost">Hide Section</button>
                  </div>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Section Title</span>
                      </label>
                      <input
                        type="text"
                        value={pageData.problem.title}
                        onChange={(e) => handleInputChange('problem', 'title', e.target.value)}
                        placeholder="Enter section title"
                        className="input input-bordered text-base-content bg-base-100"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Section Description</span>
                      </label>
                      <textarea
                        value={pageData.problem.description}
                        onChange={(e) => handleInputChange('problem', 'description', e.target.value)}
                        placeholder="Enter section description"
                        className="textarea textarea-bordered h-20 text-base-content bg-base-100"
                      />
                    </div>

                    {pageData.problem.points.map((point, index) => (
                      <div key={index} className="card bg-base-200 p-4 space-y-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-base-content">Point {index + 1} Title</span>
                          </label>
                          <input
                            type="text"
                            value={point.title}
                            onChange={(e) => handlePointChange('problem', index, 'title', e.target.value)}
                            placeholder="Enter point title"
                            className="input input-bordered text-base-content bg-base-100"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-base-content">Point {index + 1} Description</span>
                          </label>
                          <textarea
                            value={point.description}
                            onChange={(e) => handlePointChange('problem', index, 'description', e.target.value)}
                            placeholder="Enter point description"
                            className="textarea textarea-bordered h-16 text-base-content bg-base-100"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-base-content">Features Section</h3>
                    <button className="btn btn-sm btn-ghost">Hide Section</button>
                  </div>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Section Title</span>
                      </label>
                      <input
                        type="text"
                        value={pageData.features.title}
                        onChange={(e) => handleInputChange('features', 'title', e.target.value)}
                        placeholder="Enter section title"
                        className="input input-bordered text-base-content bg-base-100"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Section Description</span>
                      </label>
                      <textarea
                        value={pageData.features.description}
                        onChange={(e) => handleInputChange('features', 'description', e.target.value)}
                        placeholder="Enter section description"
                        className="textarea textarea-bordered h-20 text-base-content bg-base-100"
                      />
                    </div>

                    {pageData.features.items.map((feature, index) => (
                      <div key={index} className="card bg-base-200 p-4 space-y-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-base-content">Feature {index + 1} Title</span>
                          </label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                            placeholder="Enter feature title"
                            className="input input-bordered text-base-content bg-base-100"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-base-content">Feature {index + 1} Description</span>
                          </label>
                          <textarea
                            value={feature.description}
                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                            placeholder="Enter feature description"
                            className="textarea textarea-bordered h-16 text-base-content bg-base-100"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-base-content">CTA Section</h3>
                    <button className="btn btn-sm btn-ghost">Hide Section</button>
                  </div>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Headline</span>
                      </label>
                      <input
                        type="text"
                        value={pageData.cta.headline}
                        onChange={(e) => handleInputChange('cta', 'headline', e.target.value)}
                        placeholder="Enter CTA headline"
                        className="input input-bordered text-base-content bg-base-100"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Subheading</span>
                      </label>
                      <textarea
                        value={pageData.cta.subheading}
                        onChange={(e) => handleInputChange('cta', 'subheading', e.target.value)}
                        placeholder="Enter CTA subheading"
                        className="textarea textarea-bordered h-20 text-base-content bg-base-100"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base-content">Button Text</span>
                      </label>
                      <input
                        type="text"
                        value={pageData.cta.buttonText}
                        onChange={(e) => handleInputChange('cta', 'buttonText', e.target.value)}
                        placeholder="Enter button text"
                        className="input input-bordered text-base-content bg-base-100"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {pageData.template === TEMPLATES.SIGNUP_FOCUS && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-base-content">Sign-up Page</h3>
                </div>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Headline</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.signup.headline}
                      onChange={(e) => handleInputChange('signup', 'headline', e.target.value)}
                      placeholder="Enter your headline"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Subheading</span>
                    </label>
                    <textarea
                      value={pageData.signup.subheading}
                      onChange={(e) => handleInputChange('signup', 'subheading', e.target.value)}
                      placeholder="Enter your subheading"
                      className="textarea textarea-bordered h-24 text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Button Text</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.signup.buttonText}
                      onChange={(e) => handleInputChange('signup', 'buttonText', e.target.value)}
                      placeholder="Enter button text"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Email Placeholder</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.signup.emailPlaceholder}
                      onChange={(e) => handleInputChange('signup', 'emailPlaceholder', e.target.value)}
                      placeholder="Email field placeholder"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Name Placeholder</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.signup.namePlaceholder}
                      onChange={(e) => handleInputChange('signup', 'namePlaceholder', e.target.value)}
                      placeholder="Name field placeholder"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Success Message</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.signup.successMessage}
                      onChange={(e) => handleInputChange('signup', 'successMessage', e.target.value)}
                      placeholder="Message shown after successful signup"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Brand Image</span>
                    </label>
                    <div className="space-y-4">
                      {pageData?.signup?.image?.data ? (
                        <div className="space-y-4">
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-base-200">
                            <img
                              src={pageData?.signup?.image?.data}
                              alt="Preview"
                              className="object-contain w-full h-full"
                            />
                            <button
                              onClick={() => removeImage('signup')}
                              className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Alt Text</span>
                              </label>
                              <input
                                type="text"
                                value={pageData?.signup?.image?.alt || ''}
                                onChange={(e) => handleImageAltChange(e.target.value, 'signup')}
                                placeholder="Describe the image for accessibility"
                                className="input input-bordered"
                              />
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Position</span>
                              </label>
                              <div className="join">
                                <button
                                  className={`join-item btn btn-sm ${pageData?.signup?.image?.position === 'left' ? 'btn-primary' : 'btn-ghost'}`}
                                  onClick={() => handleImagePositionChange('left', 'signup')}
                                >
                                  Left
                                </button>
                                <button
                                  className={`join-item btn btn-sm ${pageData?.signup?.image?.position === 'right' ? 'btn-primary' : 'btn-ghost'}`}
                                  onClick={() => handleImagePositionChange('right', 'signup')}
                                >
                                  Right
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <label className="w-full">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={(e) => handleImageUpload(e, 'signup')}
                              className="hidden"
                            />
                            <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:border-primary cursor-pointer transition-colors">
                              <div className="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-sm opacity-50">
                                Click to upload image<br />
                                <span className="text-xs">JPG, PNG, WebP (max 2MB)</span>
                              </p>
                            </div>
                          </label>
                        </div>
                      )}
                      {imageError && (
                        <div className={`text-sm ${imageError.startsWith('Warning') ? 'text-warning' : 'text-error'}`}>
                          {imageError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pageData.template === TEMPLATES.COMING_SOON && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-base-content">Coming Soon Page</h3>
                </div>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Headline</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.comingSoon.headline}
                      onChange={(e) => handleInputChange('comingSoon', 'headline', e.target.value)}
                      placeholder="Enter your headline"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Subheading</span>
                    </label>
                    <textarea
                      value={pageData.comingSoon.subheading}
                      onChange={(e) => handleInputChange('comingSoon', 'subheading', e.target.value)}
                      placeholder="Enter your subheading"
                      className="textarea textarea-bordered h-24 text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Launch Date</span>
                    </label>
                    <input
                      type="date"
                      value={pageData.comingSoon.launchDate}
                      onChange={(e) => handleInputChange('comingSoon', 'launchDate', e.target.value)}
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Email Placeholder</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.comingSoon.emailPlaceholder}
                      onChange={(e) => handleInputChange('comingSoon', 'emailPlaceholder', e.target.value)}
                      placeholder="Email field placeholder"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Button Text</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.comingSoon.buttonText}
                      onChange={(e) => handleInputChange('comingSoon', 'buttonText', e.target.value)}
                      placeholder="Enter button text"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Success Message</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.comingSoon.successMessage}
                      onChange={(e) => handleInputChange('comingSoon', 'successMessage', e.target.value)}
                      placeholder="Message shown after successful signup"
                      className="input input-bordered text-base-content bg-base-100"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Brand Image</span>
                    </label>
                    <div className="space-y-4">
                      {pageData?.comingSoon?.image?.data ? (
                        <div className="space-y-4">
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-base-200">
                            <img
                              src={pageData?.comingSoon?.image?.data}
                              alt="Preview"
                              className="object-contain w-full h-full"
                            />
                            <button
                              onClick={() => removeImage('comingSoon')}
                              className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Alt Text</span>
                              </label>
                              <input
                                type="text"
                                value={pageData?.comingSoon?.image?.alt || ''}
                                onChange={(e) => handleImageAltChange(e.target.value, 'comingSoon')}
                                placeholder="Describe the image for accessibility"
                                className="input input-bordered"
                              />
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Position</span>
                              </label>
                              <div className="join">
                                <button
                                  className={`join-item btn btn-sm ${pageData?.comingSoon?.image?.position === 'left' ? 'btn-primary' : 'btn-ghost'}`}
                                  onClick={() => handleImagePositionChange('left', 'comingSoon')}
                                >
                                  Left
                                </button>
                                <button
                                  className={`join-item btn btn-sm ${pageData?.comingSoon?.image?.position === 'right' ? 'btn-primary' : 'btn-ghost'}`}
                                  onClick={() => handleImagePositionChange('right', 'comingSoon')}
                                >
                                  Right
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4">
                          <label className="w-full">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={(e) => handleImageUpload(e, 'comingSoon')}
                              className="hidden"
                            />
                            <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:border-primary cursor-pointer transition-colors">
                              <div className="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-sm opacity-50">
                                Click to upload image<br />
                                <span className="text-xs">JPG, PNG, WebP (max 2MB)</span>
                              </p>
                            </div>
                          </label>
                        </div>
                      )}
                      {imageError && (
                        <div className={`text-sm ${imageError.startsWith('Warning') ? 'text-warning' : 'text-error'}`}>
                          {imageError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="bg-base-100 overflow-hidden flex flex-col">
        <div className="border-b px-4 h-14 flex items-center justify-between">
          <h2 className="font-medium">Preview</h2>
          <div className="flex items-center gap-2">
            <div className="join">
              <button
                className={`join-item btn btn-sm ${previewMode === 'desktop' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setPreviewMode('desktop')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </button>
              <button
                className={`join-item btn btn-sm ${previewMode === 'mobile' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setPreviewMode('mobile')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12" y2="18"></line>
                </svg>
              </button>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={handlePreviewClick}
              title="Open preview in new tab"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-base-200 p-6">
          <div
            className={`bg-base-100 h-full overflow-y-auto mx-auto transition-all duration-200 ${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'}`}
            style={getPreviewStyle()}
          >
            {/* Live Preview */}
            <div className="min-h-full">
              {pageData.template === TEMPLATES.FULL_LANDING && (
                <>
                  {/* Hero Section */}
                  <section className="min-h-[80vh] flex flex-col items-center justify-center px-4">
                    <div className={`container mx-auto grid ${previewMode === 'mobile' ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-12'} items-center`}>
                      <div className={pageData?.hero?.image?.position === 'right' ? 'order-1' : 'order-2'}>
                        <h1 className={`font-bold mb-6 ${previewMode === 'mobile' ? 'text-3xl text-center' : 'text-4xl md:text-6xl'}`}>
                          {pageData?.hero?.headline || 'Your Headline Here'}
                        </h1>
                        <p className={`opacity-80 mb-8 ${previewMode === 'mobile' ? 'text-lg text-center' : 'text-xl md:text-2xl'}`}>
                          {pageData?.hero?.subheading || 'Your subheading text will appear here. Make it compelling!'}
                        </p>
                        {pageData?.hero?.buttonText && (
                          <div className={previewMode === 'mobile' ? 'text-center' : ''}>
                            <button
                              className={`px-8 py-3 rounded-lg font-medium ${previewMode === 'mobile' ? 'w-full max-w-xs' : ''}`}
                              style={{
                                backgroundColor: pageData?.styles?.colors?.primary,
                                color: pageData?.styles?.colors?.background
                              }}
                            >
                              {pageData?.hero?.buttonText}
                            </button>
                          </div>
                        )}
                      </div>
                      {pageData?.hero?.image?.data && (
                        <div className={pageData?.hero?.image?.position === 'right' ? 'order-2' : 'order-1'}>
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
                            <img
                              src={pageData?.hero?.image?.data}
                              alt={pageData?.hero?.image?.alt || ''}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Problem Section */}
                  <section className="py-20" style={{ backgroundColor: pageData.styles.colors.accent }}>
                    <div className="container mx-auto px-4">
                      <div className="max-w-4xl mx-auto">
                        <h2 className={`font-bold text-center mb-12 ${previewMode === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                          {pageData.problem.title || 'Why This Matters'}
                        </h2>

                        <div className={`grid gap-8 ${previewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
                          {pageData.problem.points.map((point, index) => (
                            <div
                              key={index}
                              className="rounded-lg shadow-sm p-6"
                              style={{ backgroundColor: pageData.styles.colors.background }}
                            >
                              <h3 className="text-xl font-semibold mb-4">
                                {point.title || `Problem Point ${index + 1}`}
                              </h3>
                              <p className="opacity-80">
                                {point.description || 'Describe the problem or pain point here.'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Features Section */}
                  <section className="py-20">
                    <div className="container mx-auto px-4">
                      <div className="max-w-4xl mx-auto">
                        <h2 className={`font-bold text-center mb-12 ${previewMode === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                          {pageData.features.title || 'Features'}
                        </h2>

                        <div className={`grid gap-8 ${previewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
                          {pageData.features.items.map((feature, index) => (
                            <div
                              key={index}
                              className="rounded-lg shadow-sm p-6"
                              style={{ backgroundColor: pageData.styles.colors.accent }}
                            >
                              <div
                                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
                                style={{
                                  backgroundColor: `${pageData.styles.colors.primary}20`,
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke={pageData.styles.colors.primary}
                                  strokeWidth={2}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <h3 className="text-xl font-semibold mb-4 text-center">
                                {feature.title || `Feature ${index + 1}`}
                              </h3>
                              <p className="opacity-80 text-center">
                                {feature.description || 'Describe the feature and its benefits here.'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* CTA Section */}
                  <section
                    className="py-20"
                    style={{
                      backgroundColor: pageData.styles.colors.primary,
                      color: pageData.styles.colors.background
                    }}
                  >
                    <div className="container mx-auto px-4">
                      <div className="max-w-4xl mx-auto text-center">
                        <h2 className={`font-bold mb-6 ${previewMode === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                          {pageData.cta.headline || 'Ready to Get Started?'}
                        </h2>
                        <p className={`mb-8 opacity-90 ${previewMode === 'mobile' ? 'text-lg' : 'text-xl'}`}>
                          {pageData.cta.subheading || 'Take the next step and join thousands of satisfied customers.'}
                        </p>
                        {pageData.cta.buttonText && (
                          <button
                            className={`px-8 py-3 rounded-lg font-medium ${previewMode === 'mobile' ? 'w-full max-w-xs' : ''}`}
                            style={{
                              backgroundColor: pageData.styles.colors.background,
                              color: pageData.styles.colors.primary
                            }}
                          >
                            {pageData.cta.buttonText}
                          </button>
                        )}
                      </div>
                    </div>
                  </section>
                </>
              )}

              {pageData.template === TEMPLATES.SIGNUP_FOCUS && (
                <div className="min-h-screen flex items-center justify-center p-4">
                  <div className={`max-w-4xl w-full grid ${previewMode === 'mobile' ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-12'} items-center`}>
                    <div className={pageData?.signup?.image?.position === 'right' ? 'order-1' : 'order-2'}>
                      <div className={`text-center ${previewMode === 'mobile' ? '' : 'md:text-left'}`}>
                        <h1 className={`font-bold mb-4 ${previewMode === 'mobile' ? 'text-3xl' : 'text-4xl'}`}>
                          {pageData.signup.headline || 'Sign Up Now'}
                        </h1>
                        <p className={`opacity-80 ${previewMode === 'mobile' ? 'text-lg' : 'text-xl'}`}>
                          {pageData.signup.subheading || 'Join us today and get started with your journey.'}
                        </p>
                      </div>

                      <div
                        className="rounded-lg shadow-lg p-6 mt-8"
                        style={{ backgroundColor: pageData.styles.colors.accent }}
                      >
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder={pageData.signup.namePlaceholder}
                            className="w-full px-4 py-2 rounded-lg border"
                            style={{
                              backgroundColor: pageData.styles.colors.background,
                              borderColor: `${pageData.styles.colors.primary}20`
                            }}
                          />
                          <input
                            type="email"
                            placeholder={pageData.signup.emailPlaceholder}
                            className="w-full px-4 py-2 rounded-lg border"
                            style={{
                              backgroundColor: pageData.styles.colors.background,
                              borderColor: `${pageData.styles.colors.primary}20`
                            }}
                          />
                          <button
                            className="w-full px-8 py-3 rounded-lg font-medium"
                            style={{
                              backgroundColor: pageData.styles.colors.primary,
                              color: pageData.styles.colors.background
                            }}
                          >
                            {pageData.signup.buttonText || 'Sign Up'}
                          </button>
                        </div>
                      </div>
                    </div>
                    {pageData?.signup?.image?.data && (
                      <div className={pageData?.signup?.image?.position === 'right' ? 'order-2' : 'order-1'}>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
                          <img
                            src={pageData?.signup?.image?.data}
                            alt={pageData?.signup?.image?.alt || ''}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {pageData.template === TEMPLATES.COMING_SOON && (
                <div className="min-h-screen flex items-center justify-center p-4">
                  <div className={`max-w-4xl w-full grid ${previewMode === 'mobile' ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-12'} items-center`}>
                    <div className={pageData?.comingSoon?.image?.position === 'right' ? 'order-1' : 'order-2'}>
                      <div className={`text-center ${previewMode === 'mobile' ? '' : 'md:text-left'}`}>
                        <h1 className={`font-bold mb-4 ${previewMode === 'mobile' ? 'text-3xl' : 'text-4xl md:text-5xl'}`}>
                          {pageData.comingSoon.headline || 'Coming Soon'}
                        </h1>
                        <p className={`opacity-80 mb-8 ${previewMode === 'mobile' ? 'text-lg' : 'text-xl'}`}>
                          {pageData.comingSoon.subheading || 'Something exciting is in the works. Stay tuned!'}
                        </p>

                        {pageData.comingSoon.launchDate && (
                          <div className="mb-8">
                            <div className="text-sm opacity-60 mb-2">Launching on</div>
                            <div className="text-2xl font-semibold">
                              {new Date(pageData.comingSoon.launchDate).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        )}

                        <div className={`max-w-md ${previewMode === 'mobile' ? 'mx-auto' : 'md:mx-0'}`}>
                          <div className="flex">
                            <input
                              type="email"
                              placeholder={pageData.comingSoon.emailPlaceholder}
                              className="flex-1 px-4 py-2 rounded-l-lg border"
                              style={{
                                backgroundColor: pageData.styles.colors.background,
                                borderColor: `${pageData.styles.colors.primary}20`
                              }}
                            />
                            <button
                              className="px-8 py-3 rounded-r-lg font-medium"
                              style={{
                                backgroundColor: pageData.styles.colors.primary,
                                color: pageData.styles.colors.background
                              }}
                            >
                              {pageData.comingSoon.buttonText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {pageData?.comingSoon?.image?.data && (
                      <div className={pageData?.comingSoon?.image?.position === 'right' ? 'order-2' : 'order-1'}>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-base-200">
                          <img
                            src={pageData?.comingSoon?.image?.data}
                            alt={pageData?.comingSoon?.image?.alt || ''}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 