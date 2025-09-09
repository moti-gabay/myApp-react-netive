import axios from "axios";
import { API_URL } from "./url";

const api = axios.create({
  baseURL: API_URL  + "/auth/me", // החלף בכתובת השרת שלך
  withCredentials: true, // 👈 שולח אוטומטית cookies
});

export default api;
