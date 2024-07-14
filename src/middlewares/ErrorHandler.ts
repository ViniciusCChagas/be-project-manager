import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../models/ErrorHandling/CustomError";
import { ZodError } from "zod";
import { FormValidationError } from "../models/ErrorHandling/FormValidationError";

export function ErrorHandlerMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof ZodError) {
        const customError = new FormValidationError(error);
        return response.status(customError.StatusCode).json(customError.serializeError())
    }

    if (error instanceof CustomError) {
        return response.status(error.StatusCode).json(error.serializeError());
    }

    console.error(error)
    response.status(500).json({ message: "Internal server error" });
}