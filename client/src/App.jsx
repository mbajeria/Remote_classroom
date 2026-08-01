import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import Classroom from "./pages/Classroom";
import TeacherSingup from "./pages/auth/TeacherSingup";
import TeacherLogin from "./pages/auth/TeacherLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreateClassForm from "./pages/dashboard/CreateClassForm";
import StudentProfile from "./pages/profile/StudentProfile";
import TeacherProfile from "./pages/profile/TeacherProfile";
import EditStudentProfile from "./pages/profile/EditStudentProfile";
import TeacherProfileEdit from "./pages/profile/TeacherProfileEdit";
import TeacherAssignments from "./pages/resourses/TeacherAssignments";
import StudentAssignment from "./pages/resourses/StudentAssignment";
import TeacherResources from "./pages/resourses/TeacherResourse";
import StudentResources from "./pages/resourses/StudentResources";
import { setStudentDetails } from "./store/studentSlice";
import { setTeacherDetails } from "./store/teacherSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import Context from "./context/context";

function App() {
  const [student, setStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const dispatch = useDispatch();

  // Fetch Student Details
  const fetchStudentDetails = async () => {
    try {
      const token = localStorage.getItem("StudentToken");
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/student/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const studentData = response.data.student;
      console.log("App Student Data:", studentData);

      setStudent(studentData);
      dispatch(setStudentDetails(studentData));

    } catch (err) {
      console.error("Error fetching student details:", err);
      localStorage.removeItem("StudentToken");
      toast.error(err.response?.data?.errors || "Login again", {
        position: "top-center",
      });
    }
  };

  // Fetch Teacher Details
  const fetchTeacherDetails = async () => {
    try {
      const token = localStorage.getItem("TeacherToken");
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/teacher/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const teacherData = response.data.teacher;
      console.log("App Teacher Data:", teacherData);

      setTeacher(teacherData);
      dispatch(setTeacherDetails(teacherData));
    } catch (err) {
      console.error("Error fetching teacher details:", err);
      localStorage.removeItem("TeacherToken");
      toast.error(err.response?.data?.errors || "Login again", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    fetchStudentDetails();
    fetchTeacherDetails();
  }, []);

  return (
    <Context.Provider
      value={{ student, fetchStudentDetails, teacher, fetchTeacherDetails }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teachersingup" element={<TeacherSingup />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
        <Route path="/student-profile/edit/:id" element={<EditStudentProfile />} />
        <Route path="/teacher-profile/edit/:id" element={<TeacherProfileEdit />} />
        <Route path="/mentor-assignment" element={<TeacherAssignments />} />
        <Route path="/student-assignment" element={<StudentAssignment />} />
        <Route path="/teacher-resourses" element={<TeacherResources />} />
        <Route path="/student-resources" element={<StudentResources />} />
        <Route path="/create-class" element={<CreateClassForm />} />
        <Route path="/classroom/:id" element={<Classroom />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
