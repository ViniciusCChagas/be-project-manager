import IUseCase from "../../../models/IUseCase";
import { z } from "zod";
import { Request, Response } from "express";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";
import { IDeleteTaskDto } from "../../../models/dtos/DeleteTaskDto";

export class DeleteTaskController {
    constructor(private readonly deleteTaskUseCase: IUseCase<IDeleteTaskDto, boolean>) {
        this.deleteTaskUseCase = deleteTaskUseCase;
    }

    handle = async (request: Request, response: Response) => {
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;
        const { taskId } = request.params;

        const schema = z.object({
            taskId: z.string(),
        });
        const params = schema.parse({
            taskId,
        });

        await this.deleteTaskUseCase.execute({ ...params, userId });

        return response.status(200).send();
    }
}