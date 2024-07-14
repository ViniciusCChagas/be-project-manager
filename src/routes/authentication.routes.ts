import Router from 'express-promise-router';
import { loginController } from "../useCases/Authentication/Login";

const authenticationRouter = Router();

authenticationRouter.post('/login', loginController.handle)

export { authenticationRouter };
