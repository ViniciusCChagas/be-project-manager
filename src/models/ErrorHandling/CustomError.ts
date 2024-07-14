export abstract class CustomError extends Error {
    abstract StatusCode: number;

    protected constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeError(): { message: string, errors?: any[] };
}