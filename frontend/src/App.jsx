import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Courses from "./pages/Courses";
import Prerequisites from "./pages/Prerequisites";
import LoadBalancing from "./pages/LoadBalancing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="courses" />} />
        <Route path="courses" element={<Courses />} />
        <Route path="prerequisites" element={<Prerequisites />} />
        <Route path="load" element={<LoadBalancing />} />
      </Route>
    </Routes>
  );
}
