import IUseCase from "../../../models/IUseCase";
import { IUpdateTaskDescriptionParamDto } from "../../../models/dtos/UpdateTaskDescriptionDtos";
import { ITaskRepository } from "../../../repositories/interfaces/ITaskRepository";
import { NotFoundError } from "../../../models/ErrorHandling/NotFoundError";
import { ApplicationError } from "../../../models/ErrorHandling/ApplicationError";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";
import { ForbiddenError } from "../../../models/ErrorHandling/ForbidenError";

export class UpdateTaskDescriptionUseCase implements IUseCase<IUpdateTaskDescriptionParamDto, boolean> {
    constructor(private readonly taskRepository: ITaskRepository, private readonly projectRepository: IProjectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository
    }

    async execute({ taskId, description, userId }: IUpdateTaskDescriptionParamDto): Promise<boolean> {
        const task = await this.taskRepository.getTaskById(taskId);
        if (!task) {
            throw new NotFoundError('Task not found');
        }

        const project = await this.projectRepository.getProjectById(task.projectId.toString());
        if (!project || !project.userId.equals(userId)) {
            throw new ForbiddenError()
        }

        if (task.finishedAt !== null) {
            throw new ApplicationError(400, 'Cannot update description of a finished task');
        }

        task.description = description;

        const wasTaskUpdated = await this.taskRepository.updateTask(task);
        return wasTaskUpdated
    }
}