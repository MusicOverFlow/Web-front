import {Account} from "@/api/types/Account";
import {Group} from "@/api/types/Group";

export interface AccountWithGroups extends Account {
    groups: Group[]
}