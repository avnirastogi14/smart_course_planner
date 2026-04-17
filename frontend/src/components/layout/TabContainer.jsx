export default function TabContainer({ title, children }) {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
