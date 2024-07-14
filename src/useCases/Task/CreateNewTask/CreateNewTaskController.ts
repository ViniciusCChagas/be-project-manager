import { ITaskRepository } from "../../../repositories/interfaces/ITaskRepository";
import IUseCase from "../../../models/IUseCase";
import { ICreateNewTaskParamsDto } from "../../../models/dtos/CreateNewTaskDtos";
import { Request, Response } from "express";
import { z } from "zod";
import { ITask } from "../../../models/task.model";
import { UnauthorizedError } from "../../../models/ErrorHandling/UnauthorizedError";

export class CreateNewTaskController {
    constructor(private readonly createTaskUseCase: IUseCase<ICreateNewTaskParamsDto, ITask>) {
        this.createTaskUseCase = createTaskUseCase;
    }

    handle = async (request: Request, response: Response): Promise<Response> => {
        const { projectId, description } = request.body as ICreateNewTaskParamsDto;
        if (!request.user) {
            throw new UnauthorizedError();
        }
        const userId = request.user.id;

        const schema = z.object({
            projectId: z.string(),
            description: z.string(),
        });

        const params = schema.parse({
            projectId,
            description,
        });

        const newTask = await this.createTaskUseCase.execute({ ...params, userId });

        return response.status(201).json(newTask);
    }
}