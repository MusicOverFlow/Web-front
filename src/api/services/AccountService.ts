import apiClient from "@/http-common";

export interface RegisterProps {
    mail:string;
    password:string
}

export interface RegisterResponse {
    Id: string,
    MailAddress: string,
    Role : string,
    Firstname : string,
    Lastname : string,
}

class AccountService {
    async register(userDetails: RegisterProps): Promise<RegisterResponse | undefined> {
        try {
            const result: RegisterResponse = await apiClient.post("/accounts", userDetails)
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
        }

    }
}

export default new AccountService()