import IUseCase from "../../../models/IUseCase";
import { IUpdateProjectNameParamsDto } from "../../../models/dtos/UpdateProjectNameDtos";
import { z } from "zod";
import { Request, Response } from "express";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";

export class UpdateProjectNameController {
    constructor(private readonly updateProjectNameUseCase: IUseCase<IUpdateProjectNameParamsDto, void>) {
        this.updateProjectNameUseCase = updateProjectNameUseCase;
    }

    handle = async (request: Request, response: Response) => {
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;
        const schema = z.object({
            name: z.string(),
            projectId: z.string(),
        });

        const name = request.body.name as string;
        const projectId = request.params.projectId as string;

        const params = schema.parse({
            name,
            projectId,
        });

        await this.updateProjectNameUseCase.execute({ ...params, userId });

        return response.status(200).send();
    }


}