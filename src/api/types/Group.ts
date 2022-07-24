import {Account} from "@/api/types/Account";
import {Post} from "@/api/types/Post";

export interface Group {
    id:string,
    name:string,
    description:string,
    picUrl:string,
    createdAt:string,
    owner:Account
}

export interface GroupWithMembers extends Group {
    Members:Account[]
}

export interface GroupWithPosts extends Group {
    Posts:Post[]
}
export interface GroupWithMembersAndPosts extends Group {
    Members:Account[],
    Posts:Post[]
}