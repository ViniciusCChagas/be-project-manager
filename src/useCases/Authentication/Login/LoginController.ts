import IUseCase from "../../../models/IUseCase";
import { ILoginParamsDto, ILoginResponseDto } from "../../../models/dtos/LoginDtos";
import { Request, Response } from "express";
import { z } from "zod";

export class LoginController {
    constructor(private readonly loginUseCase: IUseCase<ILoginParamsDto, ILoginResponseDto>) {
        this.loginUseCase = loginUseCase;
    }

    handle = async (request: Request, response: Response): Promise<Response> => {
        const schema = z.object({
            email: z.string().email(),
            password: z.string(),
        });

        const { email, password } = request.body as ILoginParamsDto;

        const params = schema.parse({
            email,
            password,
        });

        const resp = await this.loginUseCase.execute(params)

        response.cookie('token', resp.token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 8,
            path: '/'
        })


        return response.status(200).json({ user: resp.user });
    }
}