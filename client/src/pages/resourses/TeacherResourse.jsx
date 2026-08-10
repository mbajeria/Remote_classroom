import React, { useState } from 'react';

const TeacherResources = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Introduction to Calculus',
      type: 'PDF',
      date: '2023-10-15',
      size: '2.4 MB',
      uploadedBy: 'Dr. Smith'
    },
    {
      id: 2,
      title: 'Chemistry Lab Safety',
      type: 'Video',
      date: '2023-10-10',
      size: '15.7 MB',
      uploadedBy: 'Prof. Johnson'
    },
    {
      id: 3,
      title: 'Essay Writing Guide',
      type: 'Document',
      date: '2023-10-05',
      size: '0.8 MB',
      uploadedBy: 'Dr. Williams'
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    file: null,
    fileType: ''
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[1].toUpperCase();
      setUploadForm({
        ...uploadForm,
        file: file,
        fileType: fileType
      });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.file) {
      alert('Please provide a title and select a file');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newResource = {
        id: resources.length + 1,
        title: uploadForm.title,
        type: uploadForm.fileType,
        date: new Date().toISOString().split('T')[0],
        size: `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)}`+ MB,
        uploadedBy: 'You'
      };
      
      setResources([newResource, ...resources]);
      setUploadForm({ title: '', file: null, fileType: '' });
      setIsUploading(false);
      alert('File uploaded successfully!');
    }, 1500);
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return '📄';
      case 'Video': return '🎬';
      case 'Document': return '📝';
      default: return '📂';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">Educational Resources Portal</h1>
          <p className="text-lg text-teal-600">Share and access learning materials</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Upload New Resource</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, MP4, AVI (Max 100MB)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.mp4,.avi"
                    />
                  </label>
                </div>
                {uploadForm.file && (
                  <p className="mt-2 text-sm text-green-600">Selected: {uploadForm.file.name}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isUploading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'} transition-colors flex items-center justify-center`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : 'Upload Resource'}
              </button>
            </form>
          </div>

          {/* Resources List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-teal-700">Available Resources</h2>
              <div className="relative">
                <select className="appearance-none bg-teal-50 text-teal-700 py-2 pl-4 pr-8 rounded-lg border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>All Types</option>
                  <option>PDF</option>
                  <option>Video</option>
                  <option>Document</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mr-4">
                    <span className="text-2xl">{getFileIcon(resource.type)}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-teal-800">{resource.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-teal-600">
                      <span className="bg-teal-200 px-2 py-1 rounded-md">{resource.type}</span>
                      <span>{resource.size}</span>
                      <span>Uploaded by {resource.uploadedBy}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-teal-500">{resource.date}</p>
                    <button className="mt-2 text-teal-600 hover:text-teal-800 text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {resources.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-medium text-teal-700">No resources available</h3>
                <p className="text-teal-500">Upload your first resource to get started</p>
              </div>
            )}
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default TeacherResources;