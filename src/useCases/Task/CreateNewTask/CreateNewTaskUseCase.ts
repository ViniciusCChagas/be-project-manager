import IUseCase from "../../../models/IUseCase";
import { ITaskRepository } from "../../../repositories/interfaces/ITaskRepository";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";
import { Types } from "mongoose";
import { ApplicationError } from "../../../models/ErrorHandling/ApplicationError";
import { NotFoundError } from "../../../models/ErrorHandling/NotFoundError";
import { ICreateNewTaskParamsDto } from "../../../models/dtos/CreateNewTaskDtos";
import { ITask } from "../../../models/task.model";
import { ForbiddenError } from "../../../models/ErrorHandling/ForbidenError";

export class CreateNewTaskUseCase implements IUseCase<ICreateNewTaskParamsDto, ITask> {
    constructor(private readonly taskRepository: ITaskRepository, private readonly projectRepository: IProjectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    async execute(data: ICreateNewTaskParamsDto): Promise<ITask> {
        const project = await this.projectRepository.getProjectById(data.projectId);
        if (!project) {
            throw new NotFoundError('Project not found');
        }

        if (!project.userId.equals(data.userId)) {
            throw new ForbiddenError()
        }

        const createdTask = await this.taskRepository.createTask({
            description: data.description,
            projectId: new Types.ObjectId(data.projectId),
            createdAt: new Date(),
            finishedAt: null
        })

        if (!createdTask) {
            throw new ApplicationError(500, 'Task not created');
        }

        return createdTask
    }

}