// import { useEffect, useState } from "react";
// import AddPrerequisitesForm from "../components/prerequisites/AddPrerequisitesForm";
// import PrerequisitesList from "../components/prerequisites/PrerequisitesList";
// import PrerequisitesGraph from "../components/prerequisites/PrerequisitesGraph";
// import { getPrereqs } from "../api/prereqApi";

// export default function Prerequisites() {
//   const [data, setData] = useState([]);

//   const load = async () => {
//     try {
//       const res = await getPrereqs();
//       setData(res);
//     } catch (err) {
//       console.error("Failed to load prerequisites:", err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // 🔥 NEW: handle delete (instant UI update)
//   const handleDeleteSuccess = (course, prerequisite) => {
//     setData((prev) =>
//       prev.filter(
//         (p) => !(p.course === course && p.prerequisite === prerequisite)
//       )
//     );
//   };

//   return (
//     <div className="page">
//       <h1>Prerequisites</h1>

//       <div className="grid-2">
//         <div className="card">
//           <AddPrerequisitesForm onAdd={load} />
//         </div>

//         <div className="card">
//           <h3>Graph</h3>
//           <PrerequisitesGraph data={data} />
//         </div>
//       </div>

//       <div className="card" style={{ marginTop: 20 }}>
//         <h3>List</h3>
//         <PrerequisitesList
//           data={data}
//           onDeleteSuccess={handleDeleteSuccess} 
//         />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useCallback } from "react";
import AddPrerequisitesForm from "../components/prerequisites/AddPrerequisitesForm";
import PrerequisitesList from "../components/prerequisites/PrerequisitesList";
import PrerequisitesGraph from "../components/prerequisites/PrerequisitesGraph";
import { getPrereqs } from "../api/prereqApi";

export default function Prerequisites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load all prerequisites from backend
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPrereqs();
      console.log("Loaded prerequisites:", res);
      setData(res || []);
    } catch (err) {
      console.error("Failed to load prerequisites:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // 🔥 Instant UI update after delete
  const handleDeleteSuccess = (course, prerequisite) => {
    setData((prev) =>
      prev.filter(
        (p) => !(p.course === course && p.prerequisite === prerequisite)
      )
    );
  };

  // 🔥 After adding → reload from backend (ensures graph consistency)
  const handleAddSuccess = () => {
    load();
  };

  return (
    <div className="page">
      <h1>Prerequisites</h1>

      <div className="grid-2">
        {/* LEFT: FORM */}
        <div className="card">
          <AddPrerequisitesForm onAdd={handleAddSuccess} />
        </div>

        {/* RIGHT: GRAPH */}
        <div className="card">
          <h3>Graph</h3>

          {loading ? (
            <p>Loading graph...</p>
          ) : (
            <PrerequisitesGraph data={data} />
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="card" style={{ marginTop: 20 }}>

        {loading ? (
          <p>Loading list...</p>
        ) : (
          <PrerequisitesList
            data={data}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </div>
  );
}