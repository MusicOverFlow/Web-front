export interface Account {
    mailAddress: string,
    firstname: string,
    lastname: string,
    pseudonym: string,
    picUrl: string,
    createdAt: string
    follows: Account[],
}