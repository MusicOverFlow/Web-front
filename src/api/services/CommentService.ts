import apiClient from "@/http-common";
import {Commentary} from "@/api/types/Commentary";
import {Post} from "@/api/types/Post";

export interface CommentCreateProps {
    Content:string
}

class CommentService {


    async create(content:string,postId:string,token:string) : Promise<Post | undefined>{
        try {
            const result = await apiClient.post("/commentaries", {Content:content},{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params:{ postId:postId }
            })
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }

}

export default new CommentService();