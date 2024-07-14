import IUseCase from "../../../models/IUseCase";
import { ICreateNewProjectParamsDto } from "../../../models/dtos/CreateNewProjectDtos";
import { IProject } from "../../../models/project.model";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import { NotFoundError } from "../../../models/ErrorHandling/NotFoundError";
import { Types } from "mongoose";

export class CreateNewProjectUseCase implements IUseCase<ICreateNewProjectParamsDto, IProject> {
    constructor(readonly projectRepository: IProjectRepository, readonly userRepository: IUserRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(project: ICreateNewProjectParamsDto): Promise<IProject> {
        const user = await this.userRepository.getUserById(project.userId);
        if (!user) throw new NotFoundError('User not found');

        const newProject: IProject = {
            name: project.name,
            userId: new Types.ObjectId(project.userId)
        }

        return await this.projectRepository.createProject(newProject);
    }
}