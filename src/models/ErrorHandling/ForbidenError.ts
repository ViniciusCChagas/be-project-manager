import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {
    StatusCode = 403;

    constructor() {
        super("Forbidden");
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeError() {
        return { message: this.message };
    }
}