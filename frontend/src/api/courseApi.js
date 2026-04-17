import client from "./client";

export const getCourses = async () => {
  const res = await client.get("/courses");
  return res.data || [];
};

export const addCourse = async (data) => {
  const res = await client.post("/courses", data);
  return res.data;
};