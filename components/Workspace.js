'use client';

import { useState } from 'react';

export default function Workspace() {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [pageData, setPageData] = useState({
    template: 'Full Landing Page',
    hero: {
      headline: '',
      subheading: '',
      buttonText: '',
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
    }
  });

  const handleInputChange = (section, field, value) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePointChange = (section, index, field, value) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        points: prev[section].points.map((point, i) => 
          i === index ? { ...point, [field]: value } : point
        )
      }
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setPageData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handlePreviewClick = () => {
    const encodedData = encodeURIComponent(JSON.stringify(pageData));
    window.open(`/preview?data=${encodedData}`, '_blank');
  };

  return (
    <div className="grid grid-cols-2 gap-0 h-[calc(100vh-4rem)]">
      {/* Editor Panel */}
      <div className="bg-base-100 border-r overflow-hidden flex flex-col">
        <div className="border-b px-4 h-14 flex items-center justify-between">
          <h2 className="font-medium">Editor</h2>
          <button className="btn btn-sm">
            Save
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          <div className="max-w-lg mx-auto space-y-12">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <div className="badge badge-neutral">Required</div>
              </div>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Headline</span>
                  </label>
                  <input 
                    type="text" 
                    value={pageData.hero.headline}
                    onChange={(e) => handleInputChange('hero', 'headline', e.target.value)}
                    placeholder="Enter your headline" 
                    className="input input-bordered" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subheading</span>
                  </label>
                  <textarea 
                    value={pageData.hero.subheading}
                    onChange={(e) => handleInputChange('hero', 'subheading', e.target.value)}
                    placeholder="Enter your subheading" 
                    className="textarea textarea-bordered h-24" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Button Text</span>
                  </label>
                  <input 
                    type="text" 
                    value={pageData.hero.buttonText}
                    onChange={(e) => handleInputChange('hero', 'buttonText', e.target.value)}
                    placeholder="Enter button text" 
                    className="input input-bordered" 
                  />
                </div>
              </div>
            </div>

            {/* Problem Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Problem Section</h3>
                <button className="btn btn-sm btn-ghost">Hide Section</button>
              </div>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Section Title</span>
                  </label>
                  <input 
                    type="text" 
                    value={pageData.problem.title}
                    onChange={(e) => handleInputChange('problem', 'title', e.target.value)}
                    placeholder="Enter section title" 
                    className="input input-bordered" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Section Description</span>
                  </label>
                  <textarea 
                    value={pageData.problem.description}
                    onChange={(e) => handleInputChange('problem', 'description', e.target.value)}
                    placeholder="Enter section description" 
                    className="textarea textarea-bordered h-20" 
                  />
                </div>

                {pageData.problem.points.map((point, index) => (
                  <div key={index} className="card bg-base-200 p-4 space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Point {index + 1} Title</span>
                      </label>
                      <input 
                        type="text" 
                        value={point.title}
                        onChange={(e) => handlePointChange('problem', index, 'title', e.target.value)}
                        placeholder="Enter point title" 
                        className="input input-bordered" 
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Point {index + 1} Description</span>
                      </label>
                      <textarea 
                        value={point.description}
                        onChange={(e) => handlePointChange('problem', index, 'description', e.target.value)}
                        placeholder="Enter point description" 
                        className="textarea textarea-bordered h-16" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Features Section</h3>
                <button className="btn btn-sm btn-ghost">Hide Section</button>
              </div>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Section Title</span>
                  </label>
                  <input 
                    type="text" 
                    value={pageData.features.title}
                    onChange={(e) => handleInputChange('features', 'title', e.target.value)}
                    placeholder="Enter section title" 
                    className="input input-bordered" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Section Description</span>
                  </label>
                  <textarea 
                    value={pageData.features.description}
                    onChange={(e) => handleInputChange('features', 'description', e.target.value)}
                    placeholder="Enter section description" 
                    className="textarea textarea-bordered h-20" 
                  />
                </div>

                {pageData.features.items.map((feature, index) => (
                  <div key={index} className="card bg-base-200 p-4 space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Feature {index + 1} Title</span>
                      </label>
                      <input 
                        type="text" 
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        placeholder="Enter feature title" 
                        className="input input-bordered" 
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Feature {index + 1} Description</span>
                      </label>
                      <textarea 
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        placeholder="Enter feature description" 
                        className="textarea textarea-bordered h-16" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">CTA Section</h3>
                <button className="btn btn-sm btn-ghost">Hide Section</button>
              </div>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Headline</span>
                  </label>
                  <input 
                    type="text" 
                    value={pageData.cta.headline}
                    onChange={(e) => handleInputChange('cta', 'headline', e.target.value)}
                    placeholder="Enter CTA headline" 
                    className="input input-bordered" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subheading</span>
                  </label>
                  <textarea 
                    value={pageData.cta.subheading}
                    onChange={(e) => handleInputChange('cta', 'subheading', e.target.value)}
                    placeholder="Enter CTA subheading" 
                    className="textarea textarea-bordered h-20" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Button Text</span>
                  </label>
                  <input 
                    type="text" 
                    value={pageData.cta.buttonText}
                    onChange={(e) => handleInputChange('cta', 'buttonText', e.target.value)}
                    placeholder="Enter button text" 
                    className="input input-bordered" 
                  />
                </div>
              </div>
            </div>
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
          <div className={`bg-base-100 h-full overflow-y-auto mx-auto transition-all duration-200 ${
            previewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'
          }`}>
            {/* Live Preview */}
            <div className="min-h-full">
              {/* Hero Section */}
              <section className="min-h-[80vh] flex flex-col items-center justify-center px-4">
                <h1 className={`font-bold mb-6 ${previewMode === 'mobile' ? 'text-3xl' : 'text-4xl md:text-6xl'}`}>
                  {pageData.hero.headline || 'Your Headline Here'}
                </h1>
                <p className={`text-base-content/80 mb-8 max-w-2xl ${previewMode === 'mobile' ? 'text-lg' : 'text-xl md:text-2xl'}`}>
                  {pageData.hero.subheading || 'Your subheading text will appear here. Make it compelling!'}
                </p>
                {pageData.hero.buttonText && (
                  <button className={`btn btn-primary ${previewMode === 'mobile' ? 'btn-md w-full max-w-xs' : 'btn-lg'}`}>
                    {pageData.hero.buttonText}
                  </button>
                )}
              </section>

              {/* Problem Section */}
              <section className="py-20 bg-base-200">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className={`font-bold text-center mb-12 ${previewMode === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                      {pageData.problem.title || 'Why This Matters'}
                    </h2>
                    
                    <div className={`grid gap-8 ${previewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
                      {pageData.problem.points.map((point, index) => (
                        <div key={index} className="card bg-base-100 shadow-sm">
                          <div className="card-body">
                            <h3 className="card-title">
                              {point.title || `Problem Point ${index + 1}`}
                            </h3>
                            <p className="text-base-content/80">
                              {point.description || 'Describe the problem or pain point here.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="py-20 bg-base-100">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className={`font-bold text-center mb-12 ${previewMode === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                      {pageData.features.title || 'Features'}
                    </h2>
                    
                    <div className={`grid gap-8 ${previewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
                      {pageData.features.items.map((feature, index) => (
                        <div key={index} className="card bg-base-200 shadow-sm">
                          <div className="card-body items-center text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <h3 className="card-title text-center">
                              {feature.title || `Feature ${index + 1}`}
                            </h3>
                            <p className="text-base-content/80">
                              {feature.description || 'Describe the feature and its benefits here.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-20 bg-primary text-primary-content">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`font-bold mb-6 ${previewMode === 'mobile' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                      {pageData.cta.headline || 'Ready to Get Started?'}
                    </h2>
                    <p className={`mb-8 text-primary-content/90 ${previewMode === 'mobile' ? 'text-lg' : 'text-xl'}`}>
                      {pageData.cta.subheading || 'Take the next step and join thousands of satisfied customers.'}
                    </p>
                    {pageData.cta.buttonText && (
                      <button className={`btn bg-base-100 hover:bg-base-200 text-base-content ${previewMode === 'mobile' ? 'btn-md w-full max-w-xs' : 'btn-lg'}`}>
                        {pageData.cta.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 