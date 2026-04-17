// import { useEffect, useState } from "react";
// import ReactFlow, { Background, Controls } from "reactflow";
// import "reactflow/dist/style.css";
// import { getCourses } from "../../api/courseApi";

// export default function PrerequisitesGraph({ data }) {
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);
//   const [courseMap, setCourseMap] = useState({});

//   // 🔥 load course names once
//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const loadCourses = async () => {
//     try {
//       const courses = await getCourses();
//       const map = {};

//       courses.forEach((c) => {
//         map[c.course_id] = c.name;
//       });

//       setCourseMap(map);
//     } catch (err) {
//       console.error("Course load error:", err);
//     }
//   };

//   // 🔥 process graph whenever data changes
//   useEffect(() => {
//     if (!data || data.length === 0) {
//       setNodes([]);
//       setEdges([]);
//       return;
//     }

//     processGraph(data);
//   }, [data, courseMap]);

//   const detectCycleEdges = (data) => {
//     const graph = {};
//     const visited = {};
//     const stack = {};
//     const cycleEdges = new Set();

//     data.forEach((p) => {
//       if (!graph[p.prerequisite]) graph[p.prerequisite] = [];
//       graph[p.prerequisite].push(p.course);
//     });

//     const dfs = (node) => {
//       visited[node] = true;
//       stack[node] = true;

//       for (let neigh of graph[node] || []) {
//         if (!visited[neigh]) {
//           if (dfs(neigh)) {
//             cycleEdges.add(`${node}->${neigh}`);
//             return true;
//           }
//         } else if (stack[neigh]) {
//           cycleEdges.add(`${node}->${neigh}`);
//           return true;
//         }
//       }

//       stack[node] = false;
//       return false;
//     };

//     Object.keys(graph).forEach((node) => {
//       if (!visited[node]) dfs(node);
//     });

//     return cycleEdges;
//   };

//   const processGraph = (data) => {
//     const nodeSet = new Set();
//     const cycleEdges = detectCycleEdges(data);

//     if (cycleEdges.size > 0) {
//       alert("⚠️ Cycle detected in prerequisites!");
//     }

//     const newEdges = data.map((p, index) => {
//       const isCycle = cycleEdges.has(`${p.prerequisite}->${p.course}`);

//       return {
//         id: `e-${index}`,
//         source: p.prerequisite,
//         target: p.course,
//         style: {
//           stroke: isCycle ? "red" : "#222",
//           strokeWidth: isCycle ? 3 : 1.5,
//           strokeDasharray: isCycle ? "6 4" : "0",
//         },
//         animated: isCycle,
//       };
//     });

//     data.forEach((p) => {
//       nodeSet.add(p.course);
//       nodeSet.add(p.prerequisite);
//     });

//     const newNodes = Array.from(nodeSet).map((id, i) => ({
//       id,
//       data: {
//         label: `${id}\n${courseMap[id] || ""}`,
//       },
//       position: {
//         x: (i % 4) * 220,
//         y: Math.floor(i / 4) * 140,
//       },
//     }));

//     setNodes(newNodes);
//     setEdges(newEdges);
//   };

//   return (
//     <div style={{ height: 400 }}>
//       {nodes.length === 0 ? (
//         <p>No graph data yet</p>
//       ) : (
//         <ReactFlow nodes={nodes} edges={edges} fitView>
//           <Background />
//           <Controls />
//         </ReactFlow>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { getCourses } from "../../api/courseApi";

const BASE_URL = "https://smart-course-planner.onrender.com";

export default function PrerequisitesGraph({ data }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [courseMap, setCourseMap] = useState({});

  // 🔥 Load courses once
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const courses = await getCourses();

      const map = {};
      courses.forEach((c) => {
        map[c.course_id] = c.name;
      });

      setCourseMap(map);
    } catch (err) {
      console.error("Course load error:", err);
    }
  };

  // 🔥 If parent doesn't pass data, fetch here (DEPLOYMENT FIX)
  const [internalData, setInternalData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setInternalData(data);
    } else {
      fetch(`${BASE_URL}/prerequisites`)
        .then((res) => res.json())
        .then((resData) => {
          console.log("Graph fetched data:", resData);
          setInternalData(resData);
        })
        .catch((err) => console.error("Graph fetch error:", err));
    }
  }, [data]);

  // 🔥 Process graph when BOTH data + courseMap ready
  useEffect(() => {
    if (!internalData || internalData.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    processGraph(internalData);
  }, [internalData, courseMap]);

  // 🔥 Cycle detection
  const detectCycleEdges = (data) => {
    const graph = {};
    const visited = {};
    const stack = {};
    const cycleEdges = new Set();

    data.forEach((p) => {
      if (!graph[p.prerequisite]) graph[p.prerequisite] = [];
      graph[p.prerequisite].push(p.course);
    });

    const dfs = (node) => {
      visited[node] = true;
      stack[node] = true;

      for (let neigh of graph[node] || []) {
        if (!visited[neigh]) {
          if (dfs(neigh)) {
            cycleEdges.add(`${node}->${neigh}`);
            return true;
          }
        } else if (stack[neigh]) {
          cycleEdges.add(`${node}->${neigh}`);
          return true;
        }
      }

      stack[node] = false;
      return false;
    };

    Object.keys(graph).forEach((node) => {
      if (!visited[node]) dfs(node);
    });

    return cycleEdges;
  };

  // 🔥 Build graph
  const processGraph = (data) => {
    const nodeSet = new Set();
    const cycleEdges = detectCycleEdges(data);

    if (cycleEdges.size > 0) {
      console.warn("⚠️ Cycle detected:", [...cycleEdges]);
      alert("⚠️ Cycle detected in prerequisites!");
    }

    const newEdges = data.map((p, index) => {
      const key = `${p.prerequisite}->${p.course}`;
      const isCycle = cycleEdges.has(key);

      return {
        id: `e-${index}`,
        source: p.prerequisite,
        target: p.course,
        style: {
          stroke: isCycle ? "red" : "#222",
          strokeWidth: isCycle ? 3 : 1.5,
          strokeDasharray: isCycle ? "6 4" : "0",
        },
        animated: isCycle,
      };
    });

    data.forEach((p) => {
      nodeSet.add(p.course);
      nodeSet.add(p.prerequisite);
    });

    const newNodes = Array.from(nodeSet).map((id, i) => ({
      id,
      data: {
        label: `${id}${courseMap[id] ? `\n${courseMap[id]}` : ""}`,
      },
      position: {
        x: (i % 4) * 220,
        y: Math.floor(i / 4) * 140,
      },
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div style={{ height: 400, border: "1px solid #ddd", marginTop: "20px" }}>
      {nodes.length === 0 ? (
        <p style={{ padding: "10px" }}>No graph data yet</p>
      ) : (
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      )}
    </div>
  );
}