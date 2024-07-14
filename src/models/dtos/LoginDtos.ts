import { IUser } from "../user.model";

export interface ILoginParamsDto {
    email: string;
    password: string;
}

export interface ILoginResponseDto {
    token: string;
    user: Omit<IUser, "password" | "passwordSalt">;
}