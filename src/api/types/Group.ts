import {Account} from "@/api/types/Account";

export interface Group {
    id:string,
    name:string,
    description:string,
    createdAt:string,
    owner:Account
}