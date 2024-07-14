import { TaskRepository } from "../../../repositories/TaskRepository";
import { ChangeTaskStatusUseCase } from "./ChangeTaskStatusUseCase";
import { ChangeTaskStatusController } from "./ChangeTaskStatusController";
import { ProjectRepository } from "../../../repositories/ProjectRepository";

const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();
const changeTaskStatusUseCase = new ChangeTaskStatusUseCase(taskRepository, projectRepository);
const changeTaskStatusController = new ChangeTaskStatusController(changeTaskStatusUseCase);

export { changeTaskStatusController }