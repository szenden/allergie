export interface IUserRequest {
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    userUID: string;
    provider: string;
    pictureUrl: string;
    locale: string;
    allergies: number[];
}

export interface IUserDto extends IUserRequest {
    userAllergieId: number[];
}