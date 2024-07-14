import IUseCase from "../../../models/IUseCase";
import { ITaskRepository } from "../../../repositories/interfaces/ITaskRepository";
import { ApplicationError } from "../../../models/ErrorHandling/ApplicationError";
import { NotFoundError } from "../../../models/ErrorHandling/NotFoundError";
import { IDeleteTaskDto } from "../../../models/dtos/DeleteTaskDto";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";
import { ForbiddenError } from "../../../models/ErrorHandling/ForbidenError";

export class DeleteTaskUseCase implements IUseCase<IDeleteTaskDto, boolean> {
    constructor(private readonly taskRepository: ITaskRepository, private readonly projectRepository: IProjectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    async execute({ taskId, userId }: IDeleteTaskDto): Promise<boolean> {
        const task = await this.taskRepository.getTaskById(taskId);
        if (!task) {
            throw new NotFoundError('Task not found');
        }

        const project = await this.projectRepository.getProjectById(task.projectId.toString());
        if (!project) {
            return await this.taskRepository.deleteTask(taskId)
        }

        if (!project.userId.equals(userId)) {
            throw new ForbiddenError()
        }

        if (task.finishedAt !== null) {
            throw new ApplicationError(400, "You can't delete a finished task");
        }

        return await this.taskRepository.deleteTask(taskId)
    }
}