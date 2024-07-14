import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    StatusCode = 404;

    constructor(message?: string) {
        super(message || "Not found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError() {
        return { message: this.message };
    }
}