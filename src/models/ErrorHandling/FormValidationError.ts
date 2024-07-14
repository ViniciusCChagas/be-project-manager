import { CustomError } from "./CustomError";
import { ZodError } from "zod";

export class FormValidationError extends CustomError {
    StatusCode = 400;

    constructor(private readonly zodError: ZodError) {
        super('Invalid request parameters');
        this.zodError = zodError;
        Object.setPrototypeOf(this, FormValidationError.prototype);
    }

    serializeError() {
        const errors = this.zodError.errors.map((error) => {
            return { message: error.message, param: error.path.join('.') };
        });
        return {
            message: this.message,
            errors
        }
    }
}