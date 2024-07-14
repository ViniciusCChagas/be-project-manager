import IUseCase from "../../../models/IUseCase";
import { IUpdateProjectNameParamsDto } from "../../../models/dtos/UpdateProjectNameDtos";
import { IProject } from "../../../models/project.model";
import { IProjectRepository } from "../../../repositories/interfaces/IProjectRepository";
import { NotFoundError } from "../../../models/ErrorHandling/NotFoundError";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";
import { ForbiddenError } from "../../../models/ErrorHandling/ForbidenError";

export class UpdateProjectNameUseCase implements IUseCase<IUpdateProjectNameParamsDto, void> {

    constructor(private readonly projectRepository: IProjectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(params: IUpdateProjectNameParamsDto): Promise<void> {
        const project = await this.projectRepository.getProjectById(params.projectId);
        if (!project) {
            throw new NotFoundError('Project not found');
        }

        if (!project.userId.equals(params.userId)) {
            throw new ForbiddenError()
        }

        await this.projectRepository.updateProjectName(params.projectId, params.name);
    }

}