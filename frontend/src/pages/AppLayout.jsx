import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 32 }}>
        <Outlet />
      </main>
    </>
  );
}
