import { ProjectRepository } from "../../../repositories/ProjectRepository";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";
import { DeleteProjectController } from "./DeleteProjectController";

const projectRepository = new ProjectRepository();
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);
const deleteProjectController = new DeleteProjectController(deleteProjectUseCase);

export { deleteProjectController }