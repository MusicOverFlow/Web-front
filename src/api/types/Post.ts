import {Account} from "@/api/types/Account";
import {Commentary} from "@/api/types/Commentary";
import {Group} from "@/api/types/Group";

export interface Post {

    id:string,
    title:string,
    content:string,
    createdAt: string,
    owner:Account,
    group:Group,
    commentaries:Commentary[],
    likes:Account[],
    likesCount:number
}

