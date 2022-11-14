import apiClient from "@/http-common";

export interface AccountSearched {
    pseudonym: string,
    mailAddress: string,
    picUrl: string,
}

class SearchService {
    async search(searched: string, token: string): Promise<AccountSearched[] | undefined> {
        try {
            const result = await apiClient.get("/accounts/pseudonym?pseudonym=" + searched, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            console.log(result)
            return result.data
        } catch (e) {
            console.log(e)
        }

    }
}

export default new SearchService();