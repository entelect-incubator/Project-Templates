from typing import Generic, TypeVar, Union

T = TypeVar("T")

class Ok(Generic[T]):
    def __init__(self, value: T):
        self.ok = True
        self.value = value

class Err:
    def __init__(self, code: str, message: str):
        self.ok = False
        self.code = code
        self.message = message

Result = Union[Ok[T], Err]

def ok(value: T) -> Result:
    return Ok(value)

def err(code: str, message: str) -> Result:
    return Err(code, message)
