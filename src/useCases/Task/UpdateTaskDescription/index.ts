import { TaskRepository } from "../../../repositories/TaskRepository";
import { UpdateTaskDescriptionUseCase } from "./UpdateTaskDescriptionUseCase";
import { UpdateTaskDescriptionController } from "./UpdateTaskDescriptionController";
import { ProjectRepository } from "../../../repositories/ProjectRepository";

const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();

const updateTaskDescriptionUseCase = new UpdateTaskDescriptionUseCase(taskRepository, projectRepository);
const updateTaskDescriptionUseCaseController = new UpdateTaskDescriptionController(updateTaskDescriptionUseCase);

export { updateTaskDescriptionUseCaseController };
