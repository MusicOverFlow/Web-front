// create new axios instance with base url "https://localhost:7143/api/"
// const apiClient: AxiosInstance = axios.create({
//     baseURL: "https://localhost:7143/api/",
//     headers: {
//         "Content-type": "application/json",
//         "Access-Control-Allow-Origin": "*",


import axios from "axios";


class CodeExecutionService {
    async execute(code: string, language: string): Promise<any | undefined> {
        try {
            const result = await axios.post("http://45.155.170.199:5143/api/execute/" + language, code, {
                headers: {
                    "Content-type": "application/text",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                }
            })
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
        }

    }


}

export default new CodeExecutionService()