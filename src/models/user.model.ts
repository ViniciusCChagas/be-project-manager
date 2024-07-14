import { Schema, model, Types, Model } from 'mongoose';

export interface IUser {
    _id?: Types.ObjectId,
    name: string;
    email: string;
    password: string;
    passwordSalt: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordSalt: {
        type: String,
        required: true,
    }
});
export type TUserModel = Model<IUser>;
export const User = model<IUser>('User', userSchema);