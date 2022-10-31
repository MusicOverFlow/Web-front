import apiClient from "@/http-common";
import {Post} from "@/api/types/Post";
import {PostCreateProps} from "@/api/services/PostService";

export interface CommentCreateProps {
    Content: string,
    ScriptLanguage: string,
    Script: string,
}

class CommentService {


    async create(createComment: CommentCreateProps, postId: string, token: string): Promise<Post | undefined> {
        try {
            const result = await apiClient.post("/commentaries", JSON.stringify(createComment), {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {postId: postId}
            })
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }

}

export default new CommentService();