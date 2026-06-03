import axios from "axios";

const API = axios.create({
  baseURL: "https://multi-tenant-saas-dashboard-project.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {

    if (typeof window !== "undefined") {

      const token = localStorage.getItem("access");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;