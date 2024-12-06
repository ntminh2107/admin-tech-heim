import axiosClient from "./api";

export const loginAPI = ({ email, password }) => {
  const body = { email, password };
  return axiosClient.post("api/auth/login", body).then((res) => {
    const { data, status } = res;
    return { data, status };
  });
};

export const getCurrentUserAPI = () => {
  const token = localStorage.getItem("token");
  return axiosClient
    .get("/api/auth/user/me", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};
