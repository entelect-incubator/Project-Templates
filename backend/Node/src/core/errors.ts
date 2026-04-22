export class NotFoundError extends Error {
	code = "not_found" as const;
	constructor(message = "Not found") {
		super(message);
	}
}

export class ValidationError extends Error {
	code = "validation_error" as const;
	constructor(message = "Validation failed") {
		super(message);
	}
}
