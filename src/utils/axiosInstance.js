import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // backend base URL
  withCredentials: true, // ✅ important for cross-origin cookies or auth
});

// Add a request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("🔍 Interceptor check - Token:", token);
    console.log("🔍 Auth header before:", config.headers.Authorization);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("🔍 Auth header after:", config.headers.Authorization);

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
