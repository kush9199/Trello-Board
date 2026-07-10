import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

// Runs before every request
api.interceptors.request.use(
    (config) => {

        const authData = JSON.parse(
            localStorage.getItem("authData")
        );

        if (authData?.token) {
            config.headers.token = authData.token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;