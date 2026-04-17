// import { useEffect, useState } from "react";
// import { getCourses } from "../../api/courseApi";
// import { addPrereq } from "../../api/prereqApi";

// export default function AddPrerequisitesForm({ onAdd }) {
//   const [courses, setCourses] = useState([]);
//   const [course, setCourse] = useState("");
//   const [prereq, setPrereq] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const loadCourses = async () => {
//     try {
//       const data = await getCourses();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error loading courses:", err);
//     }
//   };

//   const handleAdd = async () => {
//     console.log("Submitting:", { course, prereq });

//     if (!course || !prereq) {
//       alert("Select both course and prerequisite");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await addPrereq({
//         course: String(course),
//         prerequisite: String(prereq),
//       });

//       console.log("Response:", res);

//       alert("✅ Prerequisite added!");

//       // reset
//       setCourse("");
//       setPrereq("");

//       if (onAdd) onAdd(); // 🔥 trigger refresh
//     } catch (err) {
//       console.error("Add error:", err);
//       alert("❌ Failed to add prerequisite");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h3>Add Prerequisite</h3>

//       <label>
//         Course
//         <select
//           value={course}
//           onChange={(e) => setCourse(e.target.value)}
//         >
//           <option value="">Select course</option>
//           {courses.map((c) => (
//             <option key={c.course_id} value={c.course_id}>
//               {c.course_id} — {c.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Prerequisite
//         <select
//           value={prereq}
//           onChange={(e) => setPrereq(e.target.value)}
//         >
//           <option value="">Select prerequisite</option>
//           {courses.map((c) => (
//             <option key={c.course_id} value={c.course_id}>
//               {c.course_id} — {c.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       <button className="primary-btn" onClick={handleAdd}>
//         {loading ? "Adding..." : "Add"}
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";

const BASE_URL = "https://smart-course-planner.onrender.com";

const AddPrerequisitesForm = ({ onAdd }) => {
  const [course, setCourse] = useState("");
  const [prerequisite, setPrerequisite] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course || !prerequisite) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch(`${BASE_URL}/prerequisites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
          prerequisite,
        }),
      });

      setCourse("");
      setPrerequisite("");

      if (onAdd) onAdd(); // refresh list
    } catch (err) {
      console.error("Error adding prerequisite:", err);
    }
  };

  return (
    <div>
      <h2>Add Prerequisite</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course (e.g. CS201)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="text"
          placeholder="Prerequisite (e.g. CS101)"
          value={prerequisite}
          onChange={(e) => setPrerequisite(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddPrerequisitesForm;