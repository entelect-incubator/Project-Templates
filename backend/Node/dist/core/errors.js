export class NotFoundError extends Error {
    constructor(message = "Not found") {
        super(message);
        this.code = "not_found";
    }
}
export class ValidationError extends Error {
    constructor(message = "Validation failed") {
        super(message);
        this.code = "validation_error";
    }
}
