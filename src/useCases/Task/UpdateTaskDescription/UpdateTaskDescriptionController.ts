import IUseCase from "../../../models/IUseCase";
import { IUpdateTaskDescriptionParamDto } from "../../../models/dtos/UpdateTaskDescriptionDtos";
import { Request, Response } from "express";
import { z } from "zod";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";

export class UpdateTaskDescriptionController {
    constructor(private readonly updateTaskDescriptionUseCase: IUseCase<IUpdateTaskDescriptionParamDto, boolean>) {
        this.updateTaskDescriptionUseCase = updateTaskDescriptionUseCase;
    }

    handle = async (request: Request, response: Response): Promise<Response> => {
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;
        const taskId = request.params.taskId;
        const description = request.body.description;

        const schema = z.object({
            taskId: z.string(),
            description: z.string(),
        });

        const params = schema.parse({
            taskId,
            description,
        });

        await this.updateTaskDescriptionUseCase.execute({ ...params, userId });

        return response.status(200).send();
    }
}