import { ProjectRepository } from "../../../repositories/ProjectRepository";
import { UpdateProjectNameUseCase } from "./UpdateProjectNameUseCase";
import { UpdateProjectNameController } from "./UpdateProjectNameController";

const projectRepository = new ProjectRepository();
const updateProjectNameUseCase = new UpdateProjectNameUseCase(projectRepository);
const updateProjectNameController = new UpdateProjectNameController(updateProjectNameUseCase);

export { updateProjectNameController }