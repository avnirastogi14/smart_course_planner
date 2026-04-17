export default function CourseList({ courses }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {courses.map((c) => (
        <div key={c.course_id} style={styles.card}>
          <div style={styles.title}>
            {c.course_id} — {c.name}
          </div>

          <div style={styles.meta}>
            <span>Credits: {c.credits}</span>
            <span>Difficulty: {c.difficulty}</span>
            <span>{c.department}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    padding: "10px 12px",
    background: "#f8fafc",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: "#64748b",
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
};
