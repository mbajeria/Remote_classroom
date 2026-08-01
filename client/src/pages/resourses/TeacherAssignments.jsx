import React, { useState } from 'react';

const TeacherAssignments = () => {
  // State for assignments list
  const [assignments, setAssignments] = React.useState([
    {
      id: 1,
      title: 'Math Homework',
      description: 'Complete exercises 1-10 on page 45',
      deadline: '2023-11-15T23:59',
      fileName: 'math_homework.pdf',
      uploadDate: '2023-11-10',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Science Project',
      description: 'Research paper on renewable energy sources',
      deadline: '2023-11-20T23:59',
      fileName: 'science_project.docx',
      uploadDate: '2023-11-05',
      status: 'Active'
    }
  ]);
  
  // State for form inputs
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  
  // State for form validation
  const [errors, setErrors] = React.useState({});
  
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!deadline) newErrors.deadline = 'Deadline is required';
    if (!file) newErrors.file = 'File is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create new assignment object
      const newAssignment = {
        id: Date.now(),
        title,
        description,
        deadline,
        fileName,
        uploadDate: new Date().toLocaleDateString(),
        status: 'Active'
      };
      
      // Add to assignments list
      setAssignments([...assignments, newAssignment]);
      
      // Reset form
      setTitle('');
      setDescription('');
      setDeadline('');
      setFile(null);
      setFileName('');
      setErrors({});
      
      // Show success message
      alert('Assignment uploaded successfully!');
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Check if assignment is overdue
  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Teacher's Assignment Portal</h1>
          <p className="text-gray-600">Create and manage assignments for your students</p>
        </header>
        
        {/* Upload Assignment Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Upload New Assignment</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full  border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter assignment title"
              />
              {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Provide detailed instructions for the assignment"
              />
              {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline *
                </label>
                <input
                  type="datetime-local"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.deadline ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.deadline && <p className="mt-2 text-sm text-red-600">{errors.deadline}</p>}
              </div>
              
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment File *
                </label>
                <div className="flex items-center space-x-3">
                  <label htmlFor="file" className="cursor-pointer bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {fileName || 'No file chosen'}
                  </span>
                </div>
                {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file}</p>}
                <p className="mt-2 text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, PPT (Max 10MB)</p>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-colors shadow-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Upload Assignment
              </button>
            </div>
          </form>
        </div>
        
        {/* Assignments List */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Current Assignments</h2>
            <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
              {assignments.length} assignments
            </span>
          </div>
          
          {assignments.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg">No assignments uploaded yet.</p>
              <p className="text-gray-400 mt-2">Create your first assignment using the form above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title & Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className={isOverdue(assignment.deadline) ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{assignment.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {formatDate(assignment.deadline)}
                          {isOverdue(assignment.deadline) && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Overdue
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {assignment.fileName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${assignment.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {assignment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default TeacherAssignments;