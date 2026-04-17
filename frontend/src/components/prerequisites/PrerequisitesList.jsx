import { useEffect, useState } from "react";
import { getCourses } from "../../api/courseApi";
import { deletePrerequisite } from "../../api/prereqApi";

export default function PrerequisitesList({ data, onDeleteSuccess }) {
  const [coursesMap, setCoursesMap] = useState({});
  const [loadingDelete, setLoadingDelete] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const courses = await getCourses();

      const map = {};
      courses.forEach((c) => {
        map[c.course_id] = c;
      });

      setCoursesMap(map);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  const handleDelete = async (course, prerequisite) => {
    try {
      setLoadingDelete(`${course}-${prerequisite}`);

      await deletePrerequisite(course, prerequisite);

      // update parent state
      onDeleteSuccess(course, prerequisite);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete prerequisite");
    } finally {
      setLoadingDelete(null);
    }
  };

  if (!data || data.length === 0) {
    return <p>No prerequisites found</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f1f5f9" }}>
          <th style={th}>Course Code</th>
          <th style={th}>Course Name</th>
          <th style={th}>Prerequisite Code</th>
          <th style={th}>Prerequisite Name</th>
          <th style={th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((p) => {
          const course = coursesMap[p.course];
          const prereq = coursesMap[p.prerequisite];
          const key = `${p.course}-${p.prerequisite}`;

          return (
            <tr key={key}>
              <td style={td}>{p.course}</td>
              <td style={td}>{course?.name || "-"}</td>
              <td style={td}>{p.prerequisite}</td>
              <td style={td}>{prereq?.name || "-"}</td>

              <td style={td}>
                <button
                  onClick={() =>
                    handleDelete(p.course, p.prerequisite)
                  }
                  style={deleteBtn}
                  disabled={loadingDelete === key}
                >
                  {loadingDelete === key ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const th = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid #e5e7eb",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

const deleteBtn = {
  padding: "6px 10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};