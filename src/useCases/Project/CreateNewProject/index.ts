import { ProjectRepository } from "../../../repositories/ProjectRepository";
import { UserRepository } from "../../../repositories/UserRepository";
import { CreateNewProjectUseCase } from "./CreateNewProjectUseCase";
import { CreateNewProjectController } from "./CreateNewProjectController";

const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();

const createNewProjectUseCase = new CreateNewProjectUseCase(projectRepository, userRepository);
const createNewProjectController = new CreateNewProjectController(createNewProjectUseCase);

export { createNewProjectController };