import IUseCase from "../../../models/IUseCase";
import { z } from "zod";
import { Request, Response } from "express";
import { IDeleteProjectDto } from "../../../models/dtos/DeleteProjectDto";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";

export class DeleteProjectController {
    constructor(private readonly deleteProjectUseCase: IUseCase<IDeleteProjectDto, void>) {
        this.deleteProjectUseCase = deleteProjectUseCase;
    }

    handle = async (request: Request, response: Response) => {
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;
        const { projectId } = request.params;

        const schema = z.object({
            projectId: z.string(),
        });
        const params = schema.parse({
            projectId,
        });

        await this.deleteProjectUseCase.execute({ projectId: params.projectId, userId });

        return response.status(200).send();
    }
}