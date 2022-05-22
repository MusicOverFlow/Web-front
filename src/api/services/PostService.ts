import apiClient from "@/http-common";
import {Post} from "@/api/types/Post";
import {Account} from "@/api/types/Account";

export interface PostCreateProps {
    title:string,
    content:string
}

class PostService {
    async create(createPost: PostCreateProps,token:string): Promise<Post | undefined> {
        try {
            const result = await apiClient.post("/posts", createPost,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }
    async getByAccount(token:string): Promise<Account | undefined> {
        try {
            const result = await apiClient.get("/posts/byAccount",{
                headers: {
                    'Authorization': `Bearer ${token}`
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