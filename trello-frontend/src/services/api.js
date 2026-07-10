import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

// Attach JWT Token Automatically
api.interceptors.request.use((config) => {

    const authData = JSON.parse(
        localStorage.getItem("authData")
    );

    if (authData?.token) {
        config.headers.token = authData.token;
    }

    return config;
});

export default api;