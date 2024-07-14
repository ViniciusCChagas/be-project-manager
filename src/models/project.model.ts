import { Schema, model, Types, Model, Document } from 'mongoose';
import { Task } from "./task.model";

export interface IProject {
    _id?: string;
    userId: Types.ObjectId;
    name: string;
}

const projectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    userId: { required: true, type: Schema.Types.ObjectId, ref: 'User' }
});

projectSchema.pre('deleteOne', function (next) {
    Task.deleteMany({ projectId: this.getQuery()['_id'] });

    next();
});


export type TProjectModel = Model<IProject>;
export const Project = model<IProject>('Project', projectSchema);