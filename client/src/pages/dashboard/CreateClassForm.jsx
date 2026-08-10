import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateClassForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    subject: "",
    date: "",
    roomId: Date.now() + Math.floor(Math.random() * 10000) + "ROOM", // Auto-generate roomId
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Class Data:", formData);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/class/create`,
        formData
      );
      const data = res.data;
      console.log(data);

      toast.success(data.message || "Class Created Successfully!");
      navigate("/teacher-dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create class");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Create New Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter class title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Date & Time</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Room ID (Auto Generated - Disabled for edit) */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Room ID</label>
            <input
              type="text"
              value={formData.roomId}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Teacher Name */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Teacher Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter teacher name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 cursor-pointer"
          >
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClassForm;
