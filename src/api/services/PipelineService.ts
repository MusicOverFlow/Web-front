import apiClient from "@/http-common";

export interface ScriptResponse {
    output: string,
}

class PipelineService {
    async imagePipeline(bodyFormData: any, token: string): Promise<ScriptResponse | undefined> {
        try {
            const result = await apiClient.post("execute/imagepipeline",
                bodyFormData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })

            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }

    async audioPipeline(bodyFormData: any, token: string): Promise<ScriptResponse | undefined> {
        try {
            const result = await apiClient.post("execute/soundpipeline",
                bodyFormData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })

            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }
}

export default new PipelineService()