import Router from 'express-promise-router';
import { userRouter } from "./user.route";
import { projectRouter } from "./project.routes";
import { taskRouter } from "./task.routes";
import { authenticationRouter } from "./authentication.routes";
import { AuthorizationMiddleware } from "../middlewares/Authorization";

const mainRouter = Router();

mainRouter.use('/', authenticationRouter)
mainRouter.use('/user', userRouter)
mainRouter.use('/project', AuthorizationMiddleware, projectRouter)
mainRouter.use('/task', AuthorizationMiddleware, taskRouter)


export { mainRouter };
