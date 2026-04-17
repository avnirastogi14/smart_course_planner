import { useEffect, useState } from "react";
import AddPrerequisitesForm from "../components/prerequisites/AddPrerequisitesForm";
import PrerequisitesList from "../components/prerequisites/PrerequisitesList";
import PrerequisitesGraph from "../components/prerequisites/PrerequisitesGraph";
import { getPrereqs } from "../api/prereqApi";

export default function Prerequisites() {
  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const res = await getPrereqs();
      setData(res);
    } catch (err) {
      console.error("Failed to load prerequisites:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔥 NEW: handle delete (instant UI update)
  const handleDeleteSuccess = (course, prerequisite) => {
    setData((prev) =>
      prev.filter(
        (p) => !(p.course === course && p.prerequisite === prerequisite)
      )
    );
  };

  return (
    <div className="page">
      <h1>Prerequisites</h1>

      <div className="grid-2">
        <div className="card">
          <AddPrerequisitesForm onAdd={load} />
        </div>

        <div className="card">
          <h3>Graph</h3>
          <PrerequisitesGraph data={data} />
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3>List</h3>
        <PrerequisitesList
          data={data}
          onDeleteSuccess={handleDeleteSuccess}   // ✅ IMPORTANT
        />
      </div>
    </div>
  );
}