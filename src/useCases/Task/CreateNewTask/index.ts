import { TaskRepository } from "../../../repositories/TaskRepository";
import { ProjectRepository } from "../../../repositories/ProjectRepository";
import { CreateNewTaskUseCase } from "./CreateNewTaskUseCase";
import { CreateNewTaskController } from "./CreateNewTaskController";

const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();

const createNewTaskUseCase = new CreateNewTaskUseCase(taskRepository, projectRepository)
const createNewTaskController = new CreateNewTaskController(createNewTaskUseCase);

export { createNewTaskController }