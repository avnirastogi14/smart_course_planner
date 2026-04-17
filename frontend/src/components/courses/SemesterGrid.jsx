import Card from "../common/Card";

export default function SemesterGrid({ courses = [] }) {
  const grouped = courses.reduce((acc, c) => {
    acc[c.semester_offered] ??= [];
    acc[c.semester_offered].push(c);
    return acc;
  }, {});

  const semesters = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
        flex: 1,
      }}
    >
      {semesters.map((sem) => (
        <Card key={sem} padding="16px">
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
            Semester {sem}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {grouped[sem].map((c) => (
              <div key={c.course_id} style={styles.course}>
                <div style={styles.courseTitle}>
                  {c.course_id} — {c.name}
                </div>
                <div style={styles.courseMeta}>
                  Credits: {c.credits} · Difficulty: {c.difficulty} ·{" "}
                  {c.department}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

const styles = {
  course: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "8px 10px",
  },
  courseTitle: {
    fontSize: 13,
    fontWeight: 600,
  },
  courseMeta: {
    fontSize: 12,
    color: "#6b7280",
  },
};
