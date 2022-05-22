import {Account} from "@/api/types/Account";

export interface Post {

    Id:string,
    Title:string,
    Content:string,
    CreatedAt: string,
    Account:Account

}

