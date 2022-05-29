import {Account} from "@/api/types/Account";
import {Post} from "@/api/types/Post";
import {Commentary} from "@/api/types/Commentary";
import {Group} from "@/api/types/Group";

export interface AccountWithPostsAndGroups extends Account{
    ownedPosts:Post[],
    likedPosts:Post[],
    likedCommentaries:Commentary[],
    groups:Group[]
}