# 🎓 Remote Classroom for Rural Colleges

A **Smart Education** digital platform designed to bridge the digital and educational divide for students and educators in rural and semi-urban colleges. It facilitates low-bandwidth-optimized live interactive video lectures, integrated real-time chat, and structured distribution of study resources, assignments, and AI-assisted doubt solving.

---

## 🏛 Project Details
- **Institution:** Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur
- **Department:** Department of Computer Science & Engineering
- **Project Session:** 2026-27
- **Project ID:** `SKIT/CS/2023-2027/39`
- **Section:** C
- **SDG Mapping:** **SDG 4: Quality Education**

---

## 🚀 Problem Statement
Rural colleges face significant challenges in delivering quality education due to limited bandwidth, lack of specialized subject experts, and inadequate digital infrastructure. This solution provides low-bandwidth remote classrooms with interactive learning, ensuring seamless accessibility on entry-level smartphones, tablets, and computers.

---

## ✨ Key Features
- 👨‍🏫 **Role-based Dashboards:** Dedicated portals for Students and Teachers.
- 🎥 **Low-Bandwidth Live Classroom:** Real-time WebRTC/ZegoCloud video conferencing with interactive text chat.
- 📋 **Live Attendance Module:** Automated attendee tracking and attendance history recording.
- 📂 **Digital Resource Repository:** Cloud-based study notes, PDFs, and assignment management.
- 🤖 **Google Gemini AI Chatbot:** AI-powered doubt-solving assistant supporting English & Hindi.
- 🔑 **Secure Authentication:** OTP-based verification and JWT session tokens.
- 🌐 **Responsive UI:** Built with React 19, Tailwind CSS, and Framer Motion.

---

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Redux Toolkit, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM with indexing)
- **Authentication:** JWT + Phone OTP Verification
- **Real-Time & Media:** WebRTC, ZegoCloud UI Kit, Cloudinary
- **AI Integration:** Google Gemini 1.5 API

---

## 🧑‍🤝‍🧑 Project Team (SKIT CSE 2026-27)
- **Kunal Saukhiya** — Backend Lead (Authentication, OTP, JWT, WebRTC)
- **Manish Regar** — Database Design & Backend APIs (Database schema, Notes, Attendance, Gemini AI)
- **Rishabh Jain** — QA Lead (Testing, Security Audits & Deployment)
- **Manish Kumar** — Frontend Lead (React UI, Dashboards, Classroom Interface)

---

## 📌 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/mbajeria/Remote_classroom.git

# Navigate into project folder
cd Remote_classroom

# Backend Setup
cd server
npm install
npm run server

# Frontend Setup
cd ../client
npm install
npm run dev
```
