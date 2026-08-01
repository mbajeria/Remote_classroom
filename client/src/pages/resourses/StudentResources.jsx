import React, { useState } from 'react';

const StudentResources = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Introduction to Calculus',
      type: 'PDF',
      date: '2023-10-15',
      size: '2.4 MB',
      uploadedBy: 'Dr. Smith',
      description: 'Fundamental concepts of differential and integral calculus with practice problems.',
      category: 'Mathematics'
    },
    {
      id: 2,
      title: 'Chemistry Lab Safety Guide',
      type: 'Video',
      date: '2023-10-10',
      size: '15.7 MB',
      uploadedBy: 'Prof. Johnson',
      description: 'Essential safety procedures for chemistry laboratory experiments.',
      category: 'Science'
    },
    {
      id: 3,
      title: 'Essay Writing Guide',
      type: 'Document',
      date: '2023-10-05',
      size: '0.8 MB',
      uploadedBy: 'Dr. Williams',
      description: 'Step-by-step guide to writing effective academic essays with examples.',
      category: 'English'
    },
    {
      id: 4,
      title: 'World History Timeline',
      type: 'PDF',
      date: '2023-09-28',
      size: '3.2 MB',
      uploadedBy: 'Dr. Garcia',
      description: 'Comprehensive timeline of major world events from ancient times to present.',
      category: 'History'
    },
    {
      id: 5,
      title: 'Python Programming Basics',
      type: 'Video',
      date: '2023-09-20',
      size: '22.5 MB',
      uploadedBy: 'Prof. Chen',
      description: 'Introduction to Python programming language with coding examples.',
      category: 'Computer Science'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const categories = ['All', 'Mathematics', 'Science', 'English', 'History', 'Computer Science'];
  const types = ['All', 'PDF', 'Video', 'Document'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = (resource) => {
    // Simulate download
    alert(`${Downloading}: ${resource.title}`);
    console.log(`${Downloaded}: ${resource.title}`);
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return '📄';
      case 'Video': return '🎬';
      case 'Document': return '📝';
      default: return '📂';
    }
  };

  const getFileColor = (type) => {
    switch(type) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Video': return 'bg-blue-100 text-blue-800';
      case 'Document': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-2">Student Resources Portal</h1>
          <p className="text-lg text-teal-600">Access and download learning materials</p>
        </header>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Resources</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Search by title or description"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources List */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-teal-700">Available Resources</h2>
            <p className="text-teal-600">{filteredResources.length} resources found</p>
          </div>

          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="flex flex-col md:flex-row items-start p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mr-4 mb-2 md:mb-0">
                  <span className="text-2xl">{getFileIcon(resource.type)}</span>
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-teal-800 text-lg">{resource.title}</h3>
                  <p className="text-teal-600 mb-2">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-1 text-sm">
                    <span className={`px-2 py-1 rounded-md ${getFileColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    <span className="bg-teal-200 text-teal-800 px-2 py-1 rounded-md">
                      {resource.category}
                    </span>
                    <span className="text-teal-600">
                      {resource.size}
                    </span>
                    <span className="text-teal-600">
                      Uploaded by {resource.uploadedBy}
                    </span>
                    <span className="text-teal-600">
                      {resource.date}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-4">
                  <button 
                    onClick={() => handleDownload(resource)}
                    className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-teal-700">No resources found</h3>
              <p className="text-teal-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-teal-600">
          <p>© 2023 Student Resources Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default StudentResources;