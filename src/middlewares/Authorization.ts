import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../models/ErrorHandling/UnauthorizedError";
import jwt from "jsonwebtoken";

type TLoggedUser = {
    id: string
    name: string
}

declare global {
    namespace Express {
        interface Request {
            user?: TLoggedUser;
        }
    }
}

export const AuthorizationMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = request.cookies.token
    if (!token) {
        throw new UnauthorizedError()
    }

    const { id, name } = jwt.verify(token, process.env.JWT_SECRET ?? '') as TLoggedUser;

    request.user = { id, name }

    next()
}