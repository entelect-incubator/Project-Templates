class ValidationError(Exception):
    code = "validation_error"
    def __init__(self, message: str = "Validation failed"):
        super().__init__(message)

class NotFoundError(Exception):
    code = "not_found"
    def __init__(self, message: str = "Not found"):
        super().__init__(message)
