import { TaskRepository } from "../../../repositories/TaskRepository";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase";
import { DeleteTaskController } from "./DeleteTaskController";
import { ProjectRepository } from "../../../repositories/ProjectRepository";

const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();

const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository, projectRepository);
const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

export { deleteTaskController };