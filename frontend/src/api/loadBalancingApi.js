import client from "./client";

export const generatePlan = async (config) => {
  const res = await client.post("/load-balancing", config);
  return res.data;
};