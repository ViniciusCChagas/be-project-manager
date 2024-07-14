import IUseCase from "../../../models/IUseCase";
import { IChangeTaskStatusParamsDto } from "../../../models/dtos/UpdateTaskDtos";
import { ITaskRepository } from "../../../repositories/interfaces/ITaskRepository";
import { NotFoundError } from "../../../models/ErrorHandling/NotFoundError";
import { ApplicationError } from "../../../models/ErrorHandling/ApplicationError";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";
import { ForbiddenError } from "../../../models/ErrorHandling/ForbidenError";

export class ChangeTaskStatusUseCase implements IUseCase<IChangeTaskStatusParamsDto, void> {
    constructor(private readonly taskRepository: ITaskRepository, private readonly projectRepository: IProjectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    async execute({ taskId, status, userId }: IChangeTaskStatusParamsDto): Promise<void> {
        const task = await this.taskRepository.getTaskById(taskId);
        if (!task) {
            throw new NotFoundError('Task not found');
        }

        const project = await this.projectRepository.getProjectById(task.projectId.toString());
        if (!project || !project.userId.equals(userId)) {
            throw new ForbiddenError()
        }

        if (task.finishedAt && status === 'completed') {
            throw new ApplicationError(400, 'Task already finished');
        }

        task.finishedAt = status === 'completed' ? new Date() : null;
        console.log(task)
        const updated = await this.taskRepository.updateTask(task);
        if (!updated) {
            throw new ApplicationError(500, 'Task not updated');
        }
    }
}