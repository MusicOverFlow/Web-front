import {Post} from "@/api/types/Post";
import {Commentary} from "@/api/types/Commentary";
import {Account} from "@/api/types/Account";

export interface AccountWithPosts extends Account {
    ownedPosts: Post[],
    likedPosts: Post[],
    likedCommentaries: Commentary[]
}