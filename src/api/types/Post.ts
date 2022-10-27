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
    likes:Account[],
    likesCount:number,
    scriptLanguage:string,
    script:string,

    commentaries:Commentary[],
    musicUrl?:string,
}

