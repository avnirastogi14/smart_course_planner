import { useEffect, useState } from "react";
import { getCourses } from "../../api/courseApi";

export default function PrerequisitesList({ data }) {
  const [coursesMap, setCoursesMap] = useState({});

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
        </tr>
      </thead>

      <tbody>
        {data.map((p, i) => {
          const course = coursesMap[p.course];
          const prereq = coursesMap[p.prerequisite];

          return (
            <tr key={i}>
              <td style={td}>{p.course}</td>
              <td style={td}>{course?.name || "-"}</td>
              <td style={td}>{p.prerequisite}</td>
              <td style={td}>{prereq?.name || "-"}</td>
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