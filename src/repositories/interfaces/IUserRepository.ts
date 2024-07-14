import { IUser } from "../../models/user.model";

export interface IUserRepository {
    createUser: (user: IUser) => Promise<IUser>;
    getUserById: (userId: string) => Promise<IUser | null>;
    getUserByEmail: (email: string) => Promise<IUser | null>;
}