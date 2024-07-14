import IUseCase from "../../../models/IUseCase";
import { ProjectWithTasksDto } from "../../../models/dtos/GetProjectsDtos";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";

export class GetProjectsUseCase implements IUseCase<string, ProjectWithTasksDto[]> {
    constructor(private readonly projectRepository: IProjectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(userId: string): Promise<ProjectWithTasksDto[]> {
        return await this.projectRepository.getProjects(userId);
    }
}