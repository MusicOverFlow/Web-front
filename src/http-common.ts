import axios, {AxiosInstance} from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://45.155.170.199:5143/api",
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