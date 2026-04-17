import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 32,
      }}
    >
      <div style={{ maxWidth: 720, textAlign: "center" }}>
        <h1 style={{ fontSize: 48 }}>Course Planner</h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 12 }}>
          Load Balancing & Dependency Management using Graph Theory
        </p>

        <div style={{ marginTop: 40, display: "grid", gap: 16 }}>
          <Card>Visual prerequisite graphs</Card>
          <Card>Cycle detection & validation</Card>
          <Card>Critical & bottleneck analysis</Card>
          <Card>Semester-wise load balancing</Card>
        </div>

        <button
          className="primary-btn"
          style={{ marginTop: 40 }}
          onClick={() => navigate("/login")}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}
