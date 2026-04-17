import client from "./client";

export const getPrereqs = async () => {
  const res = await client.get("/prerequisites");
  return res.data || [];
};

export const addPrereq = async (data) => {
  const res = await client.post("/prerequisites", data);
  return res.data;
};