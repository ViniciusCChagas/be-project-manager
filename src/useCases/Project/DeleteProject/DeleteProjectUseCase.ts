import IUseCase from "../../../models/IUseCase";
import { NotFoundError } from "../../../models/ErrorHandling/NotFoundError";
import { IDeleteProjectDto } from "../../../models/dtos/DeleteProjectDto";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";
import { ForbiddenError } from "../../../models/ErrorHandling/ForbidenError";

export class DeleteProjectUseCase implements IUseCase<IDeleteProjectDto, void> {
    constructor(private readonly projectRepository: IProjectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute({ projectId, userId }: IDeleteProjectDto): Promise<void> {
        const project = await this.projectRepository.getProjectById(projectId);
        if (!project) {
            throw new NotFoundError("Project not found");
        }

        if (!project.userId.equals(userId)) {
            throw new ForbiddenError()
        }

        await this.projectRepository.deleteProject(projectId);
    }
}