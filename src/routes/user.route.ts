import Router from 'express-promise-router';
import { createNewUserUseCaseController } from "../useCases/User/CreateNewUser";

const userRouter = Router();

userRouter.post('/', createNewUserUseCaseController.handle)

export { userRouter };
