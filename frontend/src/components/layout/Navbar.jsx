import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { label: "Courses", path: "/app/courses" },
  { label: "Prerequisites", path: "/app/prerequisites" },
  { label: "Load", path: "/app/load" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid var(--border)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <strong>Smart Course Planner</strong>

      <nav style={{ display: "flex", gap: 20 }}>
        {tabs.map((t) => (
          <button
            key={t.path}
            onClick={() => navigate(t.path)}
            style={{
              background: "none",
              border: "none",
              fontWeight: location.pathname === t.path ? 600 : 400,
              color:
                location.pathname === t.path
                  ? "var(--primary)"
                  : "var(--muted)",
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
