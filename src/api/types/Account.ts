import {Post} from "@/api/types/Post";

export interface Account {
    MailAddress:string,
    Firstname:string,
    Lastname:string,
    CreatedAt:string,
    Posts:Post[]
    Commentaries:Post[]
}