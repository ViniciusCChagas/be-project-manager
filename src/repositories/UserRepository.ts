import { IUserRepository } from "./interfaces/IUserRepository";
import { IUser, TUserModel, User } from "../models/user.model";

export class UserRepository implements IUserRepository {

    async createUser(user: IUser): Promise<IUser> {
        return User.create(user);
    }

    async getUserById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }
}