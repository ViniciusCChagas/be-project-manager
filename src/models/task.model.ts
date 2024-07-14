import { Schema, model, Types, Model, Document } from 'mongoose';

export interface ITask {
    _id?: string;
    projectId: Types.ObjectId;
    description: string;
    createdAt: Date;
    finishedAt: Date | null;
}

const taskSchema = new Schema<ITask>({
    description: { type: String, required: true },
    projectId: { required: true, type: Schema.Types.ObjectId, ref: 'Project' },
    createdAt: { type: Date, default: Date.now },
    finishedAt: { type: Date, default: null }
});

export type TTaskModel = Model<ITask>;
export const Task = model<ITask>('Task', taskSchema);