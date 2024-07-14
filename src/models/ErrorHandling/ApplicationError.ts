import { CustomError } from "./CustomError";

export class ApplicationError extends CustomError {
    StatusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.StatusCode = statusCode;
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }

    serializeError() {
        return { message: this.message };
    }
}