import IUseCase from "../../../models/IUseCase";
import { ILoginParamsDto, ILoginResponseDto } from "../../../models/dtos/LoginDtos";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../../models/ErrorHandling/ApplicationError";
import jwt from 'jsonwebtoken';

export class LoginUseCase implements IUseCase<ILoginParamsDto, ILoginResponseDto> {
    constructor(private readonly userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(params: ILoginParamsDto): Promise<ILoginResponseDto> {
        const user = await this.userRepository.getUserByEmail(params.email);

        if (!user) {
            throw new ApplicationError(400, "Invalid credentials");
        }

        const passwordHash = await bcrypt.hash(params.password, user.passwordSalt);
        if (passwordHash !== user.password) {
            throw new ApplicationError(400, "Invalid credentials");
        }

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET ?? '', {
            expiresIn: '8h',
        })

        return {
            token: token,
            user: {
                name: user.name,
                email: user.email,
            }
        };
    }
}