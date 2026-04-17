import { useState } from "react";
import api from "../../api/client";

export default function AddCourseForm({ onCourseAdded }) {
  const [course, setCourse] = useState({
    course_id: "",
    name: "",
    credits: "",
    difficulty: "",
    semester_offered: "",
    department: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setCourse({ ...course, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/courses", {
        ...course,
        credits: Number(course.credits),
        difficulty: Number(course.difficulty),
        semester_offered: Number(course.semester_offered),
      });

      setCourse({
        course_id: "",
        name: "",
        credits: "",
        difficulty: "",
        semester_offered: "",
        department: "",
      });

      onCourseAdded();
    } catch {
      setError("Failed to add course");
    }
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Add Course</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        {[
          ["course_id", "Course ID"],
          ["name", "Course Name"],
          ["credits", "Credits"],
          ["difficulty", "Difficulty"],
          ["semester_offered", "Semester"],
          ["department", "Department"],
        ].map(([key, label]) => (
          <div key={key} style={styles.field}>
            <label style={styles.label}>{label}</label>
            <input
              name={key}
              value={course[key]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}

        {error && <span style={styles.error}>{error}</span>}

        <button type="submit" style={styles.button}>
          Add Course
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    width: 300,
    background: "#ffffff",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: "#475569",
  },
  input: {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 13,
  },
  button: {
    marginTop: 8,
    padding: "10px",
    borderRadius: 10,
    background: "#0f172a",
    color: "#fff",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "#dc2626",
    fontSize: 12,
  },
};
