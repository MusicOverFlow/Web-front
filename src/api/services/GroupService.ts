import apiClient from "@/http-common";

import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";
import {Account} from "../types/Account";
import {Group, GroupWithMembers} from "@/api/types/Group";
import {Post} from "@/api/types/Post";

export interface RegisterProps {
    Name:string;
    Description:string
}

export interface RegisterResponse {
    Id: string,
    Name: string,
    Description : string,
    CreatedAt : string,
    Owner : Account,
}

class GroupService {
    async create(groupDetails: RegisterProps,token:string): Promise<Group | undefined> {
        try {
            const result: Group = await apiClient.post("/groups",
                JSON.stringify(groupDetails),{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
        }

    }
    async join(groupId:string,token:string): Promise< any | undefined> {
        try {
            const result = await apiClient.post("/groups/join",{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params : {groupId : groupId}
            })
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
        }

    }

    async getAll(token:string): Promise<Group[] | undefined> {
        try {
            const result = await apiClient.get("/groups",{
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
    async getById(token:string,id:string): Promise<Group[] | undefined> {
        try {
            const result = await apiClient.get("/groups/",{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { id: id}},
            )
            console.log(result)
            return result.data[0]
        } catch (e) {
            console.log(e)
        }

    }


    async leave(groupId:string,token:string): Promise< AccountWithPostsAndGroups | undefined> {
        try {
            const result = await apiClient.post("/groups/leave",{},{
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


}

export default new GroupService()