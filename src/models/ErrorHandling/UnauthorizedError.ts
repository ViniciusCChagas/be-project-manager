import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
    StatusCode = 401;

    constructor() {
        super("Unauthorized");
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeError() {
        return { message: this.message };
    }
}