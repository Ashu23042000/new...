import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json"
    }
});


export const signup = (data) => api.post("/signup", data);
export const login = (data) => api.post("/login", data);


export default api;