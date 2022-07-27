import apiClient from "@/http-common";
import {Post} from "@/api/types/Post";
import {Account} from "@/api/types/Account";
import {AccountWithPosts} from "@/api/types/AccountWithPosts";

export interface PostCreateProps {
    Title: string,
    Content: string
}

class PostService {
    async create(createPost: PostCreateProps, token: string,groupId?:string): Promise<Post | undefined> {
        try {
            const result = await apiClient.post("/posts", JSON.stringify(createPost), {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params : {groupId : groupId}
            })
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }

    async getByAccount(token: string): Promise<Post[] | undefined> {
        try {
            const result = await apiClient.get("/posts/byAccount", {
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

    async getById(token: string, id: string): Promise<Post[] | undefined> {
        try {
            const result = await apiClient.get("/posts/", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {id: id}
                },
            )
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }

    async getHomePage(token: string): Promise<Post[] | undefined> {
        try {
            const result = await apiClient.get("/posts/homePage", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                }
            )
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }


}

export default new PostService();