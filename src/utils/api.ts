import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// api 호출 하기 전에 request 를 가로채서 access_token 업데이트 해주고 보낸다
api.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return request;
});

export default api;
