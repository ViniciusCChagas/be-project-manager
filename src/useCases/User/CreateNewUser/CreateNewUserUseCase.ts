import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import { ICreateNewUserParamsDto } from "../../../models/dtos/CreateNewUserDtos";
import { IUser } from "../../../models/user.model";
import bcrypt from 'bcrypt'
import IUseCase from "../../../models/IUseCase";
import { ApplicationError } from "../../../models/ErrorHandling/ApplicationError";

export class CreateNewUserUseCase implements IUseCase<ICreateNewUserParamsDto, void> {
    constructor(readonly userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: ICreateNewUserParamsDto): Promise<void> {
        const userExists = await this.userRepository.getUserByEmail(user.email);
        if (userExists) throw new ApplicationError(400, 'Email already in use');

        const passwordSalt = await bcrypt.genSalt();
        const password = await bcrypt.hash(user.password, passwordSalt);

        const newUser = {
            name: user.name,
            email: user.email,
            password,
            passwordSalt
        }
        await this.userRepository.createUser(newUser);
    }
}
