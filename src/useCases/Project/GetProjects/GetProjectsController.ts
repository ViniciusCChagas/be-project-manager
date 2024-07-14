import IUseCase from "../../../models/IUseCase";
import { ProjectWithTasksDto } from "../../../models/dtos/GetProjectsDtos";
import { Request, Response } from "express";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";

export class GetProjectsController {
    constructor(private readonly getProjectsUseCase: IUseCase<string, ProjectWithTasksDto[]>) {
        this.getProjectsUseCase = getProjectsUseCase;
    }

    handle = async (request: Request, response: Response) => {
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;
        const projects = await this.getProjectsUseCase.execute(userId);

        return response.status(200).json(projects);
    }
}