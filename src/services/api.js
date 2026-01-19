import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: "https://chicken-backend-lcd8.onrender.com/api"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
},
(error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("Unauthorized / Forbidden – logging out");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
