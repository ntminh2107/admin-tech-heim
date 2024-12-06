import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
axiosClient.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async function (response) {
    return response;
  },
  function (error) {
    return error.response;
  }
);

export default axiosClient;
