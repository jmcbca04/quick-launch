export default function Workspace() {
  return (
    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
      {/* Editor Panel */}
      <div className="bg-base-100 rounded-lg border p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6">Editor</h2>
        <div className="space-y-6">
          {/* Content sections will go here */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Headline</span>
            </label>
            <input type="text" placeholder="Enter your headline" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Subheading</span>
            </label>
            <input type="text" placeholder="Enter your subheading" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Button Text</span>
            </label>
            <input type="text" placeholder="Enter button text" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Template</span>
            </label>
            <select className="select select-bordered w-full">
              <option>Centered Hero</option>
              <option>Split Layout</option>
              <option>Minimal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="bg-base-100 rounded-lg border">
        <div className="h-10 border-b flex items-center px-4">
          <span className="text-sm font-medium">Preview</span>
        </div>
        <div className="p-6 h-[calc(100%-2.5rem)] overflow-y-auto">
          {/* Preview content will go here */}
          <div className="flex items-center justify-center h-full text-gray-400">
            Preview will appear here
          </div>
        </div>
      </div>
    </div>
  );
} 