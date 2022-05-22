import apiClient from "@/http-common";
import {Post} from "@/api/types/Post";
import userStore from "@/store/user";

export interface PostCreateProps {
    title:string,
    content:string
}

class PostService {
    async create(createPost: PostCreateProps): Promise<Post | undefined> {
        try {
            console.log(userStore)
            const result = await apiClient.post("/posts", createPost,{
                headers: {
                    'Authorization': userStore.state.token,
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                }
            })
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }

}

export default new PostService();