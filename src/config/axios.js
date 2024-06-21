import axios from "axios";
import { getToken } from "../utils/getToken";

const token = getToken();
const BASE_URL = process.env.REACT_APP_BASE_URL + "api/admin/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    "x-access-token": `${token}`,
  },
});

const axiosInstancePublic = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
  },
});

const loginPost = async (username, password) => {
  console.log(BASE_URL);
  const res = await axiosInstancePublic.post(`login`, {
    username,
    password,
  });
  return res;
};
export { axiosInstance, loginPost };
