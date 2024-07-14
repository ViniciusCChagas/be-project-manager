import { ITask } from "../../models/task.model";

export interface ITaskRepository {
    createTask(task: ITask): Promise<ITask>;

    updateTask(task: ITask): Promise<boolean>;

    deleteTask(taskId: string): Promise<boolean>;

    getTaskById(taskId: string): Promise<ITask | null>;

    getTasksByProjectId(projectId: string): Promise<ITask[]>;

}