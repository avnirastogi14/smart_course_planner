import axios from "axios";

const client = axios.create({
  baseURL: "https://smart-course-planner.onrender.com",
});

export default client;