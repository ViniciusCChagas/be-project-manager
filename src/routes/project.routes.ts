import { createNewUserUseCaseController } from "../useCases/User/CreateNewUser";
import Router from "express-promise-router";
import { createNewProjectController } from "../useCases/Project/CreateNewProject";
import { updateProjectNameController } from "../useCases/Project/UpdateProjectName";
import { deleteProjectController } from "../useCases/Project/DeleteProject";
import { getProjectsController } from "../useCases/Project/GetProjects";

const projectRouter = Router();

projectRouter.get('/all', getProjectsController.handle);
projectRouter.post('/', createNewProjectController.handle);
projectRouter.patch('/:projectId', updateProjectNameController.handle);
projectRouter.delete('/:projectId', deleteProjectController.handle);

export { projectRouter }