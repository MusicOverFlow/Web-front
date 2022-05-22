import {Account} from "@/api/types/Account";

export interface Commentary {
    Id:string,
    Content:string,
    CreatedAt:string;
    Account:Account
}