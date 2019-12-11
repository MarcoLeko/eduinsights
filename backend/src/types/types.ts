export interface User extends UserCredential {
    _id: string,
    firstName: string,
    lastName: string,
    avatarColor: string,
}

export interface UserCredential {
    email: string,
    password: string
}
