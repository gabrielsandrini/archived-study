import axios from "axios";



const httpClient = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  "Access-Control-Allow-Credentials": true,
});

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

export default httpClient;