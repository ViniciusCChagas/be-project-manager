import { ProjectRepository } from "../../../repositories/ProjectRepository";
import { GetProjectsUseCase } from "./GetProjectsUseCase";
import { GetProjectsController } from "./GetProjectsController";

const projectRepository = new ProjectRepository();
const getProjectsUseCase = new GetProjectsUseCase(projectRepository);
const getProjectsController = new GetProjectsController(getProjectsUseCase);

export { getProjectsController };