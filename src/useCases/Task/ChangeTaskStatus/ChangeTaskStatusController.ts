import IUseCase from "../../../models/IUseCase";
import { IChangeTaskStatusParamsDto } from "../../../models/dtos/UpdateTaskDtos";
import { Request, Response } from "express";
import { z } from "zod";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";

export class ChangeTaskStatusController {
    constructor(private readonly updateTaskUseCase: IUseCase<IChangeTaskStatusParamsDto, void>) {
        this.updateTaskUseCase = updateTaskUseCase;
    }

    handle = async (request: Request, response: Response): Promise<Response> => {
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;
        const taskId = request.params.taskId;
        const status = request.params.status;

        const schema = z.object({
            taskId: z.string(),
            status: z.literal('completed').or(z.literal('todo')),
        });

        const params = schema.parse({
            taskId,
            status
        });

        await this.updateTaskUseCase.execute({ ...params, userId });

        return response.status(200).send();
    }
}