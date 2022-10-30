import apiClient from "@/http-common";
import {Post} from "@/api/types/Post";
import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";
import {Account} from "@/api/types/Account";

export interface RegisterProps {
    mailAddress: string,
    password: string,
    firstname: string,
    lastname: string,
    pseudonym: string,
    picture: File,
}

export interface UpdateProps {
    firstname: string,
    lastname: string,
    pseudonym: string,
}

export interface RegisterResponse {
    id: string,
    mailAddress: string,
    role: string,
    firstname: string,
    lastname: string,
}

class AccountService {
    /* async register(userDetails: RegisterProps): Promise<RegisterResponse | undefined> {
         try {
             const result: RegisterResponse = await apiClient.post("/accounts", userDetails)
             console.log(result)
             return result
         } catch (e) {
             console.log(e)
         }

     }*/

    async register(userDetails: RegisterProps): Promise<number | undefined> {
        try {
            const formData = new FormData();

            formData.append('mailAddress', userDetails.mailAddress);
            formData.append('password', userDetails.password);
            formData.append('firstname', userDetails.firstname);
            formData.append('lastname', userDetails.lastname);
            formData.append('pseudonym', userDetails.pseudonym);
            formData.append('profilePic', userDetails.picture);

            const result = await apiClient.post("/accounts", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })

            console.log(result)
            return result.status
        } catch (e) {
            console.log(e)
        }

    }

    async like(postId: string, token: string): Promise<any | undefined> {
        try {
            const result = await apiClient.put("/posts/like", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {id: postId}
            })
            console.log(result)
            return result.status
        } catch (e) {
            console.log(e)
        }

    }

    async getCurrent(token: string): Promise<AccountWithPostsAndGroups | undefined> {
        try {
            const result = await apiClient.get("/accounts/self", {
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

    async follow(token: string, mailAddress: string): Promise<any | undefined> {
        try {
            const result = await apiClient.put("/accounts/follow", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {mailAddress: mailAddress}
            })
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
        }

    }


    async getByMail(mail: string, token: string): Promise<AccountWithPostsAndGroups | undefined> {
        try {
            const result = await apiClient.get("/accounts", {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {mailAddress: mail}
            })
            console.log(result)
            return result.data[0]
        } catch (e) {
            console.log(e)
        }

    }

    async getCurrentPostFromGroups(token: string): Promise<Post[] | undefined> {
        try {
            const result = await apiClient.get("/accounts/groupPosts", {
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

    async update(update: UpdateProps, token: string): Promise<number | undefined> {
        try {
            console.log("try to update")
            console.log(update)
            const result = await apiClient.put("/accounts/profil", JSON.stringify(update), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("updated")
            console.log(result)
            return result.status
        } catch (e) {
            console.log(e)
        }

    }

    async updatePic(bodyFormData: any, token: string): Promise<Account | undefined> {
        try {
            const result = await apiClient.put("/accounts/profilpic", bodyFormData,
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

export default new AccountService()