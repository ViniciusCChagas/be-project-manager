import Router from "express-promise-router";
import { createNewTaskController } from "../useCases/Task/CreateNewTask";
import { changeTaskStatusController } from "../useCases/Task/ChangeTaskStatus";
import { updateTaskDescriptionUseCaseController } from "../useCases/Task/UpdateTaskDescription";
import { deleteTaskController } from "../useCases/Task/DeleteTask";

const taskRouter = Router();

taskRouter.post('/', createNewTaskController.handle)
taskRouter.patch('/:taskId/', updateTaskDescriptionUseCaseController.handle)
taskRouter.patch('/:taskId/markAs/:status', changeTaskStatusController.handle)
taskRouter.delete('/:taskId', deleteTaskController.handle)

export { taskRouter }