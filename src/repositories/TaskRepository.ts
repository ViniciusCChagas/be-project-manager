import { ITaskRepository } from "./interfaces/ITaskRepository";
import { ITask, Task } from "../models/task.model";
import { Types } from "mongoose";

export class TaskRepository implements ITaskRepository {
    async createTask(task: ITask): Promise<ITask> {
        const createdTask = await Task.create(task);
        return createdTask;
    }

    async deleteTask(taskId: string): Promise<boolean> {
        const response = await Task.deleteOne({ _id: new Types.ObjectId(taskId) });
        return response.deletedCount > 0;
    }

    async getTasksByProjectId(projectId: string) {
        return Task.find({
            project: new Types.ObjectId(projectId)
        }).lean();
    }

    async updateTask(task: ITask): Promise<boolean> {
        const updatedTask = await Task.updateOne({ _id: new Types.ObjectId(task._id) }, {
            description: task.description,
            finishedAt: task.finishedAt,
        });

        return updatedTask.matchedCount > 0;
    }

    getTaskById(taskId: string): Promise<ITask | null> {
        return Task.findById(taskId).lean();
    }
}
