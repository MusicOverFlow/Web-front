import apiClient from "@/http-common";
import {Post} from "@/api/types/Post";
import {PostCreateProps} from "@/api/services/PostService";

export interface RegisterProps {
    mail:string;
    password:string
}

export interface RegisterResponse {
    Id: string,
    MailAddress: string,
    Role : string,
    Firstname : string,
    Lastname : string,
}

class AccountService {
    async register(userDetails: RegisterProps): Promise<RegisterResponse | undefined> {
        try {
            const result: RegisterResponse = await apiClient.post("/accounts", userDetails)
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
        }

    }
    async like(postId:string,token:string): Promise< any | undefined> {
        try {
            const result = await apiClient.put("/accounts/like",{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params : {id : postId}
            })
            console.log(result)
            return result.status
        } catch (e) {
            console.log(e)
        }

    }
}

export default new AccountService()