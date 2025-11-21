// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import './index.css'
// import LoginPage from './app/login/page'
// import RegisterPage from './app/signup/page'
// import HomePage from './app/home/page'
// import Whiteboard from './app/whiteboard/page'
// import NotesPage from './app/notes/page'
// import { Toaster } from 'react-hot-toast'


// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           className: "chatgpt-toast",
//           duration: 3000,
//         }}
//       />
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/whiteboard" element={<Whiteboard/>} />
//         <Route path="/notes" element={<NotesPage/>} />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

import LoginPage from "./app/login/page";
import RegisterPage from "./app/signup/page";
import HomePage from "./app/home/page";
import Whiteboard from "./app/whiteboard/page";
import NotesPage from "./app/notes/page";
import MainLayout from "./layouts/MainLayout";
import TaskPage from "./app/tasks/page";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "chatgpt-toast",
          duration: 3000,
        }}
      />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* No sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/whiteboard" element={<Whiteboard />} />

        {/* All pages WITH sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/tasks" element={<TaskPage />} />

          {/* Add future pages here */}
          {/* <Route path="/materials" element={<MaterialsPage />} /> */}
          {/* <Route path="/assistant" element={<AssistantPage />} /> */}
          {/* <Route path="/tasks" element={<TasksPage />} /> */}
          {/* <Route path="/calendar" element={<CalendarPage />} /> */}
          {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
