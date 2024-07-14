import { UserRepository } from "../../../repositories/UserRepository";
import { LoginUseCase } from "./LoginUseCase";
import { LoginController } from "./LoginController";

const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase);

export { loginController }
