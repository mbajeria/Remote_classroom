import { useState } from "react";

const StudentAssignment = () => {
  // State for assignments and form data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Algebra Homework",
      course: "Mathematics 101",
      dueDate: "2023-10-15",
      status: "submitted",
      description: "Complete exercises 1-20 on page 45. Show all your work.",
      submittedDate: "2023-10-14",
      grade: "A-",
    },
    {
      id: 2,
      title: "Essay on Climate Change",
      course: "Environmental Science",
      dueDate: "2023-10-20",
      status: "pending",
      description:
        "Write a 1500-word essay discussing the impacts of climate change on coastal cities.",
      submittedDate: null,
      grade: null,
    },
    {
      id: 3,
      title: "React Component Project",
      course: "Web Development",
      dueDate: "2023-10-25",
      status: "missing",
      description:
        "Create a responsive React component using hooks and Tailwind CSS.",
      submittedDate: null,
      grade: null,
    },
    {
      id: 4,
      title: "Lab Report: Chemical Reactions",
      course: "Chemistry",
      dueDate: "2023-10-10",
      status: "graded",
      description:
        "Document the experiment from class including materials, methods, and results.",
      submittedDate: "2023-10-09",
      grade: "B+",
    },
    {
      id: 5,
      title: "History Research Paper",
      course: "World History",
      dueDate: "2023-11-05",
      status: "pending",
      description:
        "Research and write a paper on the causes of World War II with at least 5 sources.",
      submittedDate: null,
      grade: null,
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  // Filter assignments based on active tab
  const filteredAssignments = assignments.filter((assignment) => {
    if (activeTab === "all") return true;
    return assignment.status === activeTab;
  });

  // Handle assignment selection
  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionText("");
    setSubmissionFile(null);
    setShowSubmissionSuccess(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submissionText && !submissionFile) return;

    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === selectedAssignment.id) {
        return {
          ...assignment,
          status: "submitted",
          submittedDate: new Date().toISOString().split("T")[0],
        };
      }
      return assignment;
    });

    setAssignments(updatedAssignments);
    setShowSubmissionSuccess(true);
    setSubmissionText("");
    setSubmissionFile(null);

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setShowSubmissionSuccess(false);
    }, 3000);
  };

  // Format due date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "missing":
        return "bg-red-100 text-red-800";
      case "graded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate days until due
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Student Assignment Portal
          </h1>
          <p className="text-gray-600">
            View and submit your course assignments in one place
          </p>
        </header>

        {showSubmissionSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>Assignment submitted successfully!</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Assignment List */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-xl shadow-md p-4 mb-4 sticky top-4">
              <div className="flex flex-wrap gap-2 border-b pb-3 mb-4">
                {["all", "pending", "submitted", "graded"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      activeTab === tab
                        ? tab === "all"
                          ? "bg-blue-500 text-white shadow-md"
                          : tab === "pending"
                          ? "bg-yellow-500 text-white shadow-md"
                          : tab === "submitted"
                          ? "bg-green-500 text-white shadow-md"
                          : "bg-blue-500 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {filteredAssignments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <p>No assignments found</p>
                  </div>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedAssignment?.id === assignment.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleSelectAssignment(assignment)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {assignment.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {assignment.course}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                            assignment.status
                          )} whitespace-nowrap ml-2`}
                        >
                          {assignment.status.charAt(0).toUpperCase() +
                            assignment.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                          <span
                            className={
                              getDaysUntilDue(assignment.dueDate) < 3
                                ? "text-red-500 font-medium"
                                : "text-gray-600"
                            }
                          >
                            {getDaysUntilDue(assignment.dueDate) > 0
                              ? `${getDaysUntilDue(
                                  assignment.dueDate
                                )} days left`
                              : "Past due"}
                          </span>
                        </div>
                        {assignment.submittedDate && (
                          <p>
                            Submitted: {formatDate(assignment.submittedDate)}
                          </p>
                        )}
                        {assignment.grade && (
                          <p className="font-medium mt-1">
                            Grade:{" "}
                            <span className="text-blue-600">
                              {assignment.grade}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Assignment Detail & Submission */}
          <div className="w-full lg:w-3/5">
            {selectedAssignment ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedAssignment.title}
                    </h2>
                    <p className="text-gray-600">
                      {selectedAssignment.course}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusClass(
                      selectedAssignment.status
                    )}`}
                  >
                    {selectedAssignment.status.charAt(0).toUpperCase() +
                      selectedAssignment.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Due Date
                    </h3>
                    <p className="text-gray-700">
                      {formatDate(selectedAssignment.dueDate)}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        getDaysUntilDue(selectedAssignment.dueDate) < 3
                          ? "text-red-500 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {getDaysUntilDue(selectedAssignment.dueDate) > 0
                        ? `${getDaysUntilDue(
                            selectedAssignment.dueDate
                          )} days remaining`
                        : "This assignment is past due"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Assignment Status
                    </h3>
                    <p className="text-gray-700">
                      {selectedAssignment.status.charAt(0).toUpperCase() +
                        selectedAssignment.status.slice(1)}
                    </p>
                    {selectedAssignment.submittedDate && (
                      <p className="text-sm text-gray-600 mt-1">
                        Submitted on {formatDate(selectedAssignment.submittedDate)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedAssignment.description}
                  </p>
                </div>

                {selectedAssignment.status === "submitted" ||
                selectedAssignment.status === "graded" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Assignment Submitted
                    </h3>
                    <p className="text-green-700">
                      You submitted this assignment on{" "}
                      {formatDate(selectedAssignment.submittedDate)}
                    </p>
                    {selectedAssignment.grade && (
                      <div className="mt-3 p-3 bg-white rounded-lg border">
                        <h4 className="font-medium text-green-800">
                          Grade:{" "}
                          <span className="text-blue-600 text-lg">
                            {selectedAssignment.grade}
                          </span>
                        </h4>
                        <p className="text-sm text-green-700 mt-1">
                          Your work has been evaluated by the instructor
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                        Submit Your Work
                      </h3>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                          Text Submission
                        </label>
                        <textarea
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          rows="6"
                          placeholder="Type your assignment response here..."
                          value={submissionText}
                          onChange={(e) => setSubmissionText(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                          File Upload
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                {submissionFile
                                  ? submissionFile.name
                                  : "Click to upload or drag and drop"}
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF, DOCX, PPTX (Max: 10MB)
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                setSubmissionFile(e.target.files[0])
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!submissionText && !submissionFile}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                      >
                        Submit Assignment
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Select an Assignment
                </h3>
                <p className="text-gray-600">
                  Choose an assignment from the list to view details and submit
                  your work
                </p>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Tips for submitting assignments:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>Check the due date carefully</li>
                    <li>Review assignment instructions thoroughly</li>
                    <li>Submit ahead of time to avoid last-minute issues</li>
                    <li>Keep a copy of your submission</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignment;
