import {Post} from "@/api/types/Post";

export interface Account {
    mailAddress:string,
    firstname:string,
    lastname:string,
    Pseudonym:string,
    picUrl:string,
    createdAt:string
    follows:Account[],
}