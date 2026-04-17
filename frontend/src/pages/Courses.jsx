import { useEffect, useState } from "react";
import { getCourses, addCourse } from "../api/courseApi";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course_id: "",
    name: "",
    credits: 3,
    difficulty: 1,
    semester_offered: 1,
    department: "CSE",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleAdd = async () => {
    if (!form.course_id || !form.name) {
      alert("Course ID and Name required");
      return;
    }

    await addCourse({
      ...form,
      credits: Number(form.credits),
      difficulty: Number(form.difficulty),
      semester_offered: Number(form.semester_offered),
    });

    loadCourses();

    // reset form
    setForm({
      course_id: "",
      name: "",
      credits: 3,
      difficulty: 1,
      semester_offered: 1,
      department: "CSE",
    });
  };

  return (
    <div className="page">
      <h1>Courses</h1>

      <div className="grid-2">
        {/* LEFT FORM */}
        <div className="card">
          <h3>Add Course</h3>

          {Object.keys(form).map((key) => (
            <label key={key}>
              {key}
              <input
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            </label>
          ))}

          <button className="primary-btn" onClick={handleAdd}>
            Add
          </button>
        </div>

        {/* RIGHT TABLE */}
        <div className="card">
          <h3>All Courses</h3>

          {courses.length === 0 ? (
            <p>No courses added yet</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={th}>ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Credits</th>
                  <th style={th}>Difficulty</th>
                  <th style={th}>Semester</th>
                  <th style={th}>Dept</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((c) => (
                  <tr key={c.course_id}>
                    <td style={td}>{c.course_id}</td>
                    <td style={td}>{c.name}</td>
                    <td style={td}>{c.credits}</td>
                    <td style={td}>{c.difficulty}</td>
                    <td style={td}>{c.semester_offered}</td>
                    <td style={td}>{c.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const th = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid #e5e7eb",
  fontSize: "14px",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "13px",
};