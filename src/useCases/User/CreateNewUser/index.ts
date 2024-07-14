import { UserRepository } from "../../../repositories/UserRepository";
import { CreateNewUserUseCase } from "./CreateNewUserUseCase";
import { CreateNewUserController } from "./CreateNewUserController";

const userRepository = new UserRepository();
const createNewUserUseCase = new CreateNewUserUseCase(userRepository);
const createNewUserUseCaseController = new CreateNewUserController(createNewUserUseCase);

export { createNewUserUseCaseController };

