import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://localhost:7143/api",// "https://musicoverflowapi.azurewebsites.net/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    },
    validateStatus: status => {
        return status >= 200 && status < 600;
    },
});


//apiClient.options()
export default apiClient;