export interface IUserRequest {
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    userUid: string;
    provider: string;
    pictureUrl: string;
    locale: string;
    allergyIds: number[];
}

export interface IUserDto {
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    userUid: string;
    provider: string;
    pictureUrl: string;
    locale: string;
    allergyIds: number[];
}