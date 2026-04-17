import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      {/* Decorative background */}
      <div style={bgGrid} />

      <Card style={card}>
        <h2 style={{ textAlign: "center", marginBottom: 4 }}>Course Planner</h2>
        <p style={{textAlign: "center", fontSize: 13, color: "#6b7280", marginBottom: 20}}> Simulation of How Graph Theory can Aid Academic Planning
        </p>

        <input style={input} placeholder="Username" />
        <input style={input} placeholder="Password" type="password" />

        <button
          className="primary-btn"
          style={loginBtn}
          onClick={() => navigate("/app")}
        >
          Login
        </button>

        <p style={hint}>
          Demo login · No authentication required
        </p>
      </Card>
    </div>
  );
}

/* =======================
   Styles
======================= */

const page = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: 32,
  background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
  position: "relative",
  overflow: "hidden",
};

const bgGrid = {
  position: "absolute",
  inset: 0,
  backgroundImage: `
    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
  opacity: 0.25,
  pointerEvents: "none", // 👈 THIS FIXES IT
};


const card = {
  width: 380,
  padding: 28,
  zIndex: 1,
};

const subtitle = {
  fontSize: 13,
  color: "#6b7280",
  marginBottom: 20,
};

const input = {
  width: "100%",
  padding: 12,
  marginTop: 14,
  borderRadius: 10,
  border: "1px solid var(--border)",
  fontSize: 14,
};

const loginBtn = {
  width: "100%",
  marginTop: 22,
  fontSize: 15,
};

const hint = {
  marginTop: 16,
  fontSize: 12,
  color: "#9ca3af",
  textAlign: "center",
};
