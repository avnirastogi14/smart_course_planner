import { useState } from "react";
import { generatePlan } from "../api/loadBalancingApi";

export default function LoadBalancing() {
  const [maxCredits, setMaxCredits] = useState(18);
  const [degreeCredits, setDegreeCredits] = useState(120);
  const [plan, setPlan] = useState(null);

  const handleGenerate = async () => {
    try {
      const res = await generatePlan({
        max_credits_per_sem: maxCredits,
        degree_required_credits: degreeCredits,
      });

      setPlan(res);

      // CHECK CREDIT REQUIREMENT
      if (res.total < res.required) {
        alert(
          `⚠️ Plan incomplete: Only ${res.total} credits scheduled out of required ${res.required}`
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan");
    }
  };

  return (
    <div className="page">
      <h1>Load Balancing</h1>

      <div className="grid-2">
        <div className="card">
          <label>
            Max Credits
            <input
              value={maxCredits}
              onChange={(e) => setMaxCredits(Number(e.target.value))}
            />
          </label>

          <label>
            Degree Credits
            <input
              value={degreeCredits}
              onChange={(e) => setDegreeCredits(Number(e.target.value))}
            />
          </label>

          <button className="primary-btn" onClick={handleGenerate}>
            Generate
          </button>
        </div>

        <div className="card">
          <h3>Plan</h3>

          {plan &&
            Object.entries(plan.plan || {}).map(([sem, courses]) => (
              <div key={sem}>
                <h4>Semester {sem}</h4>
                <ul>
                  {courses.map((c) => (
                    <li key={c.course_id}>
                      {c.name} ({c.credits})
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {plan && <p>Total: {plan.total}</p>}
        </div>
      </div>
    </div>
  );
}