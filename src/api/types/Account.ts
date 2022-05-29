import {Post} from "@/api/types/Post";

export interface Account {
    mailAddress:string,
    firstname:string,
    lastname:string,
    createdAt:string,
    posts:Post[]
}