import {Account} from "@/api/types/Account";

export interface Commentary {
    id: string,
    content: string,
    createdAt: string,
    owner: Account,
    likes: Account[],
    likesCount: number
}