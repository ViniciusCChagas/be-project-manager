import { Request, Response } from "express";
import IUseCase from "../../../models/IUseCase";
import { IProject } from "../../../models/project.model";
import { z, ZodIssue } from "zod";
import { ICreateNewProjectParamsDto } from "../../../models/dtos/CreateNewProjectDtos";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";

export class CreateNewProjectController {

    constructor(private readonly createNewProjectUseCase: IUseCase<ICreateNewProjectParamsDto, IProject>) {
        this.createNewProjectUseCase = createNewProjectUseCase;
    }

    handle = async (request: Request, response: Response) => {
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;

        const schema = z.object({
            name: z.string(),
            userId: z.string(),
        });
        const name = request.body.name;

        const params = schema.parse({
            name,
            userId,
        });

        const project = await this.createNewProjectUseCase.execute(params);

        return response.status(201).json({ ...project, tasks: [] });
    }
}