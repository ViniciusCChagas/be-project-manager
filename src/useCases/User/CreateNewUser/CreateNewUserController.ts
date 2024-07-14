import { Request, Response } from 'express'
import { ICreateNewUserParamsDto } from "../../../models/dtos/CreateNewUserDtos";
import IUseCase from "../../../models/IUseCase";
import { z } from "zod";

export class CreateNewUserController {
    private readonly createNewUserUseCase: IUseCase<ICreateNewUserParamsDto, void>;

    constructor(createNewUserUseCase: IUseCase<ICreateNewUserParamsDto, void>) {
        this.createNewUserUseCase = createNewUserUseCase;
    }

    handle = async (request: Request, response: Response): Promise<Response> => {
        const schema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(8),
        });

        const { name, email, password } = request.body as ICreateNewUserParamsDto;

        const params = schema.parse({
            name,
            email,
            password,
        });

        await this.createNewUserUseCase.execute(params)

        return response.status(201).json({
            message: 'User created successfully.',
        });
    }
}