import api from "./client";

export const fetchCriticalAnalytics = () =>
  api.get("/analytics/critical");
