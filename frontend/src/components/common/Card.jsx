export default function Card({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      {children}
    </div>
  );
}
